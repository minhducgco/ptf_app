/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Modal, FlatList } from 'react-native';
import { ListItem, Icon, Left, Right, Text, Container } from 'native-base';
import normalize from 'react-native-normalize';
import HeaderBackStatusBar from '@components/headers/HeaderSearch';
import theme from '@styles/theme.style';
import Colors from '@styles/color';
import { LocalizationContext } from '@context/index';

const ModalAddEmployee = ({
    visible,
    setVisible,
    listEmployee,
    listSelected = [],
    addEmployee,
}) => {
    const { t } = useContext(LocalizationContext);
    const [listEmployeeFilter, setListEmployeeFilter] = useState([]);
    const [listEmployeeFormat, setListEmployeeFormat] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        // Check những nhân viên đã chọn trong danh sách nhân viên
        if (listSelected.length > 0) {
            const newListEmployee = listEmployee.map((item) => {
                if (listSelected.findIndex((it) => it.id === item.id) >= 0) {
                    return {
                        ...item,
                        active: true,
                    };
                } else {
                    return {
                        ...item,
                        active: false,
                    };
                }
            });
            // Check nếu còn text search thì k set lại mảng hiển thị
            if (searchText) {
                let filteredName = newListEmployee.filter((item) => {
                    return item.name
                        .toLowerCase()
                        .match(searchText.toString().toLowerCase().trim());
                });
                setListEmployeeFilter(filteredName);
            } else {
                setListEmployeeFilter(newListEmployee);
            }
            setListEmployeeFormat(newListEmployee);
        } else {
            setListEmployeeFilter(listEmployee);
            setListEmployeeFormat(listEmployee);
        }
    }, [listEmployee, listSelected]);

    const addEmp = (item) => {
        addEmployee(item);
    };

    const _renderItem = ({ item, index }) => {
        return (
            <ListItem button onPress={() => addEmp(item)}>
                <Left>
                    <Text style={styles.userName}>{item.name}</Text>
                </Left>
                <Right>
                    {item.active && (
                        <Icon
                            name="account-check"
                            type="MaterialCommunityIcons"
                            style={styles.userCheckIcon}
                        />
                    )}
                </Right>
            </ListItem>
        );
    };
    const onActionBack = () => {
        setVisible(false);
    };
    const onChangeText = (text) => {
        setSearchText(text);
        if (!text || text === '') {
            setListEmployeeFilter(listEmployeeFormat);
        } else {
            let filteredName = listEmployeeFormat.filter((item) => {
                return item.name
                    .toLowerCase()
                    .match(text.toString().toLowerCase().trim());
            });
            setListEmployeeFilter(filteredName);
        }
    };
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            statusBarTranslucent={true}>
            <Container>
                <HeaderBackStatusBar
                    hasBack={true}
                    onGoBack={onActionBack}
                    onChangeText={onChangeText}
                    value={searchText}
                    placeholder={t('search')}
                />
                <FlatList
                    data={listEmployeeFilter}
                    renderItem={_renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </Container>
        </Modal>
    );
};

export default ModalAddEmployee;
const styles = StyleSheet.create({
    userName: {
        fontFamily: theme.FONT_FAMILY,
        fontSize: normalize(16),
    },
    userCheckIcon: {
        fontSize: normalize(24),
        color: 'green',
    },
    separator: { width: 10 },
    button: {
        flex: 1,
        justifyContent: 'center',
        margin: normalize(5),
    },
    textButton: {
        fontFamily: theme.FONT_BOLD,
        color: Colors.WHITE,
        fontSize: normalize(14, 'height'),
    },
    note: {
        marginLeft: 15,
        borderRadius: 7,
        fontFamily: theme.FONT_REGULAR,
    },
    titleColor: {
        fontFamily: theme.FONT_BOLD,
        color: theme.MAIN_COLOR,
        fontSize: 14,
    },
    title: {
        fontFamily: theme.FONT_BOLD,
        color: Colors.BLACK,
        fontSize: 14,
        marginLeft: normalize(16, 'width'),
        marginBottom: normalize(8, 'height'),
    },
    text: {
        fontFamily: theme.FONT_BOLD,
        color: Colors.BLACK,
        fontSize: 14,
        marginRight: normalize(5, 'width'),
    },
    subTitle: {
        fontFamily: theme.FONT_FAMILY,
        color: Colors.BLACK,
        fontSize: 14,
    },
    textStyle: {
        fontFamily: theme.FONT_FAMILY,
        color: Colors.WHITE,
        fontSize: 14,
    },
    viewItem: {
        flexDirection: 'row',
        height: normalize(80, 'height'),
        // padding: normalize(8),
        backgroundColor: Colors.ALABASTER,
        borderRadius: normalize(5),
        marginTop: normalize(8, 'height'),
    },
    viewText: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    touch: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
