import Jambda from './../index'

describe('Jambda', () => {
    it('Should load the application based on the options of the configuration file', async () => {
        const APP = await new Jambda('src/__mocks__/config.yml')
        expect(APP.constructor.name).toEqual('EventEmitter')
    })
})
