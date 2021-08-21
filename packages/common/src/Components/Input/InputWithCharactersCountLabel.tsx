import {Input} from 'antd';
import type {InputProps} from 'antd/lib/input/Input';
import {inputWithCharactersCountLabel} from '../HOC/inputWithCharactersCountLabel';

/** Обёрнутый Input из antd, с визуализацией ограничений по вводу символов */
export const InputWithCharactersCountLabel = inputWithCharactersCountLabel<InputProps>(Input);
