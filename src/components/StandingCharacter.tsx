import React from 'react';
import {
  NarrowShakingBin,
  NormalShakingBin,
  SingleShakingBin,
  SmileShakingBin,
  TriangleShakingBin,
  WideShakingBin,
} from '../assets';

interface StandingCharacterProps {
  color: string;
  face: string;
}

const StandingCharacter = ({color, face}: StandingCharacterProps) => {
  switch (face) {
    case 'normal':
      return (
        <NormalShakingBin
          fill={color}
          style={{position: 'absolute', zIndex: 2, top: 90, left: 43}}
        />
      );
    case 'narrow':
      return (
        <NarrowShakingBin
          fill={color}
          style={{position: 'absolute', zIndex: 2, top: 90, left: 43}}
        />
      );
    case 'wide':
      return (
        <WideShakingBin
          fill={color}
          style={{position: 'absolute', zIndex: 2, top: 90, left: 43}}
        />
      );
    case 'single':
      return (
        <SingleShakingBin
          fill={color}
          style={{position: 'absolute', zIndex: 2, top: 90, left: 43}}
        />
      );
    case 'triangle':
      return (
        <TriangleShakingBin
          fill={color}
          style={{position: 'absolute', zIndex: 2, top: 90, left: 43}}
        />
      );
    case 'smile':
      return (
        <SmileShakingBin
          fill={color}
          style={{position: 'absolute', zIndex: 2, top: 90, left: 43}}
        />
      );
    default:
      return (
        <NormalShakingBin
          fill={color}
          style={{position: 'absolute', zIndex: 2, top: 90, left: 43}}
        />
      );
  }
};

export default StandingCharacter;
