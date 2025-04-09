//download the @openapitools/openapi-generator-cli npm package first
//create a config file
//configure all the paths in this script
//then run the script

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

//specify path where to create api folder
const apiFolder = path.resolve(__dirname, '../api');
const swaggerUrl = 'https://localhost:5005/swagger/v1/swagger.json';
//specify path wehre to save the downloaded swagger file
const swaggerFile = 'src/app/fdm/api-swagger.json';
//specify path wehre config is located
const configFilePath = path.resolve(__dirname, 'openapitools.json');

if (fs.existsSync(apiFolder)) {
  execSync(`rmdir /s /q ${apiFolder}`);
}

execSync(`curl ${swaggerUrl} -o ${swaggerFile}`);

execSync(
  `npx openapi-generator-cli generate --openapitools ${configFilePath} --generator-key api -i ${swaggerFile} -o ${apiFolder}`,
  { stdio: 'inherit' },
);

fs.unlinkSync(swaggerFile);
