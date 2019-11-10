import http from 'https';
import Papa from 'papaparse';

export default (req, res) => {
  http.get('https://woppy.cloud/uszips.csv', subRes => {
    const { statusCode } = subRes;
    if (statusCode >= 300) {
      res.setHeader('Content-Type', 'application/json')
      res.statusCode = 500;
      res.end();
      return;
    }

    subRes.setEncoding('utf8');
    let rawData = '';
    subRes.on('data', (chunk) => { rawData += chunk; });
    subRes.on('end', () => {
      try {
        const postaldata = Papa.parse(rawData, {
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
      } catch (e) {
        console.error(e.message);
        res.setHeader('Content-Type', 'application/json')
        res.statusCode = 500;
        res.end();
        return;
      }
    });
  });
}