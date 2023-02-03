import themeStyle from '@styles/theme.style';
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';
const LineItem = ({title, value, multiline = false}) => {
  return (
    <View style={styles.txtContain}>
      <Text style={styles.labelItem}>{title}</Text>
      <Text style={styles.valueItem}>{value}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  txtContain: {
    flexDirection: 'row',
    marginBottom: normalize(20),
    marginHorizontal: normalize(10),
    alignItems: 'flex-start',
  },
  valueItem: {
    flexWrap: 'wrap',
    flex: 7,
    fontFamily: themeStyle.FONT_FAMILY,
    fontSize: 13,
  },
  labelItem: {
    flex: 3,
    fontFamily: themeStyle.FONT_BOLD,
    fontSize: 13,
  },
});
export default LineItem;
