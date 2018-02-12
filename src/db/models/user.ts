import { Base } from './base'

export class User extends Base {

    userName?: string
    firstName?: string
    lastName?: string
    email?: string
    private passwordHash?: string
    private salt?: string

    static tableName  = "posts"
    static jsonSchema = {
        type: 'object'
        , required: ['username', 'email', 'passwordHash', 'salt']
        , properties: {
            id: { type: 'integer' }
            , userName: { type: 'string'
                        , minLength: 1
                        , maxLength: 255 
                        }
            , firstName: { type: 'string'
                         , minLength: 1
                         , maxLength: 255 
                         }
            , lastName: { type: 'string'
                        , minLength: 1
                        , maxLength: 255 
                        }
            , email: { type: 'string' 
                     , format: 'email'
                     }
            , passwordHash: { type: 'string' }
            , salt: { type: 'string' }
        }
    }

    fullname() {
        return `${this.firstName} ${this.lastName}` 
    }
}