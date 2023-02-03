import {Platform, StyleSheet, Dimensions} from 'react-native';
import normalize from 'react-native-normalize';

import color from '@styles/color';
import themeStyle from '@styles/theme.style';
const WIDTH = Dimensions.get('screen').width;

export const saleOrderStyles = StyleSheet.create({
  contain: {flex: 1, backgroundColor: themeStyle.COLOR_WHITE},
  itemView: {
    marginBottom: normalize(10),
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: normalize(14),
    fontFamily: themeStyle.FONT_FAMILY,
  },
  scroll: {
    width: '100%',
    borderWidth: 1,
    marginTop: normalize(20),
    borderColor: color.SILVER,
  },
  titleForm: {
    padding: normalize(5),
    width: normalize(750),
    height: normalize(40),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.SILVER,
  },
  contentForm: {
    padding: normalize(10),
    flex: 1,
  },
  button: item => ({
    width: normalize(160),
    backgroundColor:
      item.key === 'cancel'
        ? '#85517D'
        : item.key === 'cancel_discount'
        ? color.MONZA
        : color.MANTIS,
    textAlign: 'center',
    paddingVertical: normalize(7),
    borderRadius: normalize(5),
    color: color.WHITE,
  }),
  btnSave: {
    width: normalize(160),
    backgroundColor: color.MONZA,
    paddingVertical: normalize(7),
    borderRadius: normalize(5),
  },
  txtSave: {
    textAlign: 'center',
    color: color.WHITE,
    fontFamily: themeStyle.FONT_FAMILY,
  },
  phone: {
    fontFamily: themeStyle.FONT_FAMILY,
    fontSize: normalize(11),
    color: themeStyle.COLOR_BLACK,
    marginLeft: normalize(10),
    flex: 0.6,
  },
  calendar: {
    position: 'absolute',
    right: 0,
    marginRight: normalize(17),
  },
  iconPlus: {
    marginTop: Platform.OS === 'ios' ? 0 : normalize(5),
  },
  addProduct: {
    marginVertical: normalize(20),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: normalize(10),
  },
  txtProduct: {
    width: '18%',
    paddingLeft: normalize(25),
  },
  pickerProduct: {
    width: '18%',
    alignItems: 'center',
    paddingHorizontal: normalize(20),
  },
  txtInputQty: {
    width: '12%',
    textAlign: 'center',
    height: normalize(40),
  },
  percent: {
    right: '110%',
    fontFamily: themeStyle.FONT_MEDIUM,
  },
  txtForm: width => ({
    width: width,
    textAlign: 'center',
    fontFamily: themeStyle.FONT_FAMILY,
  }),
  valueTT: {
    fontSize: 14,
    fontFamily: themeStyle.FONT_FAMILY,
  },
  txtTT: width => ({
    width: width,
    fontSize: normalize(14),
    fontFamily: themeStyle.FONT_BOLD,
  }),
  viewTT: {
    flexDirection: 'row',
    marginBottom: normalize(20),
    alignItems: 'center',
  },
  viewSave: {
    alignItems: 'center',
    marginVertical: normalize(30),
  },
  txtAdd: {
    marginLeft: normalize(5),
    fontFamily: themeStyle.FONT_BOLD,
    color: themeStyle.MAIN_COLOR,
  },
  detail: {width: WIDTH},
  other: {width: WIDTH, paddingHorizontal: normalize(10)},
  txtNameProduct: {
    fontSize: normalize(13),
    fontFamily: themeStyle.FONT_BOLD,
  },
  txtQuantity: {
    fontSize: normalize(13),
    fontFamily: themeStyle.FONT_FAMILY,
  },
  separator: {height: 1, backgroundColor: themeStyle.COLOR_GRAY},
  btnTab: active => ({
    paddingVertical: normalize(5),
    paddingHorizontal: normalize(10),
    backgroundColor: active ? color.LIGHT_GRAY : color.WHITE,
    borderColor: active ? color.MONZA : color.WHITE,
    width: normalize(180),
    justifyContent: 'center',
    alignItems: 'center',
    height: normalize(50),
    borderBottomWidth: normalize(5),
  }),
  txtTab: active => ({
    color: active ? themeStyle.MAIN_COLOR : themeStyle.COLOR_GRAY,
    fontSize: 13,
    fontFamily: themeStyle.FONT_BOLD,
  }),
  tabContain: {
    flexDirection: 'row',
    marginVertical: normalize(10),
  },
  btnDelete: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(10),
  },
  productContain: {flexDirection: 'row'},
  buttonDetail: item => ({
    backgroundColor:
      item.key === 'action_cancel_custom'
        ? '#85517D'
        : item.key === 'action_clear_promotion'
        ? themeStyle.MAIN_COLOR
        : color.MANTIS,
    paddingVertical: normalize(10),
    borderRadius: normalize(5),

    flex: 1,
    marginVertical: normalize(5),
    marginHorizontal: normalize(10),
  }),
  txtButton: {
    color: color.WHITE,
    textAlign: 'center',
    fontFamily: themeStyle.FONT_FAMILY,
  },
  viewButton: {
    // marginBottom: normalize(20),
    // marginTop: normalize(10),
    padding: normalize(10),
  },
  amountTotal: {
    fontSize: 13,
    fontFamily: themeStyle.FONT_FAMILY,
  },
  valueTotal: {
    fontSize: 13,
    fontFamily: themeStyle.FONT_BOLD,
    marginLeft: 25,
  },
  totalContain: {
    alignItems: 'flex-end',
    paddingVertical: normalize(10),
    paddingRight: normalize(10),
  },
  txtState: {
    fontSize: 13,
    fontFamily: themeStyle.FONT_BOLD,
    marginLeft: 25,
    color: color.MONZA,
  },
  totalPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {marginRight: 10},
  nameProduct: {flexDirection: 'row', alignItems: 'center'},
  labelLine: {
    flex: 1,
    fontFamily: themeStyle.FONT_FAMILY,
    fontSize: normalize(12),
  },
  valueLine: {
    flex: 2,
  },
  customerContain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  namePicker: {flex: 1},
  searchInput: {
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: themeStyle.COLOR_GRAY,
    flex: 2,
    padding: normalize(10),
  },
  btnSelected: {
    flex: 1,
    marginLeft: normalize(10),
    alignItems: 'center',
    justifyContent: 'center',
    padding: normalize(10),
  },
  searchContain: {
    flexDirection: 'row',
    marginHorizontal: normalize(10),
    marginVertical: normalize(15),
  },
  txtSelected: {
    color: themeStyle.MAIN_COLOR,
    fontFamily: themeStyle.FONT_BOLD,
    fontSize: normalize(13),
  },
  total: {
    position: 'absolute',
    top: -10,
    right: 5,
    width: normalize(25),
    height: normalize(25),
    borderRadius: normalize(15),
    backgroundColor: themeStyle.MAIN_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtTotal: {
    color: themeStyle.COLOR_WHITE,
    fontFamily: themeStyle.FONT_FAMILY,
    fontSize: normalize(11),
  },
  viewEmpty: {
    // flex: 1,
    padding: normalize(15),
    // borderWidth: 1,
  },
  txtEmpty: {
    textAlign: 'center',
    fontFamily: themeStyle.FONT_BOLD,
    fontSize: normalize(13),
  },
  viewNote: {
    flex: 1,
    flexDirection: 'row',
  },
  titleNote: {
    flex: 0.34,
    fontFamily: themeStyle.FONT_FAMILY,
    fontSize: normalize(13),
  },
  viewInput: {
    flex: 0.66,
    borderWidth: 0.5,
    borderColor: color.SILVER,
    borderRadius: normalize(7),
    padding: normalize(5),
    height: normalize(60),
  },
});
