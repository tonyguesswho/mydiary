import showMessage from './helpers/showMessage';
document.getElementById('login').addEventListener('submit',signin)

function signin(e){
    e.preventDefault();
    let email=document.getElementById('email').value;
    let password=document.getElementById('password').value;

    fetch('https://mydiary-api.herokuapp.com/auth/login',{
        method:'POST',
        headers:{
            'Accept':'application/json, text/plain, */*',
            'content-type':'application/json'
        },
        body:JSON.stringify({email,password})
    }).then(res =>res.json()).then(data=>{
        if(data.status=="fail"){
            showMessage(data,'fail')

        }
        else{
            localStorage.token=data.token;
            localStorage.username=data.username;
            redirect: window.location.replace("entries.html")   
        }
        
    })

}
