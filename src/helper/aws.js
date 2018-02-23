import AWS from 'aws-sdk'

/**
 * Get an instance of a client from the AWS SDk
 *
 * @param {object} client The client name to be instantiated (eg: S3, SQS, Lambda)
 * @returns {AWS} The AWS client instance
 */
const aws = client => {
	if (AWS.hasOwnProperty(client)) {
		return new AWS[client]({ region: 'ca-central-1' })
	}

	throw new Error(`Could not fine client by name "${client}"`)
}

export default aws
