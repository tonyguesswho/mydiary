import logout from './helpers/logout';
import showMessage from './helpers/showMessage';
import checkToken from './helpers/checkToken';

const token=localStorage.getItem('token')
checkToken(token);
document.getElementById('addEntry').addEventListener('submit',add)

function add(e){
    e.preventDefault();
    let title=document.getElementById('title').value;
    let description=document.getElementById('textarea').value;

    fetch(`https://mydiary-api.herokuapp.com/api/v1/entries`,{
        method:'POST',
        headers:{
            'Accept':'application/json, text/plain, */*',
            'content-type':'application/json',
            'Authorization':token
        },
        body:JSON.stringify({title,description})
    }).then(res =>res.json()).then(data=>{
        if(data.status=="fail"){
            showMessage(data,'fail')
        }else{
            
            redirect: window.location.replace(`entries.html`) 
        }
        
    })

}

document.getElementById('logout').addEventListener('click',logout)
