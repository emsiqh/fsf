// import { useEffect, useState } from 'react';
// import { onAuthStateChanged } from "firebase/auth";

// import { auth } from '../firebase/config';

// const userAuth = () => {
//     const [currentUser, setCurrentUser] = useState({});

//     useEffect(() => {
//         onAuthStateChanged(auth, (user) => {
//             if (user) {
//                 setCurrentUser(user);
//             } else {
//                 setCurrentUser(null);
//             }
//         });
//     })

//     return {
//         currentUser,
//     };
// }

// export default userAuth;
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";

import { auth } from '../firebase/config';

const userAuth = () => {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                setCurrentUser(null);
            }
        });
        return unsubscribe;
    }, [auth]);

    return {
        currentUser,
    };
}

export default userAuth;