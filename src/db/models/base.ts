import { Model } from 'objection'

export class Base extends Model {

    id?: number
    created_at?: string
    updated_at?: string

    $beforeInsert() {
        this.created_at = new Date().toISOString();
        delete this.updated_at;
      }
    
      $beforeUpdate() {
        this.updated_at = new Date().toISOString();
        delete this.created_at;
      }
    
} 