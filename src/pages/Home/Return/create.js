import React, {useState} from 'react';
import {Container} from 'native-base';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {showMessage} from '@utils/';
import HeaderBackStatusBar from '@components/headers/HeaderBackStatusBar';
import OptionContent from '@components/Application/Return/OptionContent';
import {onCreateSaleOrder, onUpdateSaleOrder} from '@repository/Sales/Sales';
import {StackActions} from '@react-navigation/native';

const CreateNewReturn = ({route}) => {
  const detail = route?.params?.detail;
  const navigation = useNavigation();
  const teamLogin = useSelector(state => state.auth.user.team_id);
  const warehouseLogin = useSelector(state => state.auth.user.warehouse_id);
  const userLogin = useSelector(state => state.auth.user.user_id);
  const branchLogin = useSelector(state => state.auth.user.branch_id);
  const accessToken = useSelector(state => state.auth.accessToken);
  const [partner, setPartner] = useState(detail?.partner || {});
  const [contract, setContract] = useState({});
  const [partnerInvoice, setPartnerInvoice] = useState(
    detail?.partner_invoice_id || {},
  );
  const [partnerShipping, setPartnerShipping] = useState(
    detail?.partner_shipping_id || {},
  );
  // const [validityDate, setValidityDate] = useState(
  //   detail?.validity_date.slice(0, 10) || '',
  // );
  const [dateOrder, setDateOrder] = useState(
    detail?.date_order.slice(0, 10).split('-').reverse().join('/') ||
      moment().format('DD/MM/YYYY'),
  );
  const [expirationDate, setExpirationDate] = useState(
    detail?.date_order.slice(0, 10).split('-').reverse().join('/') ||
      moment().format('DD/MM/YYYY'),
  );
  const [priceList, setPriceList] = useState(detail?.pricelist_id || '');
  const [paymentTerm, setPaymentTerm] = useState(detail?.payment_term_id || {});
  const [chanel, setChannel] = useState(detail?.x_channel_id || {});
  const [orderDetails, setOrderDetails] = useState(
    detail?.order_line.map(item => ({
      name: item.name,
      x_factor_str: item.x_factor_str,
      x_expiration_date: item.x_expiration_date
        .slice(0, 10)
        .split('-')
        .reverse()
        .join('/'),
      product_id: item.product_id,
      uom_id: item.uom_id,
      product_oum: item.product_oum,
      id: item.product_id,
      tax_id: item.tax_id,
      default_code: item.default_code,
      price_unit: item.price_unit,
      price_subtotal: item.price_unit,
      x_product_qty_request: item.x_product_qty_request,
      x_product_return_qty: item.x_product_return_qty,
      product_uom_qty: item.product_uom_qty,
      active: true,
    })) || [],
  );
  const [user, setUser] = useState(detail?.user_id || userLogin);
  const [team, setTeam] = useState(detail?.team_id || teamLogin);
  const [branch, setBranch] = useState(detail?.branch_id || branchLogin);
  const [warehouse, setWarehouse] = useState(
    detail?.warehouse_id || warehouseLogin,
  );
  const [pickingPolicy, setPickingPolicy] = useState();
  const [commitmentDate, setCommitmentDate] = useState('');
  const [incoterm, setIncoterm] = useState(detail?.incoterm || {});
  const [typeReturn, setTypeReturn] = useState(detail?.x_type_return_id || {});
  const [note, setNote] = useState(detail?.note || '');
  const [listAddFile, setListAddFile] = useState(
    detail?.x_sale_order_attach_ids || [],
  );
  const [phone, setPhone] = useState(detail?.phone || '');
  const [saleOrder, setSaleOrder] = useState(detail?.x_sale_order_id || {});

  const _onAction = async () => {
    let data = {
      accessToken: accessToken,
      user_id: user.id,
      partner_id: partner.id,
      warehouse_id: warehouse.id,
      branch_id: branch.id,
      team_id: team.id,
      x_channel_id: chanel.id,
      date_order: expirationDate,
      payment_term_id: paymentTerm.id,
      partner_invoice_id: partnerInvoice.id,
      partner_shipping_id: partnerShipping.id,
      incoterm: incoterm.id,
      note: note,
      commitment_date: commitmentDate,
      order_line: orderDetails?.map(item => ({
        ...item,
        x_expiration_date:
          item?.x_expiration_date?.split('/').reverse().join('-') +
          ' ' +
          moment().format('HH:mm:ss'),
      })),
      x_is_return: true,
      x_type_return_id: typeReturn.id,
      x_sale_order_attach_ids: listAddFile,
      x_sale_order_id: saleOrder.id,
    };

    onCreateSaleOrder(data)
      .then(res => {
        showMessage('Tạo đơn trả hàng thành công!');
        navigation.dispatch(
          StackActions.replace('DetailReturnScreen', {
            id: res?.id,
            accessToken: accessToken,
          }),
        );
      })
      .catch(err => {
        console.log('onCreateSaleOrder: ', err);
        showMessage(err);
      });
  };

  const _onUpdate = async () => {
    let data = {
      id: detail?.id,
      accessToken: accessToken,
      user_id: user.id,
      partner_id: partner.id,
      warehouse_id: warehouse.id,
      branch_id: branch.id,
      // validity_date: validityDate,
      team_id: team.id,
      x_channel_id: chanel.id,
      date_order: expirationDate,
      payment_term_id: paymentTerm.id,
      partner_invoice_id: partnerInvoice.id,
      partner_shipping_id: partnerShipping.id,
      incoterm: incoterm.id,
      note: note,
      // picking_policy: pickingPolicy.key,
      commitment_date: commitmentDate,
      order_line: orderDetails?.map(item => ({
        ...item,
        x_expiration_date:
          item?.x_expiration_date?.split('/').reverse().join('-') +
          ' ' +
          moment().format('HH:mm:ss'),
      })),
      x_is_return: true,
      x_type_return_id: typeReturn.id,
      x_sale_order_attach_ids: listAddFile,
      x_sale_order_id: saleOrder.id,
    };
    onUpdateSaleOrder(data)
      .then(res => {
        showMessage('Cập nhật đơn bán hàng thành công!');
        navigation.goBack();
      })
      .catch(err => {
        console.log('_onUpdateSaleOrder: ', err);
        showMessage(err);
      });
  };

  return (
    <Container>
      <HeaderBackStatusBar
        title={detail?.name ? detail?.name : 'Tạo đơn trả hàng mới'}
      />
      <OptionContent
        isEdit={true}
        state={detail?.partner.name !== undefined ? 'edit' : 'draft_2'}
        _onAction={_onAction}
        _onUpdate={_onUpdate}
        partner={partner}
        setPartner={setPartner}
        contract={contract}
        setContract={setContract}
        partnerInvoice={partnerInvoice}
        setPartnerInvoice={setPartnerInvoice}
        partnerShipping={partnerShipping}
        setPartnerShipping={setPartnerShipping}
        typeReturn={typeReturn}
        setTypeReturn={setTypeReturn}
        dateOrder={dateOrder}
        setDateOrder={setDateOrder}
        priceList={priceList}
        setPriceList={setPriceList}
        paymentTerm={paymentTerm}
        setPaymentTerm={setPaymentTerm}
        chanel={chanel}
        setChannel={setChannel}
        orderDetails={orderDetails}
        setOrderDetails={setOrderDetails}
        user={user}
        setUser={setUser}
        team={team}
        setTeam={setTeam}
        branch={branch}
        setBranch={setBranch}
        warehouse={warehouse}
        setWarehouse={setWarehouse}
        pickingPolicy={pickingPolicy}
        setPickingPolicy={setPickingPolicy}
        commitmentDate={commitmentDate}
        setCommitmentDate={setCommitmentDate}
        incoterm={incoterm}
        setIncoterm={setIncoterm}
        note={note}
        setNote={setNote}
        listAddFile={listAddFile}
        setListAddFile={setListAddFile}
        phone={phone}
        setPhone={setPhone}
        expirationDate={expirationDate}
        setExpirationDate={setExpirationDate}
        saleOrder={saleOrder}
        setSaleOrder={setSaleOrder}
      />
    </Container>
  );
};

export default CreateNewReturn;
