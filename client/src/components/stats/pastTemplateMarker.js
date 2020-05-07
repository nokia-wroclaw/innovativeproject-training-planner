import React from 'react';

export const pastTemplateMarker = () => {
  return (
    <div
      style={{
        width: 0,
        height: 100,
        backgroundColor: 'transparent',
        position: 'absolute',
        left: 25,
        border: 'solid 15px #ff5a30',
        borderBottom: 'solid 15px transparent',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
      }}
    >
      <div
        style={{
          fontWeight: 'bold',
          position: 'relative',
          writingMode: 'vertical-rl',
          textOrientation: 'upright',
          textAlign: 'left',
          color: 'white',
          right: 12,
        }}
      >
            PAST
      </div>
    </div>
  );
};
