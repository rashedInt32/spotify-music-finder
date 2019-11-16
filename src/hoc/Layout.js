import React from "react";
import Loader from "../components/Loader";

const Layout = ({ loading, children }) => (
  <div className="container layout">{loading ? <Loader /> : children}</div>
);

export default Layout;
