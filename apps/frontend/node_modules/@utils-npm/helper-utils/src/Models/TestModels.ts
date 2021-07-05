/**
 * Модель теста функционала.
 *
 * @prop testName Название теста.
 * @prop input Массив входных аргументов функции.
 * @prop output Выходные данные.
 */
export interface IToBeEqualTestData<TInput, TOutput> {
    testName: string;
    input: TInput;
    output: TOutput;
}
