const express = require('express');
const bodyParser = require('body-parser');
const {Repo} = require('../database');
const path = require('path');
let app = express();
const {getReposByUsername} = require('../helpers/github.js');

console.log(getReposByUsername)
let port = process.env.PORT || 1128;

app.use(bodyParser.json());
// app.use(express.static(__dirname + '/../client/dist'));

const publicPath = path.join(__dirname, '/../client/dist');
app.use(express.static(publicPath));


app.get('/',function (req, res) {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.post('/repos', async function (req, res) {
  let result = [];
  try {
    result = await getReposByUsername(req.body.term);
  } catch(err){
    console.log(err)
  }
  res.status(200).json(result);
});

app.get('/repos', async function (req, res) {
  let repos = await Repo.find().limit(25);
  res.status(200).json(repos);
});



app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


