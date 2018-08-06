// import { checkToken } from './helpers/checkToken';
const checkToken =require('./helpers/checkToken');
const token=localStorage.getItem('token')
if(token =="expired"){
    redirect: window.location.replace("signin.html")  
}
const request = new Request('http://localhost:3000/api/v1/entries', {
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
// gotten from https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number
function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}
function formatDate(day,month,year) {
    const monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    let dayWithSuffix=ordinal_suffix_of(day)
    return `${dayWithSuffix}  ${monthNames[parseInt(month)-1]} ${year}`;
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
function logout(){
    localStorage.token='expired'
    redirect: window.location.replace("index.html")  
}
