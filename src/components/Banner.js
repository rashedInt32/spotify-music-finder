import React from "react";

import Loader from "../components/Loader";
import Row from "../components/ui/Row";
import Col from "../components/ui/Col";

//Name, image, artist name and popularity

const Banner = ({ image, name, artist, description, loading }) => {
  const style = {
    background: `url(${image}) center center no-repeat`,
    backgroundSize: "cover"
  };

  return (
    <div className="banner">
      <div className="container">
        {loading ? (
          <Loader />
        ) : (
          <Row>
            <Col takes={4}>
              <div className="image" style={style}></div>
            </Col>
            <Col takes={8}>
              <h2>{name}</h2>
              <p className="fc-secondary pb-10 d-block">
                Artist:
                <b> {artist}</b>
              </p>
              <p>{description}</p>
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};

export default Banner;
