import "./banner.scss";
import React, { useState, useEffect } from "react";

const Banner = (prop) => {
  console.log(prop);
  return (
    <div className={`banner-container bg-${prop.bgClass}`}>
      <h1>{prop.title ? prop.title : ""}</h1>
    </div>
  );
};

export default Banner;
