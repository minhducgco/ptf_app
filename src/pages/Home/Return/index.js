import React from 'react';
import {Container, ScrollableTab, Tab, Tabs} from 'native-base';

import HeaderStatusBar from '@components/headers/HeaderBackStatusBar';
import {AddButton} from '@components/MiniComponent/MiniComponents';
import {scrollTabStyles, tabStyles} from '@styles/scroll.style';
import ContentBody from '@components/Application/Return/ContentBody';

const tabs = [
  {name: 'Tất cả', key: '', sequence: 0},
  {name: 'Dự thảo', key: 'draft', sequence: 1},
  {name: 'Chờ Admin duyệt', key: 'to_approve', sequence: 2},
  {name: 'Admin đã duyệt', key: 'sent', sequence: 3},
  {name: 'Chờ BLD Duyệt', key: 'to_db_approve', sequence: 4},
  {name: 'Chờ BLD Duyệt Nhập kho', key: 'to_db_approve_condition', sequence: 5},
  {name: 'Chờ thủ kho duyệt', key: '', to_stock_approve: 6},
  {name: 'Bó kèm', key: 'to_bundle', sequence: 7},
  {name: 'Chờ thủ kho xác nhận', key: 'to_condition_confirm', sequence: 8},
  {name: 'Chờ NVKD duyệt', key: 'to_salesperson_approve', sequence: 9},
  {name: 'Đơn bán hàng', key: 'sale', sequence: 10},
  {name: 'Hoàn Thành', key: 'done', sequence: 11},
  {name: 'Từ chối', key: 'refuse', sequence: 12},
  {name: 'Hủy', key: 'cancel', sequence: 13},
];

export default function ReturnListScreen({navigation}) {
  const _onPressFAB = () => {
    navigation.navigate('CreateNewReturn', {isCreate: true});
  };

  return (
    <Container>
      <HeaderStatusBar title={'Trả hàng'} hasBackgroundColor={false} />
      <Tabs renderTabBar={() => <ScrollableTab {...scrollTabStyles} />}>
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
