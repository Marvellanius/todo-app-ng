## Todo App

### Setup
Haven't added a fully automated docker deployment yet, so some local requirements are still present

#### Requirements
* composer
* docker-compose
* npm

#### Steps
All `cd` commands are relative to the project root
1. `cd api`  
2. `composer install`
3. `cd frontend`
4. `npm install`

### Running the app
All commands are relative to the project root
1. `docker-compose up -d`
2. `frontend/node_modules/.bin/ng serve`

This will expose the PHP api on `localhost:8000` and the angular frontend on `localhost:4200`
