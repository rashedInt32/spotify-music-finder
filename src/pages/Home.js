import React, {useEffect} from 'react';
import to from 'await-to-js';

import { http } from '../http/http';

function Home() {
  useEffect(() => {
    getPlaylist();
  }, []);

  const getPlaylist = async () => {
    const [err, response] = await to(http.get('/albums'));
    if (err) console.log(err);
    console.log(response);
    return response;
  }

  return (
    <div className="container">
      <h1>Home</h1>
    </div>
  )
};

export default Home;
