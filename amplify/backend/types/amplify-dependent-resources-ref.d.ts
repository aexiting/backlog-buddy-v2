export type AmplifyDependentResourcesAttributes = {
  "api": {
    "backlogbuddyv2": {
      "GraphQLAPIEndpointOutput": "string",
      "GraphQLAPIIdOutput": "string"
    }
  },
  "auth": {
    "backlogbuddyv2732ef4b9": {
      "AppClientID": "string",
      "AppClientIDWeb": "string",
      "IdentityPoolId": "string",
      "IdentityPoolName": "string",
      "UserPoolArn": "string",
      "UserPoolId": "string",
      "UserPoolName": "string"
    }
  },
  "custom": {
    "searchPipeline": {
      "OPENSEARCHENDPOINT": "string",
      "OPENSEARCHINDEX": "string",
      "QUEUEURL": "string"
    }
  },
  "function": {
    "IndexerFn": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    },
    "StreamToSqsFn": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    },
    "backlogSearchFn": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    },
    "backlogbuddyv2dependencies": {
      "Arn": "string"
    }
  }
}