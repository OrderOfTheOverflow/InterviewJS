/* eslint-disable */

'use strict';
console.log("Loading function");

exports.handler = function(event, context, callback) {
    var responseCode = 200;
    var requestBody, pathParams, queryStringParams, headerParams, stage,
    stageVariables, cognitoIdentityId, httpMethod, sourceIp, userAgent,
    requestId, resourcePath;
    console.log("request: " + JSON.stringify(event));

    // Request Body
    requestBody = event.body;

    if (requestBody !== undefined && requestBody !== null) {

        // Set 'test-status' field in the request to test sending a specific response status code (e.g., 503)
        responseCode = JSON.parse(requestBody)['test-status'];
    }

    // Path Parameters
    pathParams = event.path;

    // Query String Parameters
    queryStringParams = event.queryStringParameters;

    // Header Parameters
    headerParams = event.headers;

    if (event.requestContext !== null && event.requestContext !== undefined) {

        var requestContext = event.requestContext;

        // API Gateway Stage
        stage = requestContext.stage;

        // Unique Request ID
        requestId = requestContext.requestId;

        // Resource Path
        resourcePath = requestContext.resourcePath;

        var identity = requestContext.identity;

        // Amazon Cognito User Identity
        cognitoIdentityId = identity.cognitoIdentityId;

        // Source IP
        sourceIp = identity.sourceIp;

        // User-Agent
        userAgent = identity.userAgent;
    }

    // API Gateway Stage Variables
    stageVariables = event.stageVariables;

    // HTTP Method (e.g., POST, GET, HEAD)
    httpMethod = event.httpMethod;

    // TODO: Put your application logic here...

    // For demonstration purposes, we'll just echo these values back to the client
    var responseBody = {
        requestBody : requestBody,
        pathParams : pathParams,
        queryStringParams : queryStringParams,
        headerParams : headerParams,
        stage : stage,
        stageVariables : stageVariables,
        cognitoIdentityId : cognitoIdentityId,
        httpMethod : httpMethod,
        sourceIp : sourceIp,
        userAgent : userAgent,
        requestId : requestId,
        resourcePath : resourcePath
    };

    var response = {
        statusCode: responseCode,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify(responseBody)
    };
    console.log("response: " + JSON.stringify(response))
    context.succeed(response);
};
