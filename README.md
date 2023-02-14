## Ecommerce Subscription Management Software

A goal of this project is to develop subscription management software. With this software it will be possible to offer and manage subscription licences (like how newspapers or streaming services are offering subscriptions).

This repository contains the backend code of the project. I will create a separate repository for the frontend later when backend has basic functionalities implemented.

### Technologies used in the project

- [TypeScript](https://www.typescriptlang.org/docs/)
- Node.js and [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [node-postgres](https://node-postgres.com/) (Node.js driver for PostgreSQL database)
- [Kysely](https://github.com/koskimas/kysely) (SQL query builder)

### How to run the project locally on your machine

You need to have Node.js installed. You can install it [here](https://nodejs.org/en/) to Windows or Mac. Or you can check instructions to install it to Linux [here](https://nodejs.org/en/download/package-manager/).

You need also PostgreSQL database. You can download it from [here](https://www.postgresql.org/). Then you need to create a new database to you machine (later we can create a Docker setup for the database so we won't need this step after that but now it is needed).

You need to create also .env file (you can copy the content of .env-template file to it). Then you need to add your database information to the file (username, password etc):

```
DB_HOST=localhost
DB_USER=
DB_PASSWORD=
DB_DATABASE=
DB_PORT=
```

You need to give also admin credentials you want to use for admin user which will be created when you start the server first time. You can give any credentials you want and email doesn't need to be real one. The .env file is in .gitignore so its content won't go to the GitHub. Don't add any information to .env-template file!

Clone this repository and install its dependencies by running command `npm ci` in the project's root directory. Then you can start the backend by command `npm run watch`.

If everything works you can see these sentences in the terminal:

```
Server is running on port 8084.
Server is connected to the database.
```

### Collaboration

This is an open souce project and you are warmly welcome to collaborate to the project. As this project has just started there is not yet issues created for tasks but those will be written soon! Main principle is to use dev branch as your target and create task branch from it. After you have finished your task you can make a pull request to the dev branch. After pull request is accepted the task branch will be merged to the dev branch.

```
git checkout dev
git pull
git checkout -b name-of-your-task-branch
```

If you want to contribute to the project find the issue you would like to do and comment there that you would like to make that task. Or if you have an idea what you would like to add to the project you can open an issue and we can discuss together is this idea something we want to implement to the project.
