import {formatDate} from './helpers/display';
import logout from './helpers/logout';

const token=localStorage.getItem('token')
if(!token){
    redirect: window.location.replace("signin.html")  
}
const request = new Request('https://mydiary-api.herokuapp.com/api/v1/entries', {
    headers: new Headers({
      'Content-Type': 'application/json',
      "Authorization":token
    })
  })

let result;
function getEntries(){
    fetch(request)
    .then((res)=>{

        return res.json()
        
    }).then(val=>{

        result=val.data
        localStorage.total=result.length;
        localStorage.username=val.username;
        display()
    })


}

function display(){
    let output='' 
 
         result.forEach(val=>{
             let rawDate=val.created_at.split('-');
             let extractDay=rawDate[2].split('')
             let first=extractDay[0];
             let second=extractDay[1];
             let day=parseInt(second);
             let month=rawDate[1];
             let year=rawDate[0]
             let finaldate=formatDate(day,month,year);
             output+=
             `
             <div class="box card span41" id="anEntry">
                <h4>${val.title}</h4>
                <a href="entry.html?entryid=${val.id}" class="ebtn ebtn-filled">View</a>
                <a href="edit_entry.html?entryid=${val.id}" class="ebtn ebtn-transparent">Edit</a>
                <div class="entry-date">
                    <p>${finaldate}</p>
                </div>
                
                

            </div>
             
             `
         })
     
         document.getElementById('allEntries').innerHTML=output
 
     }

getEntries()


document.getElementById('logout').addEventListener('click',logout)