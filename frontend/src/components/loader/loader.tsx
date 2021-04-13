import React from 'react';
import { Container } from './style';

const Loader: React.FC = ({ ...props }) => {
  return (
    <Container {...props}>
      <svg className="loader" viewBox="0 0 48 48" width="48" height="48">
        <g id="circle1" transform="translate(12,6)">
          <circle
            className="circle"
            r="2"
            transform="translate(0,0)"
            stroke="none"
            strokeWidth="1"
            fill="#312e38"
          />
        </g>
        <g id="circle2" transform="translate(20,6)">
          <circle
            className="circle"
            r="2"
            transform="translate(0,0)"
            stroke="none"
            strokeWidth="1"
            fill="#312e38"
          />
        </g>
        <g id="circle3" transform="translate(28,6)">
          <circle
            r="2"
            className="circle"
            transform="translate(0,0)"
            stroke="none"
            strokeWidth="1"
            fill="#312e38"
          />
        </g>
        <g id="circle4" transform="translate(36,6)">
          <circle
            r="2"
            className="circle"
            transform="translate(0,0)"
            stroke="none"
            strokeWidth="1"
            fill="#312e38"
          />
        </g>
      </svg>
    </Container>
  );
};

export default Loader;
