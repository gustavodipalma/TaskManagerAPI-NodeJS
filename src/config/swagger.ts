import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

const swaggerDocument = YAML.load(path.join(__dirname, 'api.yaml'));

export const swaggerSetup = (app: any) => {
  const options = {
    customCssUrl: 'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.1/themes/v3/dark.css'
  };
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
};