/******************************************
 *  Author      : HoiHD
 *  Created On  : Sun Jul 26 2020
 *  File        : GroupByState.js
 *  Description : Loading cho những màn hình có nhóm theo trạng thái
 *******************************************/
import React, { useEffect, useState } from 'react';
import {
    Text,
    StyleSheet,
    View,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { Container, Content, Icon } from 'native-base';
import {
    Placeholder,
    PlaceholderLine,
    PlaceholderMedia,
    Shine,
} from 'rn-placeholder';
import normalize from 'react-native-normalize';

export default function LoadingGroupByState() {
    const [data, setData] = useState([...new Array(10).fill({})]);

    const _renderItem = ({ item, index }) => {
        return (
            <Placeholder
                Animation={Shine}
                Left={() => (
                    <PlaceholderMedia
                        style={{
                            height: normalize(80),
                            width: normalize(80),
                            marginRight: normalize(10),
                        }}
                    />
                )}>
                <PlaceholderLine width={normalize(80)} />
                <PlaceholderLine width={normalize(60)} />
                <PlaceholderLine width={normalize(40)} />
            </Placeholder>
        );
    };

    const _renderHeader = () => {
        return (
            <Placeholder Animation={Shine}>
                <PlaceholderLine />
            </Placeholder>
        );
    };

    return (
        <Container>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={_renderItem}
                contentContainerStyle={{ padding: normalize(10) }}
                ListHeaderComponent={_renderHeader}
                ItemSeparatorComponent={() => (
                    <View style={{ height: normalize(10) }} />
                )}
            />
        </Container>
    );
}

const styles = StyleSheet.create({});
