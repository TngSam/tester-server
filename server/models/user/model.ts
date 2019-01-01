import { Document } from 'mongoose';

interface UserModel extends Document {
  nickname: string;
  password: string;
}

export = UserModel;
