import React from 'react';
import { StyleSheet, View } from 'react-native';
import normalize from 'react-native-normalize';

export default function ItemSeparator() {
    return <View style={styles.viewLine} />;
}
const styles = StyleSheet.create({
    viewLine: {
        height: normalize(5),
    },
});
