
const auth = () => {
    const token = localStorage.getItem('x_access_token');
    return token;
}

export default auth;
