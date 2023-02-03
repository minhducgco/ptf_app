/******************************************
 *  Author      : HoiHD
 *  Created On  : Thu Jul 09 2020
 *  File        : HorizontalItem.js
 *  Description :
 *******************************************/
import React, { useState, useEffect, useContext } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { Container, Content, Icon, Card } from 'native-base';
import {
    Placeholder,
    PlaceholderLine,
    PlaceholderMedia,
    Shine,
} from 'rn-placeholder';
import {
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions';

export default function ItemHorizontal() {
    return (
        <Card style={styles.card} >
            <Placeholder Animation={Shine} style={styles.placeHolderBox}>
                <PlaceholderMedia style={styles.placeHolderImage} />
            </Placeholder>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 7,
        overflow: 'hidden',
        width: responsiveWidth(38),
        height: responsiveHeight(28),
    },
    placeHolderBox: {
        borderRadius: 10,
        alignSelf: 'center',
        marginVertical: 5,
    },
    placeHolderImage: {
        width: responsiveWidth(38),
        height: responsiveHeight(26),
    },
    placeHolderText: {
        height: 12,
        width: 100,
    },
});
