// import {validateFields} from '../js/helpers/validate';

document.getElementById('signUp').addEventListener('submit',signUp);


function signUp(e){
    e.preventDefault()
    let email=document.getElementById('email').value;
    let username=document.getElementById('username').value;
    let password=document.getElementById('password').value;
    let cPassword=document.getElementById('cPassword').value;

    fetch('https://mydiary-api.herokuapp.com/auth/signup',{
        method:'POST',
        headers:{
            'Accept':'application/json, text/plain, */*',
            'content-type':'application/json'
        },
        body:JSON.stringify({email,username,password})
    }).then(res =>res.json()).then(data=>{
        if(data.status=="fail"){

        }else{
            localStorage.token=data.token;
            console.log(data)
            redirect: window.location.replace("entries.html")   
        }
        
    })
}