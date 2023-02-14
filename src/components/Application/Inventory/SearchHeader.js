import React, {useState, useEffect, useRef} from 'react';
import {Item} from 'native-base';
import {Menu} from 'react-native-paper';
import normalize from 'react-native-normalize';
import {
  View,
  Text,
  FlatList,
  Platform,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Colors from '@styles/color';
import themeStyle from '@styles/theme.style';
import {IconDelete, IconSearch} from '@assets/svg/icons';

export default function SearchHeader({
  selectedQuantity = 0,
  textSearch,
  setTextSearch,
  onSearch,
  isChooseType = false,
  hasSelectedQuantity = true,
}) {
  const inputRef = useRef(null);
  const filterProduct = [
    {name: 'Tìm theo tên sản phẩm', code: 'name'},
    {name: 'Tìm theo mã sản phẩm', code: 'code'},
  ];
  const [visible, setVisible] = useState(false);
  const [location, setLocation] = useState({x: 0, y: 0});

  useEffect(() => {
    setTextSearch('');
  }, [setTextSearch]);

  const onChangeText = text => {
    setTextSearch(text);
    if (text) {
      isChooseType ? onShowPicker() : onSearch(text, 'name');
    } else {
      onDismiss();
      onSearch(text, 'name');
    }
  };

  const onShowPicker = () => {
    if (inputRef.current) {
      inputRef.current._root.measure((fx, fy, width, height, px, py) => {
        setLocation({x: px, y: py + 20});
      });
    }
    setVisible(true);
  };

  const onDismiss = () => {
    setVisible(false);
  };

  const onDeleteText = () => {
    setTextSearch('');
    onSearch('', 'name');
  };

  const renderItem = ({item, index}) => {
    return (
      <Menu.Item
        title={item.name}
        onPress={() => {
          onSearch(textSearch, item.code);
          onDismiss();
        }}
        titleStyle={styles.valueItem}
      />
    );
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.viewInput}>
        <Item style={styles.search}>
          <TextInput
            style={styles.txtSearch}
            placeholder={'Nhập tìm kiếm'}
            onChangeText={onChangeText}
            value={textSearch}
          />
          <Menu
            visible={visible}
            onDismiss={onDismiss}
            anchor={{x: location.x, y: location.y}}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              marginTop: normalize(225, 'height'),
              width: '60%',
              marginLeft: normalize(25, 'height'),
            }}>
            <FlatList
              data={filterProduct}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
            />
          </Menu>
          <View style={styles.iconSearch}>
            {textSearch ? (
              <TouchableOpacity onPress={onDeleteText}>
                <IconDelete color={Colors.DUSTY_GRAY} />
              </TouchableOpacity>
            ) : (
              <IconSearch
                color={Colors.DUSTY_GRAY}
                height={normalize(Platform.OS === 'ios' ? 17 : 20, 'height')}
                width={normalize(Platform.OS === 'ios' ? 17 : 20, 'width')}
              />
            )}
          </View>
        </Item>
        {hasSelectedQuantity && (
          <Text style={styles.txtTotal}>Đã chọn: {selectedQuantity}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listType: {flexDirection: 'row'},
  viewInput: {
    paddingVertical: normalize(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  headerContainer: {
    backgroundColor: Colors.WHITE,
  },
  txtTotal: {
    marginTop: normalize(10),
    fontFamily: themeStyle.FONT_FAMILY,
    fontSize: 14,
    color: '#626A72',
  },
  txtSearch: {
    width: '60%',
    paddingVertical: normalize(5),
    paddingLeft: normalize(10),
    fontFamily: themeStyle.FONT_FAMILY,
  },
  valueItem: {fontFamily: themeStyle.FONT_FAMILY, fontSize: 13},
  search: {
    borderWidth: 10,
    flex: 1,
    height: normalize(30),
    borderRadius: 10,
    flexDirection: 'row',
    alignContent: 'center',
    borderColor: Colors.DUSTY_GRAY,
    justifyContent: 'space-between',
  },
  iconSearch: {justifyContent: 'center', marginRight: normalize(15)},
  btnTab: active => ({
    paddingVertical: normalize(5),
    paddingHorizontal: normalize(10),
    backgroundColor: active ? Colors.LIGHT_GRAY : Colors.WHITE,
    borderBottomColor: active ? Colors.MONZA : Colors.WHITE,
    width: normalize(200),
    justifyContent: 'center',
    alignItems: 'center',
    height: normalize(50),
    borderBottomWidth: normalize(5),
  }),
  txtTab: active => ({
    color: active ? themeStyle.MAIN_COLOR : themeStyle.COLOR_GRAY,
    fontSize: 13,
    fontFamily: themeStyle.FONT_BOLD,
  }),
});
