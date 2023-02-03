import React, { useContext, useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    TextInput,
} from 'react-native';
import normalize from 'react-native-normalize';
import Modal from 'react-native-modalbox';
import { LocalizationContext } from '@context/index';
import themeStyle from '@styles/theme.style';
import { num2numDong } from '@utils/index';
const ModalViewProduct = ({
    visible,
    onClosed,
    product,
    setVisible,
    edit = false,
}) => {
    const { t } = useContext(LocalizationContext);
    const [isEdit, setIsEdit] = useState(false);
    return (
        <Modal
            entry="center"
            isOpen={visible}
            position="center"
            coverScreen={true}
            swipeToClose={false}
            onClosed={onClosed}
            backdropPressToClose={false}
            style={styles.container}>
            <Text style={styles.txtHeader}>{t('product_info')}</Text>
            <ItemLine label={t('product')} value={product?.name} />
            <ItemLine label={t('unit_count')} value={product?.product_uom} />
            <ItemLine
                label={t('quantity')}
                value={product?.quantity?.toString()}
            />
            <ItemLine
                label={t('unit_price')}
                value={num2numDong(product?.price_unit)}
            />
            <ItemLine label={t('discount')} value={product?.discount} />
            {!edit && (
                <ItemLine
                    label={t('total_price')}
                    value={num2numDong(product?.price_subtotal)}
                />
            )}
            {/* {isEdit ? (
                <View style={styles.btnContain}>
                    {!edit && (
                        <TouchableOpacity
                            style={styles.btnEdit}
                            onPress={() => setVisible(false)}>
                            <Text style={styles.txtAdd}>{t('save')}</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity
                        style={styles.btnCancel}
                        onPress={() => setIsEdit(false)}>
                        <Text style={styles.txtAdd}>{t('cancel')}</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.btnContain}>
                    {!edit &&
                        !product?.is_promotion &&
                        product?.price_unit === 0 && (
                            <TouchableOpacity
                                style={styles.btnEdit}
                                onPress={() => setIsEdit(true)}>
                                <Text style={styles.txtAdd}>{t('edit')}</Text>
                            </TouchableOpacity>
                        )}
                    <TouchableOpacity
                        style={styles.btnCancel}
                        onPress={() => setVisible(false)}>
                        <Text style={styles.txtAdd}>{t('close_button')}</Text>
                    </TouchableOpacity>
                </View>
            )} */}
            <View style={styles.btnContain}>
                <TouchableOpacity
                    style={styles.btnCancel}
                    onPress={() => setVisible(false)}>
                    <Text style={styles.txtAdd}>{t('close_button')}</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

export default ModalViewProduct;
const ItemLine = ({ label, value, disabled = true }) => {
    return (
        <View style={styles.line}>
            <Text style={styles.txtLabel}>{label}</Text>
            <TextInput
                editable={!disabled}
                style={styles.txtValue}
                value={value}
                multiline
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        height: normalize(380),
        padding: normalize(10),
    },
    btnCancel: {
        backgroundColor: themeStyle.COLOR_GRAY,
        paddingVertical: normalize(10),
        paddingHorizontal: normalize(20),
        marginBottom: normalize(10),
        marginHorizontal: normalize(10),
        borderRadius: normalize(5),
    },
    btnEdit: {
        backgroundColor: themeStyle.MAIN_COLOR,
        paddingVertical: normalize(10),
        paddingHorizontal: normalize(20),
        marginBottom: normalize(10),
        marginHorizontal: normalize(10),
        borderRadius: normalize(5),
    },
    txtAdd: {
        fontFamily: themeStyle.FONT_FAMILY,
        fontSize: normalize(13),
        color: themeStyle.COLOR_WHITE,
    },
    btnContain: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    txtLabel: {
        fontFamily: themeStyle.FONT_FAMILY,
        fontSize: normalize(13),
        flex: 1,
    },
    txtValue: {
        fontFamily: themeStyle.FONT_BOLD,
        fontSize: normalize(13),
        flex: 3,
        color: themeStyle.COLOR_BLACK,
    },
    txtHeader: {
        textAlign: 'center',
        color: themeStyle.MAIN_COLOR,
        fontFamily: themeStyle.FONT_BOLD,
        marginBottom: normalize(10),
    },
    line: {
        flexDirection: 'row',
        marginBottom: normalize(10),
        alignItems: 'center',
    },
});
