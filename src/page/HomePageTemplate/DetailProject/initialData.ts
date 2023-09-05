export const initialData: any = {
    task: {
        'task-1': { id: 'task-1', content: 'day la task 1' },
        'task-2': { id: 'task-2', content: 'day la task 2' },
        'task-3': { id: 'task-3', content: 'day la task 3' },
        'task-4': { id: 'task-4', content: 'day la task 4' },
    },
    colums: {
        'colum-1': {
            id: 'colum-1',
            title: 'TO DO',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
        },
        'colum-2': {
            id: 'colum-2',
            title: 'SELECTED FOR DEVELOPMENT',
            taskIds: []
        },

        'colum-3': {
            id: 'colum-3',
            title: 'IN PROGRESS',
            taskIds: []
        },
        'colum-4': {
            id: 'colum-4',
            title: 'DONE',
            taskIds: []

        },

    },
    columOder: ['colum-1', 'colum-2', 'colum-3', 'colum-4']
}