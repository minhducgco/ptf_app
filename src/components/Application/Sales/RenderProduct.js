import React, {memo, useState} from 'react';
import normalize from 'react-native-normalize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import {num2numDong} from '@utils/';
import Colors from '@styles/color';
import themeStyle from '@styles/theme.style';
import EditableItem from '@components/Application/Sales/EditableItem';
import PickerProduct from '@components/Application/Sales/PickerProduct';
import PickerComplain from '@components/Application/Sales/PickerComplain';

const RenderProduct = ({
  item,
  index,
  disabled,
  type,
  onDelete,
  listOum,
  products,
  partnerId,
  setProducts,
}) => {
  const [product, setProduct] = useState(item || {});
  const [qtyRequest, setQtyRequest] = useState(
    item?.x_product_qty_request || 1,
  );
  const [unit, setUnit] = useState(item?.product_uom || item?.uom_id || {});
  const [discount, setDiscount] = useState(item?.discount || 0);
  const [totalPrice, setTotalPrice] = useState(item?.price_subtotal || 0);
  const [price, setPrice] = useState(item?.price_unit || 0);

  const onChangeProduct = it => {
    setProduct(it);
    setPrice(it.price_unit);
    setUnit(it.uom_id || {});
    setTotalPrice(it.price_unit * qtyRequest * (1 - discount / 100));
    products[index].id = it.id;
    products[index].product_id = it.product_id;
    products[index].product_name = it.name;
    products[index].price_unit = it.price_unit;
    products[index].uom_id = it.uom_id;
    products[index].price_subtotal =
      qtyRequest * it.price_unit * (1 - discount / 100);
  };

  const onChangeQtyRequest = num => {
    setQtyRequest(num);
    setTotalPrice(num * price * (1 - discount / 100));
    products[index].x_product_qty_request = num;
    products[index].price_subtotal = num * price * (1 - discount / 100);
  };

  const onChangeDiscount = num => {
    setDiscount(num);
    setTotalPrice(qtyRequest * price * (1 - num / 100));
    products[index].discount = num;
    products[index].price_subtotal = qtyRequest * price * (1 - num / 100);
  };

  const onChangeUnit = oum => {
    setUnit(oum);
    products[index].product_uom = oum;
  };

  return (
    <View style={styles.itemProduct}>
      <View style={styles.viewItem}>
        <PickerProduct
          title={'product'}
          data={products}
          name={product.name}
          setValue={onChangeProduct}
          required
          partnerId={partnerId}
          disabled={disabled}
        />
        <EditableItem
          title={'specifications'}
          defaultValue={'Đợi API trả về'}
          disabled={true}
        />
        <EditableItem
          title={type !== 'return' ? 'request_qty' : 'qty_return'}
          defaultValue={qtyRequest.toString()}
          setValue={onChangeQtyRequest}
          keyboardType={'numeric'}
          disabled={disabled}
          required
        />
        <PickerComplain
          title={'unit'}
          data={listOum}
          name={unit?.name || ''}
          setValue={onChangeUnit}
          disabled={true}
        />
        <EditableItem
          title={'unit_price'}
          defaultValue={num2numDong(item?.price_unit || 0)}
          disabled={true}
        />
        <EditableItem
          title={'discount'}
          defaultValue={item?.discount?.toString() || '0'}
          setValue={onChangeDiscount}
          keyboardType={'numeric'}
          disabled={disabled}
        />
        <EditableItem
          title={'total_price'}
          defaultValue={num2numDong(totalPrice)}
          disabled={true}
        />
        <View style={styles.header}>
          <View style={styles.buttonDelete}>
            {item?.x_is_product_promotion && item?.price_unit <= 0 ? (
              <AntDesign name="gift" size={20} />
            ) : (
              <AntDesign name="shoppingcart" size={20} />
            )}
          </View>
          <View style={styles.buttonDelete}>
            <TouchableOpacity onPress={() => onDelete(index)}>
              <AntDesign name="closecircleo" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default memo(RenderProduct);

const styles = StyleSheet.create({
  itemProduct: {
    flex: 1,
  },
  txt: bold => ({
    fontSize: 13,
    marginVertical: normalize(5),
    fontFamily: bold === true ? themeStyle.FONT_BOLD : themeStyle.FONT_FAMILY,
  }),
  nameProduct: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewTxt: {
    marginHorizontal: normalize(20),
    paddingBottom: normalize(40),
  },
  viewItem: {
    justifyContent: 'space-between',
    flex: 1,
    margin: 5,
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: '#999',
    backgroundColor: Colors.LIGHT_GRAY,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: normalize(20),
    marginVertical: normalize(10),
  },
});
