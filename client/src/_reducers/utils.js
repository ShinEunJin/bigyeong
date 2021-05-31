export const reducerUtils = {
  loading: (state = null) => ({
    loading: true,
    data: state,
    error: null,
  }),
  success: (payload) => ({
    loading: false,
    data: payload,
    error: null,
  }),
  failure: (error) => ({
    loading: false,
    data: null,
    error,
  }),
}

export const handleAsyncActions = (type) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`]
  return (state, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          ...reducerUtils.loading(),
        }
      case SUCCESS:
        return {
          ...state,
          ...reducerUtils.success(action.payload),
        }
      case ERROR:
        return {
          ...state,
          ...reducerUtils.error(action.error),
        }
      default:
        return state
    }
  }
}
