import React, { useEffect, useState } from 'react';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet as ss, Text, View, Image, FlatList, useColorScheme } from 'react-native';
import { useTheme } from '@react-navigation/native';
import gs from '../styles';
import { shimmerLight, shimmerDark } from '../styles';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

export default function Loading(props) {
    const scheme = useColorScheme()
    const [data, setData] = useState([null, null, null, null, null])

    return (
        <View>
            <FlatList data={data}
                    renderItem={({item, index, separators}) => (
                            <View style={{margin: 8, marginLeft: 12, padding: 16, paddingTop: 0, borderRadius: 8,
                                        backgroundColor: '#88888844'}}>
                                <ShimmerPlaceholder style={{marginTop: 12, marginBottom: 4, height: 56, borderRadius: 8, width: 80}}
                                                    shimmerColors={scheme == 'dark' ? shimmerDark : shimmerLight}>
                                    <Text style={{marginBottom: 4, fontSize: 32, fontWeight: 'bold', 
                                                borderRadius: 8, color: 'white'}}>
                                        {item ? item.code.toUpperCase() : ""}
                                    </Text>
                                </ShimmerPlaceholder>
                                <ShimmerPlaceholder style={{marginTop: 4, marginBottom: 4, borderRadius: 4}}
                                                    shimmerColors={scheme == 'dark' ? shimmerDark : shimmerLight}>
                                    <Text style={{color: 'white'}}>
                                        {item ? item.name : ""}
                                    </Text>
                                </ShimmerPlaceholder>
                                <ShimmerPlaceholder style={{marginTop: 4, marginBottom: 4, borderRadius: 4}}
                                                    shimmerColors={scheme == 'dark' ? shimmerDark : shimmerLight}>
                                    <Text style={{textAlign: 'left', color: 'white'}}>
                                        {item ? item.native : ""}
                                    </Text>
                                </ShimmerPlaceholder>
                            </View>
                        )}/>
        </View>
    )
}