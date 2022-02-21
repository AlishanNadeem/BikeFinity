import React from "react";
import { View, Text } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { LogOut } from "../redux/actions/authAction";

const Events = () => {

    const dispatch = useDispatch();

    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
            <TouchableOpacity onPress={() => dispatch(LogOut())}>
                <Text>LOGOUT</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Events;