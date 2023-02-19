import { cleanNotifications, showNotification } from "@mantine/notifications"

export const fetchErrorHandle = async (func) => {
    try {
        return await func
    } catch (error) {
        cleanNotifications()
        showNotification({
            title: "Error",
            message: error.message,
            color: 'red'
        })
    }
}