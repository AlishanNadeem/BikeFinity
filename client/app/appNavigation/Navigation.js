import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import StackNavigation from './StackNavigation';
import AuthNavigation from './AuthNavigation';
import Splash from '../screens/Splash';

// import { VerifyUser } from '../redux/actions/authAction';

import { useDispatch, useSelector } from 'react-redux';

const Navigation = () => {

    const { loggedIn, expiry } = useSelector(state => state.auth);
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(VerifyUser(expiry));
    // }, [])

    return (
        <NavigationContainer>
            {
                loggedIn === true ? <StackNavigation /> : loggedIn === false ? <AuthNavigation /> : <Splash />
            }
        </NavigationContainer>
    );
};

export default Navigation;