import { Base } from './base'
export class Post extends Base {

    title?: string
    content?: string
    
    static tableName  = "posts"
    static jsonSchema = {
        type: 'object'
        , required: ['title', 'content']
        , properties: {
            id: { type: 'integer' }
            , title: { type: 'string'
                     , minLength: 1
                     , maxLength: 255 
                     }
            , content: { type: 'string' }
        }
    }
    
} 