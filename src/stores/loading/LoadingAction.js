export const loadingActionType = {
    setIsLoading: 'setIsLoading',
};

const setIsLoadingSuccess = (isLoading) => ({
    type: loadingActionType.setIsLoading,
    payload: {isLoading}
});

export const setIsLoading = (isLoading) => {
    return dispatch => {
        dispatch(setIsLoadingSuccess(isLoading));
    }
};