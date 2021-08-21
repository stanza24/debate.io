import {Input} from 'antd';
import type {PasswordProps} from 'antd/lib/input/Password';
import {inputWithCharactersCountLabel} from '../HOC/inputWithCharactersCountLabel';

/** Обёрнутый Input из antd, с визуализацией ограничений по вводу символов */
export const InputPasswordWithCharactersCountLabel = inputWithCharactersCountLabel<PasswordProps>(Input.Password);
