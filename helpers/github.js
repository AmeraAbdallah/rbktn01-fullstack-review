const request = require('request');
const config = require('../config.js');
const fetch = require('node-fetch');
const {save} = require('../database');

let getReposByUsername = async (owner) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${owner}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  try{
  const result = await fetch(options.url,
    {
      headers: options.headers
    });
    const repos = await result.json();
    for(let i = 0; i <= 25; i++){
      let repo = {
        id: repos[i].id,
        user: repos[i].owner.login,
        name: repos[i].name,
        full_name: repos[i].full_name,
        html_url: repos[i].html_url,
        description: repos[i].description,
        owner: {
          id :repos[i].owner.id,
          login: repos[i].owner.login,
          avatar_url: repos[i].avatar_url,
          html_url: repos[i].owner.html_url
        }
      }
      save(repo);
    }
    return Promise.resolve(repos);
  } catch (err) {
    return Promise.reject(err);
    console.log(err);
  }

}

module.exports.getReposByUsername = getReposByUsername;