import React from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios';

function App() {
  const [error, setError] = React.useState();
  const [data, setData] = React.useState();

  const getFromLocalRoute = async () => {
    try {
      const { data } = await Axios.get('/api/test')
      console.log(data)
      setData(data);
      setError(null)
    } catch (err) {
      console.log('err =>', err, 'err.data =>', err.response)
      setError("error")
    }
  }

  const tryFakeLogin = async () => {
    try {
      await Axios.post('/api/auth/login', { userName: 'wooseok', password: '1234' })
      setError(null)
    } catch (err) {
      console.log('err =>', err, 'err.data =>', err.response)
      setError("error")
    }
  }
  const tryLogout = async () => {
    try {
      await Axios.get('/api/auth/logout')
      setError(null)
    } catch (err) {
      console.log('err =>', err, 'err.data =>', err.response)
      setError("error")
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <button onClick={tryFakeLogin}>Try Login</button>
          <button onClick={tryLogout}>Try Logout</button>
        </div>
        <button onClick={getFromLocalRoute}>Click Here to Route</button>
        <ul>
          {data && data.map(e => <li>{e.name ? e.name : e.views}</li>)}
        </ul>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
    </div>
  );
}

export default App;
