import React, { useState, useCallback } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import Tile from './Tile.js';
// import ErrorBoundary from './ErrorBoundary.js';

const Tiles = (props) => {
    const [selected, setSelected] = useState(new Map());
    const onSelect = useCallback(
        id => {
            const newSelected = new Map(selected);
            newSelected.set(id, !selected.get(id));
            setSelected(newSelected);
        }, [selected]);

    return (
        <View style={styles.div1}>
            <FlatList style={styles.flat} data={props.data} renderItem={(x) => (
                <Tile id={x.item.id} data={x.item} selected={!!selected.get(x.item.id)}
                    onSelect={onSelect} />)} keyExtractor={x => x.id.toString()} extraData={selected} action={props.action}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    div1: {
        flex: 1,
        backgroundColor: '#333',
        alignItems: 'center',
        justifyContent: 'center',
        width: '95%',
    },
    flat: {
        width: '100%',
    }
});

export default Tiles;