  

document.getElementById('btn').addEventListener("click",getEntries)
const request = new Request('https://mydiary-api.herokuapp.com/api/v1/entries', {
    headers: new Headers({
      'Content-Type': 'application/json',
      "Authorization":'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFudGhvbnl1MjM0QGdtYWlsLmNvbSIsInVzZXJJZCI6MywiaWF0IjoxNTMzMTMxNjA2LCJleHAiOjE1MzMxNjA0MDZ9.brBaJOzz9_d5skupEH6dJNustGFgP673BdJis1dJ7d8'
    })
  })

let result;
function getEntries(){
    fetch(request)
    .then((res)=>{
        return res.json()
        
    }).then(val=>{
        console.log(val.data)
        result=val.data
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
             <div class="box card span41">
                <h4>${val.title}</h4>
                <a href="entry.html" class="ebtn ebtn-filled">View</a>
                <a href="edit_entry.html" class="ebtn ebtn-transparent">Edit</a>
                <div class="entry-date">
                    <p>${finaldate}</p>
                </div>

            </div>
             
             `
         })
     
         document.getElementById('allEntries').innerHTML=output
 
     }

     getEntries()