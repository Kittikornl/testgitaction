import { notification } from 'antd'

const Notification = ({type, message, desc}) => {
    const showNotificationInform = () => {notification.open({
        message: message,
        description: desc
    })}
    const showNotificationSuccess = () => {notification.success({
        message: message,
        description: desc
    })}
    const showNotificationError = () => {notification.error({
        message: message,
        description: desc
    })}
    console.log(type, message, desc)
    if (type === 'inform'){
        showNotificationInform()
    } else if (type === 'success'){
        showNotificationSuccess()
    } else if (type === 'error') {
        showNotificationError()
    }
}

export default Notification