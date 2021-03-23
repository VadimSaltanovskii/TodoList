// Редьюсер это функция которая меняет стейт по инструкции

export type StateType = {
    age: number
    childrenCount: number
    name: string
    isMarried: boolean
    friends: Array<string>
    pet?: any
}

type ActionType = {
    type: 'Increment age' |
    'Decrement age' | 'Increment children' |
    'Change status' |
    'Change name' |
    'Add friends' |
    'Add pet'
    [key: string]: string
}

export const userReducer = (state: StateType, actions: ActionType): StateType => {
    switch (actions.type) {
        case 'Increment age':
            return { ...state, age: state.age + 1 }
        case 'Decrement age':
            return { ...state, age: state.age - 1 }
        case 'Increment children':
            return { ...state, childrenCount: state.childrenCount + 1 }
        case 'Change status':
            return { ...state, isMarried: !state.isMarried }
        case 'Change name':
            return { ...state, name: 'New name' }
        case "Add friends":
            const newFriends = [...state.friends, 'Inkognito']
            return { ...state, friends: newFriends }
        case 'Add pet':
            return {...state, pet: [actions.petName, actions.petName2]}
        default:
            throw new Error('No action')
    }
}