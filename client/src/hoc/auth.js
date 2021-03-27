import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { auth } from "../_actions/user_action"

export default (SpecificComponent, option, adminRoute = null) => {
    function AuthenticationCheck(props) {

        const dispatch = useDispatch()

        useEffect(() => {
            dispatch(auth())
                .then(res => {
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
                            props.hisotry.push("/login")
                            setTimeout(() => {
                                alert("로그인이 필요한 서비스입니다.")
                            }, 500)
                        }
                    }
                })
        })

        return (
            <SpecificComponent />
        )
    }
    return AuthenticationCheck
}