export interface IPagination {
    searchText? : string,
    pageNumber? : number,
    pageSize? : number,
    sortManner? : 0 | 1 | undefined,
    status ?: boolean | undefined
}