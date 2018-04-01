import fs from 'fs'
import yaml from 'yamljs'
import extend from 'lodash/extend'
import moduleLoader from './../loader'
import * as moduleOne from './../../__mocks__/modules/moduleOne'
import * as moduleTwo from './../../__mocks__/modules/moduleTwo'

const config = yaml.parse(String(fs.readFileSync('src/config/config.yml')))
const userConfig = yaml.parse(
    String(fs.readFileSync('src/__mocks__/config.yml'))
)
extend(config, userConfig)

const app = {
    use: jest.fn(function() {
        app.middlewares.push(arguments[0])
    }),
    middlewares: []
}

describe('Modules Loader', () => {
    it('Should load the configured modules', async () => {
        await moduleLoader(app, config)
        expect(app.middlewares).toHaveLength(5)
        expect(moduleOne.onLoad).toHaveBeenCalled()
        expect(moduleOne.onLoad).toHaveBeenCalledWith(app, config)
        expect(moduleOne.onAfterRoute).toHaveBeenCalled()
        expect(moduleOne.onAfterRoute).toHaveBeenCalledWith(app, config)
        expect(moduleOne.onBeforeRoute).toHaveBeenCalled()
        expect(moduleOne.onBeforeRoute).toHaveBeenCalledWith(app, config)
        expect(moduleOne.onError).toHaveBeenCalled()
        expect(moduleOne.onError).toHaveBeenCalledWith(app, config)

        expect(moduleTwo.onLoad).toHaveBeenCalled()
        expect(moduleTwo.onLoad).toHaveBeenCalledWith(app, config)
        expect(moduleTwo.onBeforeRoute).toHaveBeenCalled()
        expect(moduleTwo.onBeforeRoute).toHaveBeenCalledWith(app, config)
        expect(moduleTwo.registerRoutes).toHaveBeenCalled()
        expect(moduleTwo.registerRoutes).toHaveBeenCalledWith(app, config)
    })
})
