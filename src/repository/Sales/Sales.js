import HTTP from '@configs/HTTP';
import moment from 'moment';

export const onGetListOrder = async ({
  page = 1,
  accessToken = '',
  items_per_page = 10,
  state = '',
  code = '',
  value = '',
}) =>
  new Promise((handleSuccess, handleError) => {
    let body = {
      access_token: accessToken,
      page: page,
      items_per_page: items_per_page,
      state: state,
    };
    if (code && value) {
      body.code = code;
      body.value = value;
    }
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    HTTP.post(
      '/sale_order',
      options,
      res => {
        if (res.code === 200) {
          handleSuccess(res.data);
        } else {
          handleError(res.message);
        }
      },
      err => {
        handleError(err);
      },
    );
  });

export const onGetDetailOrder = async ({id = 0, accessToken = ''}) =>
  new Promise((handleSuccess, handleError) => {
    let body = {
      access_token: accessToken,
      id: id,
    };
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    // console.log(body);
    HTTP.post(
      '/sale_order/detail',
      options,
      res => {
        if (res.code === 200) {
          handleSuccess(res.data);
        } else {
          handleError(res.message);
        }
      },
      err => {
        handleError(err);
      },
    );
  });
export const handleActionSaleOrder = async ({
  id = 0,
  accessToken = '',
  action,
  textCancel,
  approveType,
}) =>
  new Promise((handleSuccess, handleError) => {
    let body = {
      access_token: accessToken,
      id: id,
      action,
    };
    if (textCancel) {
      body.x_text_cancel = textCancel;
    }
    if (approveType) {
      body.approve_type = approveType;
    }
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    HTTP.post(
      '/sale_order/action',
      options,
      res => {
        if (res.code === 200) {
          handleSuccess(res.data);
        } else {
          handleError(res.message);
        }
      },
      err => {
        handleError(err);
      },
    );
  });
export const handleConfirmPromotion = async ({
  id = 0,
  accessToken = '',
  listPromotion,
}) =>
  new Promise((handleSuccess, handleError) => {
    let body = {
      access_token: accessToken,
      id: id,
      list_promotion: listPromotion,
    };
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    // console.log(JSON.stringify(body, null, 2));
    HTTP.post(
      '/sale_order/confirm_promotion',
      options,
      res => {
        if (res.code === 200) {
          handleSuccess(res.data);
        } else {
          handleError(res.message);
        }
      },
      err => {
        handleError(err);
      },
    );
  });

export const getListRoles = async ({accessToken = ''}) =>
  new Promise((handleSuccess, handleError) => {
    let body = {
      access_token: accessToken,
    };
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    HTTP.post(
      '/payment_terms',
      options,
      res => {
        if (res !== undefined && res.code === 200) {
          handleSuccess(res.data);
        } else {
          handleError(res.message);
        }
      },
      err => {
        handleError(err);
      },
    );
  });

export const getListChannels = async ({accessToken = ''}) =>
  new Promise((handleSuccess, handleError) => {
    let body = {
      access_token: accessToken,
    };
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    HTTP.post(
      '/channels',
      options,
      res => {
        if (res !== undefined && res.code === 200) {
          handleSuccess(res.data);
        } else {
          handleError(res.message);
        }
      },
      err => {
        handleError(err);
      },
    );
  });

export const getListWarehouses = async ({accessToken = ''}) =>
  new Promise((handleSuccess, handleError) => {
    let body = {
      access_token: accessToken,
    };
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    HTTP.post(
      '/warehouse',
      options,
      res => {
        if (res !== undefined && res.code === 200) {
          handleSuccess(res.data);
        } else {
          handleError(res.message);
        }
      },
      err => {
        handleError(err);
      },
    );
  });

export const getListUsers = async ({accessToken = ''}) =>
  new Promise((handleSuccess, handleError) => {
    let body = {
      access_token: accessToken,
    };
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    HTTP.post(
      '/users',
      options,
      res => {
        if (res !== undefined && res.code === 200) {
          handleSuccess(res.data);
        } else {
          handleError(res.message);
        }
      },
      err => {
        handleError(err);
      },
    );
  });

