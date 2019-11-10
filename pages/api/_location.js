import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();

export default (req, res) => {
  const filePath = path.join(serverRuntimeConfig.PROJECT_ROOT, './public/uszips.csv')
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.setHeader('Content-Type', 'application/json')
      res.statusCode = 500;
      res.end();
      return;
    }
    
    const postaldata = Papa.parse(data.toString(), {
      delimiter: ',',
      header: true,
    });
    if (postaldata.errors.length > 0) {
      console.error(postaldata.errors);
      res.setHeader('Content-Type', 'application/json')
      res.statusCode = 500;
      res.end();
      return;
    }

    const r = Math.floor(Math.random() * postaldata.data.length);
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200;
    res.end(JSON.stringify(postaldata.data[r]));
  });
}