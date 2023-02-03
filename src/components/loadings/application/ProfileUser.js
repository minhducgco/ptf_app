/******************************************
 *  Author      : HoiHD
 *  Created On  : Wed Jul 15 2020
 *  File        : ProfileUser.js
 *  Description : Loading cho màn hình thông tin nhân sự.
 *******************************************/
import * as React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import {
    Placeholder,
    PlaceholderLine,
    PlaceholderMedia,
    Shine,
} from 'rn-placeholder';
import {
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import { Appbar } from 'react-native-paper';

import theme from '@styles/theme.style';

export default function LoadingProfileUser() {
    const [data, setData] = React.useState([...new Array(10).fill({})]);

    return (
        <View style={{ flex: 1, backgroundColor: '#fbfbfb' }}>
            <Placeholder Animation={Shine} style={styles.container}>
                <PlaceholderMedia style={styles.image} />
            </Placeholder>
            {data.map((dt, index) => {
                return (
                    <Placeholder key={index} Animation={Shine}>
                        <PlaceholderLine width={80} />
                        <PlaceholderLine />
                        <PlaceholderLine width={30} />
                    </Placeholder>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: theme.MAIN_COLOR,
        alignItems: 'center',
        height: responsiveHeight(9),
        justifyContent: 'center',
        padding: 10,
    },
    container: {
        height: responsiveHeight(30),
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: responsiveWidth(45),
        height: responsiveWidth(45),
        borderRadius: responsiveWidth(45 / 2),
        alignSelf: 'center',
    },
});
