import {StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';
import Colors from './color';
import themeStyle from './theme.style';
export const detailProduct = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  viewIcon: {
    marginHorizontal: normalize(15),
    marginVertical: normalize(15),
    justifyContent: 'center',
    alignItem: 'center',
  },
  viewTxt: {},
  txt: bold => ({
    fontSize: 16,
    fontFamily: bold === true ? themeStyle.FONT_BOLD : themeStyle.FONT_FAMILY,
    alignSelf: 'center',
    textAlign: 'center',
  }),
  viewItem: {
    marginHorizontal: normalize(40),
  },
  imageIcon: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  viewImage: {
    justifyContent: 'center',
    alignItem: 'center',
  },
});
