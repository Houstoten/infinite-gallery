import { FC } from "react";
import { useCanvas } from "../state/context";
import { Progress } from '@nextui-org/react';
import { CSSTransition } from 'react-transition-group';
import styles from '../styles/Home.module.css'

const SplashScreen: FC<{indeterminated?: boolean, transition?: boolean}> = ({indeterminated = false, transition = true}) => {
    const { state } = useCanvas()

    const { splashLoading: { initial: splashInitial, progress: splashProgress, loading: splashLoading } } = state

    const _indeterminated = indeterminated || (splashLoading && !splashInitial)

    return <CSSTransition

        in={splashLoading}
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
                indeterminated={splashLoading && !splashInitial}
                css={{ width: 400 }}
                max={splashLoading ? splashInitial : 10}
                color="primary"
                value={splashLoading ? splashProgress : 10}
            />
        </div>
    </CSSTransition>

}

export default SplashScreen