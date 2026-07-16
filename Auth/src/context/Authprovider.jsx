import { Children, createContext, useContext, useEffect, useState } from "react"
import { httpInterceptor } from "../component/lib/httpInterceptor"
const AuthContext = createContext()
export const AuthProvider = ({ children }) => {

    const [userInfo, setUserInfo] = useState(null)

    const userFetch = async () => {
        try {
            const {data} = await httpInterceptor.get('/auth/session')        
           setUserInfo(data)

            console.log("conect", data)
    
           
           
        }
        catch (err) {
            setUserInfo(null)}
    }
    useEffect(() => {
        userFetch()
    }, [])

    return (
        <AuthContext.Provider value={{ userInfo, userFetch }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext)