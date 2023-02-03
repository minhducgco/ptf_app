import PropTypes from 'prop-types';
import HTTP from '@configs/HTTP';
// import Database from '@configs/Database';
import DeviceInfo from 'react-native-device-info';

export const signIn = async ({login, password, type = 'odoo'}) => {
  const body = {
    login: login,
    password: password,
    firebase_token: '',
    debug: 1,
  };
  const device_id = await DeviceInfo.getUniqueId();
  if (device_id) {
    body.device_id = device_id;
  }
  // const token = await Database.getFirebaseToken();
  // if (token) {
  //   body.firebase_token = token;
  // }
  // const deviceName = await DeviceInfo.getDeviceName();
  // if (deviceName) {
  //   body.device_info = deviceName;
  // }
  console.log(JSON.stringify(body, null, 2));
  return new Promise((handleSuccess, handleError) => {
    let options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'application/json',
        'content-type': 'multipart/form-data',
      },
      body: JSON.stringify(body),
    };
    HTTP.post(
      '/sign_in',
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
};

export const logOut = async ({accessToken}) =>
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
    console.log(
      '🚀 ~ file: index.js ~ line 57 ~ newPromise ~ JSON.stringify(body)',
      JSON.stringify(body),
    );
    HTTP.post(
      '/logout',
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

signIn.propTypes = {
  login: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  type: PropTypes.string,
  deviceId: PropTypes.string.isRequired,
  deviceInfo: PropTypes.string,
  firebaseToken: PropTypes.string,
  accessToken: PropTypes.string,
};

logOut.propTypes = {
  accessToken: PropTypes.string.isRequired,
};

export const signUp = ({
  type,
  name,
  email,
  phone,
  password,
  deviceId,
  deviceInfo,
  firebaseToken,
}) =>
  new Promise((handleSuccess, handleError) => {
    let body = {
      type,
      name,
      email,
      phone,
      password,
      device_id: deviceId,
      device_info: deviceInfo,
      firebase_token: firebaseToken,
    };
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    HTTP.post(
      '/sign_up',
      options,
      res => {
        if (res.result !== undefined && res.result.code === 200) {
          handleSuccess(res.result.data);
        } else {
          handleError(res.result.message);
        }
      },
      err => {
        handleError(err);
      },
    );
  });
signUp.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  deviceId: PropTypes.string.isRequired,
  deviceInfo: PropTypes.string,
  firebaseToken: PropTypes.string,
};
export const getLogo_Url = ({logo_name = ''}) =>
  new Promise((handleSuccess, handleError) => {
    let body = {
      logo_name: logo_name,
    };
    //console.log(body);
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    HTTP.post(
      '/website/get_logo',
      options,
      res => {
        if (res.result !== undefined && res.result.code === 200) {
          handleSuccess(res.result.data);
        } else {
          handleError(res.result.message);
        }
      },
      err => {
        handleError(err);
      },
    );
  });
signUp.propTypes = {
  logo_name: PropTypes.string.isRequired,
};

export const changePassword = ({
  access_token,
  old_password,
  new_password,
  confirm_password,
}) =>
  new Promise((handleSuccess, handleError) => {
    let body = {
      access_token: access_token,
      old_password: old_password,
      new_password: new_password,
      confirm_password: confirm_password,
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
      '/website/change_password',
      options,
      res => {
        console.log(JSON.stringify(res, null, 2));
        if (res.result !== undefined && res.result.code === 200) {
          handleSuccess(res.result.data);
        } else {
          handleError(res.result.message);
        }
      },
      err => {
        handleError(err);
      },
    );
  });
