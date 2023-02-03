import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  FlatList,
  Text,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import HeaderBackStatusBar from '@components/headers/HeaderBackStatusBar';
import SvgIconListProduct from '@assets/svg/icons/iconProduct/SvgIconListProduct';
import {DashLine} from '@assets/svg/icons';
import Colors from '@styles/color';
import {productStyle as styles} from '@styles/product.style';
import {onGetListProduct} from '@repository/Product';
import PlaceholderScreen from '@components/loadings/PlaceholderScreen';
import {LocalizationContext} from '@context/index';
import {num2numDong} from '@utils/index';
import themeStyle from '@styles/theme.style';
import HeaderPartner from '@components/Application/Partner/HeaderPartner';

const Product = () => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const {t} = useContext(LocalizationContext);
  const navigation = useNavigation();
  const partner = useSelector(state => state.auth.user.partner_id);
  const [listProduct, setListProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [nextPage, setNextPage] = useState(0);
  const [value, setValue] = useState('');
  const [code, setCode] = useState('');
  const [refreshControl, setRefreshControl] = useState(false);
  const [meta, setMeta] = useState({current_page: 1, next_page: 2});

  const DATA = [
    {name: 'Tìm theo tên sản phẩm', code: 'name'},
    {name: 'Tìm theo mã sản phẩm', code: 'code'},
  ];

  useEffect(() => {
    getDataProduct({page: 1, loadMore: false});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDataProduct = ({
    codeSearch = '',
    valueSearch = '',
    page = 1,
    loadMore = false,
  }) => {
    onGetListProduct({
      access_token: accessToken,
      code: codeSearch,
      value: valueSearch,
      items_per_page: 15,
      page: page,
      LoadMore: loadMore,
      partner_id: partner.id,
    })
      .then(res => {
        // if (loadMore) {
        //   setListProduct(listProduct.concat(res.data));
        // } else {
        //   setListProduct(res.data);
        // }
        // setNextPage(res.meta.next_page);
        // if (res.meta.next_page === res.meta.current_page) {
        //   setIsLoadMore(false);
        // } else {
        //   setIsLoadMore(true);
        // }
        // setIsLoading(false);
        // setRefreshControl(false);
        // setMeta(res.meta);
        if (loadMore) {
          setListProduct(listProduct.concat(res.data));
        } else {
          setListProduct(res.data);
        }
        setMeta(res.meta);
        if (res.meta.next_page > res.meta.current_page) {
          setIsLoadMore(true);
          setNextPage(res.meta.next_page);
        } else {
          setIsLoadMore(false);
        }
        setIsLoading(false);
        setRefreshControl(false);
      })
      .catch(err => {
        setIsLoadMore(false);
        setIsLoading(false);
        setRefreshControl(false);
        console.log(err);
      });
  };

  const onEndReached = () => {
    if (isLoadMore) {
      setRefreshControl(false);
      getDataProduct({
        codeSearch: code,
        valueSearch: value,
        page: nextPage,
        loadMore: true,
      });
    }
  };

  // const onChangeText = text => {
  //   setKeyword(text);
  //   setRefreshControl(false);
  //   setIsLoading(false);
  //   setIsLoading(true);
  //   getDataProduct(text, 1, false);
  // };

  // const _onClearText = () => {
  //   setRefreshControl(false);
  //   setIsLoading(false);
  //   setKeyword('');
  //   getDataProduct('', 1, false);
  // };

  const onRefresh = () => {
    setRefreshControl(true);
    setIsLoading(true);
    getDataProduct({page: 1, loadMore: false});
    setValue('');
    setCode('');
  };

  const onSearch = (item, textSearch) => {
    setCode(item.code);
    setValue(textSearch);
    setIsLoading(true);
    // console.log(item, textSearch);
    getDataProduct({
      codeSearch: item.code,
      valueSearch: textSearch,
      loadMore: false,
      page: 1,
    });
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => gotoDetail(item.product_id, item.default_code)}
        key={index}>
        <View style={styles.viewItem}>
          <View style={styles.viewContent}>
            <View style={styles.viewIcon}>
              <SvgIconListProduct />
            </View>
            <View style={styles.viewTxt}>
              <View style={styles.viewItem}>
                <View style={styles.viewCode}>
                  <Text style={styles.txt(true)} numberOfLines={1}>
                    [{item.default_code}]
                  </Text>
                </View>
                {item?.qty_available === 0 ? (
                  <View style={styles.viewStatus(true)}>
                    <Text style={styles.txtStatus}>{t('sold_out')}</Text>
                  </View>
                ) : (
                  <View style={styles.viewStatus(false)}>
                    <Text style={styles.txtStatus}>
                      {t('in_stock')}
                      {': '}
                      {item.qty_available}
                    </Text>
                  </View>
                )}
              </View>
              <Text style={styles.txt(true)}>
                {item.name} {item?.uom_id?.name && '-'} {item?.uom_id?.name}
              </Text>
              <Text style={styles.txt(false)}>
                {t('price')}: {num2numDong(item.price)}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.viewLine}>
          <DashLine color={Colors.BLACK} />
          <DashLine color={Colors.BLACK} />
        </View>
      </TouchableOpacity>
    );
  };

  const gotoDetail = (id, name) => {
    navigation.navigate('DetailProduct', {id: id, name: name});
  };

  const listFooter = () => {
    return isLoadMore ? (
      <ActivityIndicator size="large" color={Colors.MONZA} />
    ) : null;
  };

  const listEmpty = () => {
    return (
      <View style={styles.viewEmpty}>
        <Text style={styles.txtEmpty}>{t('no_data')}</Text>
      </View>
    );
  };

  const _renderHeader = () => {
    return (
      <HeaderPartner
        currentRecord={listProduct.length || 0}
        totalRecord={meta?.total_record || 0}
        data={DATA}
        onPress={onSearch}
        textSearch={value}
        setTextSearch={setValue}
      />
    );
  };

  return (
    <View style={styles.container}>
      <HeaderBackStatusBar title={t('product')} hasBackgroundColor={false} />
      {_renderHeader()}
      {isLoading ? (
        <PlaceholderScreen />
      ) : (
        <FlatList
          data={listProduct}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={listFooter}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={listEmpty}
          refreshControl={
            <RefreshControl
              refreshing={refreshControl}
              onRefresh={() => onRefresh()}
              colors={[themeStyle.MAIN_COLOR]}
            />
          }
        />
      )}
    </View>
  );
};

export default Product;
