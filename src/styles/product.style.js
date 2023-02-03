import {StyleSheet} from 'react-native';
import Colors from '@styles/color';
import normalize from 'react-native-normalize';
import themeStyle from './theme.style';

export const productStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  viewIcon: {
    justifyContent: 'center',
    // alignSelf: 'center',
  },
  viewContent: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginHorizontal: normalize(20),
    marginVertical: normalize(10),
  },
  viewLine: {
    flexDirection: 'row',
  },
  viewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItem: 'center',
    flex: 1,
  },
  viewTxt: {
    flex: 1,
    marginLeft: normalize(10),
  },
  txt: bold => ({
    fontSize: 14,
    flex: 0.7,
    fontFamily: bold === true ? themeStyle.FONT_BOLD : themeStyle.FONT_FAMILY,
  }),
  txtStatus: {
    color: Colors.WHITE,
    textAlign: 'center',
    fontSize: 14,
  },
  viewStatus: color => ({
    backgroundColor: color === true ? Colors.MONZA : Colors.MANTIS,
    color: Colors.WHITE,
    padding: normalize(5),
    flex: 0.5,
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: normalize(5),
  }),
  viewCode: {
    flex: 0.5,
    textAlign: 'center',
    justifyContent: 'center',
    alignItem: 'center',
    paddingRight: normalize(5),
    marginTop: normalize(5),
  },
  viewEmpty: {
    flex: 1,
    alignSelf: 'center',
  },
  txtEmpty: {
    fontSize: 14,
    fontFamily: themeStyle.FONT_FAMILY,
    marginTop: normalize(10),
  },
});
