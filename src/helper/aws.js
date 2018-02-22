const AWS = require('aws-sdk');


/**
 * Get an instance of a client from the AWS SDk
 *
 * @param client The client name to be instantiated (eg: S3, SQS, Lambda)
 */
const aws = (client) => {

    if(AWS.hasOwnProperty(client)) {
        return new AWS[client]({region: 'ca-central-1'});
    }

    throw new Error(`Could not fine client by name "${client}"`);
}

module.exports = aws