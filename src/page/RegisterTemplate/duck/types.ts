export interface FormRegister {
    email: String,
    passWord: String | number,
    name: string,
    phoneNumber: string | number,
}

export interface TypeAct {
    type: string,
    payload?: any
}

export interface StateRegister<T> {
    loading: boolean,
    data: T[] | null,
    error: any
}
