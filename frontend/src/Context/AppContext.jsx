import { createContext, useEffect, useState } from "react";
import { fetchCategory } from "../Services/CategoryService";
import { fetchItem } from "../Services/ItemService";

export const AppContext = createContext(null);


export const AppContextProvider = (props) => {
    const [items, setItems] = useState([])
    const [categories, setCategories] = useState([])
    const [auth, setAuth] = useState({
        token: null, role: null
    })

    useEffect(() => {
        async function loadData() {
            if (localStorage.getItem("token") && localStorage.getItem("Role")) {
                setAuthData(
                    localStorage.getItem("token"),
                    localStorage.getItem("Role")
                )
            }
            const categoryResponse = await fetchCategory();
            const itemResponse = await fetchItem();

            setCategories(categoryResponse.data)
            setItems(itemResponse.data)
        }
        loadData()
    }, [])

    const setAuthData = (token, role) => {
        setAuth({ token, role })
    }

    const contextValue = {
        categories,
        setCategories,
        auth,
        setAuthData,
        items,
        setItems
    }

    return <AppContext.Provider value={contextValue}>
        {props.children}
    </AppContext.Provider>

}