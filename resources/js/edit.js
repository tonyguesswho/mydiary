const token=localStorage.getItem('token')
if(!token){
    redirect: window.location.replace("signin.html")  
}
let qs=decodeURIComponent(window.location.search)
qs=qs.substring(1).split('=')[1]
let  entryId=parseInt(qs)
// let token=localStorage.getItem('token')
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
            console.log('not good')
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
function logout(){
    delete localStorage.token
    redirect: window.location.replace("index.html")  
}


function showMessage(data,status){
    const position=document.getElementById('editBox');
    position.insertAdjacentHTML('afterbegin',`<p class="span31 span3-center" id='msg'>${data.message}</p>`)
    msgPosition=document.getElementById('msg');
    msgPosition.className=`msg_output_${status} span31 span3-center`

    setTimeout(() => {
        document.querySelector(`.msg_output_${status}`).remove()
    }, 5000);
}