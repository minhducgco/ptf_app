import React, {useContext, useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import moment from 'moment';
import {useSelector} from 'react-redux';
import normalize from 'react-native-normalize';
import {Form, Container} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

import color from '@styles/color';
import {showMessage} from '@utils/';
import EditableItem from '@components/Application/Sales/EditableItem';
import PickerComplain from '@components/Application/Sales/PickerComplain';
import PickerDate from '@components/Application/Sales/PickerDate';
import PickerPartner from '@components/Application/Sales/PickerPartner';
import {LocalizationContext} from '@context/index';
import themeStyle from '@styles/theme.style';
import ButtonForms from '@components/Forms/ButtonForms';
import {ButtonSaveCancel, UpdateButton} from 'src/data';
import {
  getProducts,
  getTypeRepair,
  getListUom,
  getListTaxes,
  getListUsers,
  getListRoles,
  getListCrmTeams,
  getListBranches,
  getListChannels,
  getListWarehouses,
  onGetDetailOrder,
} from '@repository/Sales/Sales';
import ItemSeparator from '@components/Application/Sales/ItemSeparator';
import RenderProduct from '@components/Application/Return/RenderProduct';
import {AddButton} from '@components/Application/Sales/AddButton';
import ModalAdd from '@components/Application/Sales/ModalAdd';
import FileSelected from '@components/Application/Return/FileSelected';
import ModalEditProduct from '@components/Application/Sales/ModalEditProduct';
import ModalChooseSaleOrder from './ModalChooseSaleOrder';
import PickerProduct from '@components/Application/Sales/PickerProduct';

export default function OptionContent(props) {
  const {t} = useContext(LocalizationContext);
  const scrollRef = useRef(null);
  const childCompRef = useRef();
  const navigation = useNavigation();
  const accessToken = useSelector(st => st.auth.accessToken);
  const WIDTH = Dimensions.get('screen').width;
  const [paymentTerms, setPaymentTerms] = useState([]);
  const [listChannels, setListChannels] = useState([]);
  const [listWarehouses, setListWarehouses] = useState([]);
  const [listUsers, setListUsers] = useState([]);
  const [listTeams, setListTeams] = useState([]);
  const [listOum, setListOum] = useState([]);
  const [listTaxes, setListTaxes] = useState([]);
  const [listBranches, setListBranches] = useState([]);
  const [listRepairType, setListRepairType] = useState([]);
  const [openModalProduct, setOpenModalProduct] = useState(false);
  const [isLoadData, setIsLoadData] = useState(false);
  const [listProduct, setListProduct] = useState([]);
  const [reloadList, setReloadList] = useState(false);
  const [isEditProduct, setIsEditProduct] = useState(false);
  const [isEditSaleOrder, setIsEditSaleOrder] = useState(false);
  const [tab, setTab] = useState([
    {key: 'detail', active: true, id: 0, name: 'Chi ti???t ????n h??ng'},
    {key: 'file', active: false, id: 1, name: 'T???p ????nh k??m'},
    {key: 'other', active: false, id: 2, name: 'Th??ng tin kh??c'},
  ]);

  useFocusEffect(
    React.useCallback(() => {
      setTab([
        {key: 'detail', active: true, id: 0, name: 'Chi ti???t ????n h??ng'},
        {key: 'file', active: false, id: 1, name: 'T???p ????nh k??m'},
        {key: 'other', active: false, id: 2, name: 'Th??ng tin kh??c'},
      ]);
    }, []),
  );

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

  useEffect(() => {
    getListRoles({accessToken: accessToken})
      .then(res => {
        setPaymentTerms([{id: null, name: ' '}].concat(res));
      })
      .catch(err => {
        if (__DEV__) {
          console.log('getListRoles: ', err);
        }
      });
  }, [accessToken]);

  useEffect(() => {
    getListChannels({accessToken: accessToken})
      .then(res => {
        setListChannels(res);
      })
      .catch(err => {
        if (__DEV__) {
          console.log('getListChannels: ', err);
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

  useEffect(() => {
    getListUsers({accessToken: accessToken})
      .then(res => {
        setListUsers(res);
      })
      .catch(err => {
        if (__DEV__) {
          console.log('getListUsers: ', err);
        }
      });
  }, [accessToken]);

  useEffect(() => {
    getListBranches({accessToken: accessToken})
      .then(res => {
        setListBranches(res);
      })
      .catch(err => {
        if (__DEV__) {
          console.log('getListBranches: ', err);
        }
      });
  }, [accessToken]);

  useEffect(() => {
    getListCrmTeams({accessToken: accessToken})
      .then(res => {
        setListTeams(res);
      })
      .catch(err => {
        if (__DEV__) {
          console.log('getListCrmTeams: ', err);
        }
      });
  }, [accessToken]);

  useEffect(() => {
    getListTaxes({accessToken: accessToken})
      .then(res => {
        setListTaxes(res);
      })
      .catch(err => {
        if (__DEV__) {
          console.log('getListTaxes: ', err);
        }
      });
  }, [accessToken]);

  useEffect(() => {
    getListUom({accessToken: accessToken})
      .then(res => {
        setListOum(res);
      })
      .catch(err => {
        if (__DEV__) {
          console.log('getListCrmTeams: ', err);
        }
      });
  }, [accessToken]);

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
    props.partner.id &&
      getProducts({
        accessToken: accessToken,
        items_per_page: 100000,
        partnerId: props.partner.id,
      })
        .then(res => {
          // console.log(JSON.stringify(res.data, null, 2));
          setListProduct(
            res.data.map(item => ({
              name: item.name,
              x_factor_str: item.x_factor_str,
              product_id: item.product_id,
              uom_id: item.uom_id,
              id: item.product_id,
              tax_id: item.tax_id,
              default_code: item.default_code,
              price_unit: item.price_unit,
              price_subtotal: item.price_unit,
              x_product_qty_request: 1,
              active: false,
              x_product_return_qty: 1,
              x_expiration_date: moment().format('DD/MM/YYYY'),
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
  }, [accessToken, props.partner.id]);

  const onHandleActon = item => {
    switch (item.key) {
      case 'cancel_edit':
        navigation.goBack();
        break;
      case 'confirm_update':
        if (
          props.partner.id === undefined ||
          !props.warehouse.id === undefined
        ) {
          showMessage('Th??ng tin nh???p b??? thi???u');
        } else {
          props._onUpdate();
        }
        break;
      case 'save':
        if (
          props.partner.id === undefined ||
          props?.typeReturn.id === undefined
        ) {
          showMessage('Th??ng tin nh???p b??? thi???u');
        } else {
          props._onAction();
        }
        break;
      case 'cancel':
        navigation.goBack();
        break;
    }
  };

  const onChangePartner = item => {
    props.setPartner(item);
    props.setPhone(item.phone);
    props.setPartnerInvoice(item);
    props.setPartnerShipping(item);
    props.setPriceList(item.product_pricelist);
    props.setChannel(item.x_channel_group_id);
    props.setPaymentTerm(item.payment_term_id);
    props.setOrderDetails([]);
  };

  const _onCloseModal = () => {
    setOpenModalProduct(false);
  };

  const onGetImageLibrary = () => {
    const options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      maxWidth: 1024,
      maxHeight: 1024,
      includeBase64: true,
    };
    launchImageLibrary(options, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('Image picker', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button', res.customButton);
      } else {
        let name = res.assets[0].fileName.split('.jpg');
        let newArray = [...props.listAddFile];
        const source = {
          name: name[0] + '.jpg',
          value: res.assets[0].base64,
        };
        newArray.push(source);
        props.setListAddFile(newArray);
      }
    });
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
          maxWidth: 1024,
          maxHeight: 1024,
          includeBase64: true,
        };
        launchCamera(options, res => {
          if (res.didCancel) {
            showMessage('User cancelled image picker');
          } else if (res.error) {
            showMessage('Image picker', res.error);
          } else if (res.customButton) {
            showMessage('User tapped custom button', res.customButton);
          } else {
            let name = res.assets[0].fileName.split('.jpg');
            let newArray = [...props.listAddFile];
            const source = {
              name: name[0] + '.jpg',
              value: res.assets[0].base64,
            };
            newArray.push(source);
            props.setListAddFile(newArray);
          }
        });
      } else {
        showMessage('Camera permission denied');
      }
    } catch (err) {
      showMessage(err);
    }
  };

  const onRemoveFile = ind => {
    let arrayFile = [...props.listAddFile];
    arrayFile.splice(ind, 1);
    props.setListAddFile(arrayFile);
  };

  const _onPressFAB = () => {
    if (!props.partner.id) {
      showMessage('Vui l??ng ch???n kh??ch h??ng!');
    } else {
      setOpenModalProduct(true);
    }
  };

  const onSelectProduct = item => {
    const newList = [...props.orderDetails];
    const index = newList.findIndex(it => it.id === item.id);
    if (index >= 0) {
      newList.splice(index, 1);
    } else {
      newList.push(item);
    }
    props.setOrderDetails(newList);
  };

  const onDeleteProduct = ind => {
    const newList = [...props.orderDetails];
    newList.splice(ind, 1);
    props.setOrderDetails(newList);
  };

  const onChangeProduct = it => {
    childCompRef.current.onUpdateProduct(it);
    setReloadList(true);
  };

  const onEditSaleOrder = it => {
    setIsEditSaleOrder(true);
  };

  const onChangeSaleOrder = it => {
    props.setSaleOrder(it);
    onGetDetailOrder({
      accessToken: accessToken,
      id: it.id,
    })
      .then(res => {
        console.log(JSON.stringify(res, null, 2));
        props.setPartner(res.partner);
        props.setPhone(res.phone);
        props.setPriceList(res.pricelist_id);
        props.setChannel(res.x_channel_id);
        props.setOrderDetails(
          res.order_line.map(item => ({
            name: item.name,
            x_factor_str: item.x_factor_str,
            x_expiration_date: item.x_expiration_date
              .slice(0, 10)
              .split('-')
              .reverse()
              .join('/'),
            product_id: item.product_id,
            uom_id: item.uom_id,
            product_oum: item.product_oum,
            id: item.product_id,
            tax_id: item.tax_id,
            default_code: item.default_code,
            price_unit: item.price_unit,
            price_subtotal: item.price_unit,
            x_product_qty_request: item.product_uom_qty,
            x_product_return_qty: item.product_uom_qty,
            product_uom_qty: item.product_uom_qty,
            active: true,
          })),
        );
      })
      .catch(err => {
        showMessage(err);
      });
  };

  const renderProduct = ({item, index}) => (
    <RenderProduct
      index={index}
      item={item}
      have_discount={true}
      listOum={listOum}
      ref={childCompRef}
      listTaxes={listTaxes}
      products={props.orderDetails}
      partnerId={props.partner.id || 0}
      setProducts={props.setOrderDetails}
      onDelete={onDeleteProduct}
      setIsEditProduct={setIsEditProduct}
    />
  );

  const renderSeparator = () => <ItemSeparator />;

  return (
    <Container>
      <ModalAdd
        listItem={listProduct}
        visible={openModalProduct}
        setVisible={setOpenModalProduct}
        listSelected={props.orderDetails}
        addItem={onSelectProduct}
        setValue={props.setOrderDetails}
        title={'T??m ki???m s???n ph???m'}
        isLoadData={isLoadData}
        onClose={_onCloseModal}
        isChooseType={true}
        reloadList={reloadList}
        setReloadList={setReloadList}
      />
      <ModalEditProduct
        visible={isEditProduct}
        setVisible={setIsEditProduct}
        partnerId={props.partner.id || 0}
        onChangeProduct={onChangeProduct}
      />
      <ModalChooseSaleOrder
        visible={isEditSaleOrder}
        setVisible={setIsEditSaleOrder}
        onChangeSaleOrder={onChangeSaleOrder}
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
          <EditableItem
            title={'phone'}
            defaultValue={props?.phone}
            setValue={props.setPhone}
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
          <PickerProduct
            title={'sale_order'}
            data={props.saleOrder}
            name={props.saleOrder.name}
            onChangeProduct={onEditSaleOrder}
            disabled={props.disabled}
          />
          <EditableItem
            title={'price_list'}
            defaultValue={props?.priceList}
            setValue={props.setPriceList}
            disabled={true}
          />
          <PickerDate
            title="return_date"
            value={props?.expirationDate}
            setValue={props.setExpirationDate}
            disabled={!props.isEdit}
          />
          <PickerComplain
            title={'payment_term'}
            data={paymentTerms}
            name={props?.paymentTerm?.name || ''}
            setValue={props.setPaymentTerm}
            disabled={!props.isEdit}
          />
          <PickerComplain
            title={'channel'}
            data={listChannels}
            name={props?.chanel?.name || ''}
            setValue={props.setChannel}
            disabled={!props.isEdit}
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
                data={props.orderDetails}
                renderItem={renderProduct}
                ItemSeparatorComponent={renderSeparator}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                // ListFooterComponent={footerOrder}
              />
            </View>
            <View style={styles.detail(WIDTH)}>
              <View style={styles.files}>
                <Text style={styles.attached_files}>
                  {t('attached_files')}:
                </Text>
                <View style={styles.attachedButton}>
                  <TouchableOpacity
                    style={styles.camerao}
                    onPress={() => requestCameraPermission()}>
                    <Icon name="camerao" size={24} color={color.BLACK} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => onGetImageLibrary()}>
                    <Icon name="addfile" size={20} color={color.BLACK} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.listAddFile}>
                {props?.listAddFile?.map((it, ind) => (
                  <FileSelected item={it} index={ind} onRemove={onRemoveFile} />
                ))}
              </View>
            </View>
            <View style={styles.detail(WIDTH)}>
              <View>
                <PickerComplain
                  title={'business_man'}
                  data={listUsers}
                  name={props?.user?.name}
                  setValue={props?.setUser}
                  disabled={true}
                />
                <PickerComplain
                  title={'team_sales'}
                  data={listTeams}
                  name={props?.team?.name}
                  setValue={props.setTeam}
                  disabled={!props.isEdit}
                />
                <PickerComplain
                  title={'branch'}
                  data={listBranches}
                  name={props?.branch?.name}
                  setValue={props.setBranch}
                  disabled={!props.isEdit}
                  required
                />
                <PickerComplain
                  title={'warehouse'}
                  data={listWarehouses}
                  name={props?.warehouse?.name}
                  setValue={props.setWarehouse}
                  disabled={!props.isEdit}
                  required
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
  attachedButton: {
    flexDirection: 'row',
  },
  camerao: {marginRight: normalize(30)},
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
