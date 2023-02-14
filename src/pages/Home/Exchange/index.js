import React from 'react';
import {Container, ScrollableTab, Tab, Tabs} from 'native-base';

import HeaderStatusBar from '@components/headers/HeaderBackStatusBar';
import {AddButton} from '@components/MiniComponent/MiniComponents';
import {scrollTabStyles, tabStyles} from '@styles/scroll.style';
import ContentBody from '@components/Application/Exchange/ContentBody';

const tabs = [
  {name: 'Tất cả', key: '', sequence: 0},
  {name: 'Dự thảo', key: 'draft', sequence: 1},
  {name: 'Chờ duyệt', key: 'pending', sequence: 2},
  {name: 'Chờ BLD duyệt', key: 'to_dm_approve', sequence: 3},
  {name: 'Đã duyệt', key: 'approved', sequence: 4},
  {name: 'Từ chối', key: 'refuse', sequence: 5},
  {name: 'Hủy', key: 'cancel', sequence: 6},
];

export default function ExchangeListScreen({navigation}) {
  const _onPressFAB = () => {
    navigation.navigate('CreateNewExchange', {isCreate: true});
  };

  return (
    <Container>
      <HeaderStatusBar title={'Đổi hàng'} hasBackgroundColor={false} />
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
