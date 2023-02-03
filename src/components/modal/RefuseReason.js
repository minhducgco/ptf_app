/******************************************
 *  Author      : HoiHD
 *  Created On  : Mon Aug 17 2020
 *  File        : RefuseReason.js
 *  Description : Lý do từ chối modal
 *******************************************/
import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Form, Label, Textarea } from 'native-base';
import { Button } from 'react-native-paper';
import Modal from 'react-native-modalbox';
import { responsiveHeight } from 'react-native-responsive-dimensions';

import theme from '@styles/theme.style';

export default function RefuseReason({
    visible,
    setVisible,
    refuseReason,
    setRefuseReason,
    onAction,
    action = 'refuse',
    title = 'Lý do từ chối',
}) {
    const onClosed = () => {
        setVisible(false);
    };

    const onConfirm = () => {
        setVisible(false);
        onAction({ action: action });
    };

    return (
        <Modal
            entry="bottom"
            isOpen={visible}
            position="bottom"
            coverScreen={true}
            onClosed={onClosed}
            style={{ maxHeight: responsiveHeight(31) }}>
            <Container>
                <Content padder>
                    <Form>
                        <Label
                            style={[
                                styles.title,
                                { textDecorationLine: 'underline' },
                            ]}>
                            {title}:
                        </Label>
                        <Textarea
                            bordered
                            rowSpan={5}
                            value={refuseReason}
                            style={[styles.valueText, { borderRadius: 8 }]}
                            onChangeText={(text) => setRefuseReason(text)}
                        />
                    </Form>
                </Content>
                <Button
                    disabled={!Boolean(refuseReason)}
                    uppercase={false}
                    color={theme.MAIN_COLOR}
                    mode={'contained'}
                    style={{ margin: 10 }}
                    labelStyle={styles.labelButton}
                    onPress={onConfirm}>
                    Xác nhận
                </Button>
            </Container>
        </Modal>
    );
}

const styles = StyleSheet.create({
    title: {
        fontFamily: theme.FONT_BOLD,
        fontSize: 14,
        color: '#000',
    },
    labelButton: {
        fontFamily: theme.FONT_BOLD,
        color: '#fff',
        fontSize: 14,
    },
    valueText: {
        fontFamily: theme.FONT_FAMILY,
        fontSize: 14,
        color: '#000',
    },
});
