const fs = require('fs');
const Papa = require('papaparse');

export default (req, res) => {
  fs.readFile('public/uszips.csv', (err, data) => {
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