import AWS from "aws-sdk";
import uuidv5 from "uuid/v5";
import shortUuid from "short-uuid";
import async from "async";
import sanitizeHtml from "sanitize-html";
import escapeGoat from "escape-goat";
import Raven from "raven";
import RavenLambdaWrapper from "serverless-sentry-lib";


AWS.config.update({ region: "us-east-1" });
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

const computeId = (userId, storyId) => {
  let namespace = userId;
  if (namespace.indexOf(":") > 0) namespace = namespace.split(":").pop();

  let id = storyId;
  if (id.indexOf("_")) id = id.split("_").pop();
  if (id.length < 36) id = shortUuid().toUUID(id);

  const uuid = uuidv5(id, namespace);
  return shortUuid().fromUUID(uuid);
};

const filterIframe = dirty => {
  const clean = sanitizeHtml(dirty, {
    allowedTags: ['iframe'],
    allowedAttributes: {
      iframe: ['src', 'data-*', 'width', 'height', 'referrerpolicy', 'allow', 'allowfullscreen', 'frameborder', 'scrolling']
    },
    allowedSchemes: ['http', 'https'],
    allowedSchemesAppliedToAttributes: ['src'],
    allowProtocolRelative: false,
    allowedIframeHostnames: ['www.youtube.com', 'www.youtube-nocookie.com', 'player.vimeo.com', 'w.soundcloud.com', 'www.google.com'],
    parser: {
      lowerCaseTags: true,
    },
    textFilter: () => '',
  });

  return clean;
}

const processRecord = (record, callback) => {
  const bucket = record.s3.bucket.name; // data.interviewjs.io
  const key = record.s3.object.key; // public/stories/us-east-1%3Auid/sid/story.json
  const [ userId, storyId ] = key.replace("public/stories/", "").replace("/story.json", "").split("/").map(decodeURIComponent);
  const publishId = computeId(userId, storyId);
  console.log(userId, storyId, publishId);

  console.log(bucket, key)
  s3.getObject({
    Bucket: bucket,
    Key: decodeURIComponent(key)
  }, (err, data) => {
    if (err) return callback(err);

    const story = JSON.parse(data.Body.toString("utf-8"));

    story.sourceId = story.id;
    story.id = publishId;

    // story.interviewees = story.interviewees.map(interviewee => {
    //   interviewee.storyline = interviewee.storyline.map(bubble => {
    //     if (bubble.type === "embed") bubble.content = filterIframe(bubble.content);
    //     return bubble;
    //   });
    //   return interviewee;
    // });

    let storyBucket = "story.interviewjs.io";
    if (story.composer && (story.composer.host === "localhost" || story.composer.host === "composer.interviewjs.net" || story.composer.host === "composer.interviewjs.net.s3-website-us-east-1.amazonaws.com")) storyBucket = "story.interviewjs.net";

    s3.getObject({
      Bucket: storyBucket,
      Key: "index.html"
    }, (err, data) => {
      if (err) return callback(err);

      const meta = [];
      meta.push(escapeGoat.escapeTag`<title>${story.title}</title>`);
      meta.push(escapeGoat.escapeTag`<meta property="og:title" content="${story.title}" />`);
      meta.push(escapeGoat.escapeTag`<meta property="og:type" content="article" />`);
      meta.push(escapeGoat.escapeTag`<meta property="og:description" content="${story.intro}" />`);
      meta.push(escapeGoat.escapeTag`<meta property="og:image" content="${story.cover}" />`);

      const index = data.Body.toString("utf-8")
        .replace("/sample-story/sample-story.js", "./story.js")
        .replace("/sample-story/sample-poll.js", "./poll.js")
        .replace("<head>", `<head>\n${meta.join("\n")}`);

      s3.putObject({
        Body: `window.InterviewJS.story = ${JSON.stringify(story)};`,
        ACL: "public-read",
        ContentType: "application/javascript",
        Bucket: storyBucket,
        Key: `${publishId}/story.js`
      }, (err, response) => {
        if (err) return callback(err);

        // // FIXME: sequence this
        // s3.putObject({
        //   Body: "/* */",
        //   ACL: "public-read",
        //   ContentType: "application/javascript",
        //   Bucket: storyBucket,
        //   Key: `${publishId}/poll.js`
        // }, () => {}); // FIXME
        createPoll(publishId, storyBucket, (err, data) => {
          if (err) return callback(err, data);

          s3.putObject({
            Body: index,
            ACL: "public-read",
            ContentType: "text/html; charset=utf-8",
            Bucket: storyBucket,
            Key: `${publishId}/index.html`
          }, (err, response) => {
            if (err) return callback(err);
            callback(null, publishId);
          });
        });
      });
    });
  });
};


export const publish = RavenLambdaWrapper.handler(Raven, (event, context, callback) => {
  async.map(event.Records, processRecord, callback);
});

const createPoll = (id, storyBucket, callback) => {
  dynamodb.scan({
    ExpressionAttributeNames: {
      "#QI": "questionId",
      "#AA": "a",
      "#AB": "b",
    },
    ExpressionAttributeValues: {
      ":s": { S: id }
    },
    FilterExpression: "storyId = :s",
    ProjectionExpression: "#QI, #AA, #AB",
    TableName: "interviewjs-polls"
  }, (err, data) => {
    if (err) return callback(err, data);

    let poll = [];
    if (data.Count > 0) {
      poll = data.Items.map(item => {
        let a = item ? parseInt(item.a.N) : 0;
        let b = item ? parseInt(item.b.N) : 0;

        const total = a + b;

        return {
          id: item.questionId.S,
          answer1: total > 0 ? (a * 1e2 / total).toFixed() : 0,
          answer2: total > 0 ? (b * 1e2 / total).toFixed() : 0,
          counts: [a, b],
        };
      });
    }

    s3.putObject({
      Body: `window.InterviewJS.poll = ${JSON.stringify(poll)};`,
      ACL: "public-read",
      ContentType: "application/javascript",
      Bucket: storyBucket,
      Key: `${id}/poll.js`
    }, (err) => {
      callback(err, data);
    });
  });
};
