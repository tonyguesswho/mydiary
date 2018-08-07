const token=localStorage.getItem('token')
if(token){
    document.getElementById('authNav').innerHTML='<li><a href="profile.html" id="">Profile</a></li><li><a href="#" id="logout">Sign Out</a></li>'
}
document.getElementById('myDiary').addEventListener('click',checkToken)

function checkToken(){
    if(token =="expired"){
        redirect: window.location.replace("signin.html")  
    }
}
document.getElementById('logout').addEventListener('click',logout)
function logout(){
    // localStorage.setItem('token',undefined)/
    delete localStorage.token;
    redirect: window.location.replace("index.html")  
}

