import {
    type ReactNode,
    forwardRef,
    memo,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import FocusLock from 'react-focus-lock';
import classNames from 'classnames';
import styles from './Menu.module.scss';

type Props = {
    children: ReactNode;
    className?: string;
};

const Menu = forwardRef<HTMLUListElement, Props>(function Menu(props, ref) {
    const [tabIndex, setTabIndex] = useState(0);
    const mountedRef = useRef(true);

    useEffect(() => {
        return (): void => {
            mountedRef.current = false;
        };
    }, []);

    const handleFocusWrapper = useCallback(() => {
        if (mountedRef.current) {
            setTabIndex(-1);
        }
    }, []);

    return (
        <FocusLock autoFocus>
            <div
                className={styles['wrapper']}
                tabIndex={tabIndex}
                onFocus={handleFocusWrapper}
            >
                <ul
                    ref={ref}
                    className={classNames(styles['menu'], props.className)}
                >
                    {props.children}
                </ul>
            </div>
        </FocusLock>
    );
});

export default memo(Menu);
