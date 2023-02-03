import React from 'react';
import {View} from 'react-native';
import {Fab} from 'native-base';
import normalize from 'react-native-normalize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '@styles/color';
import theme from '@styles/theme.style';

const AddButton = ({func}) => {
  return (
    <Fab
      active={false}
      position="bottomRight"
      direction="up"
      useNativeDriver={false}
      style={styles.buttonContainer}
      onPress={func}>
      <View style={styles.buttonView}>
        <Icon name="cart-plus" size={20} color={colors.WHITE} />
      </View>
    </Fab>
  );
};

export {AddButton};

export const styles = {
  button: {
    flex: 1,
    justifyContent: 'center',
    height: normalize(40, 'height'),
    margin: normalize(5),
  },
  textButton: {
    fontFamily: theme.FONT_BOLD,
    color: '#fff',
    fontSize: normalize(10, 'height'),
  },
  buttonContainer: {
    backgroundColor: theme.MAIN_COLOR,
    justifyContent: 'center',
    left: -10,
    bottom: 40,
  },
  buttonView: {
    alignSelf: 'center',
    left: 1,
    top: 1,
  },
};
