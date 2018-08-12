import logout from './helpers/logout';
import checkToken from './helpers/checkToken';

const token=localStorage.getItem('token')
checkToken(token)
document.getElementById("totalEntry").innerText=localStorage.total;
document.getElementById("username").innerText=`Hello, ${localStorage.username}`;

document.getElementById('logout').addEventListener('click',logout)