export const getListBranches = async ({accessToken = ''}) =>
  new Promise((handleSuccess, handleError) => {
    let body = {
      access_token: accessToken,
    };
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    HTTP.post(
      '/branches',
      options,
      res => {
        if (res !== undefined && res.code === 200) {
          handleSuccess(res.data);
        } else {
          handleError(res.message);
        }
      },
      err => {
        handleError(err);
      },
    );
  });

export const getListUom = async ({accessToken = ''}) =>
  new Promise((handleSuccess, handleError) => {
    let body = {
      access_token: accessToken,
    };
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    HTTP.post(
      '/uom',
      options,
      res => {
        if (res !== undefined && res.code === 200) {
          handleSuccess(res.data);
        } else {
          handleError(res.message);
        }
      },
      err => {
        handleError(err);
      },
    );
  });

export const getListTaxes = async ({accessToken = ''}) =>
  new Promise((handleSuccess, handleError) => {
    let body = {
      access_token: accessToken,
    };
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    HTTP.post(
      '/taxes',
      options,
      res => {
        if (res !== undefined && res.code === 200) {
          handleSuccess(res.data);
        } else {
          handleError(res.message);
        }
      },
      err => {
        handleError(err);
      },
    );
  });

export const getListCrmTeams = async ({accessToken = ''}) =>
  new Promise((handleSuccess, handleError) => {
    let body = {
      access_token: accessToken,
    };
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    HTTP.post(
      '/crm_team',
      options,
      res => {
        if (res !== undefined && res.code === 200) {
          handleSuccess(res.data);
        } else {
          handleError(res.message);
        }
      },
      err => {
        handleError(err);
      },
    );
  });

export const getProducts = async ({
  accessToken = '',
  items_per_page = 20,
  page = 1,
  value = '',
  partnerId = 0,
  code = '',
}) =>
  new Promise((handleSuccess, handleError) => {
    let body = {
      access_token: accessToken,
      items_per_page: items_per_page,
      page: page,
      partner_id: partnerId,
    };
    if (code && value) {
      body.code = code;
      body.value = value;
    }
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    HTTP.post(
      '/products',
      options,
      res => {
        if (res !== undefined && res.code === 200) {
          handleSuccess(res.data);
        } else {
          handleError(res.message);
        }
      },
      err => {
        handleError(err);
      },
    );
  });

export const getIncoterm = async ({accessToken = ''}) =>
  new Promise((handleSuccess, handleError) => {
    let body = {
      access_token: accessToken,
    };
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    HTTP.post(
      '/account_incoterms',
      options,
      res => {
        if (res !== undefined && res.code === 200) {
          handleSuccess(res.data);
        } else {
          handleError(res.message);
        }
      },
      err => {
        handleError(err);
      },
    );
  });

