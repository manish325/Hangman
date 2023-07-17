export interface IAction<T> {
    actionType : 'edit' | 'delete',
    element : T
}