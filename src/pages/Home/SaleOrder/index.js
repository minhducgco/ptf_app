import React from 'react';
import {Container, ScrollableTab, Tab, Tabs} from 'native-base';

import HeaderStatusBar from '@components/headers/HeaderBackStatusBar';
import {AddButton} from '@components/MiniComponent/MiniComponents';
import {scrollTabStyles, tabStyles} from '@styles/scroll.style';
import ContentBody from '@components/Application/Sales/ContentBody';

const tabs = [
  {name: 'Tất cả', key: '', sequence: 0},
  {name: 'Báo giá', key: 'draft', sequence: 1},
  {name: 'Báo giá đã gửi', key: 'sent', sequence: 2},
  {name: 'Đơn bán hàng', key: 'sale', sequence: 3},
  {name: 'Đã khóa', key: 'done', sequence: 4},
  {name: 'Đã hủy', key: 'cancel', sequence: 5},
];

export default function OrderListScreen({navigation}) {
  const _onPressFAB = () => {
    navigation.navigate('CreateNewOrder', {isCreate: true});
  };

  return (
    <Container>
      <HeaderStatusBar title={'Bán hàng'} hasBackgroundColor={false} />
      <Tabs
        renderTabBar={() => <ScrollableTab {...scrollTabStyles} />}
        locked={true}>
        {tabs.map(tab => {
          return (
            <Tab heading={tab.name} key={tab.sequence} {...tabStyles}>
              <ContentBody type={tab.key} />
            </Tab>
          );
        })}
      </Tabs>
      <AddButton func={() => _onPressFAB()} />
    </Container>
  );
}
