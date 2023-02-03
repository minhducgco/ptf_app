/******************************************
 *  Author      : HoiHD
 *  Created On  : Wed Jul 15 2020
 *  File        : HeaderApplication.js
 *  Description : Loading cho header của application.
 *******************************************/
import * as React from 'react';
import {Placeholder, PlaceholderLine, PlaceholderMedia, Shine} from 'rn-placeholder';
import {StyleSheet, View} from 'react-native';

import theme from '@styles/theme.style';

const LoadingThumbnail = () => {
    return (
        <View style={styles.container}>
            <Placeholder
                Animation={Shine}
                style={styles.container}
                Right={() => (
                    <View style={styles.button}>
                        <PlaceholderMedia style={styles.rightIcon} />
                    </View>
                )}
                Left={() => (
                    <View style={styles.thumbnailContainer}>
                        <PlaceholderMedia style={styles.thumbnail} />
                    </View>
                )}>
                <PlaceholderLine />
            </Placeholder>
        </View>
    )
}

export default LoadingThumbnail;

const styles = StyleSheet.create({
    rightIcon: {
        width: 30, 
        height: 30, 
        borderRadius: 15,
    },
    container: {
        backgroundColor: "transparent",
        height: 75,
        flexDirection: "row",
        alignItems: "center",
    },
    thumbnailContainer: {
        width: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    thumbnail: {
        width: 60, height: 60,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: theme.MAIN_COLOR,
    },
    button: {
        width: 70,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
    },
});
