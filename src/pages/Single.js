import React, {useState} from 'react';
import moment from 'moment';

import Row from '../components/ui/Row';
import Col from '../components/ui/Col';

//Name, image, artists, Album and duration

function Single({ location, history }) {
  const [track] = useState(location.state.track);

  const { name, album, popularity, artists, duration_ms } = track;

  const style = {
    background: `url(${album.images[0].url}) center center no-repeat`,
    backgroundSize: "cover"
  };

  const goBack = () => history.goBack();

  return (
    <>
      <div className="banner">
        <p className="back" onClick={goBack}>
          Back
        </p>
        <div className="container single">
          <img src={album.images[0].url} alt="" />
          <h2>{name}</h2>
          <h5 className="pb-10 fc-secondary">
            Artist:{" "}
            {artists.map((artist, i) => (
              <span className="artist" key={i}>
                {artist.name}
                <small>, </small>
              </span>
            ))}
          </h5>

          <p className="  d-block">Album: {album.name}</p>
          <p>
            Duration: <b>{moment(duration_ms).format("m:s")}m</b>
          </p>
          <p>
            Popularity: <b>{popularity}%</b>
          </p>
        </div>
      </div>
    </>
  );
}

export default Single;
