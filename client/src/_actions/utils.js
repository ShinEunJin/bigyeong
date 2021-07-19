export const asyncThunk = (type, request, key) => {
  const [SUCCESS, FAILURE] = [`${type}_SUCCESS`, `${type}_FAILURE`]
  return (param) => async (dispatch) => {
    dispatch({ type })
    try {
      const { data } = await request(param)
      dispatch({
        type: SUCCESS,
        payload: data[key], //키는 데이터 종류 구분 (product, products, user)
      })
    } catch (error) {
      dispatch({
        type: FAILURE,
        error,
      })
    }
  }
}
