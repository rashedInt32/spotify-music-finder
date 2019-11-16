import React, { useEffect, useState } from "react";
import to from "await-to-js";
import SpotifyWebApi from "spotify-web-api-js";

import { getToken } from "../utils/getToken";

import Layout from "../hoc/Layout";

function Home({history}) {
  const [playlists, setPlaylists] = useState({
    loading: false,
    message: "",
    items: []
  });

  useEffect(() => {
    getPlaylist();
  }, []);

  const spotifyApi = new SpotifyWebApi();

  const getPlaylist = async () => {
    setPlaylists({ ...playlists, loading: true });

    const token = getToken();
    spotifyApi.setAccessToken(token);

    const [, { country }] = await to(spotifyApi.getMe());

    const [err, response] = await to(
      spotifyApi.getFeaturedPlaylists({ country })
    );

    if (err) return;

    setPlaylists({
      ...playlists,
      loading: false,
      message: response.message,
      items: response.playlists.items
    });

    history.push('/');
  };

  return (
    <Layout loading={playlists.loading}>
      <h3>{playlists.message}</h3>
    </Layout>
  );
}

export default Home;
