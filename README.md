# innovativeproject-training-planner
App that let you manage you webinar sessions.
- create your session
- save it for later if you are not ready
- invide participants

App is being developed in collaboration with **Nokia Wroclaw**

## Development
Just run `npm run dev` and your app will:
- Install all dependencies
- Run react development server
- Run node.js backend API server using [*nodemon*](https://www.npmjs.com/package/nodemon) package

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
To start the app, navigate to root folder and type:
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
