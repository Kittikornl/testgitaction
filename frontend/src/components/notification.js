import { notification } from 'antd'

const Notification = ({type, message, desc}) => {
    const showNotificationInform = () => {notification.open({
        message: message,
        description: desc,
        duration: 2
    })}
    const showNotificationSuccess = () => {notification.success({
        message: message,
        description: desc,
        duration: 2
    })}
    const showNotificationError = () => {notification.error({
        message: message,
        description: desc,
        duration: 2
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