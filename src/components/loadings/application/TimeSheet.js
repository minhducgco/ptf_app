/******************************************
 *  Author      : HoiHD
 *  Created On  : Wed Jul 29 2020
 *  File        : TimeSheet.js
 *  Description : Loading cho màn hình danh sách chấm công
 *******************************************/
import React, {useState} from 'react';
import {Container} from 'native-base';
import {View, FlatList} from 'react-native';
import {Placeholder, PlaceholderLine} from 'rn-placeholder';
import {PlaceholderMedia, Shine} from 'rn-placeholder';

export default function TimeSheetLoading() {
    const [data, setData] = useState([...new Array(42).fill({})]);

    const _renderItem = ({item, index}) => {
        return (
            <View style={{flex: 1, alignItems: 'center'}}>
                <PlaceholderMedia />
            </View>
        );
    };

    return (
        <Container>
            <Placeholder Animation={Shine}>
                <PlaceholderLine width={80} style={{margin: 15}} />
                <FlatList
                    contentContainerStyle={{
                        justifyContent: 'center',
                        padding: 10,
                        marginBottom: 100,
                    }}
                    numColumns={7}
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={_renderItem}
                    ItemSeparatorComponent={() => <View style={{height: 5}} />}
                />
                <View style={{paddingLeft: 15}}>
                    <PlaceholderLine width={40} />
                    <PlaceholderLine width={80} />
                    <PlaceholderLine width={80} />
                    <PlaceholderLine width={80} />
                </View>
            </Placeholder>
        </Container>
    );
}
