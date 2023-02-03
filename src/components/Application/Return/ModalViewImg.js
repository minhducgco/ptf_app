import React from 'react';
import {Image} from 'react-native';
import Modal from 'react-native-modalbox';
import {Container, Content} from 'native-base';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import Colors from '@styles/color';
import normalize from 'react-native-normalize';

export default function ModalViewImg({visible, setVisible, data}) {
  const onClosed = () => {
    setVisible(false);
  };
  return (
    <Modal
      entry="center"
      isOpen={visible}
      position="center"
      coverScreen={true}
      onClosed={onClosed}
      style={{
        maxHeight: responsiveHeight(50),
        maxWidth: responsiveWidth(100),
        backgroundColor: Colors.WHITE,
        paddingBottom: normalize(20),
      }}>
      <Container>
        <Content padder>
          <Image
            resizeMode={'contain'}
            style={{height: responsiveHeight(50)}}
            source={{
              uri: `data:application/pdf;base64,${data?.value}`,
            }}
          />
        </Content>
      </Container>
    </Modal>
  );
}
