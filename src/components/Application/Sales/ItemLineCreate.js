import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';

import themeStyle from '@styles/theme.style';
const ItemLineCreate = ({ label = '', renderValue }) => {
    return (
        <View style={styles.itemView}>
            <Text style={styles.labelLine}>{label}: </Text>
            <View style={styles.valueLine}>{renderValue()}</View>
        </View>
    );
};
const styles = StyleSheet.create({
    itemView: {
        marginBottom: normalize(10),
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    labelLine: {
        flex: 1,
        fontFamily: themeStyle.FONT_FAMILY,
        fontSize: normalize(12),
    },
    valueLine: {
        flex: 2,
    },
});
export default ItemLineCreate;
