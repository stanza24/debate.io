import {MutableRefObject, useEffect, useRef} from 'react';

/**
 * Хук получения предыдущего состояния.
 *
 * @param value параметр прошлое состояние которого мы хотим отслеживать.
 */
export const usePrev = <T>(value: T): T | undefined => {
    const ref = useRef<T>();

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
};

/**
 * Хук получения состояния доступности компонента.
 */
export const useIsMounted = (): MutableRefObject<boolean> => {
    const isMounted = useRef(true);

    useEffect(
        () => () => {
            isMounted.current = false;
        },
        []
    );

    return isMounted;
};