export const onCreateSaleOrder = async ({
  accessToken = '',
  partner_id = null,
  partner_invoice_id = null,
  partner_shipping_id = null,
  user_id = null,
  warehouse_id = null,
  branch_id = null,
  validity_date = '',
  team_id = null,
  x_channel_id = null,
  date_order = '',
  payment_term_id = null,
  incoterm = null,
  picking_policy = '',
  commitment_date = '',
  order_line = [],
  x_type_return_id = null,
  x_is_return = false,
}) =>
  new Promise((handleSuccess, handleError) => {
    let body = {
      access_token: accessToken,
      partner_id: partner_id,
      partner_invoice_id: partner_invoice_id,
      partner_shipping_id: partner_shipping_id,
    };
    if (user_id) {
      body.user_id = user_id;
    }
    if (warehouse_id) {
      body.warehouse_id = warehouse_id;
    }
    if (branch_id) {
      body.branch_id = branch_id;
    }
    if (validity_date) {
      body.validity_date =
        validity_date.split('/').reverse().join('-') +
        ' ' +
        moment().format('HH:mm:ss');
    }
    if (team_id) {
      body.team_id = team_id;
    }
    if (x_channel_id) {
      body.x_channel_id = x_channel_id;
    }
    if (date_order) {
      body.date_order =
        date_order.split('/').reverse().join('-') +
        ' ' +
        moment().format('HH:mm:ss');
    }
    if (payment_term_id) {
      body.payment_term_id = payment_term_id;
    }
    if (incoterm) {
      body.incoterm = incoterm;
    }
    if (picking_policy) {
      body.picking_policy = picking_policy;
    }
    if (commitment_date) {
      body.commitment_date =
        commitment_date.split('/').reverse().join('-') +
        ' ' +
        moment().format('HH:mm:ss');
    }
    if (order_line.length > 0) {
      body.order_line = order_line;
    }
    if (x_is_return) {
      body.x_is_return = x_is_return;
    }
    if (x_type_return_id) {
      body.x_type_return_id = x_type_return_id;
    }
    // console.log(JSON.stringify(body, null, 2));
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    console.log(JSON.stringify(body, null, 2));
    HTTP.post(
      '/sale_order/create',
      options,
      res => {
        if (res.code === 200) {
          handleSuccess(res.data);
        } else {
          handleError(res.message);
        }
      },
      err => {
        handleError(err);
      },
    );
  });

export const onUpdateSaleOrder = async ({
  id = null,
  accessToken = '',
  partner_id = null,
  partner_invoice_id = null,
  partner_shipping_id = null,
  user_id = null,
  warehouse_id = null,
  branch_id = null,
  validity_date = '',
  team_id = null,
  x_channel_id = null,
  date_order = '',
  payment_term_id = null,
  incoterm = null,
  picking_policy = '',
  commitment_date = '',
  order_line = [],
  x_type_return_id = null,
  x_is_return = false,
}) =>
  new Promise((handleSuccess, handleError) => {
    let body = {
      id: id,
      access_token: accessToken,
      partner_id: partner_id,
      partner_invoice_id: partner_invoice_id,
      partner_shipping_id: partner_shipping_id,
    };
    if (user_id) {
      body.user_id = user_id;
    }
    if (warehouse_id) {
      body.warehouse_id = warehouse_id;
    }
    if (branch_id) {
      body.branch_id = branch_id;
    }
    if (validity_date) {
      body.validity_date =
        validity_date.split('/').reverse().join('-') +
        ' ' +
        moment().format('HH:mm:ss');
    }
    if (team_id) {
      body.team_id = team_id;
    }
    if (x_channel_id) {
      body.x_channel_id = x_channel_id;
    }
    if (date_order) {
      body.date_order =
        date_order.split('/').reverse().join('-') +
        ' ' +
        moment().format('HH:mm:ss');
    }
    if (payment_term_id) {
      body.payment_term_id = payment_term_id;
    }
    if (incoterm) {
      body.incoterm = incoterm;
    }
    if (picking_policy) {
      body.picking_policy = picking_policy;
    }
    if (commitment_date) {
      body.commitment_date =
        commitment_date.split('/').reverse().join('-') +
        ' ' +
        moment().format('HH:mm:ss');
    }
    if (order_line.length > 0) {
      body.order_line = order_line;
    }
    if (x_is_return) {
      body.x_is_return = x_is_return;
    }
    if (x_type_return_id) {
      body.x_type_return_id = x_type_return_id;
    }
    // console.log(JSON.stringify(body, null, 2));
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    HTTP.post(
      '/sale_order/update',
      options,
      res => {
        if (res.code === 200) {
          handleSuccess(res.data);
        } else {
          handleError(res.message);
        }
      },
      err => {
        handleError(err);
      },
    );
  });

export const getTypeRepair = async ({accessToken = ''}) =>
  new Promise((handleSuccess, handleError) => {
    let body = {
      access_token: accessToken,
    };
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    HTTP.post(
      '/sale_order/type_return',
      options,
      res => {
        if (res !== undefined && res.code === 200) {
          handleSuccess(res.data);
        } else {
          handleError(res.message);
        }
      },
      err => {
        handleError(err);
      },
    );
  });
