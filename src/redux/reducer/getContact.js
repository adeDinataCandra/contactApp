const initialStateContact = {
    id: '',
    firstName: '',
    lastName: '',
    age: '',
    photo: '',
}

export const getContact = (state=initialStateContact, action) => {
    if(action.type === 'GET_CONTACT'){
        return {
            ...state,
            id: action.value.id,
            firstName: action.value.firstName,
            lastName: action.value.lastName,
            age: action.value.age,
            photo: action.value.photo

        }
    }

    return state;
}