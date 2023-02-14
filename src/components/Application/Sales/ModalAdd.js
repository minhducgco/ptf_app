import React, {useState, useEffect} from 'react';
import Modal from 'react-native-modalbox';
import normalize from 'react-native-normalize';
import {StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import {ListItem, Icon, Left, Right, Text, Container} from 'native-base';

import Colors from '@styles/color';
import theme from '@styles/theme.style';
import SearchHeader from '../Inventory/SearchHeader';
import ButtonForms from '@components/Forms/ButtonForms';

const ModalAdd = ({
  visible,
  setVisible,
  listItem,
  listSelected = [],
  addItem,
  isLoadData,
  setValue,
  onClose,
  isChooseType = false,
  title,
  reloadList,
  setReloadList,
}) => {
  const [searchText, setSearchText] = useState('');
  const [listEmployeeFilter, setListEmployeeFilter] = useState([]);
  const [listEmployeeFormat, setListEmployeeFormat] = useState([]);

  useEffect(() => {
    if (listSelected.length > 0) {
      const newList = listItem.map(item => {
        if (
          listSelected.findIndex(it => it.product_id === item.product_id) >= 0
        ) {
          return {
            ...item,
            active: true,
          };
        } else {
          return {
            ...item,
            active: false,
          };
        }
      });
      setListEmployeeFormat(newList);
      setListEmployeeFilter(newList);
      setReloadList(false);
    } else {
      setListEmployeeFilter(listItem);
      setListEmployeeFormat(listItem);
      setReloadList(false);
    }
  }, [listItem, listSelected, setReloadList, reloadList]);

  const addEmp = item => {
    addItem(item);
  };

  const _handleClickButton = item => {
    switch (item.key) {
      case 'add':
        setVisible(false);
        break;
      case 'cancel':
        setVisible(false);
        setValue([]);
        break;
      default:
        break;
    }
  };

  const _renderItem = ({item, index}) => {
    return (
      <ListItem button onPress={() => addEmp(item)}>
        <Left>
          <Text style={styles.userName}>
            {item?.default_code && (
              <Text style={styles.default_code}>[{item?.default_code}]</Text>
            )}{' '}
            {item.name} {item?.default_code && '-'} {item?.uom_id?.name}
          </Text>
        </Left>
        <Right>
          {item.active && (
            <Icon
              name="checkcircleo"
              type="AntDesign"
              style={styles.userCheckIcon}
            />
          )}
        </Right>
      </ListItem>
    );
  };

  const onSearch = (text, key) => {
    if (!text || text === '') {
      setListEmployeeFilter(listEmployeeFormat);
    } else {
      if (key === 'name') {
        let filteredName = listEmployeeFormat.filter(item => {
          return item.name
            .toLowerCase()
            .match(text.toString().toLowerCase().trim());
        });
        setListEmployeeFilter(filteredName);
      } else {
        let filteredName = listEmployeeFormat.filter(item => {
          return item.default_code
            .toLowerCase()
            .match(text.toString().toLowerCase().trim());
        });
        setListEmployeeFilter(filteredName);
      }
    }
  };

  return (
    <Modal
      isOpen={visible}
      style={styles.modal}
      swipeToClose={true}
      backButtonClose={true}
      onClosed={onClose}>
      <Container>
        <Text style={styles.txtTitle}>{title}</Text>
        <SearchHeader
          textSearch={searchText}
          setTextSearch={setSearchText}
          onSearch={onSearch}
          isChooseType={isChooseType}
          selectedQuantity={
            listEmployeeFilter.filter(function (product) {
              return product.active === true;
            }).length
          }
        />
        {isLoadData ? (
          <ActivityIndicator size="large" color={Colors.MONZA} />
        ) : (
          <FlatList
            data={listEmployeeFilter}
            renderItem={_renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </Container>
      <ButtonForms data={ButtonsApplyCancel} onAction={_handleClickButton} />
    </Modal>
  );
};

export default ModalAdd;

export const ButtonsApplyCancel = [
  {
    name: 'Áp dụng',
    key: 'add',
  },
];

const styles = StyleSheet.create({
  modal: {
    maxHeight: normalize(500),
    justifyContent: 'center',
    paddingHorizontal: normalize(10),
  },
  txtTitle: {
    fontFamily: theme.FONT_BOLD,
    fontSize: 16,
    alignSelf: 'center',
    marginTop: normalize(10),
  },
  userName: {
    fontFamily: theme.FONT_FAMILY,
    fontSize: normalize(16),
  },
  userCheckIcon: {
    fontSize: normalize(24),
    color: 'green',
  },
  separator: {width: 10},
  button: {
    flex: 1,
    justifyContent: 'center',
    margin: normalize(5),
  },
  textButton: {
    fontFamily: theme.FONT_BOLD,
    color: Colors.WHITE,
    fontSize: normalize(14, 'height'),
  },
  note: {
    marginLeft: 15,
    borderRadius: 7,
    fontFamily: theme.FONT_REGULAR,
  },
  titleColor: {
    fontFamily: theme.FONT_BOLD,
    color: theme.MAIN_COLOR,
    fontSize: 14,
  },
  title: {
    fontFamily: theme.FONT_BOLD,
    color: Colors.BLACK,
    fontSize: 14,
    marginLeft: normalize(16, 'width'),
    marginBottom: normalize(8, 'height'),
  },
  text: {
    fontFamily: theme.FONT_BOLD,
    color: Colors.BLACK,
    fontSize: 14,
    marginRight: normalize(5, 'width'),
  },
  subTitle: {
    fontFamily: theme.FONT_FAMILY,
    color: Colors.BLACK,
    fontSize: 14,
  },
  textStyle: {
    fontFamily: theme.FONT_FAMILY,
    color: Colors.WHITE,
    fontSize: 14,
  },
  viewItem: {
    flexDirection: 'row',
    height: normalize(80, 'height'),
    // padding: normalize(8),
    backgroundColor: Colors.ALABASTER,
    borderRadius: normalize(5),
    marginTop: normalize(8, 'height'),
  },
  viewText: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  touch: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  default_code: {
    fontFamily: theme.FONT_BOLD,
    color: Colors.BLACK,
    fontSize: 14,
  },
});
