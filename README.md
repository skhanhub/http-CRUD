# http-CRUD

This project demonstrates how to use CRUD operations for two related resources through HTTP requests.

The application uses the following technologies:

- NodeJs with an ExpressJs server
- Type Checking: Typescript
- DB: SQL

For the most part, the HTTP verbs follow convention. However, the default behaviour for `put` for the server is to update a resource if it's present and return NOT_FOUND if the resource does not exist. This breaks convention as for `put` requests the server should create a resource if it does not exists if the server is capable of creating resources. see the link below.
https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT

However, this behaviour is configurable and we can use the `updateOrCreate` functions from the controllers if we want to create a resource in case it doesn't exist. By default, the project uses the `update` functions from the controllers.

The server will allow the creation of options for a product that does not yet exist. The product and the option can later be linked with a `put` request.

The server will return <b>Unprocessable Entity</b> if it receives an invalid GUID via the URL path/params.

The server will not return detailed error messages to clients for security reasons.

The server will not modify the primary key (id) of a resource.

## Getting Started

run the server

```bash
npm install
npm start
```

The server runs on port `3001` by default.

The server allows below endpoints:

```
1.  GET /products                             - gets all products.
2.  GET /products?name={name}                 - finds all products matching the specified name.
3.  GET /products/{id}                        - gets the project that matches the specified ID - ID is a GUID.
4.  POST /products                            - creates a new product.
5.  PUT /products/{id}                        - updates a product.
6.  DELETE /products/{id}                     - deletes a product and its options.
7.  GET /products/{id}/options                - finds all options for a specified product.
8.  GET /products/{id}/options/{optionId}     - finds the specified product option for the specified product.
9.  POST /products/{id}/options               - adds a new product option to the specified product.
10. PUT /products/{id}/options/{optionId}     - updates the specified product option.
11. DELETE /products/{id}/options/{optionId}  - deletes the specified product option.
```

**Product:**

```
{
  "Id": "01234567-89ab-cdef-0123-456789abcdef",
  "Name": "Product name",
  "Description": "Product description",
  "Price": 123.45,
  "DeliveryPrice": 12.34
}
```

**Products:**

```
{
  "Items": [
    {
      // product
    },
    {
      // product
    }
  ]
}
```

**Product Option:**

```
{
  "Id": "01234567-89ab-cdef-0123-456789abcdef",
  "ProductId": "DE1287C0-4B15-4A7B-9D8A-DD21B3CAFEC3",
  "Name": "Option name",
  "Description": "Option description"
}
```

**Product Options:**

```
{
  "Items": [
    {
      // product option
    },
    {
      // product option
    }
  ]
}
```

Set the following environment variables can be set:

```
-  DB_NAME:     Name of the database
-  DB_USER:     Username for login
-  DB_PASSWORD: Password for login
-  DB_HOST:     Host name for remote database server
-  DB_PATH:     Local path to the database file for sqlite
-  ENVIRONMENT: Prod | Dev
-  PORT:        Server will listen on this port (Default to 3001)
```

## Scripts

```
- npm run tslint           - will run the linter checks
- npm test                 - will run all the tests
- npm run coverage         - will generate code coverage reports
- npm run build            - will generate generate .js from the .ts files for production use
- npm run build:watch      - will generate generate .js from the .ts files for production use and watch for changes
- npm run dev              - will run the dev server
- npm start                - will start the production server
```

## Project Structure

### Overall Structure

1. The `server/tests` directory contains all the unit and integration tests for the Backend server.
2. The `server/src` directory contains the route handler, the main app.ts and services.
3. The `server/dist` directory contains all compiled js files.
4. The `App_Data` directory contains sqlite db files.

## Development

This project uses tsLint to detect suspicious code in JavaScript files. Visit https://palantir.github.io/tslint/ for details.

### Testing

This project uses jest and supertest for testing.
Visit https://jestjs.io/ and https://www.npmjs.com/package/supertest for details.

To execute tests:

```bash
npm test
```

To calculate coverage:

```bash
npm run coverage
```

The coverage reports will be in the `coverage` folder

### Dev Server

To run the development express server and start `nodemon`:

```bash
npm run dev
```

## Future Improvements

1. Improve logging.
2. More unit tests.
3. Update association for the mock models and add unit tests.
4. Update the tables through a migration script so that constraints are enforced in the database instead of in the server.

## FAQ

## Credits

Written by Shahriar Hasan Khan
Contact: shahriar27@hotmail.com
