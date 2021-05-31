export const asyncThunk = (type, request) => {
  const [SUCCESS, FAILURE] = [`${type}_SUCCESS`, `${type}_FAILURE`]

  return (param) => async (dispatch) => {
    dispatch({ type })
    try {
      const { data } = await request(param)
      dispatch({
        type: SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: FAILURE,
        error,
      })
    }
  }
}
