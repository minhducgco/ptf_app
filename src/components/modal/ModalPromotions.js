import React, {useContext, useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import normalize from 'react-native-normalize';
import Modal from 'react-native-modalbox';
import CheckBox from '@react-native-community/checkbox';
import {LocalizationContext} from '@context/index';
import Colors from '@styles/color';
import themeStyle from '@styles/theme.style';

export default function ModalPromotions({
  isOpen,
  onClose,
  data,
  namePartner,
  nameSaleOrder,
  applyPromotion,
}) {
  const {t} = useContext(LocalizationContext);
  const [listPromotion, setListPromotion] = useState([]);

  useEffect(() => {
    setListPromotion(data);
  }, [data]);

  const renderHeader = () => {
    return (
      <View style={styles.viewHeader}>
        <Text style={styles.txtFlex(1)}>{t('number_count')}</Text>
        <Text style={styles.txtFlex(7)}>{t('name')}</Text>
        <Text style={styles.txtFlex(2)}>{t('use')}</Text>
      </View>
    );
  };
  const onValueChange = (value, index) => {
    const newArr = [...listPromotion];
    newArr.forEach((element, idx) => {
      if (idx === index) {
        element.applied_promotion = value;
      }
    });
    setListPromotion(newArr);
  };
  const renderItem = ({item, index}) => {
    return (
      <ItemPromotion item={item} index={index} onValueChange={onValueChange} />
    );
  };
  return (
    <Modal
      isOpen={isOpen}
      onClosed={onClose}
      backdropColor={Colors.DUSTY_GRAY}
      backButtonClose={true}
      position={'center'}
      entry={'top'}
      swipeThreshold={50}
      swipeToClose={false}
      style={styles.container}>
      <Text style={styles.txtTitle}>Sản phẩm áp dụng theo CTKM</Text>
      <View style={styles.txtRow}>
        <Text style={styles.txtTitle}>Đơn hàng:</Text>
        <Text style={styles.txtContent}>{nameSaleOrder || ''}</Text>
      </View>
      <View style={styles.txtRow}>
        <Text style={styles.txtTitle}>Khách hàng:</Text>
        <Text style={styles.txtContent}>{namePartner || ''}</Text>
      </View>
      <Text style={styles.txtUsePromotions}>CTKM có thể áp dụng:</Text>
      <FlatList
        data={listPromotion}
        ListHeaderComponent={renderHeader}
        renderItem={renderItem}
        keyExtractor={(_, index) => String(index)}
      />
      <View style={styles.viewBtn}>
        <TouchableOpacity
          style={styles.btn(true)}
          onPress={() => applyPromotion(listPromotion)}>
          <Text style={styles.btnTxt(true)}>{t('use')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn(false)} onPress={onClose}>
          <Text style={styles.btnTxt(false)}>{t('cancel')}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
const ItemPromotion = ({item, index, onValueChange}) => {
  const [isCheck, setIsCheck] = useState(false);
  return (
    <View style={styles.viewDetail(index)}>
      <Text style={styles.txtFlex(1)}>{index + 1}</Text>
      <Text style={styles.txtFlex(4)}>{item.name}</Text>
      <View style={styles.checkBoxContain}>
        <CheckBox
          value={isCheck}
          onValueChange={value => {
            setIsCheck(!isCheck);
            onValueChange(value, index);
          }}
          tintColors={{
            true: themeStyle.MAIN_COLOR,
            false: themeStyle.COLOR_GREY,
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: Colors.WHITE,
    height: normalize(350),
  },
  txtTitle: {
    marginVertical: normalize(10),
    fontFamily: themeStyle.FONT_BOLD,
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: normalize(5),
  },
  txtRow: {
    // borderWidth: 1,
    flexDirection: 'row',
    marginHorizontal: normalize(10),
    // width: normalize(250),
  },
  txtContent: {
    fontFamily: themeStyle.FONT_FAMILY,
    fontSize: 14,
    alignSelf: 'center',
  },
  txtUsePromotions: {
    fontFamily: themeStyle.FONT_BOLD,
    fontSize: 14,
    color: Colors.MONZA,
    marginHorizontal: normalize(15),
  },
  viewHeader: {
    flexDirection: 'row',
    padding: normalize(5),
    marginHorizontal: normalize(10),
    backgroundColor: Colors.SILVER,
    borderWidth: normalize(2),
    height: normalize(30),
    borderColor: Colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(10),
  },
  viewDetail: index => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: normalize(5),
    marginHorizontal: normalize(10),
    backgroundColor: index % 2 === 0 ? Colors.WHITE : Colors.GALLERY,
    borderWidth: normalize(2),
    borderColor: Colors.SILVER,
  }),
  txtFlex: flex => ({
    fontSize: 14,
    color: Colors.BLACK,
    flex: flex,
    fontFamily: themeStyle.FONT_BOLD,
    alignSelf: 'center',
  }),
  viewBtn: {
    marginVertical: normalize(15),
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: normalize(20),
  },
  btn: color => ({
    marginTop: normalize(20),
    width: '48%',
    backgroundColor: color === true ? Colors.MONZA : Colors.IRON,
    borderRadius: normalize(8),
  }),
  btnTxt: color => ({
    color: color === true ? Colors.WHITE : Colors.BLACK,
    padding: normalize(8),
    textAlign: 'center',
    fontSize: 14,
    fontFamily: themeStyle.FONT_SEMI_BOLD,
  }),
  checkBoxContain: {flex: 1, alignItems: 'center'},
});
