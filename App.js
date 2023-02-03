import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {Provider as ProviderPaper} from 'react-native-paper';
import {StatusBar, ToastAndroid, BackHandler} from 'react-native';

import store from './src/redux/store';
import {LocalizationProvider} from './src/context/Localization';

const App = () => {
  let backAction = null;
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackHandle);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackHandle);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onBackHandle = () => {
    if (backAction + 2000 > new Date().getTime()) {
      BackHandler.exitApp();
    }
    backAction = new Date().getTime();
    ToastAndroid.show('Bấm thêm lần nữa để thoát!', ToastAndroid.SHORT);
    return true;
  };

  return (
    <ProviderPaper>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />
      <Provider Provider store={store}>
        <LocalizationProvider />
      </Provider>
    </ProviderPaper>
  );
};

export default App;
