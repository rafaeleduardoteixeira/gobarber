import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .loader {
    #circle1 {
      animation: pump1 9000ms linear infinite normal forwards;
    }

    @keyframes pump1 {
      0% {
        fill-opacity: 0;
        transform: translate(12px, 6px);
        animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
      }
      6.666667% {
        fill-opacity: 1;
        transform: translate(12px, 24px);
        animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
      }
      17.777778% {
        fill-opacity: 1;
        transform: translate(12px, 24px);
        animation-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
      }
      21.111111% {
        fill-opacity: 1;
        transform: translate(12px, 16px);
        animation-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
      }
      24.444444% {
        fill-opacity: 1;
        transform: translate(12px, 24px);
        animation-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
      }
      44.444444% {
        fill-opacity: 1;
        transform: translate(12px, 24px);
        animation-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
      }
      47.777778% {
        fill-opacity: 1;
        transform: translate(12px, 16px);
        animation-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
      }
      51.111111% {
        fill-opacity: 1;
        transform: translate(12px, 24px);
        animation-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
      }
      75.555556% {
        fill-opacity: 1;
        transform: translate(12px, 24px);
        animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
      }
      82.222222% {
        fill-opacity: 0;
        transform: translate(12px, 6px);
        animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
      }
      100% {
        fill-opacity: 0;
        transform: translate(12px, 6px);
      }
    }

    #circle2 {
      animation: pump2 9000ms linear infinite normal forwards;
    }

    @keyframes pump2 {
      0% {
        fill-opacity: 0;
        transform: translate(20px, 6px);
      }
      2.222222% {
        fill-opacity: 0;
        transform: translate(20px, 6px);
        animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
      }
      8.888889% {
        fill-opacity: 1;
        transform: translate(20px, 24px);
        animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
      }
      31.111111% {
        fill-opacity: 1;
        transform: translate(20px, 24px);
        animation-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
      }
      34.444444% {
        fill-opacity: 1;
        transform: translate(20px, 16px);
        animation-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
      }
      37.777778% {
        fill-opacity: 1;
        transform: translate(20px, 24px);
        animation-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
      }
      57.777778% {
        fill-opacity: 1;
        transform: translate(20px, 24px);
        animation-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
      }
      61.111111% {
        fill-opacity: 1;
        transform: translate(20px, 16px);
        animation-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
      }
      64.444444% {
        fill-opacity: 1;
        transform: translate(20px, 24px);
        animation-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
      }
      77.777778% {
        fill-opacity: 1;
        transform: translate(20px, 24px);
        animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
      }
      84.444444% {
        fill-opacity: 0;
        transform: translate(20px, 6px);
        animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
      }
      100% {
        fill-opacity: 0;
        transform: translate(20px, 6px);
      }
    }

    #circle3 {
      animation: pump3 9000ms linear infinite normal forwards;
    }

    @keyframes pump3 {
      0% {
        fill-opacity: 0;
        transform: translate(28px, 6px);
      }
      4.444444% {
        fill-opacity: 0;
        transform: translate(28px, 6px);
        animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
      }
      11.111111% {
        fill-opacity: 1;
        transform: translate(28px, 24px);
        animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
      }
      24.444444% {
        fill-opacity: 1;
        transform: translate(28px, 24px);
        animation-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
      }
      27.777778% {
        fill-opacity: 1;
        transform: translate(28px, 16px);
        animation-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
      }
      31.111111% {
        fill-opacity: 1;
        transform: translate(28px, 24px);
        animation-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
      }
      51.111111% {
        fill-opacity: 1;
        transform: translate(28px, 24px);
        animation-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
      }
      54.444444% {
        fill-opacity: 1;
        transform: translate(28px, 16px);
        animation-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
      }
      57.777778% {
        fill-opacity: 1;
        transform: translate(28px, 24px);
        animation-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
      }
      80% {
        fill-opacity: 1;
        transform: translate(28px, 24px);
        animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
      }
      86.666667% {
        fill-opacity: 0;
        transform: translate(28px, 6px);
        animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
      }
      100% {
        fill-opacity: 0;
        transform: translate(28px, 6px);
      }
    }

    #circle4 {
      animation: pump4 9000ms linear infinite normal forwards;
    }

    @keyframes pump4 {
      0% {
        fill-opacity: 0;
        transform: translate(36px, 6px);
      }
      6.666667% {
        fill-opacity: 0;
        transform: translate(36px, 6px);
        animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
      }
      13.333333% {
        fill-opacity: 1;
        transform: translate(36px, 24px);
        animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
      }
      37.777778% {
        fill-opacity: 1;
        transform: translate(36px, 24px);
        animation-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
      }
      41.111111% {
        fill-opacity: 1;
        transform: translate(36px, 16px);
        animation-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
      }
      44.444444% {
        fill-opacity: 1;
        transform: translate(36px, 24px);
        animation-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
      }
      64.444444% {
        fill-opacity: 1;
        transform: translate(36px, 24px);
        animation-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
      }
      67.777778% {
        fill-opacity: 1;
        transform: translate(36px, 16px);
        animation-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
      }
      71.111111% {
        fill-opacity: 1;
        transform: translate(36px, 24px);
        animation-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
      }
      82.222222% {
        fill-opacity: 1;
        transform: translate(36px, 24px);
        animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
      }
      88.888889% {
        fill-opacity: 0;
        transform: translate(36px, 6px);
        animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
      }
      100% {
        fill-opacity: 0;
        transform: translate(36px, 6px);
      }
    }
  }
`;
