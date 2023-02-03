import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Placeholder, PlaceholderLine, Shine } from 'rn-placeholder';
const PlaceholderScreen = () => {
    const ShineBox = () => {
        return (
            <Placeholder style={styles.shineBox} Animation={Shine}>
                <PlaceholderLine width={60} height={10} style={styles.shine} />
                <PlaceholderLine width={80} height={10} style={styles.shine} />
                <PlaceholderLine width={90} height={10} style={styles.shine} />
            </Placeholder>
        );
    };
    return (
        <View>
            <ShineBox />
            <ShineBox />
            <ShineBox />
            <ShineBox />
            <ShineBox />
            <ShineBox />
            <ShineBox />
            <ShineBox />
        </View>
    );
};

export default PlaceholderScreen;
const styles = StyleSheet.create({
    shineBox: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    shine: {
        marginVertical: 2,
    },
});
