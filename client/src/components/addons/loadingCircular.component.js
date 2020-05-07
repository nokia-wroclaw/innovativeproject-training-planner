import React from 'react';

const LoadingCircular = (props) => {
  return (
    <div className="preloader-wrapper big active" style={props.style}>
      <div className="spinner-layer spinner-blue-only">
        <div className="circle-clipper left">
          <div className="circle" />
        </div>
        <div className="gap-patch">
          <div className="circle" />
        </div>
        <div className="circle-clipper right">
          <div className="circle" />
        </div>
      </div>
    </div>
  );
};

export default LoadingCircular;
