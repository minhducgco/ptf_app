import React, {useContext, useState, useRef} from 'react';
import {
  ScrollView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
} from 'react-native';
import {useSelector} from 'react-redux';
import normalize from 'react-native-normalize';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

import {
  onGetDetailExchange,
  handleActionExchange,
} from '@repository/Sales/Exchange';
import {LocalizationContext} from '@context/index';
import {num2numDong, showMessage} from '@utils/index';
import LineItem from '@components/Application/Sales/LineItem';
import {saleOrderStyles as styles} from '@styles/saleorder.style';
import ItemProduct from '@components/Application/Sales/ItemProduct';
import PlaceholderScreen from '@components/loadings/PlaceholderScreen';
import HeaderBackStatusBar from '@components/headers/HeaderBackStatusBar';

const WIDTH = Dimensions.get('screen').width;

export default function DetailExchangeScreen({route}) {
  const {id, name} = route.params;
  const scrollRef = useRef(null);
  const navigation = useNavigation();
  const {t} = useContext(LocalizationContext);
  const accessToken = useSelector(states => states.auth.accessToken);
  const [detail, setDetail] = useState({name: ''});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
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

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
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
      getExchange();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const getExchange = () => {
    setRefreshing(true);
    onGetDetailExchange({
      accessToken: accessToken,
      id: id,
    })
      .then(res => {
        // console.log(JSON.stringify(res, null, 2));
        setDetail(res);
        setLoading(false);
        setRefreshing(false);
      })
      .catch(err => {
        setLoading(false);
        showMessage(err);
        setRefreshing(false);
      });
  };

  const onEdit = () => {
    // dispatch(setOrderLine(detail?.order_line, true));
    navigation.navigate('CreateNewExchange', {detail: detail, isEdit: true});
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

  const renderItemButton = ({item, index}) => (
    <TouchableOpacity
      key={index}
      onPress={() => handleAction(item.key)}
      style={styles.buttonDetail(item)}>
      <Text style={styles.txtButton}>{item?.name}</Text>
    </TouchableOpacity>
  );

  const handleAction = key => {
    handleActionExchange({
      id,
      accessToken,
      action: 'action_sent_approve',
    })
      .then(res => {
        // console.log(JSON.stringify(res, null, 2));
        setLoading(true);
        showMessage(t('edit_success'));
        getExchange();
      })
      .catch(err => {
        showMessage(err);
        console.log(err);
      });
  };

  const renderProduct = ({item, index}) => (
    <ItemProduct index={index} item={item} disabled={true} />
  );

  return (
    <View style={styles.contain}>
      <HeaderBackStatusBar
        title={name}
        hasBackgroundColor={false}
        hasIcon={detail.state === 'draft'}
        clickIcon={onEdit}
        nameIcon={'edit'}
      />
      {loading ? (
        <PlaceholderScreen />
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => getExchange()}
              />
            }
            style={{
              paddingVertical: normalize(10),
            }}>
            <View style={styles.totalContain}>
              <Text style={styles.txtState}>{t(detail?.state || '')}</Text>
            </View>
            <LineItem title={t('customer')} value={detail?.partner?.name} />
            <LineItem
              title={'Địa chỉ giao hàng'}
              value={detail?.partner_shipping_id?.name}
            />
            <LineItem title={'Số điện thoại'} value={detail?.phone} />
            <LineItem
              title={'Loại trả hàng'}
              value={detail?.type_return_id?.name}
            />
            <LineItem
              title={'Bảng giá'}
              value={detail?.pricelist_id_id?.name}
            />
            <LineItem title={'Ngày đổi hàng'} value={detail?.exchange_date} />
            <LineItem
              title={'Kho xuất hàng'}
              value={detail?.return_warehouse_id?.name}
            />
            <LineItem
              title={'Kho nhận hàng đổi'}
              value={detail?.exchange_warehouse_id?.name}
            />
            <LineItem title={'Điều khoản và điều kiện'} value={detail?.note} />
            <LineItem
              title={'Giá trị chênh lệch'}
              value={num2numDong(detail?.cost_difference)}
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
              <View style={styles.detail}>
                <FlatList
                  data={detail?.return_order_line}
                  keyExtractor={item => item.id}
                  renderItem={renderProduct}
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={false}
                />
                <View style={styles.totalContain}>
                  <Text style={styles.amountTotal}>
                    {'Tổng chưa thuế (hàng trả)'}:{'  '}
                    <Text style={styles.valueTotal}>
                      {num2numDong(detail?.amount_untaxed_return)}
                    </Text>
                  </Text>
                </View>
                <View style={styles.totalContain}>
                  <Text style={styles.amountTotal}>
                    {'Tổng thuế (hàng trả)'}:{'  '}
                    <Text style={styles.valueTotal}>
                      {num2numDong(detail?.amount_tax_return)}
                    </Text>
                  </Text>
                </View>
                <View style={styles.totalContain}>
                  <Text style={styles.amountTotal}>
                    {'Tổng tiền (hàng trả)'}:{'  '}
                    <Text style={styles.valueTotal}>
                      {num2numDong(detail?.amount_total_return)}
                    </Text>
                  </Text>
                </View>
              </View>
              <View style={styles.detail}>
                <FlatList
                  data={detail?.exchange_order_line}
                  keyExtractor={item => item.id}
                  renderItem={renderProduct}
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={false}
                />
                <View style={styles.totalContain}>
                  <Text style={styles.amountTotal}>
                    {'Tổng chưa thuế (hàng đổi)'}:{'  '}
                    <Text style={styles.valueTotal}>
                      {num2numDong(detail?.amount_untaxed_exchange)}
                    </Text>
                  </Text>
                </View>
                <View style={styles.totalContain}>
                  <Text style={styles.amountTotal}>
                    {'Tổng thuế (hàng đổi)'}:{'  '}
                    <Text style={styles.valueTotal}>
                      {num2numDong(detail?.amount_tax_exchange)}
                    </Text>
                  </Text>
                </View>
                <View style={styles.totalContain}>
                  <Text style={styles.amountTotal}>
                    {'Tổng tiền (hàng đổi)'}:{'  '}
                    <Text style={styles.valueTotal}>
                      {num2numDong(detail?.amount_total_exchange)}
                    </Text>
                  </Text>
                </View>
              </View>
              <View style={styles.detail}>
                <LineItem
                  title={t('sales_staff')}
                  value={detail?.user_id?.name}
                />
                <LineItem title={'Chi nhánh'} value={detail?.branch_id?.name} />
              </View>
            </ScrollView>
          </ScrollView>
          <View style={styles.viewButton}>
            <FlatList
              data={detail.buttons}
              keyExtractor={(_, index) => String(index)}
              numColumns={2}
              renderItem={renderItemButton}
            />
          </View>
        </>
      )}
    </View>
  );
}
