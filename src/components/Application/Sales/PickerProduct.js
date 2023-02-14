import React, {useContext, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, Item, Label, Text} from 'native-base';

import theme from '@styles/theme.style';
import {LocalizationContext} from '@context/index';

function PickerProduct({
  title = '',
  data = [],
  name = '',
  onChangeProduct,
  disabled = false,
  required,
  partnerId,
}) {
  const inputRef = useRef(null);
  const {t} = useContext(LocalizationContext);

  return (
    <>
      <Item
        ref={inputRef}
        disabled={disabled}
        style={styles.menuBox}
        onPress={onChangeProduct}>
        <Label style={styles.title}>
          {t(title)}
          {required && <Text style={styles.requiredText}> *</Text>}:
        </Label>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{name}</Text>
        </View>
        <Icon name={'chevron-small-down'} type="Entypo" />
      </Item>
    </>
  );
}

export default PickerProduct;

const styles = StyleSheet.create({
  separator: {
    height: 0.5,
    backgroundColor: '#c9c9c9',
  },
  title: {
    fontFamily: theme.FONT_BOLD,
    color: '#000',
    fontSize: 14,
    flex: 3.5,
  },
  value: {
    fontFamily: theme.FONT_FAMILY,
    color: '#000',
    fontSize: 14,
  },
  valueContainer: {
    // height: 40,
    flex: 6.5,
    justifyContent: 'center',
  },
  menuBox: {
    zIndex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 52,
  },
  requiredText: {color: 'red'},
});
