import {createHashHistory} from 'history';

/**
 * Данный history создан специально для того чтобы реализовать утилиту RouterUtils (import {RouterUtils} from 'Core').
 * И использование RouterUtils.redirect вместо useHistory, поскольку useHistory недоступен в:
 * 1- Классах
 * 2- Экшенах
 * 3- Утилитах
 *
 * А он там часто бывает нужен.
 *
 * В связи с чем в проекте запрещен useHistory в пользу RouterUtils, поскольку он гарантирует обращаение с нужной нам history
 * в безопасной, удобной и стандартизированной форме.
 */
export const historyApp = createHashHistory();
