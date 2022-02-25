import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Marketplace from '../screens/Marketplace';
import Events from '../screens/Events';
import Profile from '../screens/Profile';
import Calculator from '../screens/Calculator';
import Review from '../screens/Review';

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigation = () => {
    return (
        <Tab.Navigator activeColor='#000000' inactiveColor='#FFFFFF' barStyle={{ backgroundColor: '#CA054D' }} >
            <Tab.Screen name="Marketplace" component={Marketplace}
                options={{
                    tabBarLabel: 'Marketplace',
                    tabBarIcon: ({ color }) => (
                        <Icon name="bike-scooter" color={color} size={26} />
                    ),
                }} />
            <Tab.Screen name="Events" component={Events}
                options={{
                    tabBarLabel: 'Events',
                    tabBarIcon: ({ color }) => (
                        <Icon name="emoji-events" color={color} size={26} />
                    ),
                }} />
            <Tab.Screen name="Reviews" component={Review}
                options={{
                    tabBarLabel: 'Reviews',
                    tabBarIcon: ({ color }) => (
                        <Icon name="star-outline" color={color} size={26} />
                    ),
                }} />
            <Tab.Screen name="Calculator" component={Calculator}
                options={{
                    tabBarLabel: 'Calculator',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcon name="calculator" color={color} size={26} />
                    ),
                }} />
        </Tab.Navigator>
    );
}

export default BottomTabNavigation;