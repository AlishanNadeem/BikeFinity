import { LOG_IN, LOG_OUT } from './Types';

const LogIn = (token, expiry) => {
    return {
        type: LOG_IN,
        payload: {
            token: token,
            expiry: expiry
        }
    }
}

const LogOut = () => {
    return {
        type: LOG_OUT
    }
}

// const VerifyUser = (expiry) => {
//     var current_time = new Date().getTime() / 1000;
//     if (current_time > expiry) {
//         return {
//             type: LOG_OUT
//         }
//     } else {
//         return {
//             type: VERIFY_USER
//         }
//     }
// }

export { LogIn, LogOut };