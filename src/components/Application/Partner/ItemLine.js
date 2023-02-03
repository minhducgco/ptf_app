import themeStyle from '@styles/theme.style';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';
import Colors from '@styles/color';

export default function ItemLine({title, value, space = ':'}) {
  return (
    <View style={styles.viewItem}>
      <Text style={styles.txtTitle}>
        {title}
        {space}
      </Text>
      <Text style={styles.content}>{value}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  viewItem: {
    marginVertical: normalize(15),
    flexDirection: 'row',
    paddingHorizontal: normalize(5),
    // alignItems: 'center',
    // margin: normalize(5),
    marginLeft: normalize(15),
    // borderWidth: 1,
  },
  txtTitle: {
    fontFamily: themeStyle.FONT_BOLD,
    color: themeStyle.COLOR_BLACK,
    fontSize: 14,
    flex: 0.42,
  },
  txtContent: it => ({
    fontFamily: themeStyle.FONT_BOLD,
    color: themeStyle.COLOR_BLACK,
    fontSize: 14,
    borderWidth: 2,
    marginLeft: normalize(20),
    // borderWidth: it === true ? normalize(2) : normalize(0),
    borderColor: it === true ? Colors.SILVER : null,
    borderRadius: it === true ? normalize(8) : normalize(0),
    paddingHorizontal: normalize(6),
  }),
  content: {
    flex: 1,
    fontFamily: themeStyle.FONT_FAMILY,
    color: themeStyle.COLOR_BLACK,
    fontSize: 14,
    marginLeft: normalize(20),
  },
});
