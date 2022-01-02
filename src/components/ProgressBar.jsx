import React from "react";

export const ProgressBar = (props) => {
  const Parentdiv = {
    height: "2px",
    width: "90%",
    margin: "0 auto",
    backgroundColor: "whitesmoke",
    borderRadius: 40,
    margin: 50,
  };

  const Childdiv = {
    height: "100%",
    width: `${props.progress}%`,
    fontSize: "2px",

    backgroundColor: "#75cc12",
  };

  const progresstext = {
    color: "black",
    fontWeight: 900,
  };

  return (
    <div
      style={
        props.url && props.progress === 100 ? { display: "none" } : Parentdiv
      }>
      <div style={Childdiv}>
        <span style={progresstext}></span>
      </div>
    </div>
  );
};
