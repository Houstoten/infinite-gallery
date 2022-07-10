import { FC, useEffect, useState } from "react";
import { Progress } from '@nextui-org/react';
import { CSSTransition } from 'react-transition-group';
import styles from '../styles/Home.module.css'

const SplashScreen: FC<{indeterminated?: boolean, transition?: boolean, promise?: Promise<any>}> = ({indeterminated = false, transition = true, promise}) => {
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        promise && promise.then(() => setLoading(false))
    }, [])

    return <CSSTransition

        in={indeterminated || loading}
        unmountOnExit
        classNames={{
            enter: styles.splashEnter,
            enterActive: styles.splashEnterActive,
            exit: styles.splashExit,
            exitActive: styles.splashExitActive
        }}
        timeout={transition ? 1000 : 0}
    >
        <div style={{
            position: 'absolute',
            display: 'flex',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'white',
            zIndex: 1000000
        }}>
            <Progress
                indeterminated={true}
                css={{ width: 400 }}
                color="primary"
            />
        </div>
    </CSSTransition>

}

export default SplashScreen