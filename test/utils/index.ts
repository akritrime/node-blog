import { app } from '../../src/app'
import * as request from 'supertest'

export const req = request(app.callback())

