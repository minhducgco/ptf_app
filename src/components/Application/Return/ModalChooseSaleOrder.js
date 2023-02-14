import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import Modal from 'react-native-modalbox';
import normalize from 'react-native-normalize';
import {Text, Container, ListItem, Left} from 'native-base';
import {
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';

import Colors from '@styles/color';
import theme from '@styles/theme.style';
import EmptyData from '@components/EmptyData';
import {onGetListOrder} from '@repository/Sales/Sales';
import HeaderPartner from '@components/Application/Partner/HeaderPartner';

const ModalChooseSaleOrder = ({visible, setVisible, onChangeSaleOrder}) => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const [searchText, setSearchText] = useState('');
  const [list, setList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoadData, setIsLoadData] = useState(true);
  const [meta, setMeta] = useState({current_page: 1, next_page: 2});
  const DATA = [
    {name: 'Tìm theo tên khách hàng', code: 'partner'},
    {name: 'Tìm theo mã đơn hàng', code: 'name'},
  ];

  useEffect(() => {
    getOrder({page: 1, loadMore: false});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getOrder = ({
    codeSearch = '',
    valueSearch = '',
    page = 1,
    loadMore = false,
  }) => {
    onGetListOrder({
      accessToken: accessToken,
      state: ['sale', 'done'],
      page: page,
      code: codeSearch,
      value: valueSearch,
      items_per_page: 999999999,
    })
      .then(res => {
        // console.log(JSON.stringify(res.data, null, 2));
        if (loadMore) {
          setList(list.concat(res.data));
        } else {
          setList(res.data);
        }
        setMeta(res.meta);
        setIsLoadData(false);
        setRefreshing(false);
      })
      .catch(err => {
        setIsLoadData(false);
        setRefreshing(false);
        console.log('err getOrder', err);
      });
  };

  const RefreshOrder = () => {
    setRefreshing(true);
    setIsLoadData(true);
    getOrder({page: 1, loadMore: false});
    setSearchText('');
  };

  const onClose = () => {
    setVisible(false);
  };

  const onSearch = (item, textSearch) => {
    setSearchText(textSearch);
    getOrder({
      codeSearch: item.code,
      valueSearch: textSearch,
      page: 1,
      loadMore: false,
    });
  };

  const onPress = item => {
    onChangeSaleOrder(item);
    setVisible(false);
  };

  const _renderItem = ({item, index}) => {
    return (
      <ListItem button onPress={() => onPress(item)}>
        <Left>
          <Text style={styles.userName}>
            {item?.name && (
              <Text style={styles.default_code}>[{item?.name}]</Text>
            )}{' '}
            {item.partner}
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
        <Text style={styles.txtTitle}>Tìm kiếm đơn hàng</Text>
        <HeaderPartner
          currentRecord={list.length || 0}
          totalRecord={meta?.total_record || 0}
          data={DATA}
          onPress={onSearch}
          textSearch={searchText}
          setTextSearch={setSearchText}
          listOrder={true}
        />
        {isLoadData ? (
          <ActivityIndicator size="large" color={Colors.MONZA} />
        ) : (
          <FlatList
            data={list}
            renderItem={_renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => <EmptyData title="no_data" />}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => RefreshOrder()}
                colors={[theme.MAIN_COLOR]}
              />
            }
          />
        )}
      </Container>
    </Modal>
  );
};

export default ModalChooseSaleOrder;

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
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginHorizontal: normalize(70),
    marginVertical: normalize(10),
  },
});
