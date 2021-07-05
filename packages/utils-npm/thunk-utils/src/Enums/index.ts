/**
 * Суффиксы для стандартных асинхронных экшен тайпов.
 *
 * BEGIN - Суффикс запущенного, но не завершенного процесса.
 * SUCCESS - Суффикс успешно завершенного процесса.
 * FAILURE - Суффикс завершенного с ошибкой процесса.
 */
export enum EProcessActionTypeSuffixes {
    BEGIN = '_BEGIN',
    SUCCESS = '_SUCCESS',
    FAILURE = '_FAILURE',
}
