import HTTP from '@configs/HTTP';
// import moment from 'moment';

export const onGetListExchange = async ({
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
      '/sale_exchange',
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

export const onGetDetailExchange = async ({id = 0, accessToken = ''}) =>
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
      '/sale_exchange/detail',
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

export const handleActionExchange = async ({
  id = 0,
  accessToken = '',
  action,
}) =>
  new Promise((handleSuccess, handleError) => {
    let body = {
      access_token: accessToken,
      id: id,
      action,
    };
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    console.log(JSON.stringify(body, null, 2));
    HTTP.post(
      '/sale_exchange/action',
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
