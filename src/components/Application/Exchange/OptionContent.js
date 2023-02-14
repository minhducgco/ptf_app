import React, {useContext, useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import normalize from 'react-native-normalize';
import {Form, Container} from 'native-base';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

import color from '@styles/color';
import {showMessage} from '@utils/';
import EditableItem from '@components/Application/Sales/EditableItem';
import PickerComplain from '@components/Application/Sales/PickerComplain';
import PickerDatetime from '@components/Forms/PickerDatetime';
import PickerPartner from '@components/Application/Sales/PickerPartner';
import {LocalizationContext} from '@context/index';
import themeStyle from '@styles/theme.style';
import ButtonForms from '@components/Forms/ButtonForms';
import {ButtonSaveCancel, UpdateButton} from 'src/data';
import {
  getProducts,
  getTypeRepair,
  getListWarehouses,
} from '@repository/Sales/Sales';
import ItemSeparator from '@components/Application/Sales/ItemSeparator';
import RenderProduct from '@components/Application/Return/RenderProduct';
import {AddButton} from '@components/Application/Sales/AddButton';
import ModalAdd from '@components/Application/Inventory/ModalAdd';

export default function OptionContent(props) {
  const {t} = useContext(LocalizationContext);
  const scrollRef = useRef(null);
  const navigation = useNavigation();
  const accessToken = useSelector(st => st.auth.accessToken);
  const userLogin = useSelector(state => state.auth.user.user_id);
  const branchLogin = useSelector(state => state.auth.user.branch_id);
  const WIDTH = Dimensions.get('screen').width;
  const [isLoadData, setIsLoadData] = useState(false);
  const [openModalReturn, setOpenModalReturn] = useState(false);
  const [openModalExchange, setOpenModalExchange] = useState(false);
  const [listProduct, setListProduct] = useState([]);
  const [listRepairType, setListRepairType] = useState([]);
  const [listWarehouses, setListWarehouses] = useState([]);
  const [reloadList, setReloadList] = useState(false);
  const [isEditProduct, setIsEditProduct] = useState(false);
  const [tab, setTab] = useState([
    {key: 'return_products', active: true, id: 0, name: 'Sản phẩm nhận lại'},
    {
      key: 'exchange_products',
      active: false,
      id: 1,
      name: 'Sản phẩm xuất đổi',
    },
    {key: 'other', active: false, id: 2, name: 'Thông tin khác'},
  ]);
  const filterProduct = [
    {name: 'Tìm theo tên sản phẩm', code: 'name'},
    {name: 'Tìm theo mã sản phẩm', code: 'name'},
  ];

  useFocusEffect(
    React.useCallback(() => {
      setTab([
        {
          key: 'return_products',
          active: true,
          id: 0,
          name: 'Sản phẩm nhận lại',
        },
        {
          key: 'exchange_products',
          active: false,
          id: 1,
          name: 'Sản phẩm xuất đổi',
        },
        {key: 'other', active: false, id: 2, name: 'Thông tin khác'},
      ]);
    }, []),
  );

  useEffect(() => {
    getTypeRepair({accessToken: accessToken})
      .then(res => {
        setListRepairType(res);
      })
      .catch(err => {
        if (__DEV__) {
          console.log('getTypeRepair: ', err);
        }
      });
  }, [accessToken]);

  useEffect(() => {
    getListWarehouses({accessToken: accessToken})
      .then(res => {
        setListWarehouses(res);
      })
      .catch(err => {
        if (__DEV__) {
          console.log('getListWarehouses: ', err);
        }
      });
  }, [accessToken]);

  const _getProducts = async partnerId => {
    setIsLoadData(true);
    await getProducts({
      accessToken: accessToken,
      items_per_page: 100000,
      partnerId: partnerId,
    })
      .then(res => {
        // console.log(JSON.stringify(res.data, null, 2));
        setListProduct(
          res.data.map(item => ({
            name: item.name,
            product_id: item.product_id,
            uom_id: item.uom_id,
            id: item.product_id,
            tax_id: item.tax_id,
            default_code: item.default_code,
            price_unit: item.price_unit,
            price_subtotal: item.price_unit,
            x_product_qty_request: 1,
            active: false,
          })),
        );
        setIsLoadData(false);
      })
      .catch(err => {
        setIsLoadData(false);
        if (__DEV__) {
          console.log('getProducts: ', err);
        }
      });
  };

  const onChangeTab = activeTab => {
    if (scrollRef?.current) {
      scrollRef.current.scrollTo({
        x: activeTab * WIDTH,
        y: 0,
        animate: true,
      });
      const tabFormat = [...tab];
      tabFormat.forEach((it, idx) => {
        if (idx === activeTab) {
          it.active = true;
        } else {
          it.active = false;
        }
      });
      setTab(tabFormat);
    }
  };

  const _onCloseModal = () => {
    setOpenModalReturn(false);
    setOpenModalExchange(false);
  };

  const onSelectReturn = item => {
    const newList = [...props.returnOrder];
    const index = newList.findIndex(it => it.id === item.id);
    if (index >= 0) {
      newList.splice(index, 1);
    } else {
      newList.push(item);
    }
    props.setReturnOrder(newList);
  };

  const onSelectExchange = item => {
    const list = [...props.exchangeOrder];
    const index = list.findIndex(it => it.id === item.id);
    if (index >= 0) {
      list.splice(index, 1);
    } else {
      list.push(item);
    }
    props.setExchangeOrder(list);
  };

  const _onPressFAB = () => {
    if (!props.partner.id) {
      showMessage('Vui lòng chọn khách hàng!');
    } else {
      tab.filter(function (a) {
        return a.active === true;
      })[0].key === 'exchange_products'
        ? setOpenModalExchange(true)
        : setOpenModalReturn(true);
    }
  };

  const onHandleActon = item => {
    switch (item.key) {
      case 'cancel_edit':
        navigation.goBack();
        break;
      case 'cancel':
        navigation.goBack();
        break;
    }
  };

  const onDeleteProduct = index => {
    const text = 'Thuế GTGT phải nộp 10%';
    console.log(parseFloat(text.replace(/^\D+/g, '')));
  };

  const onChangePartner = item => {
    props.setPartner(item);
    props.setPhone(item.phone);
    props.setPartnerShipping(item);
    props.setPriceList(item.product_pricelist);
    _getProducts(item.id);
  };

  const renderSeparator = () => <ItemSeparator />;

  const renderReturnProduct = ({item, index}) => (
    <RenderProduct
      index={index}
      item={item}
      have_tax={true}
      have_discount={false}
      products={props.returnOrder}
      partnerId={props.partner.id || 0}
      setProducts={props.setReturnOrder}
      onDelete={onDeleteProduct}
      setIsEditProduct={setIsEditProduct}
    />
  );

  const renderExchangeProduct = ({item, index}) => (
    <RenderProduct
      index={index}
      item={item}
      have_tax={true}
      have_discount={false}
      products={props.exchangeOrder}
      partnerId={props.partner.id || 0}
      setProducts={props.setExchangeOrder}
      onDelete={onDeleteProduct}
      setIsEditProduct={setIsEditProduct}
    />
  );

  return (
    <Container>
      <ModalAdd
        listItem={listProduct}
        visible={openModalReturn}
        setVisible={setOpenModalReturn}
        listSelected={props.returnOrder}
        addItem={onSelectReturn}
        setValue={props.setReturnOrder}
        filter={filterProduct}
        title={'Sẩn phẩm nhận lại'}
        isLoadData={isLoadData}
        onClose={_onCloseModal}
        isChooseType={true}
        reloadList={reloadList}
        setReloadList={setReloadList}
      />
      <ModalAdd
        listItem={listProduct}
        visible={openModalExchange}
        setVisible={setOpenModalExchange}
        listSelected={props.exchangeOrder}
        addItem={onSelectExchange}
        setValue={props.setExchangeOrder}
        filter={filterProduct}
        title={'Sản phẩm xuất đổi'}
        isLoadData={isLoadData}
        onClose={_onCloseModal}
        isChooseType={true}
        reloadList={reloadList}
        setReloadList={setReloadList}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Form>
          <Text style={styles.state}>{t(props.state)}</Text>
          <PickerPartner
            title={'customer'}
            name={props?.partner?.name}
            setValue={onChangePartner}
            disabled={!props.isEdit}
            required
          />
          <PickerPartner
            title={'partner_shipping'}
            name={props?.partnerShipping?.name}
            setValue={props.setPartnerShipping}
            disabled={!props.isEdit}
            required
          />
          <EditableItem
            title={'work_mobile'}
            defaultValue={props?.phone}
            disabled={true}
          />
          <PickerComplain
            title={'type_return'}
            data={listRepairType}
            name={props?.typeReturn?.name || ''}
            setValue={props.setTypeReturn}
            disabled={!props.isEdit}
            required
          />
          <EditableItem
            title={'price_list'}
            defaultValue={props?.priceList}
            setValue={props.setPriceList}
            disabled={true}
          />
          <PickerDatetime
            title={'exchange_date'}
            value={props?.exchangeDate}
            setValue={props.setExchangeDate}
          />
          <PickerComplain
            title={'exchange_warehouse'}
            data={listWarehouses}
            name={props?.exChangeWarehouse?.name}
            setValue={props.setExchangeWarehouse}
            disabled={!props.isEdit}
            required
          />
          <PickerComplain
            title={'return_warehouse'}
            data={listWarehouses}
            name={props?.returnWarehouse?.name}
            setValue={props.setReturnWarehouse}
            disabled={!props.isEdit}
            required
          />
          <EditableItem
            title={'rules'}
            defaultValue={props?.note}
            setValue={props.setNote}
            multiline
          />
          <ScrollView
            style={styles.tabContain}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {tab.map((item, idx) => {
              return (
                <TouchableOpacity
                  key={idx + 1}
                  onPress={() => onChangeTab(idx)}
                  style={styles.btnTab(item.active)}>
                  <Text style={styles.txtTab(item.active)}>{item.name}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <ScrollView
            scrollEnabled={false}
            horizontal
            pagingEnabled
            ref={scrollRef}
            showsHorizontalScrollIndicator={false}>
            <View style={styles.detail(WIDTH)}>
              <FlatList
                keyExtractor={(_, index) => String(index)}
                data={props.returnOrder}
                renderItem={renderReturnProduct}
                ItemSeparatorComponent={renderSeparator}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
              />
            </View>
            <View style={styles.detail(WIDTH)}>
              <FlatList
                keyExtractor={(_, index) => String(index)}
                data={props.exchangeOrder}
                renderItem={renderExchangeProduct}
                ItemSeparatorComponent={renderSeparator}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
              />
            </View>
            <View style={styles.detail(WIDTH)}>
              <View>
                <PickerComplain
                  title={'business_man'}
                  name={userLogin?.name}
                  disabled={true}
                />
                <PickerComplain
                  title={'branch'}
                  name={branchLogin?.name}
                  disabled={true}
                />
              </View>
            </View>
          </ScrollView>
        </Form>
      </ScrollView>
      {props.isEdit && props.state === 'draft_2' ? (
        <ButtonForms data={ButtonSaveCancel} onAction={onHandleActon} />
      ) : props.isEdit && props.state === 'edit' ? (
        <ButtonForms data={UpdateButton} onAction={onHandleActon} />
      ) : (
        <></>
      )}
      <AddButton func={() => _onPressFAB()} />
    </Container>
  );
}

const styles = StyleSheet.create({
  viewEmpty: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: normalize(20),
    marginBottom: normalize(10),
    marginLeft: normalize(18),
    marginRight: normalize(2),
  },
  attached_files: {
    fontFamily: themeStyle.FONT_BOLD,
    color: '#000',
    fontSize: 14,
  },
  files: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: normalize(20),
    alignItems: 'center',
  },
  styleIcon: {
    color: themeStyle.MAIN_COLOR,
    fontSize: 22,
    marginRight: normalize(15),
  },
  titleList: {
    fontFamily: themeStyle.FONT_BOLD,
    color: '#000',
    fontSize: 14,
  },
  title: {
    fontFamily: themeStyle.FONT_BOLD,
    color: '#000',
    fontSize: 16,
    alignSelf: 'center',
    margin: normalize(15),
    textAlign: 'center',
  },
  handle: {
    fontFamily: themeStyle.FONT_BOLD,
    color: '#000',
    fontSize: 16,
    alignSelf: 'center',
  },
  solutions: {
    fontFamily: themeStyle.FONT_BOLD,
    color: '#000',
    fontSize: 16,
    alignSelf: 'center',
    marginTop: normalize(20),
  },
  state: {
    fontFamily: themeStyle.FONT_BOLD,
    fontSize: 14,
    alignSelf: 'flex-end',
    marginTop: normalize(10),
    marginRight: normalize(20),
    color: themeStyle.MAIN_COLOR,
  },
  btnTab: active => ({
    paddingVertical: normalize(5),
    paddingHorizontal: normalize(10),
    backgroundColor: active ? color.LIGHT_GRAY : color.WHITE,
    borderBottomColor: active ? color.MONZA : color.WHITE,
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
  detail: WIDTH => ({width: WIDTH}),
  addTxt: {
    fontSize: 14,
    fontFamily: themeStyle.FONT_FAMILY,
    color: '#fffff',
    marginLeft: normalize(10),
  },
  addMore: {flexDirection: 'row', alignItems: 'center', padding: normalize(20)},
});
