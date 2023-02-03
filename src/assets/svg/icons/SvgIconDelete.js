import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import normalize from 'react-native-normalize';

function SvgIconDelete(props) {
  return (
    <Svg
      width={normalize(25)}
      height={normalize(25)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={props.color}
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-x"
      {...props}>
      <Path d="M18 6 6 18M6 6l12 12" />
    </Svg>
  );
}

export default SvgIconDelete;
