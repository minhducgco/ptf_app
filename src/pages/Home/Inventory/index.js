import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'native-base';
import {useSelector} from 'react-redux';
import normalize from 'react-native-normalize';

import Colors from '@styles/color';
import {showMessage} from '@utils/';
import themeStyle from '@styles/theme.style';
import {LocalizationContext} from '@context/index';
import {onGetCheck} from '@repository/Inventory';
import {getListWarehouses, getProducts} from '@repository/Sales/Sales';
import ModalAdd from '@components/Application/Inventory/ModalAdd';
import ContentList from '@components/Application/Inventory/ContentList';
import HeaderBackStatusBar from '@components/headers/HeaderBackStatusBar';

const Inventory = () => {
  const {t} = useContext(LocalizationContext);
  const accessToken = useSelector(st => st.auth.accessToken);
  const partner = useSelector(state => state.auth.user.partner_id);
  const [product, setProduct] = useState([]);
  const [warehouse, setWarehouse] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [listInventory, setListInventory] = useState([]);
  const [listWarehouses, setListWarehouses] = useState([]);
  const [isLoadData, setIsLoadData] = useState(false);
  const [openModalProduct, setOpenModalProduct] = useState(false);
  const [openModalWarehouse, setOpenModalWarehouse] = useState(false);
  const filterProduct = [
    {name: 'Tìm theo tên sản phẩm', code: 'name'},
    {name: 'Tìm theo mã sản phẩm', code: 'name'},
  ];
  const filterWarehouse = [{name: 'Tìm theo tên kho', code: 'name'}];

  useEffect(() => {
    _getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getListWarehouses({accessToken: accessToken})
      .then(res => {
        setListWarehouses(
          res.map(item => ({
            ...item,
            active: false,
          })),
        );
      })
      .catch(err => {
        if (__DEV__) {
          console.log('getListBranches: ', err);
        }
      });
  }, [accessToken]);

  const _getProducts = async (keySearch = '', page, loadMore = true) => {
    setIsLoadData(true);
    await getProducts({
      accessToken: accessToken,
      value: keySearch,
      page: page,
      items_per_page: 100000,
      partnerId: partner.id,
    })
      .then(res => {
        setListProduct(
          res.data.map(item => ({
            name: item.name,
            id: item.product_id,
            default_code: item.default_code,
            uom_id: item.uom_id,
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

  const getDataCheck = () => {
    let data = {
      access_token: accessToken,
      list_warehouse_id: warehouse.map(item => item.id),
      list_product_id: product.map(item => item.id),
    };
    onGetCheck(data)
      .then(res => {
        setListInventory(res);
        // console.log(JSON.stringify(res, null, 2));
      })
      .catch(err => {
        setListInventory([]);
        console.log(err);
        showMessage(err);
      });
  };

  const _openModalProduct = () => {
    setOpenModalProduct(true);
  };

  const _openModalWarehouse = () => {
    setOpenModalWarehouse(true);
  };

  const onSelectWarehouse = item => {
    const newList = [...warehouse];
    const index = newList.findIndex(it => it.id === item.id);
    if (index >= 0) {
      newList.splice(index, 1);
    } else {
      newList.push(item);
    }
    setWarehouse(newList);
  };

  const onDeleteWarehouse = index => {
    const newArr = [...warehouse];
    newArr.splice(index, 1);
    setWarehouse(newArr);
  };

  const onSelectProduct = item => {
    const newList = [...product];
    const index = newList.findIndex(it => it.id === item.id);
    if (index >= 0) {
      newList.splice(index, 1);
    } else {
      newList.push(item);
    }
    setProduct(newList);
  };

  const onDeleteProduct = index => {
    const newArr = [...product];
    newArr.splice(index, 1);
    setProduct(newArr);
  };

  const listFooter = () => {
    return <View style={styles.viewLine} />;
  };

  const _onCloseModal = () => {
    setOpenModalProduct(false);
    setOpenModalWarehouse(false);
  };

  const headerItem = () => {
    return (
      <View style={styles.viewDetail(0)}>
        <Text style={styles.txtFlex(0.7, true, true)}>{t('number_count')}</Text>
        <Text numberOfLines={1} style={styles.txtFlex(4, true)}>
          {t('product')}
        </Text>
        <Text numberOfLines={1} style={styles.txtFlex(1, true, true)}>
          {t('inventory_quantity')}
        </Text>
        <Text numberOfLines={1} style={styles.txtFlex(1, true, true)}>
          {t('unit_count')}
        </Text>
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <View key={index} style={styles.renderItem}>
        <View style={styles.viewDetail(1)}>
          <Text style={styles.txtWidth(200)}>
            {t('location')}: {item?.location?.name}
          </Text>
        </View>
        {headerItem()}
        {item?.list_product.map((it, idx) => {
          return (
            <View style={styles.viewDetail(1)} key={idx}>
              <Text style={styles.txtFlex(0.7, false, true)}>{idx + 1}</Text>
              <Text style={styles.txtFlex(4)}>{it?.product?.name}</Text>
              <Text style={styles.txtFlex(1, false, true)}>{it?.quantity}</Text>
              <Text style={styles.txtFlex(1, false, true)}>
                {it?.product?.uom_name}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };

  const _renderHeader = title => {
    return (
      <View style={styles.viewEmpty}>
        <Text style={styles.titleList}>{title}: </Text>
        <View>
          <TouchableOpacity
            onPress={
              title === 'Sản phẩm' ? _openModalProduct : _openModalWarehouse
            }>
            <Icon
              name="add-circle-outline"
              type="Ionicons"
              style={styles.styleIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const _renderListProduct = ({item, index}) => {
    return (
      <ContentList
        item={item}
        index={index}
        onDelete={onDeleteProduct}
        product
      />
    );
  };

  const _renderListWarehouse = ({item, index}) => {
    return (
      <ContentList item={item} index={index} onDelete={onDeleteWarehouse} />
    );
  };

  return (
    <View style={styles.container}>
      <HeaderBackStatusBar title={t('inventory')} hasBackgroundColor={false} />
      <ScrollView style={styles.content}>
        <FlatList
          nestedScrollEnabled={true}
          numColumns={1}
          data={warehouse}
          renderItem={_renderListWarehouse}
          ListHeaderComponent={_renderHeader('Địa điểm kho')}
          keyExtractor={(_, index) => index.toString()}
          style={styles.FlatList}
          ListFooterComponent={listFooter}
          scrollEnabled={false}
        />
        <FlatList
          nestedScrollEnabled={true}
          numColumns={1}
          data={product}
          renderItem={_renderListProduct}
          ListHeaderComponent={_renderHeader('Sản phẩm')}
          keyExtractor={(_, index) => index.toString()}
          style={styles.FlatList}
          ListFooterComponent={listFooter}
          scrollEnabled={false}
        />
        <TouchableOpacity style={styles.touchCheck} onPress={getDataCheck}>
          <Text style={styles.txtCheck}>{t('check')}</Text>
        </TouchableOpacity>
        <FlatList
          data={listInventory}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          contentContainerStyle={styles.FlatList}
        />
      </ScrollView>
      <ModalAdd
        listItem={listWarehouses}
        visible={openModalWarehouse}
        setVisible={setOpenModalWarehouse}
        listSelected={warehouse}
        addItem={onSelectWarehouse}
        setValue={setWarehouse}
        filer={filterWarehouse}
        title={'Tìm kiếm kho'}
        onClose={_onCloseModal}
      />
      <ModalAdd
        listItem={listProduct}
        visible={openModalProduct}
        setVisible={setOpenModalProduct}
        listSelected={product}
        addItem={onSelectProduct}
        setValue={setProduct}
        filter={filterProduct}
        title={'Tìm kiếm sản phẩm'}
        isLoadData={isLoadData}
        onClose={_onCloseModal}
        isChooseType={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  content: {
    paddingHorizontal: normalize(10),
    width: '100%',
    paddingBottom: normalize(10),
  },
  txtCheck: {
    fontSize: 16,
    fontFamily: themeStyle.FONT_FAMILY,
    textAlign: 'center',
    color: Colors.WHITE,
    padding: normalize(8),
  },
  touchCheck: {
    marginTop: normalize(20),
    marginBottom: normalize(10),
    backgroundColor: Colors.MONZA,
    width: '45%',
    borderRadius: normalize(8),
    alignSelf: 'center',
  },
  viewEmpty: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: normalize(20),
    marginBottom: normalize(10),
    marginLeft: normalize(18),
    marginRight: normalize(2),
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
    marginTop: normalize(15),
  },
  viewLine: {
    width: '100%',
    borderBottomColor: '#000',
    borderBottomWidth: 0.75,
    marginTop: normalize(10),
  },
  FlatList: {paddingBottom: normalize(10)},
  viewDetail: index => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: normalize(5),
    backgroundColor: index % 2 === 0 ? Colors.GALLERY : Colors.WHITE,
    borderWidth: 0.5,
    borderColor: Colors.SILVER,
    // marginTop: normalize(5),
  }),
  txtFlex: (flex, bold, center) => ({
    fontSize: 14,
    color: Colors.BLACK,
    flex,
    fontFamily: bold === true ? themeStyle.FONT_BOLD : themeStyle.FONT_FAMILY,
    textAlign: center && 'center',
  }),
  txtWidth: (width, bold) => ({
    fontSize: 14,
    color: Colors.BLACK,
    // width: normalize(width),
    marginLeft: normalize(5),
    fontFamily: bold === true ? themeStyle.FONT_BOLD : themeStyle.FONT_FAMILY,
  }),
  renderItem: {marginTop: normalize(10)},
});

export default Inventory;
