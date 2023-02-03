import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modalbox';
import { Container, Content, Form, Label, Textarea } from 'native-base';
import Search from '@components/Forms/Search';
import { LocalizationContext } from '@context/index';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const ModalActivity = ({
    onClosed,
    visible,
    summary,
    setSummary,
    listEmployee,
}) => {
    const { t } = useContext(LocalizationContext);
    const [employee, setEmployee] = useState({ name: '', id: '' });
    return (
        <Modal
            entry="center"
            isOpen={visible}
            position="center"
            coverScreen={true}
            onClosed={onClosed}
            style={{ maxHeight: 400 }}>
            <Provider style={{ maxHeight: 400 }}>
                <Text>Phân công cho</Text>
                <Search
                    data={listEmployee}
                    value={employee}
                    setValue={setEmployee}
                    holder={t('sales_staff')}
                    width={270}
                />
                <Text>Tổng kết</Text>
                <Textarea
                    bordered
                    rowSpan={5}
                    value={summary}
                    onChangeText={setSummary}
                />
            </Provider>
        </Modal>
    );
};

export default ModalActivity;
