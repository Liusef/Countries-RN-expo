import React from 'react';
import { StyleSheet as ss, Text, View, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import gs from '../styles';

export default function Home() {
    const {colors} = useTheme();
    return(
        <View style={ss.compose(gs.hcenter, gs.vcenter)}>
            <Image source={require('../assets/panda.png')}/>
            <View style={gs.vmargin}>
                <Text style={ss.compose({color:colors.text}, gs.h1)}>
                    Yea.
                </Text>
            </View>
            <Text style={{color: colors.text}}>
                This is a test app using React Native Expo.
            </Text>
            <Text style={{color: colors.text}}>
                This app uses GraphQL to query info about countries.
            </Text>
        </View>
    );
};

