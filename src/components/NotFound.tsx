import React from 'react';

const NotFound = () => {
  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        fontSize: 48,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'red',
      }}
    >
      잘못 접근된 페이지 입니다.
    </div>
  );
};

export default NotFound;
