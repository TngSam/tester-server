/// <reference path="db.config.d.ts"/>

const credentials: database.Credentials = {
  dbUser: 'tester',
  dbPassword: 'qwerty1'
};

export default {
  credentials,
  url: `mongodb://${credentials.dbUser}:${credentials.dbPassword}@ds159073.mlab.com:59073/monolink-project-test`
}
