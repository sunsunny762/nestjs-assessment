<h1 align="center">NestJS Assessment Project</h1>

## Nest js Assessment Requirement

- Create a route to create form
  - route POST -/form
  - body
  ```
    "uniqueId": "uuid",
    "title": "User",
    "name": "string",
    "email": "email",
    "phonenumber": "number",
    "isGraduate": "boolean"
  ```

-	Create a route to fill data
  - route POST - fill_data?form_title="user"
  - body
```
    "uniqueId": "21d44798-933b-43ea-8568-ca374e74ea53",
    "name": "user name 3",
    "email": "test3@test.com",
    "phonenumber": "+919876543213",
    "isGraduate": true
  ```

-	validate for the request that every key is as per the type defined in the create form api.

-	Create a route to get all data
  - route get - fill_data?form_title="user"
  - returns an array of responses that are submitted.

## Installation

Application based on [Nest](https://github.com/nestjs/nest) framework

To clone the repo, run the below command

```bash
$ git clone https://github.com/sunsunny762/nestjs-assessment.git
```

If you are using SSH, use the below command

```bash
$ git clone git@github.com:sunsunny762/nestjs-assessment.git
```

Navigate inside the repo and install the dependencies

```bash
$ cd api
$ npm install
```

## Running the app

Each applications needs to be started seperately using below commands

```bash
# app_name - the name of the application you intent to run

# development (can also be used for production once built)
$ npm start -- <app_name>

# build
$ npm run build -- <app_name>

# watch mode
$ npm run start:dev -- <app_name>
```



