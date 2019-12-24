const express = require('express');
const bodyParser = require('body-parser');
const {Repo} = require('../database');

let app = express();
const {getReposByUsername} = require('../helpers/github.js');

console.log(getReposByUsername)
let port = 1128;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

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


