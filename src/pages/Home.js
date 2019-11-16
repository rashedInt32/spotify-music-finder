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

  const [token, setToken] = useState("");

  useEffect(() => {
    getFeaturedPlaylist();
  }, []);


  /**
   * getFeaturedPlaylist
   * @desc call spotify feturedPlalist api with extra params country
   * First it check access_token is provided or not
   * if not redirect to spotify authroize page to login
   * and get back with token on hash link
   *
   * After getting access token it send a request to /me api endpoints
   * to get user details as we need country value to get specific plalist
   * based on country
   *
   * When everything setup, it call featuredPlalist endpoints and
   * populate state with response data
   */
  const getFeaturedPlaylist = async () => {
    setPlaylists({ ...playlists, loading: true });

    const getTokenFromHash = getToken();
    spotifyApi.setAccessToken(getTokenFromHash);
    // Set token to state as we need to pass it on single playlist page
    setToken(getTokenFromHash);

    // Grab country from /me endpoint
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

    // Remove hashed url when get the token from it
    history.push("/");
  };

  /**
   * handleCardClick
   * @desc when click playlist card change route to
   * playlist single page, also pass token cred.
   * @param {id} String Playlist id
   */
  const handleCardClick = id => history.push(`/playlist/${id}`, { token });

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
