import { Document } from 'mongoose';

/**
 * Interface for objects representing user data model
 * @interface
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
interface UserModel extends Document {
  nickname: string;
  password: string;
}

export = UserModel;
