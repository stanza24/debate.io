/**
 * Модель нового предупреждения о возможной потери изменений в форме.
 *
 * @prop [listenConfirmation] Слушатель события показа предупреждения.
 */
export interface INewConfirmation {
    listenConfirmation?: (key?: string) => void;
}

/**
 * Модель хранимого предупреждения о возможной потери изменений в форме.
 *
 * @prop key Идентификатор предупреждения.
 */
export interface IConfirmation extends INewConfirmation {
    key: string;
}

/** Тип описывающий объект хранилище всех предупреждений */
export type TConfirmationStore = {[key in string]?: IConfirmation};
