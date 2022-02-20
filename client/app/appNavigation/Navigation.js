import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import StackNavigation from './StackNavigation';
import AuthNavigation from './AuthNavigation';
import RNBootSplash from "react-native-bootsplash";

// import { VerifyUser } from '../redux/actions/authAction';

import { useDispatch, useSelector } from 'react-redux';

const Navigation = () => {

    const { loggedIn, expiry } = useSelector(state => state.auth);

    return (
        <NavigationContainer onReady={() => RNBootSplash.hide()}>
            {
                loggedIn === true ? <StackNavigation /> : loggedIn === false ? <AuthNavigation /> : null
            }
        </NavigationContainer>
    );
};

export default Navigation;