// import {validateFields} from '../js/helpers/validate';

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
           return  showMessage(data,'fail')
         }else{
            localStorage.token=data.token;
            redirect: window.location.replace("entries.html")   
         }
    })
}
function showMessage(data,status){
    const position=document.getElementById('signUpBox');
    position.insertAdjacentHTML('afterbegin',`<p class="span31 span3-center" id='msg'>${data.message}</p>`)
    msgPosition=document.getElementById('msg');
    msgPosition.className=`msg_output_${status} span31 span3-center`

    setTimeout(() => {
        document.querySelector(`.msg_output_${status}`).remove()
    }, 5000);
}