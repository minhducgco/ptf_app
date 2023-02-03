import HTTP from '@configs/HTTP';
export const onGetListProduct = async ({access_token = '', name = ''}) =>
  new Promise((handleSuccess, handleError) => {
    let body = {
      access_token: access_token,
    };
    if (name) {
      body.name = name;
    }
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    // console.log(JSON.stringify(body, 0, 2));
    HTTP.post(
      '/products',
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

export const onGetLocationArchive = async ({access_token = ''}) =>
  new Promise((handleSuccess, handleError) => {
    let body = {
      access_token: access_token,
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
      '/stock_warehouse',
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
export const onGetCheck = ({
  access_token = '',
  list_warehouse_id = [],
  list_product_id = [],
}) =>
  new Promise((handleSuccess, handleError) => {
    let body = {
      access_token: access_token,
      list_product_id: list_product_id,
      list_warehouse_id: list_warehouse_id,
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
      '/inventory/check_quantity',
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
