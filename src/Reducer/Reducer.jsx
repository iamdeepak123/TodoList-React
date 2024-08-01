

const Reducer = (state, action) => {
    if (action.type === "ADD") {

        const update = {
            title: action.payload.value1,
            description: action.payload.value2,
            id: new Date().toLocaleString(),
        }
        return {
            ...state,
            list: [...state.list, update],
        }
    }

    if (action.type === "REMOVE") {

        let updatelist = state.list.filter((elem) => elem.id !== action.payload)
        let updatelist2 = state.list2.filter((elem) => elem.id !== action.payload)

        return {
            ...state,
            list: updatelist,
            list2: updatelist2,
        }
    }

    if (action.type === "MOVE") {
        let updatedlist2 = state.list.filter((elem) => elem.id === action.payload);
        let updatelist = state.list.filter((elem) => elem.id !== action.payload);

      
        return {
            ...state,
            list2: [...state.list2, updatedlist2[0]],
            list: updatelist,
        }
    }

    if(action.type === "REMOVEALL"){

        return{
            ...state,
            list: [],
            list2: [],
        }
    }


    if (action.type === "EDIT") {
        let updatelist = state.list.filter((elem) => elem.id !== action.payload);

      
        return {
            ...state,
           
            list: updatelist,
        }
    }


    return state
}

export default Reducer