import checkToken from './helpers/checkToken';
import logout from './helpers/logout';

const token=localStorage.getItem('token')
if(token){
    document.getElementById('authNav').innerHTML='<li><a href="profile.html" id="">Profile</a></li><li><a href="#" id="logout">Sign Out</a></li>'
}
document.getElementById('myDiary').addEventListener('click',checkToken)

document.getElementById('logout').addEventListener('click',logout)

