import { Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import Modal from 'react-native-modalbox';
import { Container } from 'native-base';
import normalize from 'react-native-normalize';
import moment from 'moment';

import { LocalizationContext } from '@context/index';
import theme from '@styles/theme.style';
import Colors from '@styles/color';
import ButtonForms from '@components/Forms/ButtonForms';
import { ButtonsAddCancel } from '@data/index';
import PickerItem from '@components/Forms/PickerLeave';
import PickerDateItem from '@components/Application/BusinessTravelComponent/Forms/PickerDateItem';
import EditableItem from '@components/Application/BusinessTravelComponent/Forms/EditableItem';
import { GL_FORMAT_DATE, VN_FORMAT_DATE } from '@configs/Configs';
import { showMessage } from '@utils/';
import LineItem from '@components/Forms/LineItem';

export default function ModalLeave({
    buttonList,
    setButtonList,
    ismodalSchedule,
    setIsModalSchecdule,
    dataEmp,
    disabled,
    lineIds,
    setLineIds,
    setIndexLines,
    indexLines,
    employee,
    setEmployee,
    department,
    setDepartment,
    time,
    setTime,
    addressChild,
    setAddressChild,
    noteChild,
    setNoteChild,
    fromDateChild,
    setFromDateChild,
    toDateChild,
    setToDateChild,
    startDate,
    endDate,
    state,
    stateChild,
    _onActionBusinessTravel,
    lineId,
    setLineId,
}) {
    const { t } = useContext(LocalizationContext);
    const startDateChild = new Date(
        moment(fromDateChild, VN_FORMAT_DATE).format(GL_FORMAT_DATE),
    );
    const endDateChild = new Date(
        moment(toDateChild, VN_FORMAT_DATE).format(GL_FORMAT_DATE),
    );

    const DATA_TIME = [
        {
            name: t('full'),
            key: 'all',
        },
        {
            name: t('am'),
            key: 'am',
        },
        {
            name: t('pm'),
            key: 'pm',
        },
    ];

    const onAddCancel = (item) => {
        switch (item.key) {
            case 'cancel':
                setIsModalSchecdule(false);
                break;
            case 'close':
                setIsModalSchecdule(false);
                break;
            case 'remove':
                setIsModalSchecdule(false);
                lineIds.splice(setIndexLines, 1);
                setButtonList(ButtonsAddCancel);
                setLineIds(lineIds);
                break;
            case 'add':
                if (
                    !department ||
                    !employee ||
                    !time ||
                    noteChild === '' ||
                    addressChild === ''
                ) {
                    showMessage(t('input_missing'));
                } else if (
                    startDateChild.getTime() < startDate.getTime() ||
                    startDateChild.getTime() > endDate.getTime() ||
                    endDateChild.getTime() < startDate.getTime() ||
                    endDateChild.getTime() > endDate.getTime()
                ) {
                    showMessage(t('cannot_select_date_outside'));
                } else if (endDateChild.getTime() < startDateChild.getTime()) {
                    showMessage(t('start_date_less_than_end_date'));
                } else {
                    const lines = {
                        employee_id: {
                            id: employee.id,
                            name: employee.name,
                        },
                        department_id: {
                            id: department.id,
                            name: department.name,
                        },
                        from_date: moment(fromDateChild, VN_FORMAT_DATE).format(
                            GL_FORMAT_DATE,
                        ),
                        to_date: moment(toDateChild, VN_FORMAT_DATE).format(
                            GL_FORMAT_DATE,
                        ),
                        note: noteChild,
                        half_day_options: {
                            name: time.name,
                            key: time.key,
                        },
                        address: addressChild,
                        state: state,
                    };
                    let arrayLines = [...lineIds];
                    arrayLines.push(lines);
                    setLineIds(arrayLines);
                    setIsModalSchecdule(false);
                }
                break;
            case 'edit':
                if (
                    !department ||
                    !employee ||
                    !time ||
                    noteChild === '' ||
                    addressChild === ''
                ) {
                    showMessage(t('input_missing'));
                } else if (
                    startDateChild.getTime() < startDate.getTime() ||
                    startDateChild.getTime() > endDate.getTime() ||
                    endDateChild.getTime() < startDate.getTime() ||
                    endDateChild.getTime() > endDate.getTime()
                ) {
                    showMessage(t('cannot_select_date_outside'));
                } else if (endDateChild.getTime() < startDateChild.getTime()) {
                    showMessage(t('start_date_less_than_end_date'));
                } else {
                    setIsModalSchecdule(false);
                    setButtonList(ButtonsAddCancel);
                    lineIds[indexLines].employee_id = employee;
                    lineIds[indexLines].department_id = department;
                    lineIds[indexLines].from_date = moment(
                        fromDateChild,
                        VN_FORMAT_DATE,
                    ).format(GL_FORMAT_DATE);
                    lineIds[indexLines].to_date = moment(
                        toDateChild,
                        VN_FORMAT_DATE,
                    ).format(GL_FORMAT_DATE);
                    lineIds[indexLines].note = noteChild;
                    lineIds[indexLines].address = addressChild;
                    lineIds[indexLines].half_day_options = time;
                    setLineIds(lineIds);
                }
                break;
            default:
                _onActionBusinessTravel(item.key);
                return;
        }
    };

    const _setEmployee = (da) => {
        setEmployee(da);
        setDepartment(da.department_id);
    };

    const _setTime = (da) => {
        setTime(da);
    };

    const closeModal = () => {
        setIsModalSchecdule(false);
        if (state !== 'draft') {
            setLineId(0);
        }
    };

    return (
        <Modal
            isOpen={ismodalSchedule}
            animationType="slide"
            backdropOpacity={0.5}
            backdropColor={Colors.DUSTY_GRAY}
            backButtonClose={true}
            position={'center'}
            swipeThreshold={50}
            swipeToClose={true}
            onClosed={closeModal}
            propagateSwipe={true}
            style={
                (styles.container,
                { height: disabled ? normalize(570) : normalize(580) })
            }>
            <Container>
                {disabled ? (
                    <Text style={styles.styleTitle}>
                        {t('business_travel_form')}
                    </Text>
                ) : (
                    <Text style={styles.styleTitle}>
                        {t('create_new_business_travel')}
                    </Text>
                )}
                <ScrollView
                    style={styles.ScrollView}
                    scrollHorizontal={true}
                    showsVerticalScrollIndicator={false}>
                    <TouchableOpacity>
                        {disabled ? (
                            <LineItem
                                title="employee_name"
                                value={employee.name}
                            />
                        ) : (
                            <PickerItem
                                title={'employee_name'}
                                data={dataEmp}
                                name={employee.name}
                                setValue={_setEmployee}
                                disabled={disabled}
                                required={!disabled}
                            />
                        )}
                        <LineItem title="department" value={department.name} />
                        {disabled ? (
                            <>
                                <LineItem
                                    title="from_date"
                                    value={fromDateChild}
                                />
                                <LineItem title="to_date" value={toDateChild} />
                                <LineItem title="time" value={time.name} />
                            </>
                        ) : (
                            <>
                                <PickerDateItem
                                    title={'from_date'}
                                    value={fromDateChild}
                                    setValue={setFromDateChild}
                                    disabled={disabled}
                                    required={disabled}
                                />
                                <PickerDateItem
                                    title={'to_date'}
                                    value={toDateChild}
                                    setValue={setToDateChild}
                                    disabled={disabled}
                                    required={disabled}
                                />
                                <PickerItem
                                    title={'time'}
                                    data={DATA_TIME}
                                    name={time.name}
                                    setValue={_setTime}
                                    disabled={disabled}
                                    required={!disabled}
                                />
                            </>
                        )}
                        {disabled ? (
                            <>
                                <LineItem
                                    title="address"
                                    value={addressChild}
                                />
                                <LineItem title="reason" value={noteChild} />
                            </>
                        ) : (
                            <>
                                <EditableItem
                                    required={!disabled}
                                    title="address"
                                    defaultValue={addressChild}
                                    setValue={setAddressChild}
                                    disabled={disabled}
                                    multiline={true}
                                />
                                <EditableItem
                                    title="reason"
                                    setValue={setNoteChild}
                                    defaultValue={noteChild}
                                    multiline={true}
                                    disabled={disabled}
                                    required={!disabled}
                                />
                            </>
                        )}
                        <LineItem
                            title="state"
                            value={
                                stateChild === 'draft'
                                    ? t('draft')
                                    : stateChild === 'wait'
                                    ? t('wait_approval')
                                    : stateChild === 'wait_director_approval'
                                    ? t('wait')
                                    : stateChild === 'wait_admin_approval'
                                    ? t('wait_admin_approval')
                                    : stateChild === 'wait_ceo_confirm'
                                    ? t('wait_ceo_confirm')
                                    : stateChild === 'done'
                                    ? t('finish')
                                    : stateChild === 'wait_cancel'
                                    ? t('wait_cancel')
                                    : stateChild === 'wait_hr_cancel'
                                    ? t('wait_hr_cancel')
                                    : stateChild === 'cancel'
                                    ? t('cancel')
                                    : stateChild === 'wait_hr_validate'
                                    ? t('wait_hr_manager_confirm')
                                    : stateChild === 'wait_manager_validate'
                                    ? t('wait_hr_validate')
                                    : stateChild === 'validated'
                                    ? t('validated')
                                    : stateChild === 'wait_approval'
                                    ? t('wait_approval')
                                    : stateChild === 'rejected'
                                    ? t('rejected')
                                    : t('draft')
                            }
                        />
                    </TouchableOpacity>
                </ScrollView>
                <ButtonForms data={buttonList} onAction={onAddCancel} />
            </Container>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
        marginRight: normalize(10),
    },
    styleTitle: {
        textAlign: 'center',
        fontFamily: theme.FONT_BOLD,
        marginTop: normalize(10),
        fontSize: normalize(20),
    },
    fl_1: { flex: 1 },
    ScrollView: { marginRight: normalize(18) },
});
