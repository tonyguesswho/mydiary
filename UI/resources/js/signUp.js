import showMessage from '../js/helpers/showMessage';

document.getElementById('signUp').addEventListener('submit',signUp);


function signUp(e){
    e.preventDefault()
    let email=document.getElementById('email').value;
    let username=document.getElementById('username').value;
    let password=document.getElementById('password').value;
    let confirmPassword=document.getElementById('confirmPassword').value;
    

    fetch('https://mydiary-api.herokuapp.com/auth/signup',{
        method:'POST',
        headers:{
            'Accept':'application/json, text/plain, */*',
            'content-type':'application/json'
        },
        body:JSON.stringify({email,username,password,confirmPassword})
    }).then(res =>res.json()).then(data=>{
         if(data.status=="fail"){
           showMessage(data,'fail')
         }else{
            localStorage.token=data.token;
            redirect: window.location.replace("entries.html")   
         }
    })
}
