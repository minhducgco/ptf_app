/******************************************
 *  Author      : HoiHD
 *  Created On  : Thu Jul 09 2020
 *  File        : ItemContact.js
 *  Description :
 *******************************************/
import * as React from 'react';
import {
    Text,
    StyleSheet,
    View,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { Container, Content, Icon } from 'native-base';

import {
    Placeholder,
    PlaceholderLine,
    PlaceholderMedia,
    Shine,
} from 'rn-placeholder';

export default function ItemContact() {
    const arr = new Array(4).fill(0);
    return (
        <View style={styles.viewBound}>
            {arr.map((it) => (
                <Placeholder Animation={Shine} Left={PlaceholderMedia}>
                    <View style={styles.viewBoundText}>
                        <PlaceholderLine width={50} />
                        <PlaceholderLine width={80} />
                        <PlaceholderLine width={80} />
                        <PlaceholderLine width={80} />
                    </View>
                </Placeholder>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    viewBound: {
        paddingVertical: 15,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#efefef',
    },
    imageStyle: {
        borderRadius: 25,
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: '#fff',
    },
    viewBoundText: {
        flexDirection: 'column',
        marginLeft: 16,
        marginVertical: 10,
    },
});
