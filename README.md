# innovativeproject-training-planner
App that let you manage you webinar sessions.
- create your session
- save it for later if you are not ready
- invite participants

App is being developed in collaboration with **Nokia Wroclaw**

## Development
### TL;DR

Just run
```bash
npm run dev
```
And your app will:
- Run react development server
- Run node.js backend API server using [*nodemon*](https://www.npmjs.com/package/nodemon) package

If you are creacting app from scratch - please additionally run:
```bash
npm run init
```
to install all dependencies.

### In depth explanation
There are several scripts in the root folder that you can take advantage of:
- `npm run init` - install all dependencies of project. I strongly advice to use it **IF** you are creating app from scratch. If you have already your *node_modules* and you would like to reinstall them - use `npm run reinstall` command.
- `npm run dev` - run application's development environment. It starts both webpack-dev-frontend server and API backend server.
- `npm run reinstall` - delete **all** *node_modules* directories and install dependencies from scratch.
- `npm run rm` - delete all *node_modules* from project.
- `npm run lint` - runs ESlint over all code in the project.
- `npm run lint:fix` - runs ESlint over all code and additionally fix all mistakes which can be fixed without user interaction.
- `npm test` - runs all unit tests across the project using *jest* framework. Some unit tests perform snapshot testing so sometimes you might need to update snapshot via adding `-u` flag.
- `npm run build` - build production version of client. Creates *client/build* directory.
## Production
Both deployments are dockerized, thats why you need to make sure you have docker on your machine. You can find install instructions [here](https://docs.docker.com/install/). Just choose your platform in *Supported platforms* paragraph and follow instructions.

Local deployment is also dependent on docker-compose package. We are using Compose file version 3:
```Dockerfile
version: '3'
services:
(...)
```
Thats why you must be sure that you are using at least Docker version `1.13.0`.
### Cloud deployment
App is served by [Heroku](https://www.heroku.com/). You can find latest production release [here](https://mittrainingplanner-master.herokuapp.com/).
### Local deployment
To start the app, navigate to root directory and type:
```bash
docker-compose up
```
or
```bash
docker-compose up -d
```
The second option will run container in detached mode, which means you will still be able to use your console. For more usefull flags type `docker-compose up -h`
## Heroku development
Every member of our crew have his own **development** cloud deployment:
- [Olek](https://mittrainingplanner-starmarek.herokuapp.com/)
- [Ignacy](https://mittrainingplanner-cvaniak.herokuapp.com/)
- [Kuba](https://mittrainingplanner-jaolejnik.herokuapp.com/)
- [Maciek](https://mittrainingplanner-mbednar22.herokuapp.com/)
- [Marcin](https://mittrainingplanner-mkomorek.herokuapp.com/)

You can find all the WIP changes there.
