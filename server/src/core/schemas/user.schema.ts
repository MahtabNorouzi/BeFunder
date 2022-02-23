import { EntitySchema } from 'typeorm';
import { User } from '../entities/user';

export const UserSchema = new EntitySchema<User>({
    name: 'User',
    target: User,
    columns: {
        id: {
            type: 'uuid',
            primary: true,
            generated: 'uuid',
        },
        username: {
            type: String,
            unique:true
        },
        password: {
            type: String,
        },
        fullName: {
            type:String,
            nullable:true
        },
        userMode: {
            type:String,
            nullable:true
        },
        ethAddress: {
            type: String,
            nullable: true
        }
    }
});