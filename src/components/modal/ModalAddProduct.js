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
import Search from '@components/Forms/Search';
import { Provider } from 'react-native-paper';
import themeStyle from '@styles/theme.style';
import { showMessage } from '@utils/index';
const ModalAddProduct = ({
    visible,
    setVisible,
    listProduct,
    onClosed,
    onAddProduct,
    onEndEditing,
}) => {
    const { t } = useContext(LocalizationContext);
    const [quantity, setQuantity] = useState(0);
    const [productSelected, setProductSelected] = useState({});
    const onChangeProduct = (item) => {
        setProductSelected(item);
    };
    const addProduct = () => {
        if (!productSelected.id || quantity <= 0) {
            showMessage(t('product_and_quantity_require'));
        } else {
            onAddProduct(productSelected, quantity);
            setProductSelected({});
            setQuantity(0);
            setVisible(false);
        }
    };
    const close = () => {
        setProductSelected({});
        setVisible(false);
    };
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
            <Provider>
                <View style={styles.lineItem}>
                    <Text style={styles.label}>{t('product')}</Text>
                    <View style={styles.searchContain}>
                        <Search
                            holder={t('select_product')}
                            data={listProduct}
                            value={productSelected || t('select_product')}
                            isInModal
                            setValue={onChangeProduct}
                            multiline={true}
                            onEndEditing={onEndEditing}
                        />
                    </View>
                </View>
                <Text style={styles.label}>
                    Đơn vị tính: {productSelected?.uom_name}
                </Text>
                <View style={styles.lineItem}>
                    <Text style={styles.label}>{t('quantity')}</Text>
                    <View style={styles.searchContain}>
                        <TextInput
                            value={quantity}
                            style={styles.quantityInput}
                            onChangeText={setQuantity}
                            placeholder={t('enter_quantity')}
                            keyboardType="numeric"
                        />
                    </View>
                </View>
                <View style={styles.btnContain}>
                    <TouchableOpacity
                        style={styles.btnAdd}
                        onPress={addProduct}>
                        <Text style={styles.txtAdd}>{t('add_product')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnCancel} onPress={close}>
                        <Text style={styles.txtAdd}>{t('cancel')}</Text>
                    </TouchableOpacity>
                </View>
            </Provider>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        height: normalize(300),
    },
    quantityInput: {
        borderBottomWidth: 0.5,
        height: normalize(40),
        fontSize: normalize(13),
    },
    lineItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: normalize(10),
    },
    label: {
        fontFamily: themeStyle.FONT_FAMILY,
        fontSize: normalize(13),
        marginHorizontal: normalize(10),
    },
    txtAdd: {
        fontFamily: themeStyle.FONT_FAMILY,
        fontSize: normalize(13),
        color: themeStyle.COLOR_WHITE,
    },
    btnAdd: {
        backgroundColor: themeStyle.MAIN_COLOR,
        padding: normalize(10),
        marginBottom: normalize(10),
        marginHorizontal: normalize(10),
        borderRadius: normalize(5),
    },
    btnCancel: {
        backgroundColor: themeStyle.COLOR_GRAY,
        paddingVertical: normalize(10),
        paddingHorizontal: normalize(20),
        marginBottom: normalize(10),
        marginHorizontal: normalize(10),
        borderRadius: normalize(5),
    },
    btnContain: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    searchContain: { flex: 1 },
});
export default ModalAddProduct;
