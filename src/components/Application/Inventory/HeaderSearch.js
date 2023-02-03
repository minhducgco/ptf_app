import React from 'react';
import normalize from 'react-native-normalize';
import {View, StyleSheet} from 'react-native';

import Colors from '@styles/color';
import themeStyle from '@styles/theme.style';
import FilterForm from '@components/Forms/FilterForm';

export default function HeaderSearch({
  onPress,
  data,
  disabled,
  search = true,
  textSearch,
  setTextSearch,
}) {
  return (
    <View style={[styles.viewSearch, styles.headerContainer]}>
      {search && (
        <FilterForm
          icon={false}
          onPress={onPress}
          data={data}
          disabled={disabled}
          textSearch={textSearch}
          setTextSearch={setTextSearch}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  viewSearch: {
    paddingVertical: normalize(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  headerContainer: {
    backgroundColor: Colors.WHITE,
  },
  txtTotal: {
    marginTop: normalize(10),
    fontFamily: themeStyle.FONT_FAMILY,
    fontSize: 13,
    color: '#626A72',
  },
});
