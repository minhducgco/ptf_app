import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  Platform,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import {useSelector} from 'react-redux';
import normalize from 'react-native-normalize';
import {useNavigation} from '@react-navigation/native';

import {num2numDong} from '@utils/';
import Colors from '@styles/color';
import theme from '@styles/theme.style';
import EmptyData from '@components/EmptyData';
import {LocalizationContext} from '@context/index';
import SvgDashLine from '@assets/svg/SvgDashLine';
import {VN_FORMAT_DATETIME} from '@configs/Configs';
import IconSell from '@assets/svg/icons/SvgIconSell';
import {onGetListReturn} from '@repository/Sales/Return';
import PlaceholderScreen from '@components/loadings/PlaceholderScreen';
import HeaderPartner from '@components/Application/Partner/HeaderPartner';

const DATA = [
  {name: 'Tìm theo tên khách hàng', code: 'partner'},
  {name: 'Tìm theo mã đơn hàng', code: 'name'},
];

const ContentBody = ({type}) => {
  const {t} = useContext(LocalizationContext);
  const accessToken = useSelector(state => state.auth.accessToken);
  const navigation = useNavigation();
  const [code, setCode] = useState('');
  const [value, setValue] = useState('');
  const [list, setList] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoadData, setIsLoadData] = useState(true);
  const [meta, setMeta] = useState({current_page: 1, next_page: 2});

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
    onGetListReturn({
      accessToken: accessToken,
      state: type,
      page: page,
      code: codeSearch,
      value: valueSearch,
      x_is_return: true,
    })
      .then(res => {
        if (loadMore) {
          setList(list.concat(res.data));
        } else {
          setList(res.data);
        }
        setMeta(res.meta);
        if (res.meta.next_page > res.meta.current_page) {
          setIsLoadMore(true);
          setNextPage(res.meta.next_page);
        } else {
          setIsLoadMore(false);
        }
        setIsLoadData(false);
        setRefreshing(false);
      })
      .catch(err => {
        setIsLoadData(false);
        setRefreshing(false);
        setIsLoadMore(false);
        console.log('Err getOrder', err);
      });
  };

  const onPress = item => {
    navigation.navigate('NoFooter', {
      screen: 'DetailReturnScreen',
      params: {
        id: item.id,
        accessToken: accessToken,
      },
    });
  };

  const loadMore = () => {
    if (isLoadMore) {
      getOrder({
        codeSearch: code,
        valueSearch: value,
        page: nextPage,
        loadMore: true,
      });
    }
  };

  const footerOrder = () => {
    return isLoadMore ? (
      <ActivityIndicator size="large" color={Colors.MONZA} />
    ) : null;
  };

  const RefreshOrder = () => {
    setRefreshing(true);
    setIsLoadData(true);
    getOrder({page: 1, loadMore: false});
    setValue('');
    setCode('');
  };

  const onSearch = (item, textSearch) => {
    setCode(item.code);
    setValue(textSearch);
    setIsLoadData(true);
    getOrder({
      codeSearch: item.code,
      valueSearch: textSearch,
      loadMore: false,
      page: 1,
    });
  };

  const _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => onPress(item)}>
        <View style={styles.touchOpacity}>
          <View style={styles.viewIcon}>
            <View style={styles.viewBoder}>
              <IconSell
                color={
                  item.x_state_return.key === 'done' ||
                  item.x_state_return.key === 'sale'
                    ? Colors.MANTIS
                    : item.x_state_return.key === 'cancel'
                    ? Colors.SILVER
                    : Colors.MONZA
                }
              />
            </View>
          </View>
          <View style={styles.viewText}>
            <View style={styles.stateContain}>
              <View style={styles.viewState(item?.x_state_return?.key)}>
                <Text numberOfLines={1} style={styles.textTT}>
                  {item?.x_state_return?.name}
                </Text>
              </View>
            </View>
            <Text style={styles.title} numberOfLines={1}>
              {item.name} - {item.partner}
            </Text>
            <Text style={styles.text} numberOfLines={1}>
              {t('date')}: {moment(item.date_order).format(VN_FORMAT_DATETIME)}
            </Text>
            <Text style={styles.text} numberOfLines={1}>
              {t('total')}: {num2numDong(item.amount_total)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const _renderHeader = () => {
    return (
      <HeaderPartner
        currentRecord={list.length || 0}
        totalRecord={meta?.total_record || 0}
        data={DATA}
        onPress={onSearch}
        textSearch={value}
        setTextSearch={setValue}
      />
    );
  };
  const renderSeparator = () => (
    <View style={styles.line}>
      <SvgDashLine
        color={Colors.GRAYCHATEAU}
        width={'100%'}
        style={{
          marginLeft: normalize(Platform.OS === 'android' ? 20 : 16, 'width'),
        }}
      />
      <SvgDashLine color={Colors.GRAYCHATEAU} width={'100%'} />
    </View>
  );
  return (
    <View>
      {_renderHeader()}
      {isLoadData ? (
        <PlaceholderScreen />
      ) : (
        <FlatList
          data={list}
          keyExtractor={(item, index) => item.id}
          renderItem={_renderItem}
          ListFooterComponent={footerOrder}
          ListEmptyComponent={() => <EmptyData title="no_data" />}
          ItemSeparatorComponent={renderSeparator}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={RefreshOrder}
              colors={[theme.MAIN_COLOR]}
            />
          }
          onEndReachedThreshold={0.5}
          onEndReached={loadMore}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

export default ContentBody;

const styles = StyleSheet.create({
  title: {
    fontFamily: theme.FONT_BOLD,
    color: '#626A72',
    marginVertical: normalize(3),
  },
  list: {paddingBottom: normalize(140)},
  text: {
    fontFamily: theme.FONT_FAMILY,
    color: '#626A72',
    fontSize: 13,
    marginVertical: normalize(3),
  },
  textTT: {
    fontFamily: theme.FONT_FAMILY,
    color: Colors.WHITE,
    fontSize: 13,
    paddingVertical: normalize(5),
    textAlign: 'center',
    textAlignVertical: 'center',
    marginHorizontal: normalize(3),
  },
  viewState: key => ({
    marginRight: normalize(10),
    borderRadius: normalize(5),
    backgroundColor:
      key === 'done' || key === 'sale'
        ? Colors.MANTIS
        : key === 'cancel'
        ? Colors.SILVER
        : Colors.MONZA,

    flex: 1,
  }),
  viewStateRTransfer: key => ({
    backgroundColor: key === 'transfered' ? Colors.MANTIS : Colors.MONZA,
    flex: 1,
    borderRadius: 5,
  }),
  viewIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewBoder: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.ALABASTER,
    borderRadius: 50,
    marginHorizontal: 20,
  },
  viewText: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: normalize(10),
  },
  touchOpacity: {
    flexDirection: 'row',
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginHorizontal: normalize(70),
    marginVertical: normalize(10),
  },
  stateContain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export const scrollTabStyles = {
  underlineStyle: {
    backgroundColor: Colors.HOKI,
  },
  style: {
    borderBottomColor: Colors.WHITE,
    backgroundColor: Colors.WHITE,
  },
};
export const tabStyles = {
  tabStyle: {
    backgroundColor: Colors.WHITE,
  },
  textStyle: {
    fontFamily: theme.FONT_BOLD,
    color: Colors.DUSTY_GRAY,
  },
  activeTabStyle: {
    backgroundColor: Colors.WHITE,
  },
  activeTextStyle: {
    color: Colors.EBONY_CLAY,
    fontFamily: theme.FONT_BOLD,
  },
};
