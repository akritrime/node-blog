import { Base } from './base'

export class User extends Base {

    username?: string
    firstname?: string
    lastname?: string
    email?: string
    password?: string
    salt?: string

    static tableName  = "posts"
    static jsonSchema = {
        type: 'object'
        , required: ['username', 'email']
        , properties: {
            id: { type: 'integer' }
            , title: { 
                type: 'string'
                , minLength: 1
                , maxLength: 255 
            }
            , content: { type: 'string' }
        }
    }

    fullname() {
        return `${this.firstname} ${this.lastname}` 
    }
}