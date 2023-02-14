/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import {Container} from 'native-base';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {showMessage} from '@utils/';
import {StackActions} from '@react-navigation/native';
import HeaderBackStatusBar from '@components/headers/HeaderBackStatusBar';
import OptionContent from '@components/Application/Exchange/OptionContent';
// import {onCreateSaleOrder, onUpdateSaleOrder} from '@repository/Sales/Sales';

const CreateNewExchange = ({route}) => {
  const detail = route?.params?.detail;
  const navigation = useNavigation();
  const warehouseLogin = useSelector(state => state.auth.user.warehouse_id);
  const accessToken = useSelector(state => state.auth.accessToken);
  const [partner, setPartner] = useState(detail?.partner || {});
  const [phone, setPhone] = useState(detail?.phone || '');
  const [note, setNote] = useState(detail?.note || '');
  const [typeReturn, setTypeReturn] = useState(detail?.type_return_id || {});
  const [partnerShipping, setPartnerShipping] = useState(
    detail?.partner_shipping_id || {},
  );
  const [priceList, setPriceList] = useState(
    detail?.pricelist_id_id?.name || '',
  );
  const [exchangeDate, setExchangeDate] = useState(
    detail?.exchange_date || moment().format('DD/MM/YYYY HH:mm:ss'),
  );
  const [exChangeWarehouse, setExchangeWarehouse] = useState(
    detail?.exchange_warehouse_id || warehouseLogin,
  );
  const [returnWarehouse, setReturnWarehouse] = useState(
    detail?.return_warehouse_id || warehouseLogin,
  );
  const [exchangeOrder, setExchangeOrder] = useState(
    detail?.exchange_order_line || [],
  );
  const [returnOrder, setReturnOrder] = useState(
    detail?.return_order_line || [],
  );

  const _onAction = async () => {
    console.log(exchangeDate);
  };

  const _onUpdate = async () => {};

  return (
    <Container>
      <HeaderBackStatusBar
        title={detail?.name ? detail?.name : 'Tạo đơn đổi hàng mới'}
      />
      <OptionContent
        isEdit={true}
        state={detail?.partner.name !== undefined ? 'edit' : 'draft_2'}
        partner={partner}
        setPartner={setPartner}
        phone={phone}
        setPhone={setPhone}
        typeReturn={typeReturn}
        setTypeReturn={setTypeReturn}
        note={note}
        setNote={setNote}
        partnerShipping={partnerShipping}
        setPartnerShipping={setPartnerShipping}
        priceList={priceList}
        setPriceList={setPriceList}
        exchangeDate={exchangeDate}
        setExchangeDate={setExchangeDate}
        exChangeWarehouse={exChangeWarehouse}
        setExchangeWarehouse={setExchangeWarehouse}
        returnWarehouse={returnWarehouse}
        setReturnWarehouse={setReturnWarehouse}
        exchangeOrder={exchangeOrder}
        setExchangeOrder={setExchangeOrder}
        returnOrder={returnOrder}
        setReturnOrder={setReturnOrder}
        _onAction={_onAction}
        _onUpdate={_onUpdate}
      />
    </Container>
  );
};

export default CreateNewExchange;
