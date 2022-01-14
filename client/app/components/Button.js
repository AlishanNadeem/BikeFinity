import * as React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const Button = (props) => {
    return (
        <View style={styles.btn}>
            {
                props.loading === true ?
                    <ActivityIndicator size={26} color="#FFFFFF" />
                    :
                    <Text style={styles.btnTxt}>{props.name}</Text>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    btn: {
        flexDirection: 'row',
        backgroundColor: '#CA054D',
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnTxt: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default Button;