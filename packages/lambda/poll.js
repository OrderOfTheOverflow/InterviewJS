import AWS from "aws-sdk";
import async from "async";
import Raven from "raven";
import RavenLambdaWrapper from "serverless-sentry-lib";


AWS.config.update({ region: "us-east-1" });

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
const kinesis = new AWS.Kinesis({ apiVersion: '2013-12-02' });
const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
};
const statusCode = 200;


export const gateway = RavenLambdaWrapper.handler(Raven, (event, context, callback) => {
  if (! event.body) {
    const body = JSON.stringify({ event });
    callback(null, { statusCode, headers, body });
  } else {
    kinesis.putRecord({
      Data: JSON.stringify(event),
      PartitionKey: 'interviewjs',
      StreamName: process.env.kinesis_interviewjs_poll,
    }, (err, data) => {
      if (err) return callback(err, null);
      const body = JSON.stringify({ data });
      callback(null, { statusCode, headers, body });
    });
  }
});

const processKinesisRecord = (record, callback) => {
  const body = JSON.parse(JSON.parse(new Buffer(record.kinesis.data, 'base64').toString()).body);
  // console.log(body);

  let storyBucket = "story.interviewjs.io";
  if (body.viewer && (body.viewer.host === "localhost" || body.viewer.host === "story.interviewjs.net" || body.viewer.host === "story.interviewjs.net.s3-website-us-east-1.amazonaws.com")) storyBucket = "story.interviewjs.net";

  dynamodb.scan({
    ExpressionAttributeNames: {
      "#QI": "questionId",
      "#AA": "a",
      "#AB": "b",
    },
    ExpressionAttributeValues: {
      ":s": { S: body.id }
    },
    FilterExpression: "storyId = :s",
    ProjectionExpression: "#QI, #AA, #AB",
    TableName: "interviewjs-polls"
  }, (err, data) => {
    if (err) return callback(err, data);

    if (data.Count > 0) {
      const poll = data.Items.map(item => {
        let a = item ? parseInt(item.a.N) : 0;
        let b = item ? parseInt(item.b.N) : 0;

        if (body.poll[item.questionId.S] === 0) a++;
        if (body.poll[item.questionId.S] === 1) b++;

        const total = a + b;

        return {
          id: item.questionId.S,
          answer1: total > 0 ? (a * 1e2 / total).toFixed() : 0,
          answer2: total > 0 ? (b * 1e2 / total).toFixed() : 0,
          counts: [a, b],
        };
      });

      s3.putObject({
        Body: `window.InterviewJS.poll = ${JSON.stringify(poll)};`,
        ACL: "public-read",
        ContentType: "application/javascript",
        Bucket: storyBucket,
        Key: `${body.id}/poll.js`
      }, () => {}); // FIXME
    }

    Object.keys(body.poll).forEach(questionId => {
      const item = data.Items.find(item => item.questionId.S === questionId);
      let a = item ? parseInt(item.a.N) : 0;
      let b = item ? parseInt(item.b.N) : 0;

      if (body.poll[questionId] === 0) a++;
      if (body.poll[questionId] === 1) b++;

      dynamodb.putItem({
        Item: {
          "questionId": {
            S: questionId
          },
          "storyId": {
            S: body.id
          },
          "a": {
            N: `${a}`
          },
          "b": {
            N: `${b}`
          }
        },
        ReturnConsumedCapacity: "TOTAL",
        TableName: "interviewjs-polls"
      }, (err, data) => {
        if (err) console.log(err);
        console.log(data);
      });
    });
  });


  callback(null, { body });
};

export const stream = RavenLambdaWrapper.handler(Raven, (event, context, callback) => {
  async.map(event.Records, processKinesisRecord, callback);
});
