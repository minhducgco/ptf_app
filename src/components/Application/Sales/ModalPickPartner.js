import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  FlatList,
  RefreshControl,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {Text, Container} from 'native-base';
import {ListItem, Left} from 'native-base';
import normalize from 'react-native-normalize';
import {useSelector} from 'react-redux';
import HeaderBackStatusBar from '@components/headers/HeaderSearch';

import theme from '@styles/theme.style';
import {LocalizationContext} from '@context/index';
import {getCustomers} from '@repository/Sales/Complain';
import PlaceholderScreen from '@components/loadings/PlaceholderScreen';

const ModalPickPartner = ({modalVisible, setModalVisible, setValue}) => {
  const {t} = useContext(LocalizationContext);
  const accessToken = useSelector(state => state.auth.accessToken);
  const [searchText, setSearchText] = useState('');
  const [customers, setCustomers] = useState([]);
  const [refreshControl, setRefreshControl] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [nextPage, setNextPage] = useState(0);
  const [isLoadMore, setIsLoadMore] = useState(false);

  useEffect(() => {
    _getCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _getCustomers = async (keySearch = '', page, loadMore = true) => {
    await getCustomers({
      accessToken: accessToken,
      value: keySearch,
      page: page,
      code: 'name',
      items_per_page: 20,
    })
      .then(res => {
        if (loadMore) {
          setCustomers(customers.concat(res.data));
        } else {
          setCustomers(res.data);
        }
        setRefreshControl(false);
        setIsLoading(false);
        setNextPage(res.meta.next_page);
        if (res.meta.next_page === res.meta.current_page) {
          setIsLoadMore(false);
        } else {
          setIsLoadMore(true);
        }
      })
      .catch(err => {
        setIsLoading(false);
        if (__DEV__) {
          console.log('_getEmployees: ', err);
        }
      });
  };

  const onRefresh = () => {
    setSearchText('');
    setIsLoading(true);
    setRefreshControl(true);
    _getCustomers('', 1, true);
  };

  const onEndReached = () => {
    if (isLoadMore) {
      setRefreshControl(false);
      _getCustomers(searchText, nextPage, true);
    }
  };

  const onActionBack = () => {
    setModalVisible(false);
  };

  const onChangeText = text => {
    setSearchText(text);
    setRefreshControl(false);
    setIsLoading(true);
    _getCustomers(text, 1, false);
  };

  const onPress = item => {
    setValue(item);
    setModalVisible(false);
  };

  const listFooter = () => {
    return isLoadMore && <ActivityIndicator size="large" color="#00ff00" />;
  };

  const _renderItem = ({item}) => {
    return (
      <ListItem button onPress={() => onPress(item)}>
        <Left>
          <Text style={styles.userName}>{item.name}</Text>
        </Left>
      </ListItem>
    );
  };

  const listEmpty = () => {
    return (
      <View style={styles.viewEmpty}>
        <Text style={styles.txtEmpty}>{t('no_data')}</Text>
      </View>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      statusBarTranslucent={true}>
      <Container>
        <HeaderBackStatusBar
          hasBack={true}
          onGoBack={onActionBack}
          onChangeText={onChangeText}
          value={searchText}
          placeholder={t('search')}
          setSearchText={setSearchText}
        />
        {isLoading ? (
          <PlaceholderScreen />
        ) : (
          <SafeAreaView style={styles.viewScroll}>
            <FlatList
              data={customers}
              renderItem={_renderItem}
              keyExtractor={(_, index) => String(index)}
              refreshControl={
                <RefreshControl
                  refreshing={refreshControl}
                  onRefresh={() => onRefresh()}
                  colors={[theme.MAIN_COLOR]}
                />
              }
              onEndReached={onEndReached}
              onEndReachedThreshold={0.5}
              ListFooterComponent={listFooter}
              ListEmptyComponent={listEmpty}
            />
          </SafeAreaView>
        )}
      </Container>
    </Modal>
  );
};

export default ModalPickPartner;

const styles = StyleSheet.create({
  userName: {
    fontFamily: theme.FONT_FAMILY,
    fontSize: normalize(16),
  },
  viewEmpty: {
    flex: 1,
    alignSelf: 'center',
  },
  txtEmpty: {
    fontSize: 13,
    fontFamily: theme.FONT_FAMILY,
    marginTop: normalize(10),
  },
});
