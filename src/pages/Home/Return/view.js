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
import normalize from 'react-native-normalize';
import HeaderBackStatusBar from '@components/headers/HeaderBackStatusBar';
import {
  onGetDetailReturn,
  handleActionSaleOrder,
  handleConfirmPromotion,
} from '@repository/Sales/Return';
import {saleOrderStyles as styles} from '@styles/saleorder.style';
import {LocalizationContext} from '@context/index';
import {num2numDong, showMessage} from '@utils/index';
import PlaceholderScreen from '@components/loadings/PlaceholderScreen';
import ModalPromotions from '@components/modal/ModalPromotions';
// import ModalApprove from '@components/modal/ModalApprove';
import ItemSeparator from '@components/Application/Sales/ItemSeparator';
import {setOrderLine} from '@redux/actions/dataAction';
import LineItem from '@components/Application/Sales/LineItem';
import moment from 'moment';
import {VN_FORMAT_DATE} from '@configs/Configs';
import FileSelected from '@components/Application/Return/FileSelected';
import RenderProduct from '@components/Application/Return/RenderProduct';
const WIDTH = Dimensions.get('screen').width;

export default function DetailReturnScreen({route}) {
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
    {key: 'file', active: false, id: 1, name: 'Tệp đính kèm'},
    {key: 'other', active: false, id: 2, name: 'Thông tin khác'},
  ]);
  const [isOpenPromotion, setIsOpenPromotion] = useState(false);
  // const [listPromotion, setListPromotion] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [isOpenApprove, setIsOpenApprove] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      setTab([
        {key: 'detail', active: true, id: 0, name: 'Chi tiết đơn hàng'},
        {key: 'file', active: false, id: 1, name: 'Tệp đính kèm'},
        {key: 'other', active: false, id: 2, name: 'Thông tin khác'},
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
    onGetDetailReturn({
      accessToken: accessToken,
      id: id,
    })
      .then(res => {
        // console.log(JSON.stringify(res, null, 2));
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
        // console.log(JSON.stringify(res, null, 2));
        setLoading(true);
        // Toast.hide(loadingAction);
        showMessage(t('edit_success'));
        getOrder();
      })
      .catch(err => {
        // Toast.hide(loadingAction);
        showMessage(err);
      });
    // }
  };

  const closeModalPromotion = () => {
    setIsOpenPromotion(false);
  };

  // Áp dụng chương trình khuyến mãi
  const applyPromotion = list => {
    // const loadingAction = Toast.showLoading();
    handleConfirmPromotion({id, accessToken, listPromotion: list})
      .then(res => {
        // Toast.hide(loadingAction);
        // Toast.showSuccess(t('edit_success'));
        setLoading(true);
        getOrder();
        setIsOpenPromotion(false);
      })
      .catch(err => {
        // Toast.hide(loadingAction);

        showMessage(err);
      });
  };

  const onEdit = () => {
    dispatch(setOrderLine(detail?.order_line, true));
    navigation.navigate('CreateNewReturn', {detail: detail, isEdit: true});
  };

  const renderProduct = ({item, index}) => (
    <RenderProduct index={index} item={item} disabled={true} />
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
        hasIcon={detail.x_state_return === 'draft'}
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
              <Text style={styles.txtState}>
                {detail?.x_state_return === 'draft'
                  ? 'Dự thảo'
                  : detail?.x_state_return === 'done'
                  ? 'Hoàn thành'
                  : detail?.x_state_return === 'sent'
                  ? 'Đã gửi duyệt'
                  : detail?.x_state_return === 'to_db_approve'
                  ? 'Chờ BLD duyệt'
                  : detail?.x_state_return === 'to_db_approve_condition'
                  ? 'Chờ BLD duyệt nhập kho'
                  : detail?.x_state_return === 'to_stock_approve'
                  ? 'Chờ thủ kho duyệt'
                  : detail?.x_state_return === 'to_bundle'
                  ? 'Bó kèm'
                  : detail?.x_state_return === 'to_condition_confirm'
                  ? 'Chờ thủ kho xác nhận'
                  : detail?.x_state_return === 'to_salesperson_approve'
                  ? 'Chờ NVKD duyệt'
                  : detail?.x_state_return === 'sale'
                  ? 'Đơn bán hàng'
                  : detail?.x_state_return === 'to_approve'
                  ? 'Chờ Admin duyệt'
                  : detail?.x_state_return === 'refuse'
                  ? 'Từ chối'
                  : 'Hủy'}
              </Text>
            </View>
            <LineItem title={t('customer')} value={detail?.partner?.name} />
            <LineItem title={'Số điện thoại'} value={detail?.phone} />
            <LineItem
              title={'Ngày trả hàng'}
              value={moment(detail?.date_order).format(VN_FORMAT_DATE)}
            />
            <LineItem title={'Bảng giá'} value={detail?.pricelist_id} />
            <LineItem
              title={'Các điều khoản thanh toán'}
              value={detail?.payment_term_id?.name}
            />
            <LineItem
              title={'Loại trả hàng'}
              value={detail?.x_type_return_id?.name}
            />
            <LineItem
              title={'Đơn bán hàng liên quan'}
              value={detail?.x_sale_order_id?.name}
            />
            <LineItem title={'Kho'} value={detail?.warehouse_id?.name} />
            <LineItem title={'Kênh'} value={detail?.x_channel_id?.name} />
            <LineItem
              title={'Các điều khoản và điều kiện'}
              value={detail?.note}
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
                  data={detail?.order_line}
                  keyExtractor={item => item.id}
                  renderItem={renderProduct}
                  ItemSeparatorComponent={renderSeparator}
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={false}
                />
              </View>
              <View style={styles.detail}>
                {detail?.x_sale_order_attach_ids?.map((it, ind) => (
                  <FileSelected item={it} index={ind} view={true} />
                ))}
              </View>
              <View style={styles.detail}>
                <LineItem
                  title={t('table_price')}
                  value={detail?.pricelist_id}
                />
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
        // data={listPromotion}
        onClose={closeModalPromotion}
        nameSaleOrder={detail?.name}
        namePartner={detail?.partner?.name}
        applyPromotion={applyPromotion}
      />
    </View>
  );
}
