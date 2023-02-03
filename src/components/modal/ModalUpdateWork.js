import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-native-modalbox';
import moment from 'moment';
import normalize from 'react-native-normalize';
import themeStyle from '@styles/theme.style';
import Colors from '@styles/color';
import HeaderbackStatusBar from '@components/headers/HeaderBackStatusBar';
import Search from '@components/Forms/Search';
import PickerDatetime from '@components/Forms/PickerDatetime';
import { LocalizationContext } from '@context/index';
import { onActivityType, onUpdateWork } from '@repository/Sales/Data';
import { onGetListEmployee } from '@repository/Application/timesheet/CreateNewOrder';
import Toast from 'react-native-tiny-toast';
import { showMessage } from '@utils/';

export default function ModalUpdateUpWork({ isOpen, onClose, value }) {
    const [dataTime, setDataTime] = useState(value?.x_date_deadline);
    const [listType, setListType] = useState([]);
    const [valueType, setValueType] = useState({
        id: value?.activity_type_id?.id,
        name: value?.activity_type_id?.name,
    });
    const [listEmployee, setListEmployee] = useState([]);
    const [valueEmployee, setValueEmployee] = useState({
        id: value?.user_id?.id,
        name: value?.user_id?.name,
    });
    const [dataSummary, setDataSummary] = useState(value?.summary);
    const { t } = useContext(LocalizationContext);
    const access_token = useSelector((state) => state.auth.accessToken);
    useEffect(() => {
        getTypeActivity();
        getEmployee();
    }, []);
    useEffect(() => {
        setValueEmployee({
            id: value?.user_id?.id,
            name: value?.user_id?.name,
        });
        setValueType({
            id: value?.activity_type_id?.id,
            name: value?.activity_type_id?.name,
        });
        setDataSummary(value?.summary);
        setDataTime(value?.x_date_deadline);
    }, [value]);
    const updateWork = () => {
        const loading = Toast.showLoading();
        onUpdateWork({
            access_token: access_token,
            id: value.id,
            summary: dataSummary,
            activity_type_id: valueType.id,
            x_date_deadline: moment(dataTime).format('YYYY-MM-DD HH:mm:ss'),
            user_id: valueEmployee.id,
        })
            .then((res) => {
                Toast.hide(loading);
                showMessage(t('edit_success'));
                onClose();
            })
            .catch((err) => {
                Toast.hide(loading);
                showMessage(t('edit_fail'));
                console.log(err);
            });
    };
    const getTypeActivity = () => {
        onActivityType({ access_token: access_token, type: value.type })
            .then((res) => {
                setListType(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const getEmployee = (e) => {
        onGetListEmployee({ accessToken: access_token, name: e })
            .then((res) => {
                setListEmployee(res);
            })
            .catch((err) => console.log('err', err));
    };
    const searchEdit = (e) => {
        getEmployee(e?.nativeEvent?.text);
    };

    const changeSummary = (text) => {
        setDataSummary(text);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClosed={onClose}
            backdropColor={Colors.DUSTY_GRAY}
            backButtonClose={false}
            swipeToClose={false}
            entry={'top'}
            position={'center'}
            swipeThreshold={50}
            style={styles.container}>
            <View style={styles.viewEmpty}>
                <Text style={styles.txtEmpty}>{t('edit_work')}</Text>
            </View>
            <View style={styles.viewPicker}>
                <View style={styles.label}>
                    <Text style={styles.txtTitlePicker}>
                        {t('type_activity')}
                    </Text>
                </View>
                <View style={styles.value}>
                    <Search
                        data={listType}
                        value={valueType}
                        setValue={setValueType}
                        holder={t('type_activity')}
                        width={normalize(250)}
                        editable={false}
                    />
                </View>
            </View>
            <View style={styles.viewPicker}>
                <View style={styles.label}>
                    <Text style={styles.txtTitlePicker}>{t('date_late')}</Text>
                </View>
                <View style={styles.value}>
                    <PickerDatetime
                        placeholder="empty"
                        font={false}
                        title={''}
                        value={dataTime}
                        setValue={setDataTime}
                    />
                </View>
            </View>
            <View style={styles.viewPicker}>
                <View style={styles.label}>
                    <Text style={styles.txtTitlePicker}>{t('division')}</Text>
                </View>
                <View style={styles.value}>
                    <Search
                        data={listEmployee}
                        value={valueEmployee}
                        setValue={setValueEmployee}
                        holder={t('division')}
                        width={normalize(250)}
                        onEndEditing={searchEdit}
                    />
                </View>
            </View>
            <Text style={styles.txtSummary}>{t('summary')}</Text>
            <View style={styles.viewTxtInput}>
                <TextInput
                    multiline={true}
                    textAlignVertical={'top'}
                    style={styles.txtInput}
                    value={dataSummary}
                    onChangeText={changeSummary}
                />
            </View>
            <View style={styles.viewBtn}>
                <TouchableOpacity style={styles.btn(true)} onPress={updateWork}>
                    <Text style={styles.btnTxt(true)}>{t('edit')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn(false)} onPress={onClose}>
                    <Text style={styles.btnTxt(false)}>{t('cancel')}</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
        // flex: 1,
        height: normalize(500),
    },
    txtTitle: {
        fontSize: normalize(15),
        fontFamily: themeStyle.FONT_SEMI_BOLD,
        marginTop: normalize(50),
        textAlign: 'center',
    },
    viewBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: normalize(20),
    },
    btn: (color) => ({
        marginTop: normalize(20),
        width: '48%',
        backgroundColor: color === true ? Colors.MONZA : Colors.IRON,
        borderRadius: normalize(8),
    }),
    btnTxt: (color) => ({
        color: color === true ? Colors.WHITE : Colors.BLACK,
        padding: normalize(10),
        textAlign: 'center',
        fontSize: normalize(14),
        fontFamily: themeStyle.FONT_SEMI_BOLD,
    }),
    viewTxtInput: {
        alignSelf: 'center',
        width: '95%',
        borderWidth: 1,
        borderColor: Colors.IRON,
        borderRadius: normalize(7),
        height: normalize(200),
        fontSize: normalize(13),
    },
    viewPicker: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: normalize(10),
        // marginHorizontal: normalize(10),
        marginLeft: normalize(12),
    },
    txtTitlePicker: {
        fontFamily: themeStyle.FONT_FAMILY,
        fontSize: normalize(12),
        marginVertical: normalize(10),
    },
    viewEmpty: {
        // marginTop: normalize(40),
        alignSelf: 'center',
    },
    txtEmpty: {
        fontSize: normalize(14),
        fontFamily: themeStyle.FONT_BOLD,
        marginTop: normalize(10),
    },
    txtSummary: {
        fontFamily: themeStyle.FONT_FAMILY,
        fontSize: normalize(12),
        marginVertical: normalize(10),
        marginLeft: normalize(10),
    },
    label: { flex: 1 },
    value: { flex: 2 },
    txtInput: {
        height: normalize(180, 'height'),
        fontFamily: themeStyle.FONT_FAMILY,
    },
});
