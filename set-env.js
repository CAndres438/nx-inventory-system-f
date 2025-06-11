const fs = require('fs');
const path = './src/environments/environment.prod.ts';

const fileContent = `
export const environment = {
  production: true,
  apiUrl: '${process.env.NG_APP_API_URL}'
};
`;

fs.writeFileSync(path, fileContent);
console.log('✔ environment.prod.ts generado con NG_APP_API_URL');
