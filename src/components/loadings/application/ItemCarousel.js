/******************************************
 *  Author      : HoiHD
 *  Created On  : Thu Jul 09 2020
 *  File        : ItemCarousel.js
 *  Description :
 *******************************************/
import * as React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import {Card, CardItem, Body} from 'native-base';
import {Placeholder, PlaceholderLine, Shine} from 'rn-placeholder';
import normalize from 'react-native-normalize';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.95);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 0.4);

export default function ItemCarousel() {
    return (
        <Card style={[styles.card, {width: ITEM_WIDTH, height: ITEM_HEIGHT}]}>
            <Placeholder Animation={Shine}>
                <CardItem>
                    <PlaceholderLine width={40} />
                </CardItem>
                <View style={{paddingLeft: normalize(20)}}>
                    <PlaceholderLine width={69} />
                    <PlaceholderLine width={65} />
                    <PlaceholderLine width={60} />
                </View>
            </Placeholder>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: normalize(10),
        overflow: 'hidden',
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
    },
});
