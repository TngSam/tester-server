import { Document } from 'mongoose';

/**
 * Interface for objects representing test question
 * @interface
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
interface QuestionModel extends Document {
  id: number;
  name: string;
}

export = QuestionModel;
