export interface FormLogin {
    email: String,
    passWord: String | number
}

export interface TypeAct {
    type: string,
    payload?: any
}

export interface StateLogin<T> {
    loading: boolean,
    data: T[] | null,
    error: any
}

export interface UserLogin {
    id: number | string,
    email: string,
    avatar: string,
    phoneNumber: string,
    name: string,
    accessToken: string,
    dateTime: string
}