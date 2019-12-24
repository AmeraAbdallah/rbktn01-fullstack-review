const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
const ObjectId = mongoose.Schema.Types.ObjectId;

let repoSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  user: {
    type: String
  },
  name: {
    type: String
  },
  full_name: {
    type: String
  },
  owner: {
    id: {
      type: Number
    },
    login: {
      type: String
    },
    avatar_url: {
      type: String
    },
    html_url: {
      type: String
    }
  },
  html_url: {
    type: String
  },
  description: {
    type: String
  }
});

let userSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  login: {
    type: String
  },
  avatar_url: {
    type: String
  },
  html_url: {
    type: String
  }
});

let User = mongoose.model('User', userSchema);

let Repo = mongoose.model('Repo', repoSchema);

let save = ({id, name, user,full_name, owner, html_url, description}) => {
  let repo = new Repo({id, user, name, full_name, owner, html_url, description});
  let newUser = new User({...owner});

  newUser.save();
  repo.save();
}

module.exports.save = save;
module.exports.Repo = Repo;
module.exports.User = User;