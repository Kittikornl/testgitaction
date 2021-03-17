const authHeader = () => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    console.log(user);
    if (user && user.token) {
        return 'bearer ' + user.token 
    } else {
        return {}
    }
}
export default authHeader