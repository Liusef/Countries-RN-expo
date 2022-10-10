import React, { useEffect, useState } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet as ss, Text, View, Image, FlatList, useColorScheme, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import gs from '../styles';
import { sendGraphQl } from '../utils';
import { shimmerLight, shimmerDark } from '../styles';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const Stack = createNativeStackNavigator();

export default function Countries() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Countries List" component={CountriesMain}/>
            <Stack.Screen name="indiv" component={CountryPage} options={{title: ""}}/>
        </Stack.Navigator>
    )
}

function CountriesMain({navigation}) {
    const endpoint = 'https://countries.trevorblades.com/graphql'
    const query = `query countries_out {
                        countries {
                            name
                            code
                            native
                        }
                    }`
    const scheme = useColorScheme()
    const tc = scheme == 'dark' ? 'white' : 'black'
    const [data, setData] = useState([null, null, null, null, null])
    const updateData = async () => {
        setData((await sendGraphQl(query, endpoint)).data.countries)
    }

    useEffect( () => {
        const fetchData = async () => await updateData();
        fetchData();
    }, []);

    return (
        <View>
            <FlatList data={data}
                    renderItem={({item, index, separators}) => (
                            <View style={{margin: 8, marginLeft: 12, padding: 16, paddingTop: 0, borderRadius: 8,
                                        backgroundColor: '#88888844'}}
                                        onTouchEnd={()=>{
                                            navigation.navigate('indiv', {code: item.code.toUpperCase()})
                                        }}>
                                <ShimmerPlaceholder style={{marginTop: 12, marginBottom: 4, height: 40 ,  borderRadius: 8, width: 80}}
                                                    shimmerColors={scheme == 'dark' ? shimmerDark : shimmerLight}
                                                    visible={item}>
                                    <Text style={{fontSize: 32, fontWeight: 'bold', 
                                                borderRadius: 8, color: tc, textAlignVertical: 'center'}}>
                                        {item ? item.code.toUpperCase() : ""}
                                    </Text>
                                </ShimmerPlaceholder>
                                <ShimmerPlaceholder style={{marginTop: 4, marginBottom: 1,borderRadius: 4}}
                                                    shimmerColors={scheme == 'dark' ? shimmerDark : shimmerLight}
                                                    visible={item}>
                                    <Text style={{color: tc}}>
                                        {item ? item.name : ""}
                                    </Text>
                                </ShimmerPlaceholder>
                                <ShimmerPlaceholder style={{marginTop: 1, marginBottom: 4, borderRadius: 4}}
                                                    shimmerColors={scheme == 'dark' ? shimmerDark : shimmerLight}
                                                    visible={item}>
                                    <Text style={{textAlign: 'left', color: tc}}>
                                        {item ? item.native : ""}
                                    </Text>
                                </ShimmerPlaceholder>
                            </View>
                        )}/>
        </View>
    )

}

