import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const ArrowRight = (props: SvgProps) => (
  <Svg width={24} height={24} {...props} viewBox="-4.5 0 20 20">
    <Path
      fill={props?.color || '#fff'}
      fillRule="evenodd"
      d="M.366 19.708c.405.39 1.06.39 1.464 0l8.563-8.264a1.95 1.95 0 0 0 0-2.827L1.768.292A1.063 1.063 0 0 0 .314.282a.976.976 0 0 0-.011 1.425l7.894 7.617a.975.975 0 0 1 0 1.414L.366 18.295a.974.974 0 0 0 0 1.413"
    />
  </Svg>
);

export default ArrowRight;
