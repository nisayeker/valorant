import { get } from "./request";

export const getApi = (url) => (get(process.env.REACT_APP_VALORANT_API + url));
