/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useMemo, useContext} from 'react';
import {LocaleConfig} from 'react-native-calendars';
import {useSelector, useDispatch} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {getDeviceId, getDevice} from 'react-native-device-info';

import {showMessage} from '@utils/';
import {
  onRevoke,
  onUserLogin,
  onUserLogout,
  checkScreen,
} from '@redux/actions/authAction';
import Database from '@configs/Database';
import NoFooter from '@routes/no_footer/index';
import {onAddDeviceId} from '@redux/actions/configAction';
import Authentication from '@pages/Authentication/index';
import {logOut, signIn} from '@repository/Authentication/index';
import {LocalizationContext, AuthenticationContext} from './index';

const Stack = createStackNavigator();

export const AuthenticationProvider = () => {
  const {locale} = useContext(LocalizationContext);
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.auth.accessToken);

  useEffect(() => {
    dispatch(checkScreen('default'));
  }, []);

  useEffect(() => {
    const bootstrapAsync = async () => {
      LocaleConfig.defaultLocale = locale;
      let deviceId = getDeviceId();
      let accessTokenDB = null;
      let userDB = null;
      try {
        accessTokenDB = await Database.getAccessToken();
        userDB = await Database.getUserLogin();
      } catch (error) {
        if (__DEV__) {
          console.log('getAccessToken: ', error);
        }
      }

      getDevice().then(deviceInfo => {
        dispatch(onAddDeviceId(deviceId, deviceInfo));
      });

      dispatch(onRevoke(userDB, accessTokenDB));
    };
    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async data => {
        // const loading = Toast.showLoading();
        signIn(data)
          .then(async res => {
            // console.log(JSON.stringify(res, null, 2));
            // Toast.hide(loading);
            if (Object.keys(res).length > 0) {
              showMessage('Đăng nhập thành công!');
              await Database.setAccessToken({
                value: res.access_token,
              });
              await Database.setUserLogin({value: res});
              dispatch(onUserLogin(res, res.access_token));
            } else {
              showMessage('Đăng nhập thất bại, vui lòng kiểm tra lại!');
              showMessage('Thất bại ', res);
            }
            // Toast.hide();
          })
          .catch(err => {
            // Toast.hide(loading);
            showMessage('Đăng nhập thất bại, vui lòng kiểm tra lại!');
            console.log('Đăng nhập thất bại ', err);
          });
      },
      signOut: async currentAccessToken => {
        logOut({accessToken: currentAccessToken})
          .then(res => {
            console.log('res', res);
          })
          .catch(err => console.log('err', err));
        dispatch(onUserLogout());
      },
    }),
    [],
  );

  return (
    <AuthenticationContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {!accessToken ? (
            <Stack.Screen name="Auth" component={Authentication} />
          ) : (
            <Stack.Screen name="NoFooter" component={NoFooter} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthenticationContext.Provider>
  );
};
