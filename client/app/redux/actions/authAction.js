import { LOG_IN, LOG_OUT } from './Types';

const LogIn = (token, expiry, userId) => {
    return {
        type: LOG_IN,
        payload: {
            token: token,
            expiry: expiry,
            userId: userId
        }
    }
}

const LogOut = () => {
    return {
        type: LOG_OUT
    }
}

export { LogIn, LogOut };