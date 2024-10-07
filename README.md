<div align="center" id="top"> 
  <img src="./.github/app.gif" alt="API de Mediciones" />

  &#xa0;

  <!-- <a href="https://api.ejemplo.com">Demo</a> -->
</div>

<h1 align="center">API de Mediciones</h1>

<p align="center">
  <img alt="Github top language" src="https://img.shields.io/github/languages/top/tu_usuario/nodejs-mysql-docker?color=56BEB8">
  
  <img alt="Github language count" src="https://img.shields.io/github/languages/count/tu_usuario/nodejs-mysql-docker?color=56BEB8">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/tu_usuario/nodejs-mysql-docker?color=56BEB8">

  <img alt="License" src="https://img.shields.io/github/license/tu_usuario/nodejs-mysql-docker?color=56BEB8">
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

The API documentation can be accessed in the following format using OpenAPI:

openapi: 3.0.3
info:
  title: API de Mediciones
  description: API para consultar y enviar datos a la tabla de mediciones
  version: 1.0.0
servers:
- url: https://api.ejemplo.com/v1
paths:
  /mediciones:
    get:
      summary: Obtiene todas las mediciones
      operationId: obtener_mediciones
      parameters:
        - name: lugar
          in: query
          description: Filtra por el lugar donde se tomó la medida 
          required: false
          schema:
            type: string
        - name: tipo_gas
          in: query
          description: Filtra por el tipo de gas medido
          required: false
          schema:
            type: string
        - name: desde_hora
          in: query
          description: Filtra mediciones desde una hora específica
          required: false
          schema:
            type: string
            format: date-time
        - name: hasta_hora
          in: query
          description: Filtra mediciones hasta una hora específica
          required: false
          schema:
            type: string
            format: date-time
      responses:
        "200":
          description: Lista de mediciones obtenida correctamente
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Medicion'
        "400":
          description: Parámetros de consulta inválidos
    post:
      summary: Envía una nueva medición
      operationId: enviar_medicion
      requestBody:
        description: Datos de la nueva medición
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Medicion'
      responses:
        "201":
          description: Medición creada correctamente
        "400":
          description: Datos de medición inválidos
  
  /mediciones/ultima:
    get:
      summary: Obtiene la última medición registrada
      operationId: obtener_ultima_medicion
      responses:
        "200":
          description: Última medición obtenida correctamente
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Medicion'
        "404":
          description: No se encontró ninguna medición

components:
  schemas:
    Medicion:
      type: object
      properties:
        medida:
          type: number
          description: Valor de la medida tomada por el sensor
        lugar:
          type: string
          description: Lugar donde se tomó la medida
        tipo_gas:
          type: string
          description: Tipo de gas que mide el sensor
        hora:
          type: string
          format: date-time
          description: Hora en la que se tomó la medida
      required:
        - medida
        - lugar
        - tipo_gas
        - hora
      example:
        medida: 50.5
        lugar: "Zona Industrial"
        tipo_gas: "CO2"
        hora: "2024-09-26T14:30:00Z"
    
This project is licensed under the MIT License. For more details, see the LICENSE file.

Made by <a href="https://github.com/eleecash" target="_blank">Elena Ruiz De La Blanca</a>