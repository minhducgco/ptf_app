import React from 'react';
import { Container, Content } from 'native-base';
import Modal from 'react-native-modalbox';
import {
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import Pdf from 'react-native-pdf';

export default function ModalViewPdf({ visible, setVisible, data }) {
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
                maxHeight: responsiveHeight(90),
                maxWidth: responsiveWidth(100),
            }}>
            <Container>
                <Content padder>
                    <Pdf
                        showsVerticalScrollIndicator={false}
                        style={{
                            height: responsiveHeight(90),
                            width: responsiveWidth(100),
                        }}
                        source={{
                            uri: `data:application/pdf;base64,${data?.value}`,
                        }}
                    />
                </Content>
            </Container>
        </Modal>
    );
}
