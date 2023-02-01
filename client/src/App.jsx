import { useState } from 'react';
import axios from 'axios';
function App() {
  const [posts, setPosts] = useState('');
  const [Input, setInput] = useState('');
  const [apiStatus, setapiStatus] = useState(false);
  const getPost = () => {
    axios
      .get('http://127.0.0.1:3001/api/posts')
      .then((res) => {
        if (res.data) {
          setapiStatus(true);
        }
      })
      .catch((er) => {
        alert('somthing went wrong try again later!');
      });
  };
  const getUserPosts = () => {
    axios
      .get(`http://127.0.0.1:3001/api/posts/${Input}`)
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((err) => {
        setPosts('');
        alert(err.message);
      });
  };
  return (
    <>
      <h1 style={{ color: 'rgb(233, 212, 129)', alignSelf: 'center' }}>
        Sticky Post's
      </h1>
      <div className="container">
        <div className="minCon">
          {apiStatus ? (
            <div class="alert alert-success" role="alert">
              complete
            </div>
          ) : (
            <div class="d-grid gap-2">
              <button onClick={getPost} class="btn btn-primary " type="button">
                click here to download posts
              </button>
            </div>
          )}

          <br />
          <div className="leftContainer">
            <label for="inputPassword5" class="form-label">
              filter post by user
            </label>
            <input
              onChange={(e) => setInput(e.target.value)}
              placeholder="first click above to download posts"
              type="text"
              id="inputPassword5"
              class="form-control"
              aria-describedby="passwordHelpBlock"></input>
            <div class="d-grid gap-2">
              <button
                onClick={getUserPosts}
                class="btn btn-primary "
                type="button">
                find user posts
              </button>
            </div>
          </div>
          <div className="rightContainer">
            {posts ? (
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Number</th>
                    <th scope="col">Title</th>
                    <th scope="col">Body</th>
                  </tr>
                </thead>
                <tbody>
                  {posts &&
                    posts.map((post, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{post.title}</td>
                          <td>{post.body}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            ) : (
              <div class="alert alert-dark" role="alert">
                post will be shown here
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
