import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import normalize from 'react-native-normalize';
import Icon from 'react-native-vector-icons/AntDesign';

import Colors from '@styles/color';
import themeStyle from '@styles/theme.style';

export default function ItemAddress({
    isAble = false,
    sendTxt,
    value,
    deleteItem,
    index,
}) {
    useEffect(() => {
        setTxtInput(value);
    }, [value]);
    const [txtInput, setTxtInput] = useState('');
    const onChangeText = (txt) => {
        setTxtInput(txt);
        sendTxt(txt, index);
    };
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.txtInput(isAble)}
                value={txtInput}
                onChangeText={onChangeText}
                editable={isAble}
            />
            {isAble === true && (
                <TouchableOpacity
                    style={styles.touchIconDelete}
                    onPress={deleteItem}>
                    <Icon
                        name="delete"
                        size={21}
                        color={Colors.BLACK}
                        style={styles.icon(10)}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: normalize(5),
        margin: normalize(5),
    },
    icon: (width) => ({
        marginHorizontal: normalize(width),
    }),
    txtInput: (it) => ({
        fontFamily: themeStyle.FONT_BOLD,
        color: themeStyle.COLOR_BLACK,
        fontSize: normalize(13),
        flex: 0.97,
        height: normalize(35),
        borderWidth: it === true ? normalize(2) : normalize(0),
        borderColor: it === true ? Colors.SILVER : null,
        borderRadius: it === true ? normalize(8) : normalize(0),
    }),
    txtContent: (it) => ({
        flexDirection: 'row',
        marginLeft: normalize(20),
        borderWidth: it === true ? normalize(2) : normalize(0),
        borderColor: it === true ? Colors.SILVER : null,
        borderRadius: it === true ? normalize(8) : normalize(0),
        paddingHorizontal: normalize(6),
        height: normalize(35),
    }),
    touchIconDelete: {
        alignSelf: 'center',
    },
});
