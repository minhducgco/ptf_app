import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
} from 'react-native';
import Colors from '@styles/color';
import FormSearch from '@components/Forms/FormSearch';
import { LocalizationContext } from '@context/index';
import normalize from 'react-native-normalize';
import themeStyle from '@styles/theme.style';
import Modal from 'react-native-modalbox';

export default function ModalSearchData({
    isOpen,
    onClose,
    onPress,
    // emptyData,
}) {
    const [dataName, setDataName] = useState('');
    const [dataPhone, setDataPhone] = useState('');
    const [dataWebsite, setDataWebsite] = useState('');
    const [dataEmail, setDataEmail] = useState('');
    const { t } = useContext(LocalizationContext);
    const emptyData = () => {
        setDataName('');
        setDataPhone('');
        setDataWebsite('');
        setDataEmail('');
    };

    return (
        <Modal
            isOpen={isOpen}
            onClosed={onClose}
            backdropOpacity={0.5}
            backdropColor={Colors.DUSTY_GRAY}
            backButtonClose={true}
            position={'top'}
            entry={'top'}
            swipeThreshold={50}
            style={styles.container}>
            <Text style={styles.txtTitle}>{t('search')}</Text>
            <FormSearch
                placeholder={t('name_search')}
                // sendText={setData}
                txtInput={dataName}
                setTxtInput={setDataName}
            />
            {/* <View style={styles.viewRow}> */}
            <FormSearch
                placeholder={t('work_mobile')}
                txtInput={dataPhone}
                setTxtInput={setDataPhone}
            />
            {/* <FormSearch
                    style={{ flex: 1 }}
                    placeholder={t('work_mobile')}
                />
            </View> */}
            <FormSearch
                placeholder={t('link_facebook')}
                txtInput={dataWebsite}
                setTxtInput={setDataWebsite}
            />
            <FormSearch
                placeholder={t('email')}
                txtInput={dataEmail}
                setTxtInput={setDataEmail}
            />
            <View style={styles.viewBtn}>
                <TouchableOpacity style={styles.btn(false)} onPress={emptyData}>
                    <Text style={styles.btnTxt(false)}>
                        {t('delete_search')}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        onPress({
                            dataName,
                            dataEmail,
                            dataWebsite,
                            dataPhone,
                        })
                    }
                    style={styles.btn(true)}>
                    <Text style={styles.btnTxt(true)}>{t('search')}</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        padding: normalize(10),
        backgroundColor: Colors.WHITE,
        height: Platform.OS === 'android' ? normalize(350) : normalize(400),
    },
    txtTitle: {
        fontSize: normalize(15),
        fontFamily: themeStyle.FONT_SEMI_BOLD,
        // marginVertical: normalize(10),
        marginTop: normalize(50),
        textAlign: 'center',
    },
    viewSearch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: Colors.IRON,
        // marginHorizontal: 10,
        width: '90%',
        borderRadius: 10,
        height: 40,
    },
    icon: {
        justifyContent: 'center',
    },
    txtInput: {
        flex: 1,
        fontSize: normalize(13),
    },
    viewRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginHorizontal: normalize(20),
    },
    viewBtn: {
        // flex: 1,
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
        padding: normalize(8),
        textAlign: 'center',
        fontSize: normalize(13),
        fontFamily: themeStyle.FONT_SEMI_BOLD,
    }),
});
