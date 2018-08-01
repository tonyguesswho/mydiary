  
  function Displaycontent(){
   let output="<h2>All recipies</h2>"  
        recipies.forEach(x=>{
            output+=
            `
            <li>${x.id}</li>
            
            `
        })
    
        document.getElementById('output').innerHTML=output

    }
   
    

document.getElementById('btn').addEventListener("click",getEntries)
const request = new Request('https://mydiary-api.herokuapp.com/api/v1/entries', {
    headers: new Headers({
      'Content-Type': 'application/json',
      "Authorization":'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFudGhvbnl1MjM0QGdtYWlsLmNvbSIsInVzZXJJZCI6MywiaWF0IjoxNTMzMTIzOTM3LCJleHAiOjE1MzMxNTI3Mzd9.kpDYWFW7hk65IbExCFk5vSGALBPNZWUDBJz71kRVMpQ'
    })
  })
 //  fetch(request)
function getEntries(){
    fetch(request)
    .then((res)=>{
        res.json()
        console.log(res)
    }).then(data=>{
        let output="<h2></h2>"
        data.forEach(x=>{
            // output+=
            // `
            // <li>${x.id}</li>
            
            // `
        })
        document.getElementById('output').innerHTML=output
    })

}