document.getElementById('signup').addEventListener('submit',signup)



function signup(e){
    e.preventDefault();
    let email=document.getElementById('email').value;
    let username=document.getElementById('username').value;
    let password=document.getElementById('password').value;
    let Cpassword=document.getElementById('Cpassword').value;
    validate(password,Cpassword)

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
            localStorage.setItem("token", data.token);
            console.log(data)
            redirect: window.location.replace("entries.html")   
        }
        
    })

}
