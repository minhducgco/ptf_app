import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PickerHours from '@components/Application/OvertimeComponent/PickerHours';
import { Item, Content } from 'native-base';
import Modal from 'react-native-modalbox';
import normalize from 'react-native-normalize';
import moment from 'moment';

import { LocalizationContext } from '@context/index';
import Note from '@components/Application/OvertimeComponent/Note';
import themeStyle from '@styles/theme.style';
import ButtonForms from '@components/Forms/ButtonForms';
import { UpdateButton } from '@data/index';
import PickerOtItem from '@components/Application/OvertimeComponent/PickerOtItem';
import { showMessage } from '@utils/index';
import PickerDate from '@components/Forms/PickerDate';

import { VN_FORMAT_DATE } from '@configs/Configs';
const listExchangeOT = [
    { id: 1, name: 'Tính lương OT', key: 'net_money' },
    { id: 2, name: 'Nghỉ bù', key: 'compensatory_leave' },
];
export default function ModalEditCreateOverTime({
    isOpen,
    itemOT,
    indexItem,
    employeeIds,
    _onCloseModal,
    list,
    setList,
}) {
    const { t } = React.useContext(LocalizationContext);
    const [note, setNote] = useState('');
    const [exchangeOT, setExchangeOT] = useState(listExchangeOT[0]);
    const [toHour, setToHour] = useState('00:00');
    const [fromHour, setFromHour] = useState('00:00');
    const [dateSelect, setDateSelect] = useState(
        new Date(new Date().setHours(24, 0, 0, 0)),
    );
    const [employeeId, setEmployeeId] = useState({ id: null, name: '' });
    useEffect(() => {
        if (itemOT) {
            setFromHour(itemOT?.start_hours || '00:00');
            setToHour(itemOT?.stop_hours || '00:00');
            setNote(itemOT?.note || '');
            setEmployeeId(itemOT?.employee_id || { id: null, name: '' });
            setDateSelect(
                itemOT?.date || new Date(new Date().setHours(24, 0, 0, 0)),
            );
            if (itemOT?.exchange_ot) {
                const exchangeItem = listExchangeOT.find(
                    (it) => it.key === itemOT?.exchange_ot,
                );
                if (exchangeItem) {
                    setExchangeOT(exchangeItem);
                }
            }
        } else {
            setEmployeeId({ id: null, name: '' });
            setToHour('00:00');
            setFromHour('00:00');
            setDateSelect(new Date(new Date().setHours(24, 0, 0, 0)));
            setNote('');
            setExchangeOT(listExchangeOT[0]);
        }
    }, [itemOT]);
    const total = useMemo(
        () =>
            parseFloat(
                toHour
                    .split(':')
                    .reduce(
                        (acc, time) =>
                            parseInt(acc, 10) + parseInt(time, 10) / 60,
                    ) -
                    fromHour
                        .split(':')
                        .reduce(
                            (acc, time) =>
                                parseInt(acc, 10) + parseInt(time, 10) / 60,
                        ),
            ).toFixed(2),
        [fromHour, toHour],
    );
    const onAction = (item) => {
        switch (item.key) {
            case 'confirm_update':
                if (!note) {
                    showMessage(t('field_require'));
                } else if (total < 0) {
                    showMessage(t('total_hours_cannot_be_negative'));
                } else {
                    const arrOT = [...list];
                    console.log('indexItem', indexItem);

                    if (
                        indexItem !== null &&
                        indexItem !== undefined &&
                        indexItem >= 0
                    ) {
                        arrOT[indexItem].start_hours = fromHour;
                        arrOT[indexItem].employee_id = employeeId;
                        arrOT[indexItem].stop_hours = toHour;
                        arrOT[indexItem].note = note;
                        arrOT[indexItem].date = moment(
                            dateSelect,
                            VN_FORMAT_DATE,
                        ).format(VN_FORMAT_DATE);
                        arrOT[indexItem].exchange_ot = exchangeOT.key;
                        arrOT[indexItem].overtime = parseFloat(total);
                    } else {
                        console.log(
                            'dateSelect',
                            moment(dateSelect, VN_FORMAT_DATE).format(
                                VN_FORMAT_DATE,
                            ),
                        );
                        arrOT.push({
                            employee_id: employeeId,
                            start_hours: fromHour,
                            stop_hours: toHour,
                            note: note,
                            exchange_ot: exchangeOT.key,
                            overtime: parseFloat(total),
                            state: 'draft',
                            date: moment(dateSelect, VN_FORMAT_DATE).format(
                                VN_FORMAT_DATE,
                            ),
                        });
                    }
                    setList(arrOT);
                    _onCloseModal();
                }
                break;
            case 'cancel_edit':
                _onCloseModal();
                break;
            default:
                _onCloseModal();
                break;
        }
    };
    const onChangeDate = (date) => {
        console.log(
            '🚀 ~ file: ModalEditCreateOverTime.js ~ line 125 ~ onChangeDate ~ date',
            date,
        );
        setDateSelect(date);
    };
    return (
        <Modal
            isOpen={isOpen}
            swipeToClose={true}
            backButtonClose={true}
            position="center"
            entry="center"
            style={styles.modalView}
            onClosed={_onCloseModal}>
            <Content>
                <View style={styles.line}>
                    <PickerOtItem
                        data={employeeIds}
                        value={employeeId}
                        setValue={setEmployeeId}
                        isRight={true}
                        title={t('employee_name')}
                    />
                </View>
                <View style={styles.line}>
                    <Item style={styles.contain}>
                        <Text style={styles.noteModal}>{t('day')}: </Text>

                        {/* <Text style={styles.box}>{itemOT?.date}</Text> */}
                        <View style={styles.pickerDate}>
                            <PickerDate
                                value={dateSelect}
                                setValue={onChangeDate}
                                hasTitle={false}
                                // styleDate={styles.pickerDate}
                            />
                        </View>
                    </Item>
                </View>
                <View style={styles.line}>
                    <PickerOtItem
                        data={listExchangeOT}
                        value={exchangeOT}
                        setValue={setExchangeOT}
                        isRight={true}
                        title={t('exchange_ot')}
                    />
                </View>

                <View style={styles.line}>
                    <PickerHours
                        title="from_hour"
                        value={fromHour}
                        setValue={setFromHour}
                    />
                </View>

                <View style={styles.line}>
                    <PickerHours
                        title="to_hour"
                        value={toHour}
                        setValue={setToHour}
                    />
                </View>
                <View style={styles.line}>
                    <Item style={styles.contain}>
                        <Text style={styles.noteModal}>{t('total_hour')}</Text>

                        <Text style={styles.box}>{total}</Text>
                    </Item>
                </View>
                <View style={styles.line}>
                    <Note
                        value={note}
                        num={3}
                        setValue={setNote}
                        require={true}
                    />
                </View>
            </Content>
            <ButtonForms data={UpdateButton} onAction={onAction} />
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
    pickerDate: {
        flex: 3,
        marginLeft: -10,
    },
});
