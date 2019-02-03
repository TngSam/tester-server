import { Document } from 'mongoose';

/**
 * Interface for objects representing test result
 * @interface
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
interface ResultModel extends Document {
  [key: string]: {
    text: string;
    img: string;
  }
}

export = ResultModel;
