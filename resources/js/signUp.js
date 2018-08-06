// import {validateFields} from '../js/helpers/validate';

document.getElementById('signUp').addEventListener('submit',signUp);


function signUp(e){
    e.preventDefault()
    let email=document.getElementById('email').value;
    let username=document.getElementById('username').value;
    let password=document.getElementById('password').value;
    let confirmPassword=document.getElementById('confirmPassword').value;
    

    fetch('http://localhost:3000/auth/signup',{
        method:'POST',
        headers:{
            'Accept':'application/json, text/plain, */*',
            'content-type':'application/json'
        },
        body:JSON.stringify({email,username,password,confirmPassword})
    }).then(res =>res.json()).then(data=>{
        if(data.status=="fail"){
            alert(data.message)

        }else{
            localStorage.token=data.token;
            console.log(data)
             redirect: window.location.replace("entries.html")   
        }
        
    })
}