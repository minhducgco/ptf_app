import React, {useState, useEffect} from 'react';
import Modal from 'react-native-modalbox';
import normalize from 'react-native-normalize';
import {StyleSheet, ScrollView, Text} from 'react-native';

import {num2numDong} from '@utils/';
import {showMessage} from '@utils/';
import theme from '@styles/theme.style';
import {ButtonClose, ButtonsEditClose} from 'src/data';
import ButtonForms from '@components/Forms/ButtonForms';
import EditableItem from '@components/Application/Sales/EditableItem';
import PickerProduct from '@components/Application/Sales/PickerProduct';
import PickerComplain from '@components/Application/Sales/PickerComplain';

export default function ModalSaleOrder({
  isOpenModal,
  onClose,
  orderDetails,
  setOrderDetails,
  state,
  buttons,
  setIndexLines,
  indexLines,
  isEdit = true,
  listProduct,
  itemRegis,
  partnerId,
  listOum,
  listTaxes,
  type,
}) {
  const [product, setProduct] = useState({});
  const [productName, setProductName] = useState('');
  const [qty, setQty] = useState(0);
  const [unit, setUnit] = useState({});
  const [qtyNotShipping, setQtyNotShipping] = useState(0);
  const [qtyRequest, setQtyRequest] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [tax, setTax] = useState([]);

  useEffect(() => {
    setProduct(itemRegis);
    setProductName(itemRegis?.name);
    setQty(itemRegis?.product_uom_qty || 0);
    setPrice(itemRegis?.price_unit || 0);
    setUnit(itemRegis?.uom_id || itemRegis?.product_uom || {});
    setTotalPrice(itemRegis?.price_subtotal);
    setQtyNotShipping(itemRegis?.qty_not_yet_shipped || 0);
    setQtyRequest(itemRegis?.x_product_qty_request || 1);
    setTax(itemRegis?.tax_id || []);
    setDiscount(itemRegis?.discount || 0);
    // console.log(JSON.stringify(itemRegis, null, 2));
  }, [itemRegis]);

  const _closeModal = () => {
    onClose();
  };

  const onChangeProduct = item => {
    setProduct(item);
    setProductName(item.name);
    // setQtyRequest(1);
    // setQtyNotShipping(1);
    // setQty(1);
    setTax(item.tax_id);
    // setDiscount(0);
    setPrice(item.price_unit);
    setUnit(item.uom_id || {});
    // setTotalPrice(item.price_unit);
    setTotalPrice(item.price_unit * qtyRequest * (1 - discount / 100));
  };

  const onChangeQtyRequest = num => {
    setQtyRequest(num);
    setQtyNotShipping(num);
    setQty(num);
    setTotalPrice(num * price * (1 - discount / 100));
  };

  const onChangeDiscount = num => {
    setDiscount(num);
    setTotalPrice(price * qtyRequest * (1 - num / 100));
  };

  const _handleClickButton = item => {
    switch (item.key) {
      case 'add':
        if (!productName || !qtyRequest) {
          showMessage('Thông tin nhập bị thiếu');
        } else {
          const lines = {
            id: product.id || 0,
            product_id: product.product_id,
            name: productName,
            product_uom: unit,
            product_uom_qty: qty,
            price_unit: price,
            price_subtotal: totalPrice,
            x_product_qty_request: qtyRequest,
            qty_not_yet_shipped: qtyNotShipping,
            tax_id: tax,
            discount: discount,
            x_product_return_qty: qtyRequest,
          };
          // console.log(JSON.stringify(lines, null, 2));
          let arrayLines = [...orderDetails];
          arrayLines.push(lines);
          setOrderDetails(arrayLines);
          _closeModal();
        }
        break;
      case 'edit':
        if (!productName || !qtyRequest) {
          showMessage('Thông tin nhập bị thiếu');
        } else {
          orderDetails[indexLines].id = product.id;
          orderDetails[indexLines].product_id = product.product_id;
          orderDetails[indexLines].name = productName;
          orderDetails[indexLines].tax_id = tax;
          orderDetails[indexLines].price_unit = price;
          orderDetails[indexLines].product_uom = unit;
          orderDetails[indexLines].x_product_qty_request = qtyRequest;
          orderDetails[indexLines].qty_not_yet_shipped = qtyNotShipping;
          orderDetails[indexLines].discount = discount;
          orderDetails[indexLines].product_uom_qty = qty;
          orderDetails[indexLines].price_subtotal = totalPrice;
          orderDetails[indexLines].x_product_return_qty = qtyRequest;
          _closeModal();
        }
        break;
      case 'remove':
        let newList = [...orderDetails];
        newList.splice(indexLines, 1);
        setOrderDetails(newList);
        _closeModal();
        break;
      default:
        _closeModal();
        break;
    }
  };

  return (
    <Modal
      isOpen={isOpenModal}
      style={styles.modal}
      swipeToClose={true}
      backButtonClose={true}
      onClosed={onClose}>
      <ScrollView
        keyboardShouldPersistTaps="never"
        showsVerticalScrollIndicator={false}>
        <Text style={styles.styleTitle}>Thêm sản phẩm</Text>
        <PickerProduct
          title={'product'}
          data={listProduct}
          name={productName}
          setValue={onChangeProduct}
          required
          partnerId={partnerId}
        />
        {/* <EditableItem
          title={'describe'}
          defaultValue={productName}
          disabled={true}
        /> */}
        <EditableItem
          title={type !== 'return' ? 'request_qty' : 'qty_return'}
          defaultValue={qtyRequest.toString()}
          setValue={onChangeQtyRequest}
          keyboardType={'numeric'}
          required
        />
        {/* <EditableItem
          title={'quantity'}
          defaultValue={qty.toString()}
          disabled={true}
        />
        <EditableItem
          title={'qty_not_shippingg'}
          defaultValue={qtyNotShipping.toString()}
          setValue={setQtyNotShipping}
          keyboardType={'numeric'}
        /> */}
        <PickerComplain
          title={'unit'}
          data={listOum}
          name={unit?.name || ''}
          setValue={setUnit}
        />
        <EditableItem
          title={'unit_price'}
          defaultValue={num2numDong(price)}
          disabled={true}
        />
        <EditableItem
          title={'discount'}
          defaultValue={discount.toString()}
          setValue={onChangeDiscount}
          keyboardType={'numeric'}
        />
        <EditableItem
          title={'total_price'}
          defaultValue={num2numDong(totalPrice)}
          disabled={true}
        />
      </ScrollView>
      {isEdit &&
      (state === 'draft_2' || state === 'edit' || state === 'draft') ? (
        <ButtonForms data={buttons} onAction={_handleClickButton} />
      ) : isEdit && (state === 'send' || state === 'sale') ? (
        <ButtonForms data={ButtonsEditClose} onAction={_handleClickButton} />
      ) : (
        <ButtonForms data={ButtonClose} onAction={_handleClickButton} />
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  styleTitle: {
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: theme.FONT_BOLD,
    marginTop: normalize(10),
    fontSize: 16,
  },
  title: {
    fontFamily: theme.FONT_BOLD,
    color: '#000',
    fontSize: 20,
  },
  modal: {
    maxHeight: normalize(420),
    justifyContent: 'center',
    paddingHorizontal: normalize(10),
  },
});
