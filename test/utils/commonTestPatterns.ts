import { dbConf } from "./index";
import { SuperTest, Test } from 'supertest'

// expect test for JSON api endpoints
export const expectJSON = (res, status: "success"|"error") => {
    expect(res.type).toBe("application/json")
    expect(res.body).toBeInstanceOf(Object)
    if (status === "success") {
        expect(res.status).toBe(200)
    } else {
        expect(res.status).not.toBe(200)
    }
    expect(res.body.status).toBe(status)
    expect(res.body.data).toBeDefined()
}

// expect an error message
// export const expectErr = (res) => {
//     expect(res.body.status).toBe("error")
//     expect(res.body.data).toBeDefined()
// }

// expect an Post in JSON
export const expectPost = (data, id?: number) => {
    expect(data).toHaveProperty("id")
    expect(data).toHaveProperty("title")
    expect(data).toHaveProperty("content")
    if (id) {
        expect(data.id).toBe(id)
    }
}