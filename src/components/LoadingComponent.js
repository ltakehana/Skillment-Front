import React from "react";
import ReactLoading from "react-loading";

import "../styles/components/loadingComponent.css";

const LoadingComponent = ({isOpen}) => {
  return (
    <>
      {isOpen && (
        <section className="loadingContainer">
          <ReactLoading
            type="spokes"
            color="black"
            width="90px"
            height="90px"
          />
          <div className="loadingText">Loading...</div>
        </section>
      )}
    </>
  );
};

export default LoadingComponent;
