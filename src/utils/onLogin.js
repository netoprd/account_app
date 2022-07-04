import api from "./api";
import { notifySuccess } from "./toast"

export async function onLogin(payload) {

    await api.Auth.saveAuthData(payload);
    notifySuccess(payload.sucessMessage);
    const lastAccessedUrl = localStorage.getItem("lastAccessedUrl");
    if( lastAccessedUrl !== null) {
        if(payload.isAdmin) {
            window.location.href = `${window.location.origin}/salesshop`;
        } else {
            window.location.href = `${window.location.origin}${lastAccessedUrl}`;
        }
    } else {
        window.location.href = payload?.isAdmin  ? `${window.location.origin}/salesshop` : `${window.location.origin}/salesshop`;
    }
}