export const loginActionType = {
    setUserInfo: 'setUserInfo',
}

const setUserInfoSuccess = (userInfo) => ({
    type: loginActionType.setUserInfo,
    payload: {userInfo}
});

export const setUserInfo = (userInfo) => {
    return dispatch => {
        dispatch(setUserInfoSuccess(userInfo));
      };
}