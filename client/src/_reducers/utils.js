export const reducerUtils = {
  loading: (state = null) => ({
    loading: true,
    error: null,
  }),
  success: (payload, key) => ({
    loading: false,
    [key]: payload,
    error: null,
  }),
  failure: (error) => ({
    loading: false,
    error,
  }),
}

export const handleAsyncActions = (type, key) => {
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
          ...reducerUtils.success(action.payload, key),
        }
      case ERROR:
        return {
          ...state,
          ...reducerUtils.success(action.error),
        }
      default:
        return state
    }
  }
}
