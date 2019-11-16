import React from "react";

const Col = ({ children, takes }) => <div className={"col-md-" + takes}>{children}</div>;

export default Col;
