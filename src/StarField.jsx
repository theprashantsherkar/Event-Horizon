import React from 'react';
import './Bg.css'; // Make sure to use the updated CSS file

const StarField = () => {
  const stars = [];

  for (let i = 1; i <= 50; i++) {
    const randomX = Math.random();
    const randomY = Math.random();
    const deltaX1 = Math.floor(Math.random() * 20 - 10) + 'px';
    const deltaY1 = Math.floor(Math.random() * 20 - 10) + 'px';
    const deltaX2 = Math.floor(Math.random() * 20 - 10) + 'px';
    const deltaY2 = Math.floor(Math.random() * 20 - 10) + 'px';
    const deltaX3 = Math.floor(Math.random() * 20 - 10) + 'px';
    const deltaY3 = Math.floor(Math.random() * 20 - 10) + 'px';
    const duration = Math.random() * 5 + 5 + 's';

    const style = {
      '--random-x': randomX,
      '--random-y': randomY,
      '--delta-x1': deltaX1,
      '--delta-y1': deltaY1,
      '--delta-x2': deltaX2,
      '--delta-y2': deltaY2,
      '--delta-x3': deltaX3,
      '--delta-y3': deltaY3,
      '--duration': duration,
    };

    stars.push(<div key={i} className="star" style={style}></div>);
  }

  return <div id="stars">{stars}</div>;
};

export default StarField;
