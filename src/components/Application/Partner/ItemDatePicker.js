import themeStyle from '@styles/theme.style';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';

import Colors from '@styles/color';
import DatePicker from 'react-native-datepicker';

export default function ItemDatePicker({ title, value, onEdit }) {
    const [datepicker, setDatepicker] = useState(Date());
    useEffect(() => {
        setDatepicker(value);
    }, [value]);
    const onChangeDate = (date) => {
        setDatepicker(date);
    };
    return (
        <View style={styles.viewItem}>
            <Text numberOfLines={1} style={styles.txtTitle}>
                {title}:{' '}
            </Text>
            <DatePicker
                // modal
                // open={false}
                style={styles.txtContent(onEdit)}
                date={datepicker}
                format="DD/MM/YYYY"
                onDateChange={onChangeDate}
                // onOpenModal={false}
                duration={300}
                // hideText={false}
                // disabled={!onEdit}
                // showIcon={onEdit}
                // customStyles={{
                //     dateIcon: {
                //         // position: 'absolute',
                //         left: 0,
                //         top: 4,
                //         marginLeft: 0,
                //     },
                //     dateInput: {
                //         // marginLeft: 36,
                //     },
                //     // ... You can check the source to find the other keys.
                // }}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    viewItem: {
        flexDirection: 'row',
        padding: normalize(5),
        alignItems: 'center',
        margin: normalize(5),
        // marginLeft: normalize(13),
    },
    txtTitle: {
        flex: 0.3,
        fontFamily: themeStyle.FONT_FAMILY,
        color: themeStyle.COLOR_BLACK,
        fontSize: normalize(14),
        marginLeft: normalize(15),
        // borderWidth: 2,
    },
    txtContent: (it) => ({
        flex: 1,
        fontFamily: themeStyle.FONT_BOLD,
        color: themeStyle.COLOR_BLACK,
        fontSize: normalize(14),
        // borderWidth: 2,
        marginLeft: normalize(20),
        // borderWidth: it === true ? normalize(2) : normalize(0),
        // borderColor: it === true ? Colors.SILVER : null,
        borderRadius: it === true ? normalize(8) : normalize(0),
        padding: normalize(6),
        backgroundColor: Colors.WHITE,
    }),
});
