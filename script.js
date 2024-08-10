
let userData = {};

const inputHandler = (e) => {
    const { name, value } = e.target

    userData = {
        ...userData,
        [name] : value
    }
}

const loader = document.querySelector('.show-and-hide');
const passwordIcon = document.getElementById('password-icons');



passwordIcon.src = './icons/eye.png';

const passwordInput = document.getElementById('password')


passwordIcon.addEventListener('click', () => {
    
    if(passwordInput.type === 'password'){
        passwordInput.type = 'text';
        passwordIcon.src  = './icons/show.png'
    } else {
        passwordInput.type = 'password';
        passwordIcon.src = './icons/eye.png'
    }

})


const accountCreation = async (e) => {

    loader.style.display= 'block'
     e.preventDefault();

     

     try{
        const API = 'https://the-techie-crud.onrender.com/user-creation';

     const userInfo = await fetch(API,{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(userData)
     });

     const userAccount = await userInfo.json();



    if(userAccount.statusCode=== 404){
        loader.style.display= 'none'
        alert(userAccount.message);
    } else {
        loader.style.display= 'none'
        return window.location.href = './Login/Login.html'
    }
     }catch(error){
        console.log(error.message);

     }
}