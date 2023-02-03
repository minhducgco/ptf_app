import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={20} height={19} viewBox="0 0 20 19" fill="none" {...props}>
      <Path
        d="M18 4h-4V2c0-1.11-.89-2-2-2H8C6.89 0 6 .89 6 2v2H2C.89 4 .01 4.89.01 6L0 17c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm-6 0H8V2h4v2z"
        fill={props.color}
      />
    </Svg>
  );
}

export default SvgComponent;
