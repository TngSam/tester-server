## Tester server

This is an API for [Tester](https://github.com/TngSam/tester) app.

## Current stack

* [**TypeScript**](https://github.com/Microsoft/TypeScript) aka "JavaScript that scales"
* [**Hapi.js**](https://github.com/hapijs/hapi) as a back-end engine
	* [boom](https://github.com/hapijs/boom)
	* [joi](https://github.com/hapijs/joi)
	* [lab](https://github.com/hapijs/lab)
	* [code](https://github.com/hapijs/code)
* [**MongoDB**](https://github.com/mongodb/mongo) as a document database
	* [Mongoose](https://github.com/Automattic/mongoose)
* [Winston](https://github.com/winstonjs/winston)	- an awesome logger

In future:
* [Ramda](https://github.com/ramda/ramda)

## Available scripts

In the project directory, you can run:
### `yarn start`
Runs a dev server at `process.env.HOST:process.env.PORT` (default `localhost:8000`)

### .env variables
* `HOST` - Server host
* `PORT` - Server port