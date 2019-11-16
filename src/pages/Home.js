import React, { useEffect, useState } from "react";
import to from "await-to-js";
import { spotifyApi } from '../utils/spotify';


import { getToken } from "../utils/getToken";

import Layout from "../hoc/Layout";
import PlaylistCard from "../components/cards/PlaylistCard";
import Row from "../components/ui/Row";
import Col from "../components/ui/Col";

function Home({ history }) {
  const [playlists, setPlaylists] = useState({
    loading: false,
    message: "",
    items: []
  });

  useEffect(() => {
    getFeaturedPlaylist();
  }, []);


  const getFeaturedPlaylist = async () => {
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

    //history.push("/");
  };

  const handleCardClick = (id) => history.push(`/playlist/${id}`)

  return (
    <Layout loading={playlists.loading}>
      <h3 className="pb-20">{playlists.message}</h3>
      <Row>
        {playlists.items.map(playlist => (
          <Col takes={6} key={playlist.id}>
            <PlaylistCard
              name={playlist.name}
              image={playlist.images[0].url}
              numberOfTrack={playlist.tracks.total}
              onClickCard={() => handleCardClick(playlist.id)}
            />
          </Col>
        ))}
      </Row>
    </Layout>
  );
}

export default Home;
