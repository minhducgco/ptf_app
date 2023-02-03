import HTTP from '@configs/HTTP';

export const onGetListReturn = async ({
  page = 1,
  accessToken = '',
  items_per_page = 10,
  state = '',
  code = '',
  value = '',
  x_is_return = true,
}) =>
  new Promise((handleSuccess, handleError) => {
    let body = {
      access_token: accessToken,
      page: page,
      items_per_page: items_per_page,
      state: state,
      x_is_return: x_is_return,
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

export const onGetDetailReturn = async ({id = 0, accessToken = ''}) =>
  new Promise((handleSuccess, handleError) => {
    let body = {
      access_token: accessToken,
      id: id,
      x_is_return: true,
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
