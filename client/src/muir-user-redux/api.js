require('isomorphic-fetch');

export default {
  login: (username, password) => {
    return fetch(new URL('/api/user/login', document.baseURI).toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({ username, password })
    });
  },
  logout: username => {
    return fetch(new URL('/api/user/logout', document.baseURI).toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    }).then(
      response => {
        return response;
      },
      error => {
        console.log('error:', error);
        throw error;
      }
    );
  },
  status: () => {
    return fetch(new URL('/api/user/status', document.baseURI).toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    }).then(
      response => {
        if (!response.ok) {
          return response.json().then(error => {
            throw new Error(error.message);
          });
        }
        return response.json();
      },
      error => {
        console.log('error:', error);
        throw error;
      }
    );
  }
};
