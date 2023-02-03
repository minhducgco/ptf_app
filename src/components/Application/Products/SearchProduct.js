import React, {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Colors from '@styles/color';
import normalize from 'react-native-normalize';
import {Input} from 'native-base';
import theme from '@styles/theme.style';
import {IconSearch, IconDelete} from '@assets/svg/icons/index';
import {LocalizationContext} from '@context/index';

export default function SearchProduct({
  value,
  onPressMenu,
  onChangeText,
  placeholder,
  hasMenu = false,
  currentRecord,
  totalRecord,
}) {
  const {t} = useContext(LocalizationContext);
  return (
    <View style={styles.container}>
      <View style={styles.viewSearch}>
        <Input
          value={value}
          numberOfLines={1}
          style={styles.searchText}
          placeholder={placeholder}
          onChangeText={onChangeText}
          placeholderTextColor={theme.COLOR_BLACK_LIGHT}
        />
        {value ? (
          <TouchableOpacity onPress={onPressMenu}>
            <View style={styles.icon}>
              <IconDelete color={Colors.DUSTY_GRAY} width={25} height={25} />
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.icon}>
            <IconSearch color={Colors.WOODSMOKE} />
          </View>
        )}
      </View>
      <Text style={styles.txtTotal}>
        {currentRecord}/ {totalRecord} {t('record')}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.WHITE,
    justifyContent: 'space-between',
    marginHorizontal: normalize(10),
    alignItems: 'center',
    marginBottom: normalize(5),
  },
  viewSearch: {
    flexDirection: 'row',
    marginVertical: normalize(10),
    marginRight: normalize(10),
    alignItems: 'center',
    borderWidth: 1,
    height: normalize(30, 'height'),
    borderColor: Colors.DUSTY_GRAY,
    borderRadius: 5,
    width: normalize(250, 'width'),
  },
  searchText: {
    color: Colors.BLACK,
    fontSize: 14,
    fontFamily: theme.FONT_FAMILY,
    marginHorizontal: normalize(10),
  },
  txtTotal: {
    marginTop: normalize(5),
    marginRight: normalize(200),
    fontFamily: theme.FONT_FAMILY,
  },
  icon: {
    justifyContent: 'center',
    marginRight: normalize(10),
  },
});
