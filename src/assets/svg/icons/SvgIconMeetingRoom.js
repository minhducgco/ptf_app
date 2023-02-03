import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgIconMeetingRoom(props) {
  return (
    <Svg width={25} height={12} viewBox="0 0 25 12" fill="none" {...props}>
      <Path
        d="M12.5 6.75c1.63 0 3.07.39 4.24.9 1.08.48 1.76 1.56 1.76 2.73V11c0 .55-.45 1-1 1h-10c-.55 0-1-.45-1-1v-.61c0-1.18.68-2.26 1.76-2.73 1.17-.52 2.61-.91 4.24-.91zM4.5 7c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm1.13 1.1C5.26 8.04 4.89 8 4.5 8c-.99 0-1.93.21-2.78.58A2.01 2.01 0 00.5 10.43V11c0 .55.45 1 1 1H5v-1.61c0-.83.23-1.61.63-2.29zM20.5 7c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4 3.43c0-.81-.48-1.53-1.22-1.85A6.95 6.95 0 0020.5 8c-.39 0-.76.04-1.13.1.4.68.63 1.46.63 2.29V12h3.5c.55 0 1-.45 1-1v-.57zM12.5 0c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z"
        fill={props.color}
      />
    </Svg>
  );
}

export default SvgIconMeetingRoom;