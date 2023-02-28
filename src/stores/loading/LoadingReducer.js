import { loadingActionType } from "./LoadingAction";

const initialState = {
    isLoading: false
}

const LoadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case loadingActionType.setIsLoading:
            return {...state, isLoading: action.payload.isLoading}
    
        default:
            return state;
    }
}

export default LoadingReducer;