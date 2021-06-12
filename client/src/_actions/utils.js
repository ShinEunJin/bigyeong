export const asyncThunk = (type, request, key) => {
  const [SUCCESS, FAILURE] = [`${type}_SUCCESS`, `${type}_FAILURE`]
  return (param) => async (dispatch) => {
    dispatch({ type })
    try {
      const { data } = await request(param)
      dispatch({
        type: SUCCESS,
        payload: data[key],
      })
    } catch (error) {
      dispatch({
        type: FAILURE,
        error,
      })
    }
  }
}
