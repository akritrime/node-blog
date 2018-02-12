import { Model } from 'objection'

export class Base extends Model {

    id?: number
    createdAt?: string
    updatedAt?: string

    $beforeInsert() {
        this.createdAt = new Date().toISOString();
        delete this.updatedAt;
      }
    
      $beforeUpdate() {
        this.updatedAt = new Date().toISOString();
        delete this.createdAt;
      }
    
} 