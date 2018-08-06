
const token=localStorage.getItem('token')
if(token =="expired"){
    redirect: window.location.replace("signin.html")  
}
document.getElementById('addEntry').addEventListener('submit',add)

function add(e){
    e.preventDefault();
    let title=document.getElementById('title').value;
    let description=document.getElementById('textarea').value;

    fetch(`http://localhost:3000/api/v1/entries`,{
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