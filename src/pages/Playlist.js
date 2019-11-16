import React, { useState, useEffect } from "react";
import to from 'await-to-js';

import { spotifyApi } from "../utils/spotify";
import { getToken } from '../utils/getToken';

import Layout from "../hoc/Layout";

function Playlist({ history, match }) {
  const [playlist, setPlaylist] = useState({
    loading: false,
    items: []
  });

  useEffect(() => {
    getPlaylist();
  }, []);

  const getPlaylist = async () => {
    const token = getToken();
    spotifyApi.setAccessToken(token);
    const [err, response] = await to(spotifyApi.getPlaylist(match.params.id));
    if (err) return err;
    setPlaylist({
      loading: false,
      items: response.playlist.items
    });

    //history.push(`/playlist/${match.params.id}`);
  };

  return <Layout loading={playlist.loading}></Layout>;
}

export default Playlist;
