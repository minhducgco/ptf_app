import React, {memo, useContext} from 'react';
import moment from 'moment';
import normalize from 'react-native-normalize';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {num2numDong} from '@utils/';
import Colors from '@styles/color';
import themeStyle from '@styles/theme.style';
import {LocalizationContext} from '@context/index';
import SvgIconListProduct from '@assets/svg/icons/iconProduct/SvgIconListProduct';

const ItemProduct = ({
  item,
  index,
  setValue,
  disabled,
  is_return = false,
  is_order = false,
  openModalEdit,
}) => {
  const {t} = useContext(LocalizationContext);
  // console.log(JSON.stringify(item, null, 2));
  return (
    <TouchableOpacity
      style={styles.itemContain}
      disabled={disabled}
      onPress={() => openModalEdit(index, item)}>
      <View style={styles.viewItem}>
        <View style={styles.viewContent}>
          <View style={styles.viewIcon}>
            {item?.x_is_product_promotion && item?.price_unit <= 0 ? (
              <AntDesign
                name="gift"
                size={30}
                style={styles.iconBig}
                color={Colors.MONZA}
              />
            ) : (
              <SvgIconListProduct />
            )}
          </View>
          <View style={styles.viewTxt}>
            <View style={styles.nameProduct}>
              {/* {item?.x_is_product_promotion && item?.price_unit <= 0 && (
                <AntDesign name="gift" size={20} style={styles.icon} />
              )} */}
              <Text style={styles.txt(true)}>{item?.name}</Text>
            </View>
            {item?.product_uom ? (
              <Text style={styles.txt(false)}>
                {'Số lượng yêu cầu'}: {item?.x_product_qty_request}
              </Text>
            ) : null}
            {item?.product_uom_qty ? (
              <Text style={styles.txt(false)}>
                {'Số lượng'}: {item?.product_uom_qty}
              </Text>
            ) : null}
            {/* {item?.product_uom && (
              <View style={styles.viewNumber}>
                <Text style={styles.txt(false)}>
                  {t('quantity')}: {item?.product_uom_qty}
                </Text>
              </View>
            )}
            {item?.product_uom ? (
              <Text style={styles.txt(false)}>
                {'Số lượng chưa xuất kho'}: {item?.qty_not_yet_shipped}
              </Text>
            ) : null} */}
            {item?.product_uom ? (
              <Text style={styles.txt(false)}>
                {'Đơn vị'}: {item?.product_uom.name}
              </Text>
            ) : null}
            {item?.product_uom ? (
              <Text style={styles.txt(false)}>
                {'Đơn giá'}: {num2numDong(item?.price_unit)}
              </Text>
            ) : null}
            {item?.product_uom ? (
              <Text style={styles.txt(false)}>
                {'Thuế'}:{' '}
                {item?.tax_id.map((data, idx) => {
                  return <Text key={idx}>{data.name}</Text>;
                })}
              </Text>
            ) : null}
            {item?.product_uom ? (
              <Text style={styles.txt(false)}>
                {'Chiết khấu (%)'}: {item?.discount}%
              </Text>
            ) : null}
            {item?.product_uom ? (
              <Text style={styles.txt(false)}>
                {'Thành tiền'}: {num2numDong(item?.price_subtotal)}
              </Text>
            ) : null}
            {item?.state ? (
              <Text style={styles.txt(false)}>
                {'Mã'}: {item?.code}
              </Text>
            ) : null}
            {item?.state ? (
              <Text style={styles.txt(false)}>
                {'Loại'}: {t(item?.type)}
              </Text>
            ) : null}
            {item?.state ? (
              <Text style={styles.txt(false)}>
                {'Ngày bắt đầu'}:{' '}
                {moment(item?.start_date).format('DD-MM-YYYY')}
              </Text>
            ) : null}
            {item?.state ? (
              <Text style={styles.txt(false)}>
                {'Ngày kết thúc'}: {moment(item?.end_date).format('DD-MM-YYYY')}
              </Text>
            ) : null}
            {item?.state ? (
              <Text style={styles.txt(false)}>
                {'Trạng thái'}: {t(item?.state)}
              </Text>
            ) : null}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default memo(ItemProduct);
const styles = StyleSheet.create({
  itemContain: {
    flex: 1,
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
    backgroundColor: Colors.LIGHT_GRAY,
  },
  viewIcon: {
    justifyContent: 'center',
    backgroundColor: Colors.LIGHT_GRAY,
  },
  viewContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginHorizontal: normalize(10),
    marginVertical: normalize(10),
  },
  viewTxt: {
    flex: 1,
    // marginLeft: normalize(10),
  },
  txt: bold => ({
    fontSize: 13,
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
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
    borderColor: themeStyle.COLOR_WHITE,
    borderWidth: 0.5,
    height: normalize(30),
    width: normalize(30),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: normalize(20),
    backgroundColor: themeStyle.COLOR_WHITE,
  },
  btnContain: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  nameProduct: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingRight: normalize(5),
  },
  icon: {marginRight: normalize(10)},
  iconBig: {margin: normalize(29)},
});
