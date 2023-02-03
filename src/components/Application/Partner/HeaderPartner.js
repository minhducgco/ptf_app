import React, {useContext} from 'react';
import normalize from 'react-native-normalize';
import {View, Text, StyleSheet} from 'react-native';

import Colors from '@styles/color';
import themeStyle from '@styles/theme.style';
import {LocalizationContext} from '@context/index';
import FilterForm from '@components/Forms/FilterForm';

export default function HeaderPartner({
  currentRecord,
  totalRecord,
  onPress,
  data,
  disabled,
  search = true,
  textSearch,
  setTextSearch,
}) {
  const {t} = useContext(LocalizationContext);
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
      <Text style={styles.txtTotal}>
        {currentRecord}/ {totalRecord} {t('record')}
      </Text>
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
