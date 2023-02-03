/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  ScrollView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
// import Toast from 'react-native-tiny-toast';
import normalize from 'react-native-normalize';
import HeaderBackStatusBar from '@components/headers/HeaderBackStatusBar';
import {
  onGetDetailOrder,
  handleActionSaleOrder,
  handleConfirmPromotion,
} from '@repository/Sales/Sales';
import {saleOrderStyles as styles} from '@styles/saleorder.style';
import {LocalizationContext} from '@context/index';
import {num2numDong, showMessage} from '@utils/index';
import PlaceholderScreen from '@components/loadings/PlaceholderScreen';
import ModalPromotions from '@components/modal/ModalPromotions';
// import ModalApprove from '@components/modal/ModalApprove';
import ItemProduct from '@components/Application/Sales/ItemProduct';
import ItemSeparator from '@components/Application/Sales/ItemSeparator';
import {setOrderLine} from '@redux/actions/dataAction';
import LineItem from '@components/Application/Sales/LineItem';
import moment from 'moment';
import {VN_FORMAT_DATE} from '@configs/Configs';
const WIDTH = Dimensions.get('screen').width;

export default function DetailOrderScreen({route}) {
  const {id} = route.params;
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const {t} = useContext(LocalizationContext);
  const accessToken = useSelector(states => states.auth.accessToken);
  const navigation = useNavigation();
  const [detail, setDetail] = useState({name: ''});
  const [amountTotal, setAmountTotal] = useState(0);
  const [amountUntaxed, setAmountUntaxed] = useState(0);
  const [amountTax, setAmountTax] = useState(0);
  const [tab, setTab] = useState([
    {key: 'detail', active: true, id: 0, name: 'Chi tiết đơn hàng'},
    {key: 'other', active: false, id: 1, name: 'Thông tin khác'},
    {key: 'ctkm', active: false, id: 2, name: 'CTKM có thể áp dụng'},
  ]);
  const [isOpenPromotion, setIsOpenPromotion] = useState(false);
  const [listPromotion, setListPromotion] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [isOpenApprove, setIsOpenApprove] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      setTab([
        {key: 'detail', active: true, id: 0, name: 'Chi tiết đơn hàng'},
        {key: 'other', active: false, id: 1, name: 'Thông tin khác'},
        {key: 'ctkm', active: false, id: 2, name: 'CTKM có thể áp dụng'},
      ]);
      getOrder();
    }, []),
  );

  // Chuyển tab thông tin
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
  const getOrder = () => {
    setRefreshing(true);
    onGetDetailOrder({
      accessToken: accessToken,
      id: id,
    })
      .then(res => {
        // console.log(JSON.stringify(res?.x_promotion_ids, null, 2));
        setDetail(res);
        setAmountUntaxed(res?.amount_untaxed);
        setAmountTax(res?.amount_tax);
        setAmountTotal(res?.amount_total);
        setLoading(false);
        setRefreshing(false);
      })
      .catch(err => {
        setLoading(false);
        showMessage(err);
        setRefreshing(false);
      });
  };

  const handleAction = key => {
    handleActionSaleOrder({
      id,
      accessToken,
      action: key,
    })
      .then(res => {
        if (
          res?.data?.x_promotion_ids?.filter(function (promotion) {
            return promotion.auto_applied === false;
          }).length > 0
        ) {
          setListPromotion(
            res?.data?.x_promotion_ids?.filter(function (promotion) {
              return promotion.auto_applied === false;
            }),
          );
          setIsOpenPromotion(true);
        } else {
          setLoading(true);
          showMessage(t('edit_success'));
          getOrder();
        }
      })
      .catch(err => {
        showMessage(err);
      });
    // }
  };

  const closeModalPromotion = () => {
    setIsOpenPromotion(false);
  };

  // Áp dụng chương trình khuyến mãi
  const applyPromotion = list => {
    if (
      list.filter(function (promotion) {
        return promotion.applied_promotion === true;
      }).length === 0
    ) {
      showMessage('Bạn chưa áp dụng CTKM nào!');
    } else {
      handleConfirmPromotion({
        id,
        accessToken,
        listPromotion: list.filter(function (promotion) {
          return promotion.applied_promotion === true;
        }),
        // .map(item => item.id),
      })
        .then(res => {
          showMessage('Áp dụng CTKM thành công!');
          setLoading(true);
          getOrder();
          setIsOpenPromotion(false);
        })
        .catch(err => {
          showMessage(err);
          console.log(err);
        });
    }
  };

  const onEdit = () => {
    dispatch(setOrderLine(detail?.order_line, true));
    navigation.navigate('CreateNewOrder', {detail: detail, isEdit: true});
  };

  const renderProduct = ({item, index}) => (
    <ItemProduct index={index} item={item} disabled={true} />
  );

  const renderSeparator = () => <ItemSeparator />;

  const renderItemButton = ({item, index}) => (
    <TouchableOpacity
      key={index}
      onPress={() => handleAction(item.key)}
      style={styles.buttonDetail(item)}>
      <Text style={styles.txtButton}>{item?.name}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.contain}>
      <HeaderBackStatusBar
        title={detail?.name}
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
                onRefresh={() => getOrder()}
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
              title={'Địa chỉ xuất hoá đơn'}
              value={detail?.partner_invoice_id?.name}
            />
            <LineItem
              title={'Địa chỉ giao hàng'}
              value={detail?.partner_shipping_id?.name}
            />
            <LineItem
              title={'Ngày đặt hàng'}
              value={moment(detail?.date_order).format(VN_FORMAT_DATE)}
            />
            <LineItem title={'Bảng giá'} value={detail?.pricelist_id} />
            <LineItem
              title={'Các điều khoản thanh toán'}
              value={detail?.payment_term_id?.name}
            />
            <LineItem title={'Kho'} value={detail?.warehouse_id?.name} />
            <LineItem title={'Kênh'} value={detail?.x_channel_id?.name} />
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
                  data={detail?.order_line}
                  keyExtractor={item => item.id}
                  renderItem={renderProduct}
                  ItemSeparatorComponent={renderSeparator}
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={false}
                />
              </View>
              <View style={styles.detail}>
                <LineItem
                  title={t('sales_staff')}
                  value={detail?.user_id?.name}
                />
                <LineItem
                  title={t('team_sales')}
                  value={detail?.team_id?.name}
                />
                <LineItem title={'Chi nhánh'} value={detail?.branch_id?.name} />
              </View>
              <View style={styles.detail}>
                <FlatList
                  data={detail?.x_promotion_ids}
                  keyExtractor={item => item.id}
                  renderItem={renderProduct}
                  ItemSeparatorComponent={renderSeparator}
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={false}
                />
              </View>
            </ScrollView>
            <View style={styles.totalContain}>
              <Text style={styles.amountTotal}>
                {'Tổng chưa thuế'}:{'  '}
                <Text style={styles.valueTotal}>
                  {num2numDong(amountUntaxed)}
                </Text>
              </Text>
            </View>
            <View style={styles.totalContain}>
              <Text style={styles.amountTotal}>
                {'Thuế'}:{'  '}
                <Text style={styles.valueTotal}>{num2numDong(amountTax)}</Text>
              </Text>
            </View>
            <View style={styles.totalContain}>
              <Text style={styles.amountTotal}>
                {'Tổng'}:{'  '}
                <Text style={styles.valueTotal}>
                  {num2numDong(amountTotal)}
                </Text>
              </Text>
            </View>
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
      <ModalPromotions
        isOpen={isOpenPromotion}
        data={listPromotion}
        onClose={closeModalPromotion}
        nameSaleOrder={detail?.name}
        namePartner={detail?.partner?.name}
        applyPromotion={applyPromotion}
      />
    </View>
  );
}
