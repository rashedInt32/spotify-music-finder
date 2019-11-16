import React, {useState} from 'react';
import moment from 'moment';

import Row from '../components/ui/Row';
import Col from '../components/ui/Col';

//Name, image, artists, Album and duration

function Single({ location, match }) {
  const [track] = useState(location.state.track);

  const { name, album, popularity, artists, duration_ms } = track;

  const style = {
    background: `url(${album.images[0].url}) center center no-repeat`,
    backgroundSize: "cover"
  };

  return (
    <>
      <div className="banner">
        <div className="container">
          <Row>
            <Col takes={4}>
              <div className="image" style={style}></div>
            </Col>
            <Col takes={8}>
              <h2>{name}</h2>
              <h5 className="pb-10 fc-secondary">
                Artist:{" "}
                {artists.map((artist, i) => (
                  <span key={i}>{artist.name},</span>
                ))}
              </h5>

              <p className="  d-block">Album: {album.name}</p>
              <p>Duration: {moment(duration_ms).format("m:s")}m</p>
              <p>Popularity: {popularity}%</p>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default Single;
