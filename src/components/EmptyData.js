/******************************************
 *  Author      : HoiHD
 *  Created On  : Mon Aug 24 2020
 *  File        : EmptyData.js
 *  Description : Trống dữ liệu
 *******************************************/
import React, { useEffect, useState, useContext } from 'react';
import { Text, StyleSheet, View } from 'react-native';

import theme from '@styles/theme.style';
import { LocalizationContext } from '@context/index';

export default function EmptyData({ title = 'no_data' }) {
    const { t } = useContext(LocalizationContext);

    return (
        <View style={styles.content}>
            <Text style={styles.text}>{t(title)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        padding: 10,
    },
    text: {
        fontFamily: theme.FONT_FAMILY,
        color: theme.COLOR_GREY,
        fontSize: 14,
        textAlign: 'center',
    },
});
