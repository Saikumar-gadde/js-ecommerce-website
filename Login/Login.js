let userData = {};

const inputHandler = (e) => {
    const { name, value } = e.target

    userData = {
        ...userData,
        [name] : value
    }
}


const loginUser = async (e) => {
    try {
        e.preventDefault();

    const API = 'https://the-techie-crud.onrender.com/user-login';


    const userLogin = await fetch(API, {
        method: 'POST',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify(userData)
    });


    const loggedUser = await userLogin.json();

    if(loggedUser.loginToken){
        localStorage.setItem('token', JSON.stringify({ 'userToken' : loggedUser.loginToken, name : loggedUser.fullName}));
        window.location.href = '../Home/Home.html'
    }
    } catch (error) {

        console.log(error)
        
    }


}