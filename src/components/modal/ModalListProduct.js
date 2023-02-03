import React, { useContext, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Modal from 'react-native-modalbox';
import normalize from 'react-native-normalize';

import Colors from '@styles/color';
import themeStyle from '@styles/theme.style';
import { LocalizationContext } from '@context/index';
import { num2numDong } from '@utils/';
import ListProductSelected from '@components/Application/Sales/ListProductSelected';

export default function ModalListProduct({ isOpen, onClose }) {
    const { t } = useContext(LocalizationContext);
    const orderLine = useSelector((state) => state.datareduce.orderLine);
    const totalPrice = useMemo(
        () =>
            orderLine.reduce(
                (previousValue, currentValue) =>
                    previousValue +
                    currentValue?.product_uom_qty * currentValue?.price_unit,
                0,
            ),
        [orderLine],
    );
    return (
        <Modal
            isOpen={isOpen}
            onClosed={onClose}
            backdropColor={Colors.DUSTY_GRAY}
            backButtonClose={true}
            swipeToClose={false}
            position={'center'}
            entry={'top'}
            swipeThreshold={50}
            style={styles.container}>
            <View style={styles.viewTitle}>
                <Text style={styles.title}>Các Sản Phẩm Đã Chọn</Text>
            </View>
            <ListProductSelected />
            {totalPrice > 0 && (
                <Text style={styles.btnTxt(true)}>
                    Tổng giá: {num2numDong(totalPrice)}
                </Text>
            )}
            <View style={styles.viewBtn}>
                <TouchableOpacity style={styles.btn(false)} onPress={onClose}>
                    <Text style={styles.btnTxt(false)}>
                        {t('close_button')}
                    </Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: themeStyle.COLOR_WHITE,
        height: '90%',
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
    viewSearch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: normalize(15),
        // marginTop: normalize(10),
        // borderWidth: 1,
    },
    txtTitle: {
        fontFamily: themeStyle.FONT_BOLD,
        flex: 0.35,
        alignSelf: 'center',
    },

    viewBtn: {
        marginVertical: normalize(15),
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: normalize(20),
    },
    btn: (color) => ({
        marginTop: normalize(20),
        width: '48%',
        backgroundColor: color === true ? Colors.MONZA : '#85517D',
        borderRadius: normalize(8),
    }),
    btnTxt: (color) => ({
        color: color === false ? Colors.WHITE : Colors.BLACK,
        padding: normalize(8),
        textAlign: 'center',
        fontSize: normalize(13),
        fontFamily: themeStyle.FONT_SEMI_BOLD,
    }),

    viewLine: {
        flexDirection: 'row',
    },
    btnSum: {
        fontSize: normalize(13),
        textAlign: 'right',
        marginRight: normalize(20),
        fontFamily: themeStyle.FONT_BOLD,
    },
    itemContain: {
        flex: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    viewItem: {
        // marginTop:10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        margin: 5,
        borderRadius: 5,
        overflow: 'hidden',
        borderColor: '#999',
        backgroundColor: '#FFF',
    },
    viewIcon: {
        justifyContent: 'center',
    },
    viewContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginHorizontal: normalize(20),
        marginVertical: normalize(10),
    },
    viewTxt: {
        flex: 1,
        marginLeft: normalize(10),
    },
    txt: (bold) => ({
        fontSize: normalize(13),
        marginVertical: normalize(5),
        fontFamily:
            bold === true ? themeStyle.FONT_BOLD : themeStyle.FONT_FAMILY,
    }),
    viewNumber: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    touchCart: {
        flex: 0.1,
        alignSelf: 'center',
    },
    touchNumber: (number) => ({
        flex: number,
    }),
    txtInput: {
        backgroundColor: themeStyle.COLOR_WHITE,
        borderWidth: normalize(2),
        borderRadius: normalize(7),
        borderColor: themeStyle.COLOR_GRAY_BLUE,
        textAlign: 'center',
        height: normalize(40),
        width: normalize(40),
        marginHorizontal: 10,
    },
    txtStatus: {
        color: Colors.WHITE,
        textAlign: 'center',
    },
    viewStatus: (color) => ({
        backgroundColor: color === true ? Colors.MONZA : Colors.MANTIS,
        color: Colors.WHITE,
        padding: normalize(5),
        flex: 0.6,
        textAlign: 'center',
        borderRadius: normalize(5),
    }),
    btnPlus: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    btnContain: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    nameProduct: { flexDirection: 'row', alignItems: 'center' },
    icon: { marginRight: normalize(10) },
});
