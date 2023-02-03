import React, { useState, useContext } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import normalize from 'react-native-normalize';
import Modal from 'react-native-modalbox';

import Colors from '@styles/color';
import themeStyle from '@styles/theme.style';
import FormSearch from '@components/Forms/FormSearch';
import { LocalizationContext } from '@context/index';

export default function ModalSearchPartner({ isOpen, onClose, onPress }) {
    const [dataName, setDataName] = useState('');
    const [dataPhone, setDataPhone] = useState('');
    const { t } = useContext(LocalizationContext);
    const emptyData = () => {
        setDataName('');
        setDataPhone('');
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
        height: normalize(250),
    },
    txtTitle: {
        fontSize: normalize(15),
        fontFamily: themeStyle.FONT_SEMI_BOLD,
        // marginVertical: normalize(10),
        marginTop: normalize(50),
        textAlign: 'center',
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
