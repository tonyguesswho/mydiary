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
        //console.log(data)
        if(data.status=="fail"){
            showMessage(data,'fail')

        }
        else{
           // console.log(data)
            localStorage.token=data.token;
            localStorage.username=data.username;
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