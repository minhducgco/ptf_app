import { View, Text, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import Modal from 'react-native-modalbox';
import Colors from '@styles/color';
import normalize from 'react-native-normalize';
import themeStyle from '@styles/theme.style';
import { LocalizationContext } from '@context/index';
import PickerItem from '@components/Forms/PickerItem';

export default function ModalChangeMonth({
    isOpen,
    onClose,
    setValue,
    listMonth,
    titleName,
    headerName,
}) {
    const { t } = useContext(LocalizationContext);
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
            <View style={styles.viewTitle}>
                <Text style={styles.title}>{t(headerName)}</Text>
            </View>
            <PickerItem
                title={titleName}
                data={listMonth}
                setValue={setValue}
            />
        </Modal>
    );
}
const styles = StyleSheet.create({
    container: {
        // flex:1,
        backgroundColor: Colors.WHITE,
        height: normalize(100, 'width'),
        marginTop: normalize(40, 'width'),
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
});
