import theme from './theme.style';
import normalize from 'react-native-normalize';
import Colors from '@styles/color';

export const formStyles = {
  separator: {width: 10},
  button: {
    flex: 1,
    justifyContent: 'center',
    margin: normalize(5),
  },
  textButton: {
    fontFamily: theme.FONT_BOLD,
    color: Colors.WHITE,
    fontSize: normalize(14, 'height'),
  },
  note: {
    marginLeft: 15,
    borderRadius: 7,
    fontFamily: theme.FONT_REGULAR,
  },
  titleColor: {
    fontFamily: theme.FONT_BOLD,
    color: theme.MAIN_COLOR,
    fontSize: 14,
  },
  title: {
    fontFamily: theme.FONT_BOLD,
    color: Colors.BLACK,
    fontSize: 14,
    marginLeft: normalize(16, 'width'),
    marginBottom: normalize(8, 'height'),
  },
  text: {
    fontFamily: theme.FONT_BOLD,
    color: Colors.BLACK,
    fontSize: 14,
    marginRight: normalize(5, 'width'),
  },
  subTitle: {
    fontFamily: theme.FONT_FAMILY,
    color: Colors.BLACK,
    fontSize: 14,
  },
  textStyle: {
    fontFamily: theme.FONT_FAMILY,
    color: Colors.WHITE,
    fontSize: 14,
  },
  viewItem: {
    flexDirection: 'row',
    height: normalize(80, 'height'),
    // padding: normalize(8),
    backgroundColor: Colors.ALABASTER,
    borderRadius: normalize(5),
    marginTop: normalize(8, 'height'),
  },
  viewText: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  touch: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};
