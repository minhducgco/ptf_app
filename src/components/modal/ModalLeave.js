import { Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Container, Content, Form } from 'native-base';
import Modal from 'react-native-modalbox';
import Colors from '@styles/color';
import moment from 'moment';
import normalize from 'react-native-normalize';
import theme from '@styles/theme.style';
import { LocalizationContext } from '@context/index';
import PickerItem from '@components/Forms/PickerLeave';
import PickerDateItem from '@components/Forms/PickerDateItem';
import PickerHourItem from '@components/Forms/PickerHourItem';
import EditableItem from '@components/Application/BusinessTravelComponent/Forms/EditableItem';
import { ButtonsAddCancel } from '@data/index';
import ButtonForms from '@components/Forms/ButtonForms';
import { showMessage } from '@utils/';
import {
    onGetTypeLeaves,
    onGetGroupTypeLeaves,
    onGetRemainLeave,
} from '@repository/Application/timesheet/Leave';
import { VN_FORMAT_DATE, GL_FORMAT_DATE } from '@configs/Configs';
import LineItem from '@components/Forms/LineItem';

export default function ModalLeave({
    visible,
    setVisible,
    reason,
    setReason,
    valueTypesLeave,
    setValueTypesLeave,
    valueGroupTypesLeave,
    setValueGroupTypesLeave,
    totalLeave,
    setTotalLeave,
    lines,
    setLines,
    buttonList,
    setButtonList,
    indexLines,
    setIndexLines,
    setLeaveDays,
    leaveDays,
    isEdit,
    toDate,
    fromDate,
    setFromDate,
    setToDate,
    toTime,
    fromTime,
    setToTime,
    setFromTime,
}) {
    const { t } = useContext(LocalizationContext);
    const accessToken = useSelector((state) => state.auth.accessToken);
    const [listTypesLeave, setListTypesLeave] = useState([]);
    const [listGroupTypesLeave, setListGroupTypesLeave] = useState([]);
    const [leaveDaysChild, setLeaveDaysChild] = useState(0);
    const [timeFrom, setTimeFrom] = useState(
        moment()
            .format('HH:mm')
            .split(':')
            .reduce((acc, time) => parseInt(acc, 10) + parseInt(time, 10) / 60),
    );
    const [timeTo, setTimeTo] = useState(
        moment()
            .format('HH:mm')
            .split(':')
            .reduce((acc, time) => parseInt(acc, 10) + parseInt(time, 10) / 60),
    );
    const momentTime = moment()
        .format('HH:mm')
        .split(':')
        .reduce((acc, time) => parseInt(acc, 10) + parseInt(time, 10) / 60); // Lấy giờ hiện tại
    const [cnt, setCnt] = useState(0);
    const startWork = 8; // Giờ vào làm
    const endWork = 17.5; // Giờ tan làm
    const startBreak = 12; // Giờ bắt đầu nghỉ trưa
    const endBreak = 13.5; // Giờ kết thúc nghỉ trưa
    const breakTime = 1.5; // Giờ nghỉ trưa
    const workTime = 8; // Tổng số giờ làm việc

    useEffect(() => {
        _onGetGroupTypeLeaves();
    }, [_onGetGroupTypeLeaves]);
    useEffect(() => {
        if (valueTypesLeave) {
            onGetRemainLeave({
                accessToken,
                leave_type_id: valueTypesLeave.id,
                from_datetime: moment(toDate, VN_FORMAT_DATE)
                    .format(GL_FORMAT_DATE)
                    .concat(' ', moment(toTime, 'HH:mm').format('HH:mm:ss')),
            })
                .then((res) => {
                    setTotalLeave(res.remain_leave.toString());
                })
                .catch((err) => {
                    console.log('err', err);
                });
        }
    }, [
        valueTypesLeave,
        accessToken,
        toDate,
        setTotalLeave,
        totalLeave,
        toTime,
    ]);
    useEffect(() => {
        const startDate = new Date(
            moment(fromDate, VN_FORMAT_DATE).format(GL_FORMAT_DATE).toString(),
        );
        const endDate = new Date(
            moment(toDate, VN_FORMAT_DATE).format(GL_FORMAT_DATE).toString(),
        );
        const nextDay = new Date(startDate);
        var total = 0;
        do {
            if (nextDay.getDay() >= 1) {
                total += 1;
            }
            setCnt(total);
            nextDay.setDate(nextDay.getDate() + 1);
        } while (nextDay <= endDate);
    }, [toDate, fromDate]);

    const _onGetGroupTypeLeaves = useCallback(() => {
        onGetGroupTypeLeaves({
            accessToken,
        })
            .then((res) => {
                setListGroupTypesLeave(res);
            })
            .catch((err) => {
                console.log('err', err);
            });
    }, [accessToken]);

    useEffect(() => {
        if (valueGroupTypesLeave) {
            onGetTypeLeaves({
                accessToken,
                group_id: valueGroupTypesLeave.id,
            })
                .then((res) => {
                    setListTypesLeave(res);
                })
                .catch((err) => {
                    console.log('err', err);
                });
        }
    }, [accessToken, valueGroupTypesLeave]);

    useEffect(() => {
        setTimeFrom(
            fromTime
                .split(':')
                .reduce(
                    (acc, time) => parseInt(acc, 10) + parseInt(time, 10) / 60,
                ),
        );
        setTimeTo(
            toTime
                .split(':')
                .reduce(
                    (acc, time) => parseInt(acc, 10) + parseInt(time, 10) / 60,
                ),
        );
    }, [toTime, fromTime]);

    useEffect(() => {
        if (
            moment(moment(toDate, VN_FORMAT_DATE).format(GL_FORMAT_DATE))
                .toDate()
                .getTime() -
                moment(moment(fromDate, VN_FORMAT_DATE).format(GL_FORMAT_DATE))
                    .toDate()
                    .getTime() <
            0
        ) {
            setLeaveDaysChild(0);
        } else if (timeFrom > endWork || timeTo > endWork) {
            setLeaveDaysChild(0);
        } else if (timeFrom < startWork || timeTo < startWork) {
            setLeaveDaysChild(0);
        } else if (
            (timeFrom < endBreak && timeFrom > startBreak) ||
            (timeTo < endBreak && timeTo > startBreak)
        ) {
            setLeaveDaysChild(0);
        } else if (timeFrom > timeTo) {
            setLeaveDaysChild(0);
        } else if (
            (timeFrom <= startBreak &&
                timeFrom >= startWork &&
                timeTo <= startBreak &&
                timeTo >= startWork) ||
            (timeTo <= endWork &&
                timeTo >= endBreak &&
                timeFrom <= endWork &&
                timeFrom >= endBreak)
        ) {
            setLeaveDaysChild(cnt - 1 + (timeTo - timeFrom) / workTime);
        } else {
            setLeaveDaysChild(
                cnt - 1 + (timeTo - timeFrom - breakTime) / workTime,
            );
        }
    }, [cnt, timeFrom, timeTo, toDate, fromDate]);

    const onAddCancel = (item) => {
        switch (item.key) {
            case 'add':
                if (!valueTypesLeave || reason === '') {
                    showMessage(t('input_missing'));
                } else if (
                    timeFrom === timeTo &&
                    timeFrom <= momentTime &&
                    timeTo <= momentTime &&
                    moment(
                        moment(toDate, VN_FORMAT_DATE).format(GL_FORMAT_DATE),
                    )
                        .toDate()
                        .getTime() ===
                        moment(
                            moment(fromDate, VN_FORMAT_DATE).format(
                                GL_FORMAT_DATE,
                            ),
                        )
                            .toDate()
                            .getTime()
                ) {
                    showMessage(t('please_select_time_and_date'));
                } else if (
                    leaveDaysChild > parseInt(totalLeave, 10) &&
                    (valueTypesLeave.id === 7 || valueTypesLeave.id === 5)
                ) {
                    showMessage(t('vacation_fund_is_over'));
                } else if (leaveDaysChild < 0) {
                    showMessage(t('start_date_less_than_end_date'));
                } else if (
                    moment(
                        moment(toDate, VN_FORMAT_DATE).format(GL_FORMAT_DATE),
                    )
                        .toDate()
                        .getTime() <
                    moment(
                        moment(fromDate, VN_FORMAT_DATE).format(GL_FORMAT_DATE),
                    )
                        .toDate()
                        .getTime()
                ) {
                    showMessage(t('start_date_less_than_end_date'));
                } else if (timeFrom > endWork || timeTo > endWork) {
                    showMessage(t('time_must_be_in_office_hours'));
                } else if (timeFrom < startWork || timeTo < startWork) {
                    showMessage(t('time_must_be_in_office_hours'));
                } else if (timeFrom > timeTo) {
                    showMessage(t('start_time_less_than_end_time'));
                } else if (
                    (timeFrom < endBreak && timeFrom > startBreak) ||
                    (timeTo < endBreak && timeTo > startBreak)
                ) {
                    showMessage(t('not_choose_on_break'));
                } else {
                    const source = {
                        leave_type_group_id: valueGroupTypesLeave,
                        leave_type_id: valueTypesLeave,
                        from_datetime: moment(fromDate, VN_FORMAT_DATE)
                            .format(GL_FORMAT_DATE)
                            .concat(
                                ' ',
                                moment(fromTime, 'HH:mm').format('HH:mm:ss'),
                            ),
                        to_datetime: moment(toDate, VN_FORMAT_DATE)
                            .format(GL_FORMAT_DATE)
                            .concat(
                                ' ',
                                moment(toTime, 'HH:mm').format('HH:mm:ss'),
                            ),
                        to_date: moment(toDate, VN_FORMAT_DATE).format(
                            GL_FORMAT_DATE,
                        ),
                        from_date: moment(fromDate, VN_FORMAT_DATE).format(
                            GL_FORMAT_DATE,
                        ),
                        to_time: moment(toTime, 'HH:mm').format('HH:mm:ss'),
                        from_time: moment(fromTime, 'HH:mm').format('HH:mm:ss'),
                        leave_reason: reason,
                        leaveDaysChild: leaveDaysChild,
                    };
                    let arrayLines = [...lines];
                    arrayLines.push(source);
                    setLines(arrayLines);
                    setVisible(false);
                }
                break;
            case 'cancel':
                setVisible(false);
                setButtonList(ButtonsAddCancel);
                break;
            case 'edit':
                if (
                    !valueTypesLeave ||
                    !valueGroupTypesLeave ||
                    reason === '' ||
                    leaveDaysChild < 0
                ) {
                    showMessage(t('input_missing'));
                } else if (
                    timeFrom === timeTo &&
                    timeFrom === momentTime &&
                    timeTo === momentTime &&
                    moment(
                        moment(toDate, VN_FORMAT_DATE).format(GL_FORMAT_DATE),
                    )
                        .toDate()
                        .getTime() ===
                        moment(
                            moment(fromDate, VN_FORMAT_DATE).format(
                                GL_FORMAT_DATE,
                            ),
                        )
                            .toDate()
                            .getTime()
                ) {
                    showMessage(t('please_select_time_and_date'));
                } else if (
                    leaveDaysChild > parseInt(totalLeave, 10) &&
                    (valueTypesLeave.id === 7 || valueTypesLeave.id === 5)
                ) {
                    showMessage(t('vacation_fund_is_over'));
                } else if (leaveDaysChild < 0) {
                    showMessage(t('start_date_less_than_end_date'));
                } else if (
                    moment(
                        moment(toDate, VN_FORMAT_DATE).format(GL_FORMAT_DATE),
                    )
                        .toDate()
                        .getTime() <
                    moment(
                        moment(fromDate, VN_FORMAT_DATE).format(GL_FORMAT_DATE),
                    )
                        .toDate()
                        .getTime()
                ) {
                    showMessage(t('start_date_less_than_end_date'));
                } else if (timeFrom > endWork || timeTo > endWork) {
                    showMessage(t('time_must_be_in_office_hours'));
                } else if (timeFrom < startWork || timeTo < startWork) {
                    showMessage(t('time_must_be_in_office_hours'));
                } else if (timeFrom > timeTo) {
                    showMessage(t('start_time_less_than_end_time'));
                } else if (
                    (timeFrom < endBreak && timeFrom > startBreak) ||
                    (timeTo < endBreak && timeTo > startBreak)
                ) {
                    showMessage(t('not_choose_on_break'));
                } else {
                    setButtonList(ButtonsAddCancel);
                    setVisible(false);
                    lines[indexLines].leave_type_group_id =
                        valueGroupTypesLeave;
                    lines[indexLines].leave_type_id = valueTypesLeave;
                    lines[indexLines].to_date = moment(
                        toDate,
                        VN_FORMAT_DATE,
                    ).format(GL_FORMAT_DATE);
                    lines[indexLines].from_date = moment(
                        fromDate,
                        VN_FORMAT_DATE,
                    ).format(GL_FORMAT_DATE);
                    lines[indexLines].to_time = moment(toTime, 'HH:mm').format(
                        'HH:mm:ss',
                    );
                    lines[indexLines].from_time = moment(
                        fromTime,
                        'HH:mm',
                    ).format('HH:mm:ss');
                    lines[indexLines].from_datetime = moment(
                        fromDate,
                        VN_FORMAT_DATE,
                    )
                        .format(GL_FORMAT_DATE)
                        .concat(
                            ' ',
                            moment(fromTime, 'HH:mm').format('HH:mm:ss'),
                        );
                    lines[indexLines].to_datetime = moment(
                        toDate,
                        VN_FORMAT_DATE,
                    )
                        .format(GL_FORMAT_DATE)
                        .concat(
                            ' ',
                            moment(toTime, 'HH:mm').format('HH:mm:ss'),
                        );
                    lines[indexLines].leave_reason = reason;
                    setLines(lines);
                }
                break;
            case 'remove':
                setVisible(false);
                lines.splice(setIndexLines, 1);
                setButtonList(ButtonsAddCancel);
                setLines(lines);
                setLeaveDays(leaveDays - leaveDaysChild);
                break;
            default:
                console.log(item.key);
        }
    };

    const _setGroupTypesLeave = (da) => {
        setValueGroupTypesLeave(da);
        setValueTypesLeave();
        setTotalLeave('0');
    };
    const _setTypesLeave = (da) => {
        setValueTypesLeave(da);
    };

    return (
        <Modal
            isOpen={visible}
            animationType="slide"
            backdropOpacity={0.5}
            backdropColor={Colors.DUSTY_GRAY}
            backButtonClose={true}
            position={'center'}
            swipeThreshold={50}
            swipeToClose={true}
            onClosed={() => {
                setVisible(false);
            }}
            style={
                (styles.container,
                { height: !isEdit ? normalize(580) : normalize(630) })
            }>
            <Container>
                {isEdit ? (
                    <Text style={styles.styleTitle}>
                        {t('create_new_sabbatical_leave')}
                    </Text>
                ) : (
                    <Text style={styles.styleTitle}>{t('form_leave')}</Text>
                )}
                <Content padder>
                    {isEdit ? (
                        <Form>
                            <PickerItem
                                title={'leave_type_group_id'}
                                data={listGroupTypesLeave}
                                name={valueGroupTypesLeave?.name}
                                setValue={_setGroupTypesLeave}
                                disabled={false}
                                required={true}
                            />
                            <PickerItem
                                title={'leave_type_id'}
                                data={listTypesLeave}
                                name={valueTypesLeave?.name}
                                setValue={_setTypesLeave}
                                disabled={!valueGroupTypesLeave}
                                required={true}
                            />
                            <PickerDateItem
                                title={'from_date'}
                                value={fromDate}
                                setValue={setFromDate}
                                disabled={!isEdit}
                                required={isEdit}
                            />
                            <PickerDateItem
                                title={'to_date'}
                                value={toDate}
                                setValue={setToDate}
                                disabled={!isEdit}
                                required={isEdit}
                            />
                            <PickerHourItem
                                title={'from_hour'}
                                value={fromTime}
                                setValue={setFromTime}
                                disabled={!isEdit}
                            />
                            <PickerHourItem
                                title={'to_hour'}
                                value={toTime}
                                setValue={setToTime}
                                disabled={!isEdit}
                            />
                            <LineItem
                                title={'total_leave'}
                                value={totalLeave}
                                inLine={true}
                            />
                            <LineItem
                                title={'total_leave_days'}
                                value={leaveDaysChild.toFixed(2).toString()}
                                inLine={true}
                            />
                            <EditableItem
                                title={'reason'}
                                defaultValue={reason}
                                setValue={setReason}
                                disabled={false}
                                required={true}
                                multiline={true}
                            />
                        </Form>
                    ) : (
                        <Form>
                            <LineItem
                                title={'leave_type_group_id'}
                                value={valueGroupTypesLeave?.name}
                            />
                            <LineItem
                                title={'leave_type_id'}
                                value={valueTypesLeave?.name}
                            />
                            <LineItem title={'from_date'} value={fromDate} />
                            <LineItem title={'to_date'} value={toDate} />
                            <LineItem title={'from_hour'} value={fromTime} />
                            <LineItem title={'to_hour'} value={toTime} />
                            <LineItem
                                title={'total_leave'}
                                value={totalLeave}
                            />
                            <LineItem
                                title={'total_leave_days'}
                                value={leaveDaysChild.toFixed(2).toString()}
                                inLine={true}
                            />
                            <LineItem title={'reason'} value={reason} />
                        </Form>
                    )}
                </Content>
                {isEdit ? (
                    <ButtonForms data={buttonList} onAction={onAddCancel} />
                ) : (
                    <ButtonForms data={ButtonClose} onAction={onAddCancel} />
                )}
            </Container>
        </Modal>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
    },
    viewTitle: {
        height: normalize(50),
        justifyContent: 'center',
    },
    styleTitle: {
        textAlign: 'center',
        fontFamily: theme.FONT_BOLD,
        marginTop: normalize(10),
        fontSize: normalize(20),
    },
    viewPickerTime: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
});

export const ButtonClose = [
    {
        name: 'Đóng',
        key: 'cancel',
    },
];
