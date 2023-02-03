import {StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';

import Colors from '@styles/color';
import themeStyle from './theme.style';

export const detailApproveStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  viewStatus: {
    // alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: normalize(5),
  },
  viewDetail: {
    paddingHorizontal: normalize(10),
  },
  viewStatusDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: normalize(5),
  },
  status: status => ({
    fontSize: normalize(14),
    fontFamily: themeStyle.FONT_BOLD,
    color:
      status === 'approved'
        ? Colors.MANTIS
        : status === 'pending'
        ? Colors.ORANGE
        : Colors.MONZA,
  }),
  viewContent: {
    paddingHorizontal: normalize(5),
    paddingVertical: normalize(15),
  },
  txtTitle: {
    fontSize: normalize(13),
    fontFamily: themeStyle.FONT_BOLD,
    flex: 1,
    marginRight: normalize(5),
  },
  titleApproval: {
    fontSize: normalize(16),
    fontFamily: themeStyle.FONT_BOLD,
    borderBottomWidth: 0.5,
    borderColor: Colors.SILVER,
    flex: 1,
    marginRight: normalize(10),
  },
  viewItem: {
    flexDirection: 'row',
    marginVertical: normalize(10),
  },
  txtTitleItem: {
    fontFamily: themeStyle.FONT_BOLD,
    color: themeStyle.COLOR_BLACK,
    fontSize: normalize(13),
    flex: 0.42,
  },
  txtContent: it => ({
    fontFamily: themeStyle.FONT_BOLD,
    color: themeStyle.COLOR_BLACK,
    fontSize: normalize(13),
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
    fontSize: normalize(13),
    marginLeft: normalize(20),
  },
  viewItemApprover: num => ({
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: num % 2 === 0 ? Colors.SEASHELL : Colors.SULITUDE,
    borderWidth: 1,
    borderColor: Colors.SILVER,
  }),
  viewFlex: flex => ({
    flex: flex,
    flexDirection: 'row',
    alignItems: 'center',
  }),
  txtItem: cen => ({
    fontSize: normalize(10),
    fontFamily: themeStyle.FONT_FAMILY,
    textAlign: cen === true ? 'center' : 'left',
    marginVertical: normalize(5),
    marginHorizontal: normalize(10),
  }),
  txtItemHeader: cen => ({
    fontSize: normalize(10),
    fontFamily: themeStyle.FONT_BOLD,
    textAlign: cen === true ? 'center' : 'left',
    marginVertical: normalize(5),
    marginHorizontal: normalize(10),
  }),
  viewHeaderApprover: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: Colors.DUSTY_GRAY,
    borderWidth: 1,
    borderColor: Colors.SILVER,
  },
  viewBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: normalize(15),
  },
  buttonDetail: item => ({
    backgroundColor:
      item?.action === 'ssc_action_cancel'
        ? '#85517D'
        : item?.action === 'action_refuse'
        ? themeStyle.MAIN_COLOR
        : item?.action === 'action_cancel'
        ? themeStyle.MAIN_COLOR
        : item?.action === 'create'
        ? themeStyle.MAIN_COLOR
        : item.action === 'cancel'
        ? '#85517D'
        : Colors.MANTIS,
    paddingVertical: normalize(10),
    borderRadius: normalize(5),

    flex: 1,
    marginVertical: normalize(5),
    marginHorizontal: normalize(10),
  }),
  txtButton: {
    color: Colors.WHITE,
    textAlign: 'center',
    fontFamily: themeStyle.FONT_FAMILY,
  },
  viewContentSearch: (width, pad = false) => ({
    flex: width,
    paddingVertical: pad === true ? normalize(10) : 0,
  }),
  viewPicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: normalize(10),
    flex: 1,
  },
  txtInputNote: {
    fontFamily: themeStyle.FONT_FAMILY,
    fontSize: normalize(14),
    borderWidth: 1,
    height: normalize(80),
    borderColor: Colors.SILVER,
    borderRadius: normalize(7),
    padding: normalize(5),
  },
  txtFile: {
    fontFamily: themeStyle.FONT_FAMILY,
    marginLeft: normalize(10),
    fontSize: 13,
    alignSelf: 'center',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  renderItemFile: {
    flexDirection: 'row',
    marginHorizontal: normalize(20),
    alignItems: 'center',
  },
  renderItemSelect: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: normalize(10),
    marginRight: normalize(20),
    alignItems: 'center',
  },
  txtItemSelect: {
    fontFamily: themeStyle.FONT_FAMILY,
    marginHorizontal: normalize(10),
    borderWidth: 0.5,
    borderRadius: normalize(10),
    padding: normalize(5),
  },
  iconDelete: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewRow: {
    flexDirection: 'row',
  },
  star: {
    color: Colors.MONZA,
    fontFamily: themeStyle.FONT_BOLD,
  },
});
