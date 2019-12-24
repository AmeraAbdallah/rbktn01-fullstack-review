import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }
  async componentDidMount(){
    try{
      const response = await fetch('/repos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const myJson = await response.json();
      this.setState(() => ({repos: []}));
      for(let i = 0; i < myJson.length ; i++){
        let repo = {
          id: myJson[i].id,
          user: myJson[i].owner.login,
          name: myJson[i].name,
          full_name: myJson[i].full_name,
          html_url: myJson[i].html_url,
          description: myJson[i].description,
          owner: {
            id :myJson[i].owner.id,
            login: myJson[i].owner.login,
            avatar_url: myJson[i].avatar_url,
            html_url: myJson[i].owner.html_url
          }
        }
        this.setState((prevState) => ({repos: [...this.state.repos, repo]}));
      }
    } catch (err) {
      console.log(err);
    }
  }

  async search (term) {
    try{
      const response = await fetch('/repos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({term})
      });
      const myJson = await response.json();
      this.setState(() => ({repos: []}));
      for(let i = 0; i < myJson.length && i < 25; i++){
        let repo = {
          id: myJson[i].id,
          user: myJson[i].owner.login,
          name: myJson[i].name,
          full_name: myJson[i].full_name,
          html_url: myJson[i].html_url,
          description: myJson[i].description,
          owner: {
            id :myJson[i].owner.id,
            login: myJson[i].owner.login,
            avatar_url: myJson[i].avatar_url,
            html_url: myJson[i].owner.html_url
          }
        }
        this.setState((prevState) => ({repos: [...this.state.repos, repo]}));
      }
    } catch (err) {
      console.log(err);
    }
  }

  render () {
    return (
      <div>
        <h1>Github Fetcher</h1>
        <Search onSearch={this.search.bind(this)}/>
        <RepoList repos={this.state.repos}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));