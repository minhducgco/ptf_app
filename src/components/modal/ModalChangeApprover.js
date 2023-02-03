import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useContext } from 'react';
import Modal from 'react-native-modalbox';
import Colors from '@styles/color';
import { Button } from 'react-native-paper';
import normalize from 'react-native-normalize';
import themeStyle from '@styles/theme.style';
import { LocalizationContext } from '@context/index';
import PickerItem from '@components/Forms/PickerItem';
import { Content, Form, Label, Textarea } from 'native-base';

export default function ModalChangeApprover({
    visible,
    setVisible,
    sendValueMonth,
    listMonth,
    titleName,
    headerName,
    note,
    setNote,
    onAction,
}) {
    const [valueMonth, setValueMonth] = useState({ id: null, name: '' });
    const { t } = useContext(LocalizationContext);
    const onClose = () => {
        setVisible(false);
    };
    const setDataChangeMonth = (data) => {
        setValueMonth(data);
        sendValueMonth(data);
    };
    const onConfirm = (type) => {
        setVisible(false);
        onAction({ action: type });
    };
    return (
        <Modal
            isOpen={visible}
            onClosed={onClose}
            backdropOpacity={0.5}
            backdropColor={Colors.DUSTY_GRAY}
            backButtonClose={true}
            position={'center'}
            entry={'top'}
            swipeThreshold={50}
            style={styles.container}>
            <View style={styles.viewTitle}>
                <Text style={styles.title}>{t(headerName)}</Text>
            </View>
            <PickerItem
                title={titleName}
                name={valueMonth?.name}
                data={listMonth}
                setValue={setDataChangeMonth}
            />
            <Content padder>
                <Form>
                    <Label style={styles.label} />
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
                    disabled={!note ? true : false}
                    uppercase={false}
                    color={Colors.MONZA}
                    mode={'contained'}
                    style={styles.styleMargin}
                    labelStyle={styles.labelButton}
                    onPress={onConfirm}>
                    {t('send_confirm')}
                </Button>
                <Button
                    uppercase={false}
                    color={themeStyle.COLOR_LIGHT_GRAY}
                    mode={'contained'}
                    style={styles.styleMargin}
                    labelStyle={styles.labelButton}
                    onPress={onClose}>
                    {t('cancel')}
                </Button>
            </View>
        </Modal>
    );
}
const styles = StyleSheet.create({
    container: {
        // flex:1,
        backgroundColor: Colors.WHITE,
        height: normalize(300, 'width'),
        marginTop: normalize(40, 'width'),
    },
    label: {
        color: themeStyle.MAIN_COLOR,
        textAlign: 'center',
        fontSize: normalize(20),
        fontFamily: themeStyle.FONT_FAMILY,
        textDecorationLine: 'underline',
    },
    viewTitle: {
        height: normalize(50),
        justifyContent: 'center',
    },
    title: {
        color: themeStyle.MAIN_COLOR,
        textAlign: 'center',
        fontSize: normalize(20),
        fontFamily: themeStyle.FONT_FAMILY,
    },
    labelButton: {
        fontFamily: themeStyle.FONT_BOLD,
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
        fontFamily: themeStyle.FONT_FAMILY,
        fontSize: 14,
        color: '#000',
    },
    textBorder: {
        fontFamily: themeStyle.FONT_FAMILY,
        fontSize: 14,
        color: '#000',
        borderRadius: 8,
    },
    viewRow: { flexDirection: 'row', justifyContent: 'center' },
    styleMargin: {
        margin: 10,
    },
});
