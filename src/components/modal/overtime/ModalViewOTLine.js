import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Item, Content, Container } from 'native-base';
import Modal from 'react-native-modalbox';
import { LocalizationContext } from '@context/';
import Note from '../../Application/OvertimeComponent/Note';
import themeStyle from '@styles/theme.style';
import normalize from 'react-native-normalize';
import ButtonForms from '@components/Forms/ButtonForms';

const listExchangeOT = [
    { id: 1, name: 'Tính lương OT', key: 'net_money' },
    { id: 2, name: 'Nghỉ bù', key: 'compensatory_leave' },
];
export default function ModalViewOTLine({
    isOpen,
    itemOT,
    onCloseModal,
    setOpenRejectLine,
    onActionLine,
}) {
    const { t } = React.useContext(LocalizationContext);
    const [exchangeOT, setExchangeOT] = useState(listExchangeOT[0]);
    const [buttons, setButtons] = useState('');
    useEffect(() => {
        const exchangeItem = listExchangeOT.find(
            (it) => it.key === itemOT?.exchange_ot,
        );
        if (exchangeItem) {
            setExchangeOT(exchangeItem);
        }
        const arrButtons = itemOT?.line_buttons?.map((it) => ({
            key: it.action,
            name: it.name,
        }));
        setButtons(arrButtons);
    }, [itemOT]);
    const onAction = (item) => {
        switch (item.key) {
            case 'action_reject':
                // onCloseModal();
                setOpenRejectLine(true);
                break;
            default:
                onActionLine(item);
                onCloseModal();
                break;
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            swipeToClose={true}
            backButtonClose={true}
            position="center"
            entry="center"
            style={styles.modalView}
            onClosed={onCloseModal}>
            <Container>
                <Content>
                    <View style={styles.line}>
                        <Item style={styles.contain}>
                            <Text style={styles.noteModal}>
                                {t('employee_name')}:{' '}
                            </Text>

                            <Text style={styles.box}>
                                {itemOT?.employee_id?.name}
                            </Text>
                        </Item>
                    </View>
                    <View style={styles.line}>
                        <Item style={styles.contain}>
                            <Text style={styles.noteModal}>{t('day')}: </Text>

                            <Text style={styles.box}>{itemOT?.date}</Text>
                        </Item>
                    </View>
                    <View style={styles.line}>
                        <Item style={styles.contain}>
                            <Text style={styles.noteModal}>
                                {t('exchange_ot')}:{' '}
                            </Text>

                            <Text style={styles.box}>{exchangeOT.name}</Text>
                        </Item>
                    </View>
                    <View style={styles.line}>
                        <Item style={styles.contain}>
                            <Text style={styles.noteModal}>
                                {t('from_hour')}:{' '}
                            </Text>

                            <Text style={styles.box}>
                                {itemOT?.start_hours}
                            </Text>
                        </Item>
                    </View>
                    <View style={styles.line}>
                        <Item style={styles.contain}>
                            <Text style={styles.noteModal}>
                                {t('to_hour')}:{' '}
                            </Text>

                            <Text style={styles.box}>{itemOT?.stop_hours}</Text>
                        </Item>
                    </View>
                    <View style={styles.line}>
                        <Item style={styles.contain}>
                            <Text style={styles.noteModal}>
                                {t('total_hour')}
                            </Text>

                            <Text style={styles.box}>{itemOT?.overtime}</Text>
                        </Item>
                    </View>
                    <View style={styles.line}>
                        <View style={styles.line}>
                            <Note
                                value={itemOT?.note}
                                num={3}
                                disabled={true}
                            />
                        </View>
                    </View>
                </Content>
                <ButtonForms data={buttons} onAction={onAction} />
            </Container>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalView: {
        width: '95%',
        height: '70%',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
    },
    title: {
        fontSize: 14,
        fontFamily: themeStyle.FONT_BOLD,
        flex: 1.5,
    },
    box: {
        borderWidth: 0.5,
        borderColor: themeStyle.COLOR_GRAY,
        padding: 10,
        borderRadius: 5,
        flex: 3,
        fontFamily: themeStyle.FONT_FAMILY,
    },
    pickerExchange: {
        borderWidth: 0.5,
        borderColor: themeStyle.COLOR_GRAY,
        borderRadius: 5,
        flex: 3,
        fontFamily: themeStyle.FONT_FAMILY,
    },
    picker: {
        borderWidth: 0.2,
        borderColor: themeStyle.COLOR_GRAY,
        paddingLeft: normalize(5),
    },
    line: {
        marginVertical: normalize(7),
    },
    contain: {
        borderBottomWidth: 0,
        alignItems: 'center',
        borderWidth: 1,
    },
    noteModal: {
        fontSize: normalize(13),
        fontFamily: themeStyle.FONT_BOLD,
        flex: 1.5,
    },
});
