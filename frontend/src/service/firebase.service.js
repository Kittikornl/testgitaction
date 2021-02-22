import { storage } from "../config/firebase"

const uploadUserPic = (image, setUrl) => {
    const uploadTask = storage.ref(`images/user/${image.name}`).put(image)
    uploadTask.on(
        "stated_changed",
        snapshot => {},
        error => {
            console.log(error)
        },
        () => {
            storage
                .ref('images/user/')
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    setUrl(url)
                })

        }
    )
}

export {uploadUserPic}