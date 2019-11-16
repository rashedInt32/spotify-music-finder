import React, { useState, useEffect } from "react";
import to from "await-to-js";

import { spotifyApi } from "../utils/spotify";

import Layout from "../hoc/Layout";
import Banner from "../components/Banner";
import Track from '../components/cards/Track';

function Playlist({ history, match, location }) {
  const [playlist, setPlaylist] = useState({
    loading: false,
    data: {}
  });

  useEffect(() => {
    getPlaylist();
  }, []);

  const getPlaylist = async () => {
    setPlaylist({ ...playlist, loading: true });
    spotifyApi.setAccessToken(location.state.token);

    const [err, response] = await to(spotifyApi.getPlaylist(match.params.id));

    if (err) return err;

    setPlaylist({
      loading: false,
      data: response
    });
  };

  const image = playlist.data.images;
  console.log(image)

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
        {tracks && tracks.items.map(({track}) =>
          <Track
            key={track.id}
            name={track.name}
            album={track.album.name}
            artists={track.artists}
          />
        )}
      </Layout>
    </>
  );
}

export default Playlist;
