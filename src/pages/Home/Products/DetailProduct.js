import React, {useContext, useEffect, useState} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {LocalizationContext} from '@context/index';
import {detailProduct as styles} from '@styles/detailProduct.style';
import HeaderBackStatusBar from '@components/headers/HeaderBackStatusBar';
import ItemLine from '@components/Application/Partner/ItemLine';
import {onGetDetailProduct} from '@repository/Product';
import PlaceholderScreen from '@components/loadings/PlaceholderScreen';
import {num2numDong} from '@utils/';

export default function DetailProduct({route}) {
  const {id} = route.params;
  const {name} = route.params;
  const {t} = useContext(LocalizationContext);
  const accessToken = useSelector(state => state.auth.accessToken);
  const [dataDetail, setDataDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    onGetDetailProduct({access_token: accessToken, id: id})
      .then(res => {
        // console.log(JSON.stringify(res.data, null, 2));
        setDataDetail(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={styles.container}>
      <HeaderBackStatusBar title={name} />
      {isLoading ? (
        <PlaceholderScreen />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.viewIcon}>
            <View style={styles.viewImage}>
              <Image
                source={require('@assets/icons/default-product-image.png')}
                style={styles.imageIcon}
              />
            </View>
            <View style={styles.viewTxt}>
              <Text style={styles.txt(true)}>
                [{dataDetail?.default_code}] {dataDetail?.name} -{' '}
                {dataDetail?.uom_name}
              </Text>
              <Text style={styles.txt(false)}>
                {t('price_retail')}: {num2numDong(dataDetail?.price)}
              </Text>
              <Text style={styles.txt(false)}>
                {t('inventory')}: {dataDetail?.qty_available}
              </Text>
            </View>
          </View>
          <ItemLine
            title={t('code_internal')}
            value={dataDetail?.default_code}
          />
          <ItemLine title={'M?? v???ch'} value={dataDetail?.barcode} />
          <ItemLine
            title={'Nh??m s???n ph???m '}
            value={dataDetail?.categ_id?.name}
          />
          <ItemLine
            title={'Lo???i s???n ph???m'}
            value={
              dataDetail?.type === 'product'
                ? 'S???n ph???m l??u kho'
                : 'consu'
                ? 'Ti??u d??ng'
                : 'D???ch v???'
            }
          />
          <ItemLine title={'????n v??? t??nh'} value={dataDetail?.uom_name} />
          <ItemLine
            title={'????n v??? t??nh mua h??ng'}
            value={dataDetail?.uom_po_id}
          />
          <ItemLine title={'Ghi ch?? n???i b???'} value={dataDetail?.description} />
        </ScrollView>
      )}
    </View>
  );
}
