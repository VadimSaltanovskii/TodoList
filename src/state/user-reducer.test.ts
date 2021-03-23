import { userReducer, StateType } from './user-reducer'

let startState: StateType

beforeEach(() => {
    startState = {
        age: 30,
        childrenCount: 0,
        name: 'Vadim',
        isMarried: true,
        friends: ['Sergey', 'Nikolay', 'Masha']
    }
})

test('User Reducer should be increment only childrenCount', () => {

    const finalState: StateType = userReducer(startState, { type: 'Increment children' })

    expect(finalState.childrenCount).toBe(1)
    expect(finalState).toEqual({
        age: 30,
        childrenCount: 1,
        name: 'Vadim',
        isMarried: true,
        friends: ['Sergey', 'Nikolay', 'Masha']
    })
})

test('Reducer should be change name', () => {
    const finalState = userReducer(startState, {type: 'Change name'})

    expect(finalState.name).toBe('New name')
    expect(finalState.age).toBe(30)
})

test('Reducer should be change status', () => {
    const finalState = userReducer(startState, {type: 'Change status'})

    expect(finalState.isMarried).toBe(false)
})

test('Reducer should be adding friend', () => {
    const finalState = userReducer(startState, {type: 'Add friends'})

    expect(finalState.friends.length).toBe(4)
    expect(finalState.friends[finalState.friends.length - 1]).toBe('Inkognito')
})


// Test driven development
test('Reducer must added pet', () => {
    const petName = 'Jack'
    const petName2 = 'Wicky'
    const finalState = userReducer(startState, {type: 'Add pet', petName: petName, petName2: petName2})

    expect(finalState.pet).toBeTruthy()
    expect(finalState.pet.length).toBe(2)
    expect(finalState.pet[1]).toBe('Wicky')
})
