import React, { useState, Fragment, useContext } from 'react';
import { StyleSheet, FlatList, View, TouchableOpacity } from 'react-native';
import { Icon, ListItem, Left, Right, Text, Item } from 'native-base';
import { IconButton } from 'react-native-paper';
import normalize from 'react-native-normalize';
import { Label } from 'native-base';
import { LocalizationContext } from '@context/index';

import theme from '@styles/theme.style';
import { ModalViewEmployee } from '../Application/BusinessTravelComponent/ModalView';
import Colors from '@styles/color';

export default function PeopleTab({ title, data, disabled = false, setData }) {
    const { t } = useContext(LocalizationContext);
    const [visible, setVisible] = useState(false);
    const onDelete = (item, index) => {
        let newData = data.filter((e, inx) => {
            return inx !== index;
        });
        setData(newData);
    };

    const _renderItem = ({ item, index }) => {
        return (
            <ListItem>
                <Left>
                    <Label style={styles.name}>{item.name || ''}</Label>
                </Left>
                {!disabled && (
                    <Right>
                        <TouchableOpacity onPress={() => onDelete(item, index)}>
                            <Icon
                                active
                                name="close"
                                type="AntDesign"
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    </Right>
                )}
            </ListItem>
        );
    };

    return (
        <Fragment>
            {!disabled ? (
                <View style={styles.viewHeaderList}>
                    <Label style={styles.title}>
                        {t(title)} <Text style={{ color: 'red' }}>*</Text>:
                    </Label>
                    <IconButton
                        icon="account-multiple-plus-outline"
                        style={styles.iconButton}
                        color={theme.MAIN_COLOR}
                        onPress={() => setVisible(true)}
                    />
                </View>
            ) : (
                <View style={styles.viewHeaderList}>
                    <Text style={styles.title}>{t(title)} :</Text>
                </View>
            )}
            <FlatList
                data={data}
                nestedScrollEnabled={true}
                style={{ maxHeight: normalize(200, 'height') }}
                renderItem={_renderItem}
                keyExtractor={(item, index) => index.toString()}
            />

            <ModalViewEmployee
                modalVisible={visible}
                setModalVisible={setVisible}
                dataEmp={data}
                setDataEmp={setData}
            />
        </Fragment>
    );
}
const styles = StyleSheet.create({
    iconButton: {
        alignSelf: 'flex-end',
    },
    name: {
        fontFamily: theme.FONT_FAMILY,
        fontSize: 14,
        color: Colors.BLACK,
        width: normalize(300),
    },
    icon: {
        color: theme.MAIN_COLOR,
        fontSize: normalize(25),
    },
    title: {
        fontFamily: theme.FONT_BOLD,
        fontSize: 14,
        color: Colors.BLACK,
        marginLeft: normalize(10, 'width'),
        marginTop: normalize(8, 'height'),
    },
    viewHeaderList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // margin: normalize(8),
        marginLeft: normalize(10),
        alignItems: 'center',
    },
    viewList: {
        flexDirection: 'row',
    },
});
