# Todo App

### React application with a ASP.NET Core, Minimal API Architecture backend with MongoDB database

Project structure:
```
.
├── to-do-list-api
│   └── TodoAPI
│       └── TodoAPI (VS Structure, LoL!)
│           ├── ....
│           └── dockerfile
│   ....
├── to-do-list-app-test
│   ├── ....
│   └── dockerfile
├── ....
├── docker-compose.yml
└── README.md
```

[_docker-compose.yml_](https://github.com/angzixuan/todoApp/blob/main/docker-compose.yml)
```
services:
  web:
    build:
      context: to-do-list-app-test
    restart: always
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - backend

  backend:
    restart: always
    build:
      context: to-do-list-api/TodoAPI/TodoAPI
    environment:
      ASPNETCORE_URLS: http://*:5170
    ports:
      - "5170:5170"
```
The docker compose file defines an application with two services `web` and `backend`.

When deploying the application, docker compose maps port 3000 of the frontend service container to port 3000 of the host as specified in the file. Make sure port 3000 on the host is not already being in use. Same for the backend.

## Deploy with docker compose

Meanwhile, what needed to be done after cloning the project is to run:
```
$ docker compose up -d
....
[+] Running 3/3
 ✔ Network todoapp_default      Created                                                                           
 ✔ Container todoapp-backend-1  Started                                                                           
 ✔ Container todoapp-web-1      Started   
```

## Expected result

Listing containers must show containers running and the port mapping as below:
```
$  docker ps           
CONTAINER ID   IMAGE        COMMAND                 CREATED          STATUS         PORTS                   NAMES
e56a58091293   todoapp-web  "docker-entrypoint.s…"   5 seconds ago   Up 2 seconds   0.0.0.0:3000->3000/tcp   todoapp-web-1
26044bd8e082   todoapp-backend   "dotnet TodoAPI.dll"     5 seconds ago   Up 3 seconds   0.0.0.0:5170->5170/tcp   todoapp-backend-1
```
After the application starts, navigate to `http://localhost:3000` in your web browser for front end and head to `http://localhost:5170` for swagger documentation for backend.

Stop and remove the containers by below:
```
$ docker compose down
 ✔ Container todoapp-web-1      Removed                                                                            
 ✔ Container todoapp-backend-1  Removed                                                                            
 ✔ Network todoapp_default      Removed                                                                            
```

Due to time constraint and on-hand work and commitment, these are what I could delivered for now. It could be better if right amount of time is given but it is understandable.