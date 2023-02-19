import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// const resources = {
//     tr: {
//         translation: {
//             "DetailButton": "Detay",
//             "Languages": "Diller",
//             "SidebarHome": "Ana Sayfa",
//             "SidebarAgents": "Ajanlar",
//             "SidebarMaps": "Haritalar",
//             "SidebarWeapons": "Silahlar",
//             "SidebarPlayerCards": "Oyuncu Kartları",
//             "SidebarBundles": "Paketler"
//         }
//     },
//     en: {
//         translation: {
//             "DetailButton": "Detail",
//             "Languages": "Languages",
//             "SidebarHome": "Home",
//             "SidebarAgents": "Agents",
//             "SidebarMaps": "Maps",
//             "SidebarWeapons": "Weapons",
//             "SidebarPlayerCards": "Player Cards",
//             "SidebarBundles": "Bundles"
//         }
//     }
// };


i18n
    .use(initReactI18next)
    .use(Backend)
    // .use(LanguageDetector)
    .init({
        // resources,
        fallbackLng: "en"
    });

export default i18n;