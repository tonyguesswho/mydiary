import logout from './helpers/logout';
const token=localStorage.getItem('token')
if(!token){
    redirect: window.location.replace("signin.html")  
}
document.getElementById("totalEntry").innerText=localStorage.total;
document.getElementById("username").innerText=`Hello, ${localStorage.username}`;

document.getElementById('logout').addEventListener('click',logout)
