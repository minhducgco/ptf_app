import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
/*-----------------------------  Home Screen  -------------------------------------------- */
import HomeScreen from '@pages/Home/HomeScreen/index';
/*-----------------------------   Settings    -------------------------------------------- */
import Settings from '@pages/Home/Settings/index';
import ChangePassword from '@pages/Home/Settings/ChangPassword';
/*-----------------------------      Sale     -------------------------------------------- */
import OrderListScreen from '@pages/Home/SaleOrder/index';
import DetailOrderScreen from '@pages/Home/SaleOrder/view';
import CreateNewOrder from '@pages/Home/SaleOrder/create';
/*-----------------------------    Inventory   -------------------------------------------- */
import Inventory from '@pages/Home/Inventory/index';
/*-----------------------------    Product     -------------------------------------------- */
import Product from '@pages/Home/Products/index';
import DetailProduct from '@pages/Home/Products/DetailProduct';
/*-----------------------------    Return     -------------------------------------------- */
import ReturnListScreen from '@pages/Home/Return/index';
import DetailReturnScreen from '@pages/Home/Return/view';
import CreateNewReturn from '@pages/Home/Return/create';

function NoFooterStack() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="SettingsScreen" component={Settings} />
      <Stack.Screen name="ChangePasswordScreen" component={ChangePassword} />
      <Stack.Screen name="OrderList" component={OrderListScreen} />
      <Stack.Screen name="DetailOrderScreen" component={DetailOrderScreen} />
      <Stack.Screen name="CreateNewOrder" component={CreateNewOrder} />
      <Stack.Screen name="Inventory" component={Inventory} />
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="DetailProduct" component={DetailProduct} />
      <Stack.Screen name="ReturnListScreen" component={ReturnListScreen} />
      <Stack.Screen name="DetailReturnScreen" component={DetailReturnScreen} />
      <Stack.Screen name="CreateNewReturn" component={CreateNewReturn} />
    </Stack.Navigator>
  );
}

export default function HomeContainer() {
  return <NoFooterStack />;
}
