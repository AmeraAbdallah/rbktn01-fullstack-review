import React from 'react';

const Repo = (props) => {
  let {id, user, name, html_url, description} = props.repo;
  return (
    <div>
      <a href = {html_url}>{name}</a>
      <p>{description}</p>
      <p>By: {user}</p>
    </div>
  );
}

export default Repo;