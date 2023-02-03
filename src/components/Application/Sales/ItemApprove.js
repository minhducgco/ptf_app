import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import normalize from 'react-native-normalize';
import themeStyle from '@styles/theme.style';

export default function ItemApprove({item, onChange}) {
  return (
    <View style={styles.txtRow}>
      <CheckBox
        value={item.active}
        onValueChange={chk => onChange(chk)}
        tintColors={{
          true: themeStyle.MAIN_COLOR,
          false: themeStyle.COLOR_GREY,
        }}
      />
      <Text style={styles.txtContent}>{item.name}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  txtRow: {
    // borderWidth: 1,
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    marginHorizontal: normalize(25),
    marginTop: normalize(10),
    alignItems: 'center',
  },
  txtContent: {
    fontFamily: themeStyle.FONT_FAMILY,
    fontSize: 14,
    alignSelf: 'center',
    marginHorizontal: normalize(20),
  },
});
