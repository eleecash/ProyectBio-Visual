<div align="center" id="top"> 
  <img src="./.github/app.gif" alt="API de Mediciones" />

  &#xa0;

  <!-- <a href="https://api.ejemplo.com">Demo</a> -->
</div>

<h1 align="center">API de Mediciones</h1>

<p align="center">
  <img alt="Github top language" src="https://img.shields.io/github/languages/top/eleecash/nodejs-mysql-docker?color=56BEB8">
  
  <img alt="Github language count" src="https://img.shields.io/github/languages/count/eleecash/nodejs-mysql-docker?color=56BEB8">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/eleecash/nodejs-mysql-docker?color=56BEB8">

  <img alt="License" src="https://img.shields.io/github/license/eleecash/nodejs-mysql-docker?color=56BEB8">
</p>

<p align="center">
  <a href="#dart-about">About</a> &#xa0; | &#xa0; 
  <a href="#sparkles-features">Features</a> &#xa0; | &#xa0;
  <a href="#rocket-technologies">Technologies</a> &#xa0; | &#xa0;
  <a href="#white_check_mark-requirements">Requirements</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-starting">Starting</a> &#xa0; | &#xa0;
  <a href="#memo-license">License</a> &#xa0; | &#xa0;
  <a href="https://github.com/eleecash" target="_blank">Author</a>
</p>

<br>

## :dart: About ##

This is a RESTful API designed to consult and send measurements to a MySQL database. It allows users to manage gas measurement data including CO2, O2, CH4, and NO2. The API facilitates data retrieval and storage for applications involving environmental monitoring and analytics.

## :sparkles: Features

- **Obtain all measurements:** Retrieve measurements with optional filters (location, gas type, date range).
- **Send new measurement:** Add new measurements to the database.
- **Get last measurement:** Fetch the most recent measurement recorded.

## :rocket: Technologies 

The following tools were used in this project:

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/en/)
- [MySQL](https://www.mysql.com/)

## :white_check_mark: Requirements 

Before starting :checkered_flag:, you need to have [Git](https://git-scm.com) and [Docker](https://www.docker.com/) installed.

A ``` .env ``` file must be created in the root folder of the project with the following variables set:

```plaintext
MYSQLDB_HOST=mysqldb
MYSQLDB_USER=root
MYSQLDB_ROOT_PASSWORD=elena
MYSQLDB_DATABASE=proyectobiodb
MYSQLDB_LOCAL_PORT=3306
MYSQLDB_DOCKER_PORT=3306

NODE_LOCAL_PORT=3000
NODE_DOCKER_PORT=3000

# Clone this project
$ git clone https://github.com/eleecash/nodejs-mysql-docker

# Access the project
$ cd nodejs-mysql-docker

# Create the .env file with the required parameters
$ <text-editor> .env

# Build the project
$ docker-compose build

# Run the project
$ docker-compose up

# The API REST server will initialize at <http://localhost:3000>
```

The MySQL instance will start with a database and user privileges set in the src/mysqldb-init/ folder. If the configuration is changed, the API container may not be able to communicate with the MySQL database.

The API documentation can be accessed in the following format using OpenAPI Swagger:
<a href="https://api.ejemplo.com/v1" target="_blank">Click here to see the API mediciones</a>

    
This project is licensed under the MIT License. For more details, see the LICENSE file.

Made by <a href="https://github.com/eleecash" target="_blank">Elena Ruiz De La Blanca</a>