function CountryPage({route, navigation}) {

    const endpoint = 'https://countries.trevorblades.com/graphql'
    const query = `query countries_out {
                        country(code: "${route.params.code}") {
                            states {
                                name
                                code
                            }
                            emoji
                            languages {
                                rtl
                                native
                                name
                                code
                            }
                            currency
                            phone
                            native
                            name
                            code
                        }
                    }`
    const scheme = useColorScheme()
    const tc = scheme == 'dark' ? 'white' : 'black'
    const [data, setData] = useState(null)
    const updateData = async () => {
        setData((await sendGraphQl(query, endpoint)).data.country)
    }

    useEffect( () => {
        const fetchData = async () => await updateData();
        fetchData();
    }, []);

    const langs = []
    if (data && data.languages) {
        for (let l of data.languages) {
            langs.push(
                <View style={{marginTop: 4, marginBottom: 4, marginRight: 24, padding: 12, paddingTop: 6, 
                            backgroundColor: '#88888833', borderRadius: 8}}>
                    <Text style={{color: tc, fontSize: 20, fontWeight: 'bold'}}>
                        {l.code.toUpperCase()}
                    </Text>
                    <Text style={{color: tc}}>
                        {l.name} ({l.native})
                    </Text>
                </View>   
            )
        }
    }

    const states = []
    if (data && data.states) {
        for (let l of data.states) {
            states.push(
                <View style={{marginTop: 4, marginBottom: 4, marginRight: 24, padding: 12, paddingTop: 6, 
                            backgroundColor: '#88888833', borderRadius: 8}}>
                    {
                        l.code &&
                        <View>
                            <Text style={{color: tc, fontSize: 20, fontWeight: 'bold'}}>
                                {l.code}
                            </Text>
                            <Text style={{color: tc}}>
                                {l.name}
                            </Text>
                        </View>
                    }
                    {
                        !l.code &&
                        <Text style={{color: tc, fontSize: 16, paddingTop: 8, paddingBottom: 2}}>
                                {l.name}
                        </Text>
                    }
                </View>   
            )
        }
    }

    return (
        <ScrollView style={{marginTop: 24, marginLeft: 24}}>
            <ShimmerPlaceholder style={{marginBottom: 4, minHeight: 40 ,  borderRadius: 8}}
                                                    shimmerColors={scheme == 'dark' ? shimmerDark : shimmerLight}
                                                    visible={data}>
                <Text style={{fontSize: 32, fontWeight: 'bold', 
                            borderRadius: 8, color: tc, textAlignVertical: 'center'}}>
                    {data ? `${data.name}  ${data.emoji}` : ""}
                </Text>
            </ShimmerPlaceholder>
            <ShimmerPlaceholder style={{marginTop: 4, marginBottom: 1, borderRadius: 4}}
                                shimmerColors={scheme == 'dark' ? shimmerDark : shimmerLight}
                                visible={data}>
                <Text style={{textAlign: 'left', color: tc}}>
                    {data ? data.native : ""}
                </Text>
            </ShimmerPlaceholder>
            <Bfr/>
            <ShimmerPlaceholder style={{marginTop: 1, marginBottom: 4, borderRadius: 4}}
                                shimmerColors={scheme == 'dark' ? shimmerDark : shimmerLight}
                                visible={data}>
                <Text style={{color: tc}}>
                    Code:           {data ? data.code : ""}
                </Text>
            </ShimmerPlaceholder>
            <ShimmerPlaceholder style={{marginTop: 1, marginBottom: 4, borderRadius: 4}}
                                shimmerColors={scheme == 'dark' ? shimmerDark : shimmerLight}
                                visible={data}>
                <Text style={{color: tc}}>
                    Currency:    {data ? data.currency : ""}
                </Text>
            </ShimmerPlaceholder>
            <ShimmerPlaceholder style={{marginTop: 1, marginBottom: 4, borderRadius: 4}}
                                shimmerColors={scheme == 'dark' ? shimmerDark : shimmerLight}
                                visible={data}>
                <Text style={{color: tc}}>
                    Phone:        {data ? `+${data.phone}` : ""}
                </Text>
            </ShimmerPlaceholder>
            <Bfr/>
            <ShimmerPlaceholder style={{marginTop: 1, marginBottom: 4, borderRadius: 4, minHeight: 28}}
                                shimmerColors={scheme == 'dark' ? shimmerDark : shimmerLight}
                                visible={data}>
                {
                    data &&
                    data.languages &&
                    <View>
                        <Text style={{color: tc, fontSize: 20, fontWeight: 'bold'}}>
                            Language(s)
                        </Text>
                        {langs}
                    </View>
                }
            </ShimmerPlaceholder>
            <Bfr/>
            <ShimmerPlaceholder style={{marginTop: 1, marginBottom: 4, borderRadius: 4, minHeight: 28}}
                                shimmerColors={scheme == 'dark' ? shimmerDark : shimmerLight}
                                visible={data}>
                {
                    data &&
                    data.states &&
                    data.states.length > 0 &&
                    <View>
                        <Text style={{color: tc, fontSize: 20, fontWeight: 'bold'}}>
                            States
                        </Text>
                        {states}
                    </View>
                }
            </ShimmerPlaceholder>
        </ScrollView>
    )
}

function Bfr() {
    return (
        <View style={{margin: 12}}/>
    )
}
