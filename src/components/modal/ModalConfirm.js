import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content, Form, Label, Textarea } from 'native-base';
import { Button } from 'react-native-paper';
import Modal from 'react-native-modalbox';
import { responsiveHeight } from 'react-native-responsive-dimensions';

import { LocalizationContext } from '@context/index';
import theme from '@styles/theme.style';
import color from '@styles/color';

export default function ModalConfirm({
    visible,
    setVisible,
    note,
    setNote,
    onAction,
    type,
}) {
    const { t } = useContext(LocalizationContext);
    const onClosed = () => {
        setVisible(false);
    };

    const onConfirm = () => {
        setVisible(false);
        onAction({ action: type });
    };

    return (
        <Modal
            entry="center"
            isOpen={visible}
            position="center"
            coverScreen={true}
            onClosed={onClosed}
            style={{ maxHeight: responsiveHeight(31) }}>
            <Container>
                <Content padder>
                    <Form>
                        <Label style={styles.label}>
                            {type === 'action_approve'
                                ? t('confirm')
                                : t('refuse_reason')}
                        </Label>
                        <Textarea
                            bordered
                            rowSpan={5}
                            value={note}
                            style={styles.textBorder}
                            onChangeText={(text) => {
                                setNote(text);
                            }}
                        />
                    </Form>
                </Content>
                <View style={styles.viewRow}>
                    <Button
                        disabled={type === 'action_approve' ? false : !note}
                        uppercase={false}
                        color={color.MONZA}
                        mode={'contained'}
                        style={styles.styleMargin}
                        labelStyle={styles.labelButton}
                        onPress={onConfirm}>
                        {t('send_confirm')}
                    </Button>
                    <Button
                        uppercase={false}
                        color={theme.COLOR_LIGHT_GRAY}
                        mode={'contained'}
                        style={styles.styleMargin}
                        labelStyle={styles.labelButton}
                        onPress={onClosed}>
                        {t('cancel')}
                    </Button>
                </View>
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
    label: {
        fontFamily: theme.FONT_BOLD,
        fontSize: 14,
        color: '#000',
        textDecorationLine: 'underline',
    },
    labelButton: {
        fontFamily: theme.FONT_BOLD,
        color: '#fff',
        fontSize: 14,
        // flex: 0.4,
        // backgroundColor: themeStyle.COLOR_TC_360,
        // paddingVertical: 10,
        // marginHorizontal: 10,
        // paddingHorizontal: 15,
        // borderRadius: 10,
    },
    valueText: {
        fontFamily: theme.FONT_FAMILY,
        fontSize: 14,
        color: '#000',
    },
    textBorder: {
        fontFamily: theme.FONT_FAMILY,
        fontSize: 14,
        color: '#000',
        borderRadius: 8,
    },
    viewRow: { flexDirection: 'row', justifyContent: 'center' },
    styleMargin: {
        margin: 10,
    },
});
