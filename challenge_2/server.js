const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const port = 8100;

const app = express();
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
const url = 'https://api.coindesk.com/v1/bpi/historical/close.json';

app.get('/historicalprice', (req, res) => {
  //console.log('request ', req.query)
  axios.get(`${url}?start=${req.query.start}&end=${req.query.end}`)
    .then((response) => {
      res.status(200).send(response.data.bpi);
    })
    .catch((error) => {
      res.status(404).send(error);
    })
})

app.listen(port, () => {
  console.log('Listening on port ' + port);
})