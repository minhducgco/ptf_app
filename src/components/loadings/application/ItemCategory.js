/******************************************
 *  Author      : HoiHD
 *  Created On  : Thu Jul 09 2020
 *  File        : ItemCategory.js
 *  Description :
 *******************************************/
import * as React from 'react';
import {Text, StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import {Container, Content, Icon} from 'native-base';
import {
    Placeholder,
    PlaceholderLine,
    PlaceholderMedia,
    Shine,
} from 'rn-placeholder';

import {applicationStyles} from '@styles/application.style';

export default function ItemCategory() {
    return (
        <Placeholder Animation={Shine}>
            <PlaceholderMedia />
            <View style={{height: 40}}>
                <PlaceholderLine width={30} />
            </View>
        </Placeholder>
    );
}

const styles = StyleSheet.create({
    ...applicationStyles,
});
