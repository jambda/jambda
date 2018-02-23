export const production = () => {
	return {
		driver: 'rethinkdb',
		host: '127.0.0.1',
		port: '32773',
		// username   : 'test',
		// password   : 'test',
		database: 'nano_test',
		autoReconnect: true
	}
}

export const development = () => {
	return {
		driver: 'rethinkdb',
		host: '127.0.0.1',
		port: '32773',
		// username   : 'test',
		// password   : 'test',
		database: 'nano_test',
		autoReconnect: true
	}
}

export const test = () => {
	return {
		driver: 'rethinkdb',
		host: '127.0.0.1',
		port: '32773',
		// username   : 'test',
		// password   : 'test',
		database: 'nano_test',
		autoReconnect: true
	}
}
