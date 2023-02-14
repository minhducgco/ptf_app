import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import Modal from 'react-native-modalbox';
import normalize from 'react-native-normalize';
import {ListItem, Left, Text, Container} from 'native-base';
import {
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';

import Colors from '@styles/color';
import theme from '@styles/theme.style';
import {getProducts} from '@repository/Sales/Sales';
import HeaderPartner from '@components/Application/Partner/HeaderPartner';

const ModalEditProduct = ({
  visible,
  setVisible,
  partnerId,
  onChangeProduct,
}) => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState([]);
  const [refreshControl, setRefreshControl] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const DATA = [
    {name: 'Tìm theo tên sản phẩm', code: 'name'},
    {name: 'Tìm theo mã sản phẩm', code: 'code'},
  ];

  useEffect(() => {
    getDataProduct({page: 1, loadMore: false});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partnerId]);

  const getDataProduct = async ({
    codeSearch = '',
    valueSearch = '',
    page = 1,
    loadMore = false,
  }) => {
    await getProducts({
      accessToken: accessToken,
      value: valueSearch,
      page: page,
      code: codeSearch,
      items_per_page: 10000,
      partnerId: partnerId,
    })
      .then(res => {
        setProducts(res.data);
        setRefreshControl(false);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        if (__DEV__) {
          console.log('getProducts: ', err);
        }
      });
  };

  const onRefresh = () => {
    setSearchText('');
    setIsLoading(true);
    setRefreshControl(true);
    getDataProduct({page: 1, loadMore: false});
  };

  const onSearch = (item, textSearch) => {
    setSearchText(textSearch);
    setIsLoading(true);
    getDataProduct({
      codeSearch: item.code,
      valueSearch: textSearch,
      page: 1,
      loadMore: false,
    });
  };

  const onPress = item => {
    onChangeProduct(item);
    setVisible(false);
  };

  const onClose = () => {
    setVisible(false);
    setSearchText('');
    getDataProduct({page: 1, loadMore: false});
  };

  const _renderItem = ({item, index}) => {
    return (
      <ListItem button onPress={() => onPress(item)}>
        <Left>
          <Text style={styles.userName}>
            {item?.default_code && (
              <Text style={styles.default_code}>[{item?.default_code}]</Text>
            )}{' '}
            {item.name} {item?.default_code && '-'} {item?.uom_id?.name}
          </Text>
        </Left>
      </ListItem>
    );
  };

  return (
    <Modal
      isOpen={visible}
      style={styles.modal}
      swipeToClose={true}
      backButtonClose={true}
      onClosed={onClose}>
      <Container>
        <Text style={styles.txtTitle}>Tìm kiếm sản phẩm</Text>
        <HeaderPartner
          currentRecord={products.length || 0}
          totalRecord={products.length || 0}
          data={DATA}
          onPress={onSearch}
          textSearch={searchText}
          setTextSearch={setSearchText}
          listOrder={true}
        />
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.MONZA} />
        ) : (
          <FlatList
            data={products}
            renderItem={_renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshControl}
                onRefresh={() => onRefresh()}
                colors={[theme.MAIN_COLOR]}
              />
            }
          />
        )}
      </Container>
    </Modal>
  );
};

export default ModalEditProduct;

const styles = StyleSheet.create({
  modal: {
    maxHeight: normalize(500),
    justifyContent: 'center',
    paddingHorizontal: normalize(10),
  },
  txtTitle: {
    fontFamily: theme.FONT_BOLD,
    fontSize: 16,
    alignSelf: 'center',
    marginTop: normalize(10),
  },
  userName: {
    fontFamily: theme.FONT_FAMILY,
    fontSize: normalize(16),
  },
  userCheckIcon: {
    fontSize: normalize(24),
    color: 'green',
  },
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
  default_code: {
    fontFamily: theme.FONT_BOLD,
    color: Colors.BLACK,
    fontSize: 14,
  },
});
