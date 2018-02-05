import { app } from '../../src/app'
import * as request from 'supertest'

export const req = request(app.callback())

export const returnsJSON = (res, opts = {}) => {
    const check = {
        type: "application/json",
        status: 200,
        ...opts
    }
    expect(res.type).toBe(check.type)
    expect(res.status).toBe(check.status)
    expect(res.body).toBeInstanceOf(Object)
}
