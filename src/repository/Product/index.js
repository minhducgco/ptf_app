import HTTP from '@configs/HTTP';
export const onGetListProduct = async ({
  access_token = '',
  value = '',
  code = '',
  items_per_page = 15,
  page = 1,
  partner_id = null,
  x_brand_id = null,
}) =>
  new Promise((handleSuccess, handleError) => {
    let body = {
      access_token: access_token,
      items_per_page: items_per_page,
      page: page,
    };
    if (code && value) {
      body.code = code;
      body.value = value;
    }
    if (partner_id) {
      body.partner_id = partner_id;
    }
    if (x_brand_id) {
      body.x_brand_id = x_brand_id;
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

export const onGetDetailProduct = async ({access_token = '', id = 0}) =>
  new Promise((handleSuccess, handleError) => {
    let body = {
      access_token: access_token,
      id: id,
    };
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    HTTP.post(
      '/products/detail',
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
