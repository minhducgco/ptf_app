import React, {forwardRef, useImperativeHandle, useState} from 'react';
import moment from 'moment';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import normalize from 'react-native-normalize';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {num2numDong} from '@utils/';
import Colors from '@styles/color';
import themeStyle from '@styles/theme.style';
import PickerDate from '@components/Application/Sales/PickerDate';
import EditableItem from '@components/Application/Sales/EditableItem';
import PickerProduct from '@components/Application/Sales/PickerProduct';
import PickerComplain from '@components/Application/Sales/PickerComplain';

const RenderProduct = (props, ref) => {
  const [qtyRequest, setQtyRequest] = useState(
    props.item.product_uom_qty ||
      props.item?.x_product_qty_request ||
      props.item?.x_product_return_qty ||
      1,
  );
  const [unit, setUnit] = useState(
    props.item?.product_uom || props.item?.uom_id || {},
  );
  const [discount, setDiscount] = useState(props.item?.discount || 0);
  const [expirationDate, setExpirationDate] = useState(
    props.item?.x_expiration_date
      ?.slice(0, 10)
      .split('-')
      .reverse()
      .join('/') || moment().format('DD/MM/YYYY'),
  );

  const onEditProduct = () => {
    props.setIsEditProduct(true);
  };

  useImperativeHandle(ref, () => ({
    onUpdateProduct(data) {
      setUnit(data.uom_id);
      props.products[props.index] = data;
      props.products[props.index].id = data.product_id;
      props.products[props.index].x_factor_str = data.x_factor_str;
      props.products[props.index].default_code = data.default_code;
      props.products[props.index].product_id = data.product_id;
      props.products[props.index].name = data.name;
      props.products[props.index].price_unit = data.price_unit;
      props.products[props.index].uom_id = data.uom_id;
      props.products[props.index].x_expiration_date = expirationDate;
      props.products[props.index].x_product_return_qty = qtyRequest;
      props.products[props.index].price_subtotal =
        qtyRequest * data.price_unit * (1 - discount / 100);
    },
  }));

  const onChangeQtyRequest = num => {
    setQtyRequest(num);
    props.products[props.index].x_product_return_qty = num;
    props.products[props.index].price_subtotal =
      num * props.item?.price_unit * (1 - discount / 100);
  };

  const onEditDate = date => {
    setExpirationDate(date);
    props.products[props.index].x_expiration_date = date;
  };

  const onChangeDiscount = num => {
    setDiscount(num);
    props.products[props.index].discount = num;
    props.products[props.index].price_subtotal =
      qtyRequest * props.item?.price_unit * (1 - num / 100);
  };

  const onChangeUnit = oum => {
    setUnit(oum);
    props.products[props.index].product_uom = oum;
  };

  return (
    <View style={styles.itemProduct} key={props.index}>
      <View style={styles.viewItem}>
        <PickerProduct
          title={'product'}
          data={props.products}
          name={props.item.name}
          onChangeProduct={onEditProduct}
          required
          disabled={props.disabled}
        />
        <EditableItem
          title={'specifications'}
          defaultValue={props.item.x_factor_str}
          disabled={true}
        />
        <PickerDate
          title="expiration_date"
          value={expirationDate}
          setValue={onEditDate}
          disabled={props.disabled}
        />
        <EditableItem
          title={'qty_return'}
          defaultValue={qtyRequest.toString()}
          setValue={onChangeQtyRequest}
          keyboardType={'numeric'}
          disabled={props.disabled}
          required
        />
        <PickerComplain
          title={'unit'}
          data={props.listOum}
          name={unit?.name || ''}
          setValue={onChangeUnit}
          disabled={true}
        />
        <EditableItem
          title={'unit_price'}
          defaultValue={num2numDong(props.item?.price_unit || 0)}
          disabled={true}
        />
        {props.have_discount && (
          <EditableItem
            title={'discount'}
            defaultValue={props.item?.discount?.toString() || '0'}
            setValue={onChangeDiscount}
            keyboardType={'numeric'}
            disabled={props.disabled}
          />
        )}
        {props.have_tax && (
          <EditableItem
            title={'tax'}
            defaultValue={props.item?.tax_id[0].name || ''}
            setValue={onChangeDiscount}
            keyboardType={'numeric'}
            disabled={props.disabled}
          />
        )}
        <EditableItem
          title={'total_price'}
          defaultValue={num2numDong(props.item?.price_subtotal)}
          disabled={true}
        />
        <View style={styles.header}>
          <View style={styles.buttonDelete}>
            {props.item?.x_is_product_promotion &&
            props.item?.price_unit <= 0 ? (
              <AntDesign name="gift" size={20} />
            ) : (
              <AntDesign name="shoppingcart" size={20} />
            )}
          </View>
          <View style={styles.buttonDelete}>
            <TouchableOpacity
              onPress={() => props.onDelete(props.index)}
              disabled={props.disabled}>
              <AntDesign name="closecircleo" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default forwardRef(RenderProduct);

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
