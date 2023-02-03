/******************************************
 *  Author      : HoiHD
 *  Created On  : Wed Jul 29 2020
 *  File        : TimeSheetConfirm.js
 *  Description : Loading cho màn hình xác nhận chấm công
 *******************************************/
import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content } from 'native-base';
import { Card, } from 'native-base';
import { Placeholder, PlaceholderLine } from 'rn-placeholder';
import { PlaceholderMedia, Shine } from 'rn-placeholder';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import normalize from 'react-native-normalize';

export default function TimeSheetConfirmLoading() {
    return (
        <Container>
            <Content padder>
                <Placeholder Animation={Shine}>
                    <Card transparent>
                        <PlaceholderLine width={60} />
                        <PlaceholderLine width={40} />
                        <PlaceholderLine width={80} />
                        <PlaceholderLine width={30} />
                        <PlaceholderLine width={30} />
                        <PlaceholderLine width={30} />
                        <PlaceholderLine width={30} />
                        <PlaceholderLine width={30} />
                        <PlaceholderLine width={30} />
                        <PlaceholderLine width={30} />
                        <PlaceholderLine width={30} />
                        <PlaceholderMedia style={styles.note} />
                        <PlaceholderMedia style={styles.button} />
                    </Card>
                </Placeholder>
            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({
    button: {
        height: normalize(45),
        width: responsiveWidth(100),
        margin: 5,
    },
    note: {
        width: responsiveWidth(80),
        height: responsiveWidth(60),
        marginBottom: 10,
    },
});
