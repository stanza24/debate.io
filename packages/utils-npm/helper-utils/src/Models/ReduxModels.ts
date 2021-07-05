/**
 * Модель хранилища Redux по паттерну Collections - Relations.
 */
export interface IModuleDb<TCollections, TRelations> {
    collections: TCollections;
    relations: TRelations;
}
