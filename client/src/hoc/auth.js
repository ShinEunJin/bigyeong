import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { auth } from "../_actions/user_action"
import { withRouter } from "react-router-dom"
import theme from "./theme"

//App에서 유저 접근 권한을 위한 hoc
//true는 로그인 된 유저만, false는 로그인 되지 않은 유저만, null은 상관없이 모두 가능
export default (SpecificComponent, option, adminRoute = null) => {
  function AuthenticationCheck(props) {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(auth()).then((res) => {
        if (res.payload.isAuth) {
          if (adminRoute && !res.payload.isAdmin) {
            props.history.push("/")
            setTimeout(() => {
              alert("잘못된 접근입니다.")
            }, 500)
          }
          if (option === false) {
            props.history.push("/")
            setTimeout(() => {
              alert("잘못된 접근입니다.")
            }, 500)
          }
        } else {
          if (option) {
            props.history.push("/login")
            setTimeout(() => {
              alert("로그인이 필요한 서비스입니다.")
            }, 500)
          }
        }
      })
    }, [])

    return <SpecificComponent {...props} user={user} theme={theme} />
  }
  return withRouter(AuthenticationCheck)
}
