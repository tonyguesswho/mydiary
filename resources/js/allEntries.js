import logout from './helpers/logout';
import displayDate from './helpers/display';
import checkToken from './helpers/checkToken';

const token=localStorage.getItem('token')
checkToken(token)
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
             let rawDate=val.created_at;
             let finaldate=displayDate(rawDate);
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