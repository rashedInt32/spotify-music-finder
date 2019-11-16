import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <header className="text-center">
    <h3>
      <Link to="/" className="fc-secondary">
        Spotify Music
      </Link>
    </h3>
  </header>
);

export default Header;
