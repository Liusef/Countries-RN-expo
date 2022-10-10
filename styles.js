import { StyleSheet } from 'react-native';

const gs = StyleSheet.create({
    hcenter: {
        flex: 1,
        alignItems: 'center',
    },
    vcenter: {
        flex: 1,
        justifyContent: 'center',
    },
    vmargin: {
        marginVertical: 20,
    },
    h1: {
        fontWeight: 'bold',
        fontSize: 30,
    }
});

export default gs;

const shimmerLight = ['#ebebeb', '#c5c5c5', '#ebebeb']
const shimmerDark  = ['#222222', '#555555', '#222222']

export { shimmerLight, shimmerDark } 
