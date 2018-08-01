document.getElementById('signup').addEventListener('submit',signup)

function signup(e){
    e.preventDefault();
    let email=document.getElementById('email').value;
    let username=document.getElementById('username').value;
    let password=document.getElementById('password').value;

    fetch('https://mydiary-api.herokuapp.com/auth/signup',{
        method:'POST',
        headers:{
            'Accept':'application/json, text/plain, */*',
            'content-type':'application/json'
        },
        body:JSON.stringify({email,username,password})
    }).then(res =>res.json()).then(data=>{
        console.log(data.message)
    })

}
