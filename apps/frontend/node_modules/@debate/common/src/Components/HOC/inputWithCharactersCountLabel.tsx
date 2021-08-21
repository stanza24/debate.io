import {TEventType, transformEventToValue, usePrev} from '@utils-npm/helper-utils/src';
import {Input} from 'antd';
import type {TextAreaRef} from 'antd/lib/input/TextArea';
import {
    FocusEvent,
    ForwardRefExoticComponent,
    FunctionComponent,
    PropsWithoutRef,
    Ref,
    RefAttributes,
    forwardRef,
    useCallback,
    useEffect,
    useState,
} from 'react';

type TWrappedComponentRef = HTMLInputElement | TextAreaRef;

/**
 * Базовая модель прокидываемых в компонент свойств, для определения дженерика.
 *
 * @prop [onChange] Функция изменения содержимого.
 * @prop [onFocus] Функция фокусирования на поле.
 * @prop [onBlur] Функция клика вне поля.
 * @prop [maxLength] Максимальная длинна содержимого в символах.
 * @prop [value] Значение.
 * @prop [defaultValue] Значение по умолчанию.
 */
interface IBaseWrappedComponentProps {
    onChange?: (event: TEventType) => void;
    onFocus?: (event: FocusEvent<HTMLInputElement> | FocusEvent<HTMLTextAreaElement>) => void;
    onBlur?: (event: FocusEvent<HTMLInputElement> | FocusEvent<HTMLTextAreaElement>) => void;
    maxLength?: number;
    value?: string | number | ReadonlyArray<string>;
    defaultValue?: string | number | ReadonlyArray<string>;
}

/** HOC для обёртки полей ввода, с отрисовкой ограничений по вводу символов. */
export const inputWithCharactersCountLabel = <TBaseWrappedComponentProps extends IBaseWrappedComponentProps>(
    wrappedComponent: typeof Input | typeof Input.TextArea | typeof Input.Password
): ForwardRefExoticComponent<PropsWithoutRef<TBaseWrappedComponentProps> & RefAttributes<TWrappedComponentRef>> => {
    const WrappedComponent: FunctionComponent<
        TBaseWrappedComponentProps & {forwardedRef: Ref<TWrappedComponentRef>}
    > = (props: TBaseWrappedComponentProps & {forwardedRef: Ref<TWrappedComponentRef>}) => {
        /** Подготавливаем пропсы к работе в HOC */
        const Component = wrappedComponent;
        const {forwardedRef, ...clearedOfRefProps} = props;
        const {onChange, onFocus, onBlur, ...clearWrappedComponentProps} = clearedOfRefProps;
        const {value, defaultValue, maxLength} = clearWrappedComponentProps;

        /** Объявляем хуки и логику  HOC */
        const [charactersCount, setCharactersCount] = useState(
            value?.toString().length || defaultValue?.toString().length || 0
        );
        const [showLabel, setShowLabel] = useState(false);
        const prevValue = usePrev(value);

        useEffect(() => {
            const valueLength = value?.toString().length;

            if (valueLength !== prevValue?.toString().length && valueLength !== charactersCount) {
                setCharactersCount(valueLength || 0);
            }
        }, [value, prevValue, charactersCount]);

        /**
         * Обёртка над onFocus, для отображения количества символов.
         *
         * @param event Событие изменения инпута
         */
        const handleOnFocus = useCallback(
            (event) => {
                setShowLabel(true);

                onFocus && onFocus(event);
            },
            [onFocus]
        );

        /**
         * Обёртка над onBlur, для отображения количества символов.
         *
         * @param event Событие изменения инпута
         */
        const handleOnBlur = useCallback(
            (event) => {
                setShowLabel(false);

                onBlur && onBlur(event);
            },
            [onBlur]
        );

        /**
         * Обёртка над onChange, для отображения количества символов.
         *
         * @param event Событие изменения инпута
         */
        const handleOnChange = useCallback(
            (event) => {
                setCharactersCount(transformEventToValue(event).length);

                onChange && onChange(event);
            },
            [onChange]
        );

        return maxLength ? (
            <div
                className={`input-with-characters-count${showLabel ? ' show-label' : ''}`}
                data-character-count={charactersCount}
                data-max-length={maxLength}
            >
                <Component
                    ref={forwardedRef}
                    {...clearWrappedComponentProps}
                    onChange={handleOnChange}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                />
            </div>
        ) : (
            <Component
                ref={forwardedRef}
                {...clearedOfRefProps}
            />
        );
    };

    WrappedComponent.displayName = 'inputWithCharactersCountLabel WrappedComponent';

    // eslint-disable-next-line react/display-name
    return forwardRef<TWrappedComponentRef, TBaseWrappedComponentProps>((props, ref) => (
        <WrappedComponent {...props} forwardedRef={ref} />
    ));
};
