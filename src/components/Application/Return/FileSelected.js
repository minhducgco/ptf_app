/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useState} from 'react';
import normalize from 'react-native-normalize';
import Icon from 'react-native-vector-icons/AntDesign';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {Linking, Text, TouchableOpacity, View, Image} from 'react-native';

import Colors from '@styles/color';
import ModalViewImg from '@components/Application/Return/ModalViewImg';
import {detailApproveStyle as styles} from '@styles/detailApprove.style';

export default function FileSelected({
  item,
  index,
  view = false,
  onRemove = () => {},
}) {
  const [isOpenModalFile, setIsOpenModalFile] = useState(false);
  const onOpenModalFile = () => {
    setIsOpenModalFile(true);
  };

  const onOpen = useCallback(async () => {
    const url = await Linking.canOpenURL(item?.url);
    if (url) {
      await Linking.openURL(item?.url);
    } else {
      console.log(`Lỗi khi di chuyển đến link ${item?.url}`);
    }
  }, [item?.url]);

  return (
    <View key={index}>
      <TouchableOpacity
        disabled={
          item?.name.includes('.docx') || item?.name.includes('.xlsx')
            ? true
            : false
        }
        onPress={item?.name.includes('.jpg') ? onOpenModalFile : onOpen}>
        <View style={styles.renderItemFile}>
          <View style={[styles.viewFlex(0.95)]}>
            <Icon
              name={
                item?.name.includes('.jpg')
                  ? 'jpgfile1'
                  : item?.name.includes('.pdf')
                  ? 'pdffile1'
                  : item?.name.includes('.xlsx')
                  ? 'exclefile1'
                  : item?.name.includes('.docx')
                  ? 'wordfile1'
                  : 'file1'
              }
              size={normalize(30)}
              color={
                item?.name.includes('.jpg')
                  ? Colors.VIOLET
                  : item?.name.includes('.pdf')
                  ? Colors.MONZA
                  : item?.name.includes('.xlsx')
                  ? Colors.MANTIS
                  : item?.name.includes('.docx')
                  ? Colors.FUN_BLUE
                  : Colors.BLACK
              }
            />
            <Text numberOfLines={1} style={[styles.txtFile, {flex: 1}]}>
              {item?.name}
            </Text>
          </View>
          {!view && (
            <TouchableOpacity
              style={[
                styles.viewFlex(0.05),
                {marginHorizontal: normalize(6), alignSelf: 'center'},
              ]}
              onPress={() => onRemove(index)}>
              <AntDesign name="closecircle" size={15} color="#000" />
            </TouchableOpacity>
          )}
        </View>
        <Image
          resizeMode={'contain'}
          style={{
            width: '80%',
            height: normalize(200),
            alignSelf: 'center',
            marginVertical: normalize(10),
          }}
          source={
            item?.url
              ? {
                  uri: item?.url,
                }
              : {
                  uri: `data:application/pdf;base64,${item?.value}`,
                }
          }
        />
      </TouchableOpacity>
      <ModalViewImg
        visible={isOpenModalFile}
        setVisible={setIsOpenModalFile}
        data={item}
      />
    </View>
  );
}
