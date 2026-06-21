import { useContext, createContext, useEffect, useState } from "react";
import { supabase } from "../supabase/client.js";
export const AuthContext = createContext()


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        async function getCurrentUser() {
            console.log("API CALL")
            const {
                data: { user }
            } = await supabase.auth.getUser()
            setUser(user)

        }
        getCurrentUser();
        const {
            data: { subscription }
        } = supabase.auth.onAuthStateChange(
            (event, session) => {
                setUser(session?.user ?? null)
            }
        )

        return () => {
            subscription.unsubscribe()
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser

            }}>
            {children}
        </AuthContext.Provider>
    )

}
export default function useAuth() {
    return useContext(AuthContext)
}