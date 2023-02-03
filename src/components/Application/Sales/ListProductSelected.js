import React, {useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import {useSelector} from 'react-redux';
import normalize from 'react-native-normalize';
import {useDispatch} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Colors from '@styles/color';
import themeStyle from '@styles/theme.style';
import {LocalizationContext} from '@context/index';
import {num2numDong} from '@utils/';
import SvgIconListProduct from '@assets/svg/icons/iconProduct/SvgIconListProduct';
import {IconMinus, IconPlus} from '@assets/svg/icons';
import {setOrderLine} from '@redux/actions/dataAction';

export default function ListProductSelected({
  scrollEnabled = true,
  renderHeader = () => {},
}) {
  const {t} = useContext(LocalizationContext);
  const dispatch = useDispatch();
  const orderLine = useSelector(state => state.datareduce.orderLine);

  const plusQuantity = ind => {
    let newArray = [...orderLine];
    // console.log(newArray[ind].product_uom_qty);
    newArray[ind].product_uom_qty = parseInt(
      newArray[ind].product_uom_qty + 1,
      10,
    );
    dispatch(setOrderLine(newArray, true));
  };
  const subQuantity = ind => {
    let newArray = [...orderLine];
    if (newArray[ind].product_uom_qty === 1) {
      newArray.splice(ind, 1);
    } else if (newArray[ind].product_uom_qty > 1) {
      newArray[ind].product_uom_qty = parseInt(
        newArray[ind].product_uom_qty - 1,
        10,
      );
    }
    dispatch(setOrderLine(newArray, true));
  };
  const deleteProduct = idx => {
    let newArray = [...orderLine];
    newArray.splice(idx, 1);
    dispatch(setOrderLine(newArray, true));
  };
  const renderItem = ({item, index, disabled = false, create = true}) => {
    const setNumber = txt => {
      let newArray = [...orderLine];
      if (!txt) {
        newArray[index].product_uom_qty = parseInt(0, 10);
      } else {
        newArray[index].product_uom_qty = parseInt(txt, 10);
      }
      dispatch(setOrderLine(newArray, true));
    };
    return (
      <View style={styles.itemContain}>
        <View style={styles.viewItem}>
          <View style={styles.viewContent}>
            <View style={styles.viewIcon}>
              <SvgIconListProduct />
            </View>
            <View style={styles.viewTxt}>
              <View style={styles.nameProduct}>
                {item?.is_promotion && item?.price_unit <= 0 && (
                  <AntDesign name="gift" size={20} style={styles.icon} />
                )}
                <Text style={styles.txt(true)}>
                  {create ? item?.name : item?.product_name}
                </Text>
              </View>
              {item?.price_unit > 0 || disabled ? (
                <Text style={styles.txt(false)}>
                  {t('price')}: {num2numDong(item?.price_unit)}
                </Text>
              ) : null}
              {disabled ? (
                <View style={styles.viewNumber}>
                  <Text style={styles.txt(false)}>
                    {t('quantity')}: {item?.product_uom_qty}
                  </Text>
                </View>
              ) : (
                <View style={styles.viewNumber}>
                  {item?.is_promotion && item?.price_unit <= 0 ? (
                    <View style={styles.btnContain}>
                      <Text style={styles.txt(false)}>
                        {t('quantity')}: {item?.product_uom_qty}
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.btnContain}>
                      <TouchableOpacity
                        onPress={() => subQuantity(index)}
                        style={styles.btnPlus}>
                        <IconMinus color={Colors.BLACK} />
                      </TouchableOpacity>

                      <TextInput
                        value={item?.product_uom_qty?.toString()}
                        onChangeText={setNumber}
                        style={styles.txtInput}
                        keyboardType="numeric"
                      />
                      <TouchableOpacity
                        onPress={() => plusQuantity(index)}
                        style={styles.btnPlus}>
                        <IconPlus color={Colors.BLACK} />
                      </TouchableOpacity>
                    </View>
                  )}
                  <TouchableOpacity onPress={() => deleteProduct(index)}>
                    <AntDesign
                      name="delete"
                      size={30}
                      color={themeStyle.MAIN_COLOR}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <FlatList
      data={orderLine}
      ListHeaderComponent={renderHeader()}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      scrollEnabled={scrollEnabled}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: themeStyle.COLOR_WHITE,
    height: '90%',
  },
  viewTitle: {
    height: normalize(50),
    justifyContent: 'center',
  },
  title: {
    color: themeStyle.MAIN_COLOR,
    textAlign: 'center',
    fontSize: normalize(20),
    fontFamily: themeStyle.FONT_FAMILY,
  },
  viewSearch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: normalize(15),
    // marginTop: normalize(10),
    // borderWidth: 1,
  },
  txtTitle: {
    fontFamily: themeStyle.FONT_BOLD,
    flex: 0.35,
    alignSelf: 'center',
  },

  viewBtn: {
    marginVertical: normalize(15),
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: normalize(20),
  },
  btn: color => ({
    marginTop: normalize(20),
    width: '48%',
    backgroundColor: color === true ? Colors.MONZA : '#85517D',
    borderRadius: normalize(8),
  }),
  btnTxt: color => ({
    color: color === false ? Colors.WHITE : Colors.BLACK,
    padding: normalize(8),
    textAlign: 'center',
    fontSize: normalize(13),
    fontFamily: themeStyle.FONT_SEMI_BOLD,
  }),

  viewLine: {
    flexDirection: 'row',
  },
  btnSum: {
    fontSize: normalize(13),
    textAlign: 'right',
    marginRight: normalize(20),
    fontFamily: themeStyle.FONT_BOLD,
  },
  itemContain: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  viewItem: {
    // marginTop:10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    margin: 5,
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: '#999',
    backgroundColor: '#FFF',
  },
  viewIcon: {
    justifyContent: 'center',
  },
  viewContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginHorizontal: normalize(20),
    marginVertical: normalize(10),
  },
  viewTxt: {
    flex: 1,
    marginLeft: normalize(10),
  },
  txt: bold => ({
    fontSize: normalize(13),
    marginVertical: normalize(5),
    fontFamily: bold === true ? themeStyle.FONT_BOLD : themeStyle.FONT_FAMILY,
  }),
  viewNumber: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  touchCart: {
    flex: 0.1,
    alignSelf: 'center',
  },
  touchNumber: number => ({
    flex: number,
  }),
  txtInput: {
    backgroundColor: themeStyle.COLOR_WHITE,
    borderWidth: normalize(2),
    borderRadius: normalize(7),
    borderColor: themeStyle.COLOR_GRAY_BLUE,
    textAlign: 'center',
    height: normalize(40),
    width: normalize(40),
    marginHorizontal: 10,
  },
  txtStatus: {
    color: Colors.WHITE,
    textAlign: 'center',
  },
  viewStatus: color => ({
    backgroundColor: color === true ? Colors.MONZA : Colors.MANTIS,
    color: Colors.WHITE,
    padding: normalize(5),
    flex: 0.6,
    textAlign: 'center',
    borderRadius: normalize(5),
  }),
  btnPlus: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  btnContain: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  nameProduct: {flexDirection: 'row', alignItems: 'center'},
  icon: {marginRight: normalize(10)},
});
