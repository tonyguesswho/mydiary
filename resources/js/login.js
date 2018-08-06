document.getElementById('login').addEventListener('submit',signin)

function signin(e){
    e.preventDefault();
    let email=document.getElementById('email').value;
    let password=document.getElementById('password').value;

    fetch('http://localhost:3000/auth/login',{
        method:'POST',
        headers:{
            'Accept':'application/json, text/plain, */*',
            'content-type':'application/json'
        },
        body:JSON.stringify({email,password})
    }).then(res =>res.json()).then(data=>{
        
        if(data.status=="fail"){

        }else{
            localStorage.token=data.token;
            localStorage.username=data.username;
            // console.log(data)
            redirect: window.location.replace("entries.html")   
        }
        
    })

}
