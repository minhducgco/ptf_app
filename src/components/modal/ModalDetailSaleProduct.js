import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    FlatList,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-native-modalbox';
import normalize from 'react-native-normalize';
import { useDispatch } from 'react-redux';
import Colors from '@styles/color';
import themeStyle from '@styles/theme.style';
import { LocalizationContext } from '@context/index';
import { num2numDong } from '@utils/';
import SvgIconListProduct from '@assets/svg/icons/iconProduct/SvgIconListProduct';
import { DashLine, IconCart, IconMinus, IconPlus } from '@assets/svg/icons';
import { saleProduct } from '@redux/actions/dataAction';

export default function ModalDetailSaleProduct({ isOpen, onClose }) {
    const { t } = useContext(LocalizationContext);
    const dispatch = useDispatch();
    const dataCartProduct = useSelector(
        (state) => state.datareduce.saleProduct,
    );
    const setNumber = (txt, ind) => {
        let newArray = [...dataCartProduct];
        newArray[ind].number_product = parseInt(txt, 10);
        dispatch(saleProduct(newArray));
    };
    const numberPlus = (ind) => {
        let newArray = [...dataCartProduct];
        // console.log(newArray[ind].number_product);
        newArray[ind].number_product = parseInt(
            newArray[ind].number_product + 1,
            10,
        );
        dispatch(saleProduct(newArray));
    };
    const numberMinus = (ind) => {
        let newArray = [...dataCartProduct];
        newArray[ind].number_product = parseInt(
            newArray[ind].number_product - 1,
            10,
        );
        dispatch(saleProduct(newArray));
    };

    const findNumber = dataCartProduct.map(
        (fin) => fin.price * fin.number_product,
    );
    const initNumber = 0;
    const sumNumber = findNumber.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        initNumber,
    );

    const renderItem = ({ item, index }) => {
        return (
            <View>
                <View style={styles.viewItem}>
                    <View style={styles.viewContent}>
                        <View style={styles.viewIcon}>
                            <SvgIconListProduct />
                        </View>
                        <View style={styles.viewTxt}>
                            <Text style={styles.txt(true)}>{item.name}</Text>
                            <Text style={styles.txt(false)}>
                                {t('price')}: {num2numDong(item.price)}
                            </Text>
                            <View style={styles.viewNumber}>
                                <TouchableOpacity
                                    style={styles.touchNumber(0.2)}
                                    onPress={() => numberMinus(index)}>
                                    <IconMinus color={Colors.BLACK} />
                                </TouchableOpacity>
                                <TextInput
                                    value={item.number_product.toString()}
                                    onChangeText={(txt) =>
                                        setNumber(txt, index)
                                    }
                                    style={styles.txtInput}
                                    keyboardType="numeric"
                                />
                                <TouchableOpacity
                                    style={styles.touchNumber(0.7)}
                                    onPress={() => numberPlus(index)}>
                                    <IconPlus color={Colors.BLACK} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.viewLine}>
                    <DashLine color={Colors.BLACK} />
                    <DashLine color={Colors.BLACK} />
                </View>
            </View>
        );
    };
    return (
        <Modal
            isOpen={isOpen}
            onClosed={onClose}
            backdropColor={Colors.DUSTY_GRAY}
            backButtonClose={true}
            position={'center'}
            entry={'top'}
            swipeThreshold={50}
            style={styles.container}>
            <View style={styles.viewTitle}>
                <Text style={styles.title}>C??c S???n Ph???m ???? Ch???n</Text>
            </View>
            <FlatList data={dataCartProduct} renderItem={renderItem} />
            <Text style={styles.btnTxt(true)}>
                T???ng gi??: {num2numDong(sumNumber)}
            </Text>
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
    viewItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
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
        flex: 0.7,
        fontFamily:
            bold === true ? themeStyle.FONT_BOLD : themeStyle.FONT_FAMILY,
    }),
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
    txtInput: {
        flex: 0.2,
        borderWidth: normalize(2),
        borderRadius: normalize(10),
        borderColor: themeStyle.COLOR_LIGHT_GRAY,
        height: normalize(35),
        fontFamily: themeStyle.FONT_FAMILY,
        textAlign: 'center',
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
    viewNumber: {
        flexDirection: 'row',
        marginHorizontal: normalize(20),
    },
    touchCart: {
        flex: 0.1,
        alignSelf: 'center',
    },
    touchNumber: (number) => ({
        flex: number,
        // borderWidth: 1,
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
});
