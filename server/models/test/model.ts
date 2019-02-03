import { Document } from 'mongoose';

import QuestionModel = require('./question/model');
import ResultModel = require('./result/model');

/**
 * Interface for objects representing test structure
 * @interface
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
interface TestModel extends Document {
  readonly name: string;
  readonly answers: string[][];
  readonly questions: QuestionModel[];
  readonly results: ResultModel;
}

export = TestModel;
