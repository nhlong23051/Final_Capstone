export interface DataType {
    userId: number,
    name: string,
    avatar: string,
    email: string,
    phoneNumber: string
}

export interface InitialState<T> {
    loading: boolean,
    data: null | T[],
    error: null | any
    keyWord: string
}

export interface ActType {
    type: string,
    payload?: any
}