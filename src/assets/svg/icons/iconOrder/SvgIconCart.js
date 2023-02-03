import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgIconCart = props => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.2 19.2a2.397 2.397 0 0 0-2.388 2.4c0 1.32 1.068 2.4 2.388 2.4 1.32 0 2.4-1.08 2.4-2.4 0-1.32-1.08-2.4-2.4-2.4ZM0 0v2.4h2.4l4.32 9.108-1.62 2.94a2.32 2.32 0 0 0-.3 1.152c0 1.32 1.08 2.4 2.4 2.4h14.4v-2.4H7.704a.297.297 0 0 1-.3-.3l.036-.144L8.52 13.2h8.94c.9 0 1.692-.492 2.1-1.236l4.296-7.788A1.204 1.204 0 0 0 22.8 2.4H5.052L3.924 0H0Zm19.2 19.2a2.397 2.397 0 0 0-2.388 2.4c0 1.32 1.068 2.4 2.388 2.4 1.32 0 2.4-1.08 2.4-2.4 0-1.32-1.08-2.4-2.4-2.4Z"
      fill="#DB3022"
    />
  </Svg>
);

export default SvgIconCart;
