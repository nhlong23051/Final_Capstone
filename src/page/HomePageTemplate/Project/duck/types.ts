export interface DataType {
  members: [
    {
      userId: number,
      name: string,
      avatar: string,
    }
  ],
  creator: {
    id: number,
    name: string
  },
  id: number | string,
  projectName: string,
  description: string,
  categoryId: number | string,
  categoryName: string,
  alias: string,
  deleted: boolean
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