
let token=localStorage.getItem('token')
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

        }else{
            
            redirect: window.location.replace(`entries.html`) 
        }
        
    })

}