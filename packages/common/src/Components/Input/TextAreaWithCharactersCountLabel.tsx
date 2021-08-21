import {Input} from 'antd';
import type {TextAreaProps} from 'antd/lib/input/TextArea';
import {inputWithCharactersCountLabel} from '../HOC/inputWithCharactersCountLabel';

/** Обёрнутый Input.TextArea из antd, с визуализацией ограничений по вводу символов */
export const TextAreaWithCharactersCountLabel = inputWithCharactersCountLabel<TextAreaProps>(Input.TextArea);
