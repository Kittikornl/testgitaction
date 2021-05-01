import { storage } from "../config/firebase"
import { v4 as uuidv4 } from 'uuid';

const uploadUserPic = (image, userID, setUrl) => {
    const uploadTask = storage.ref(`images/user/user_${userID}`).put(image)
    uploadTask.on(
        "stated_changed",
        snapshot => {},
        error => {
            console.log(error)
        },
        () => {
            storage
                .ref('images/user/')
                .child(`user_${userID}`)
                .getDownloadURL()
                .then(url => {
                    setUrl(url)
                })

        }
    )
}

const uploadProductPic = (image, setUrl) => {
    const random = uuidv4()
    const uploadTask = storage.ref(`images/product/${random}`).put(image)
    uploadTask.on(
        "stated_changed",
        snapshot => {},
        error => {
            console.log(error)
        },
        () => {
            storage
                .ref('images/product/')
                .child(random)
                .getDownloadURL()
                .then(url => {
                    setUrl(url)
                })

        }
    )
}


export {uploadUserPic, uploadProductPic}