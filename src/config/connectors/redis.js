export const production = () => {
	return {
		driver: 'redis',
		host: '127.0.0.1',
		port: '6379',
		// username   : 'test',
		// password   : 'test',
		//database   : './db/test.db',
		autoReconnect: true
	}
}

export const development = () => {
	return {
		driver: 'redis',
		host: '127.0.0.1',
		port: '6379'
		// username   : 'test',
		// password   : 'test',
		//database   : './db/test.db',
		//autoReconnect : true
	}
}

export const test = () => {
	return {
		driver: 'redis',
		host: '127.0.0.1',
		port: '6379'
		// username   : 'test',
		// password   : 'test',
		//database   : './db/test.db',
		//autoReconnect : true
	}
}
