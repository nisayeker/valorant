import { createContext, useContext, useState } from "react"
import { useTranslation } from "react-i18next"


const AppContext = createContext()

export const AppContextProvider = ({ children }) => {

    const { i18n } = useTranslation()

    const [settings, setSettings] = useState({
        theme: localStorage.getItem("theme") || "dark",
        language: localStorage.getItem("language") || "en-US"
    })


    const setTheme = (value) => {
        localStorage.setItem("theme", value)
        setSettings({ ...settings, theme: value })
    }

    const setLanguage = async (value) => {
        localStorage.setItem("language", value)
        setSettings({ ...settings, language: value })
        await i18n.changeLanguage(value === "tr-TR" ? 'tr' : 'en')
    }

    return (
        <AppContext.Provider value={{
            setting: settings, setTheme, setLanguage
        }}>
            {children}
        </AppContext.Provider>
    )
}


export const useAppContext = () => {
    const settings = useContext(AppContext);
    return { ...settings }
}
