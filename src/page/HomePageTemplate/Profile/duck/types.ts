export interface User {
    id: string,
    passWord: string,
    email: string,
    name: string,
    phoneNumber: string
}
export interface InitialState<T>  {
    loading: boolean,
    data: null | T,
    error: any
}

export interface ActEditUser {
    type: string,
    payload?: any ,
}
