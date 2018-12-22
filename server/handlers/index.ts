import UserHandler = require('./user/handler');

/**
 * Create a handlers controller
 * @param mongooseInstance - Mongoose instance
 * @returns {{user: UserHandler}}
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
const invokeHandler = (mongooseInstance: any) => {
  return {
    user: new UserHandler(mongooseInstance)
  }
};

export = invokeHandler;
