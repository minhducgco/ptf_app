/******************************************
 *  Author      : HoiHD
 *  Created On  : Thu Jul 09 2020
 *  File        : ItemVertical.js
 *  Description :
 *******************************************/
import * as React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import {
    Card, CardItem, Left, Body,
} from 'native-base';
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

export default function Vertical() {
    return (
        <Card>
            <Placeholder Animation={Shine}>
                <CardItem style={[{ paddingBottom: 0 }, styles.cardItem]}>
                    <Left>
                        <PlaceholderMedia style={{ resizeMode: 'contain' }} />
                        <Body>
                            <PlaceholderLine width={20} />
                            <PlaceholderLine width={30} />
                        </Body>
                    </Left>
                </CardItem>
                <CardItem style={styles.cardItem}>
                    <PlaceholderLine width={100} />
                </CardItem>
                <CardItem cardBody>
                    <PlaceholderMedia style={styles.image} />
                </CardItem>
            </Placeholder>
        </Card>
    );
}

const styles = StyleSheet.create({
    cardItem: {
        paddingLeft: 7,
        paddingRight: 7,
        paddingTop: 7,
    },
    textDate: {
        color: '#999999',
        fontSize: 13,
    },
    textDescription: {
        color: '#21313F',
        fontSize: 14,
    },
    image: {
        width: '100%',
        height: responsiveHeight(30),
    },
});
