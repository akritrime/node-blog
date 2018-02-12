import { Model } from 'objection'

export class Post extends Model {

    id?: number
    title?: string
    content?: string
    created_at?: string
    updated_at?: string

    static tableName  = "posts"
    static jsonSchema = {
        type: 'object'
        , required: ['title', 'content']
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

    $beforeInsert() {
        this.created_at = new Date().toISOString();
        delete this.updated_at;
      }
    
      $beforeUpdate() {
        this.updated_at = new Date().toISOString();
        delete this.created_at;
      }
    
} 