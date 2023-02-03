import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Thumbnail} from 'native-base';
import normalize from 'react-native-normalize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import themeStyle from '@styles/theme.style';

const ContentList = ({item, index, onDelete, product}) => {
  return (
    <View style={styles.viewItem}>
      <View style={styles.viewImage}>
        <Thumbnail small source={require('@assets/icons/product.png')} />
      </View>
      <View style={styles.viewUser}>
        {product ? (
          <Text style={styles.title}>
            {item?.default_code && (
              <Text style={styles.default_code}>[{item?.default_code}]</Text>
            )}{' '}
            {item.name} {item?.default_code && '-'} {item?.uom_id?.name}
          </Text>
        ) : (
          <Text style={styles.title}>{item.name}</Text>
        )}
      </View>
      <View style={styles.buttonDelete}>
        <TouchableOpacity onPress={() => onDelete(index)}>
          <AntDesign name="closecircleo" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewImage: {
    flex: 1,
    alignSelf: 'center',
    margin: normalize(10),
  },
  viewUser: {
    flex: 7.8,
    marginHorizontal: normalize(25),
    justifyContent: 'center',
  },
  viewItem: {
    flexDirection: 'row',
    backgroundColor: '#DADADA4D',
    marginHorizontal: normalize(18, 'Width'),
    borderRadius: 5,
    marginBottom: normalize(15),
  },
  buttonDelete: {
    flex: 1.2,
    justifyContent: 'center',
  },
  title: {
    fontSize: 13,
    fontFamily: themeStyle.FONT_FAMILY,
  },
  default_code: {
    fontFamily: themeStyle.FONT_BOLD,
    fontSize: 13,
  },
});

export default ContentList;
