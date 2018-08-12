import logout from './helpers/logout';
import displayDate from './helpers/display';
import checkToken from './helpers/checkToken';

const token=localStorage.getItem('token')
checkToken(token)
let querySearch=decodeURIComponent(window.location.search)
let qs=querySearch.substring(1).split('=')[1]
let  entryId=parseInt(qs)
let displayResult;
function singleView(e){
    
    fetch(`https://mydiary-api.herokuapp.com/api/v1/entries/${entryId}`,{
        method:'GET',
        headers:{
            'Accept':'application/json, text/plain, */*',
            'content-type':'application/json',
            'Authorization':token
        }
    }).then(res =>res.json()).then(data=>{
        
        if(data.status=="fail"){
            alert(data.message)
        }else{
           displayResult=data.data;  
        let rawDate=displayResult.created_at;
        let date=displayDate(rawDate)
           displayEntry(date);  
        }
        
    })

}
singleView()

function displayEntry(date){
    let output="";
    output+=`<div class="box card span21 span2-center">
    <h4>${displayResult.title}</h4>
    <p>${displayResult.description}</p>
    <div class="entry-date">
        <p>${date}</p>
    </div>

    <a href="edit_entry.html?entryid=${qs}" class="ebtn ebtn-transparent">Edit</a>
    </div>`;
    document.getElementById('viewEntry').innerHTML=output
}


document.getElementById('logout').addEventListener('click',logout)
