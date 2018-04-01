import error from './../error'
import boom from 'boom'

const req = {}
const res = {
    status: jest.fn(),
    json: jest.fn()
}
res.status.mockReturnValue(res)
const next = {}

describe('Error Handler', () => {
    it('Should format a system error', () => {
        const data = {
            error: 'Server Error',
            message: 'An Unexpected Error Occurred'
        }
        error(new Error('Test Error'), req, res, next)
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith(data)
    })

    it('Should format a boom error', () => {
        const errorMessage = 'Test Bad Data Error'
        const boomError = boom.badData(errorMessage)
        const data = {
            error: boomError.output.payload.error,
            message: errorMessage
        }
        error(boomError, req, res, next)
        expect(res.status).toHaveBeenCalledWith(422)
        expect(res.json).toHaveBeenCalledWith(data)
    })
})
