import logout from './helpers/logout';
import showMessage from './helpers/showMessage';
const token=localStorage.getItem('token')

if(!token){
    redirect: window.location.replace("signin.html")  
}
let qs=decodeURIComponent(window.location.search)
qs=qs.substring(1).split('=')[1]
let  entryId=parseInt(qs)
let displayResult;
function singleView(){
    
    fetch(`https://mydiary-api.herokuapp.com/api/v1/entries/${entryId}`,{
        method:'GET',
        headers:{
            'Accept':'application/json, text/plain, */*',
            'content-type':'application/json',
            'Authorization':token
        }
    }).then(res =>res.json()).then(data=>{
        
        if(data.status=="fail"){
            showMessage(data,'fail')
        }else{
           displayResult=data.data;  
         values()
        }
        
    })

}
singleView()
function values(){
    document.getElementById('title').value=displayResult.title;
    document.getElementById('textarea').value=displayResult.description;

}



document.getElementById('editEntry').addEventListener('submit',edit)

function edit(e){
    e.preventDefault();
    let title=document.getElementById('title').value;
    let description=document.getElementById('textarea').value;

    fetch(`https://mydiary-api.herokuapp.com/api/v1/entries/${entryId}`,{
        method:'PUT',
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
            
            redirect: window.location.replace(`entry.html?entryid=${entryId}`) 
        }
        
    })

}

document.getElementById('logout').addEventListener('click',logout)
