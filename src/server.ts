import express from 'express';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import routes from './routes'; 
import db from "./config/database.config"
import { processBody } from './middleware/processBody';

// Export the server for unit testing
export default async function initServer(){

    // Create the application
    const app = express();
    const swaggerDocument = YAML.load('./openapi.yaml');

    app.use(logger('combined'));
    // support json encoded bodies
    app.use(express.json());
    // support urlencode
    app.use(express.urlencoded({ extended: false }));

    app.use(processBody);
    // Add routes, both API and view
    app.use(routes);

    await db.authenticate()
    console.info("connected to db")
    
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    return app
}

export async function startServer(port: string) {

  const app = await initServer()
  app.listen(port, () => {console.info(`Listening on ${port}`)});
}
