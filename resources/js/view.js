
const token=localStorage.getItem('token')
if(!token){
    redirect: window.location.replace("signin.html")  
}
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
            console.log('not good')
        }else{
           displayResult=data.data;  
          let date=prettyDate()
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

function prettyDate(){
    let rawDate=displayResult.created_at.split('-');
             let extractDay=rawDate[2].split('')
             let first=extractDay[0];
             let second=extractDay[1];
             let day=parseInt(second);
             let month=rawDate[1];
             let year=rawDate[0]
             let finaldate=formatDate(day,month,year);
 return finaldate;
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

document.getElementById('logout').addEventListener('click',logout)
function logout(){
    delete localStorage.token;
    redirect: window.location.replace("index.html")  
}