/******************************************
 *  Author      : HoiHD
 *  Created On  : Thu Aug 27 2020
 *  File        : MeetingCalendar.js
 *  Description : 
 *******************************************/
import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableOpacity, } from 'react-native';
import { Container, Content, Icon } from 'native-base';
import {
    Placeholder, PlaceholderLine, PlaceholderMedia, Shine
} from 'rn-placeholder';

import theme from '@styles/theme.style';


export default function MeetingCalendar() {
    const [data, setData] = useState([...new Array(10).fill({})]);

    const _renderCalendar = ({ item, index }) => {
        return (
            <View style={styles.timeContainer}>
                <PlaceholderMedia style={styles.time} />
                <PlaceholderLine />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Placeholder
                Animation={Shine}
            >
                <PlaceholderMedia style={styles.calendar} />
                <PlaceholderLine />
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={_renderCalendar}
                />
            </Placeholder>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    calendar: {
        height: 100,
        width: "100%",
        marginVertical: 10
    },
    time: {
        height: 40,
        width: 60,
        margin: 5,
    },
    timeContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
});
