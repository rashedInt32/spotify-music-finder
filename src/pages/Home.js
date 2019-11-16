import React, {useEffect, useState} from 'react';
import to from 'await-to-js';
import SpotifyWebApi from 'spotify-web-api-js';

import { getToken } from '../utils/getToken';

function Home() {
  const [playlists, setPlaylists] = useState({
    loading: false,
    message: '',
    items: []
  });

  useEffect(() => {
    getPlaylist();
  },[]);

  const spotifyApi = new SpotifyWebApi();

  const getPlaylist = async () => {
    setPlaylists({ ...playlists, loading: true });

    const token = getToken();
    spotifyApi.setAccessToken(token);

    const [, { country }] = await to(spotifyApi.getMe());

    const [err, response] = await to(spotifyApi.getFeaturedPlaylists({ country }));

    if (err) return;

    setPlaylists({
      ...playlists,
      loading: false,
      message: response.message,
      items: response.playlists.items
    });
  };

  return (
    <div className="container">
      <div className="playlists-wrapper">
        <h3>{playlists.message}</h3>
      </div>
    </div>
  )
};

export default Home;
