/**
 * Модель изображения в интерфейсе.
 *
 * @prop thumbnail Ссылка на миниатюру.
 * @prop [preview] Ссылка на полную версию.
 */
export interface IUIImage {
    thumbnail: string;
    preview?: string;
}
