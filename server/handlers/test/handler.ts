import { Model, model } from 'mongoose';
import { Test } from 'models';

import { Logger } from 'winston';
import { DefaultLogger } from 'utils/logger/console';

import { Handler } from 'handlers';

class TestHandler implements Handler {
  logger: Logger;
  verbose: DefaultLogger;
  model: Model<Test.Model>;

  constructor (logger: Logger, verbose: DefaultLogger) {
    this.logger = logger;
    this.verbose = verbose;
    this.model = model('Test', Test.Schema);
  }

  /**
   * Create new test
   * @method
   * @param data - Test data
   * @param verbose - Enable console logging or not
   * @author Samir Amirseidov <famirseidov@gmail.com>
   */
  create = async (data: Test.Model, verbose: boolean = false): Promise<void> => {
    try {
      await new this.model(data).save();

      if (verbose) {
        this.verbose.success('New test was created.');
      }

      this.logger.info('New test was created.', {
        handler: 'test',
        method: 'create',
        data
      });
    } catch (error) {
      throw error;
    }
  };

  /**
   * Delete test
   * @param data
   * @param verbose
   * @author Samir Amirseidov <famirseidov@gmail.com>
   */
  delete = async (data: any, verbose: boolean = false): Promise<void> => {
    const documentsCount: number = await this.model.find(data).countDocuments();
    if (documentsCount > 0) {
      try {
        await this.model.deleteOne(data);

        if (verbose) {
          this.verbose.success(`Test (ID: ${data.id}) was deleted.`);
        }

        this.logger.info(`Test (ID: ${data.id}) was deleted.`, {
          handler: 'test',
          method: 'delete',
          data
        });
      } catch (error) {
        throw error;
      }
    } else {
      this.verbose.error('No tests were found during the search.');
    }
  };

  /**
   * Find tests
   * @param data - Search criteria
   * @param verbose - Enable console logging or not
   * @author Samir Amirseidov <famirseidov@gmail.com>
   */
  find = async (data: any, verbose: boolean = false): Promise<any> => {
    const result = await this.model.find(data, (error: any, arr: any) => {
      if (error) throw error;

      if (verbose) {
        this.verbose.info(`Found ${arr.length} test(s) by search.`);
      }

      return Promise.resolve(arr);
    });
    return result;
  };

  /**
   * Clear collection
   * @param verbose - Enable console logging or not
   * @author Samir Amirseidov <famirseidov@gmail.com>
   */
  clear = async (verbose: boolean = false): Promise<void> => {
    try {
      await this.model.deleteMany({});
      if (verbose) {
        this.verbose.success('Collection has been cleared.');
      }

      this.logger.info('Collection was cleared.', {
        handler: 'test',
        method: 'clear'
      });
    } catch (error) {
      throw error;
    }
  };
}

export = TestHandler;
