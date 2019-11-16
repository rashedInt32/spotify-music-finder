import React, { useState, useEffect } from "react";
import to from "await-to-js";

import { spotifyApi } from "../utils/spotify";

import Layout from "../hoc/Layout";
import Banner from "../components/Banner";
import Track from "../components/cards/Track";

function Playlist({ history, match, location }) {
  const [playlist, setPlaylist] = useState({
    loading: false,
    data: {}
  });

  // Playlist id from url params
  const { id } = match.params;

  useEffect(() => {
    getPlaylist();
  }, []);

  /**
   * getPlaylist
   * @desc send request to api to get Playlist details.
   * Verify access_toekn before api call with location.state.token
   * props  which passed from home page
   * Populate state with response data
   */
  const getPlaylist = async () => {
    setPlaylist({ ...playlist, loading: true });

    spotifyApi.setAccessToken(location.state.token);

    const [err, response] = await to(spotifyApi.getPlaylist(id));

    if (err) return err;

    setPlaylist({
      loading: false,
      data: response
    });
  };

  /**
   * handleCardTrack
   * @desc when click track card change route to
   * track single page, pass track also to get details on single page
   * @param {track} Object track details
   */
  const handleClickTrack = track =>
    history.push(`/track/${track.id}`, { track });

  const { images, name, owner, description, tracks } = playlist.data;

  return (
    <>
      <Banner
        loading={playlist.loading}
        image={images && images[0].url}
        name={name}
        artist={owner && owner.display_name}
        description={description}
      />

      <Layout loading={playlist.loading}>
        <h3 className="pb-20">Tracks</h3>
        {tracks &&
          tracks.items.map(({ track }) => (
            <Track
              key={track.id}
              name={track.name}
              album={track.album.name}
              artists={track.artists}
              onClickTrack={() => handleClickTrack(track)}
            />
          ))}
      </Layout>
    </>
  );
}

export default Playlist;
