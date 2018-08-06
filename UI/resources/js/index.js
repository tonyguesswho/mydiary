
document.getElementById('myDiary').addEventListener('click',checkToken)


function checkToken(){
    const token=localStorage.getItem('token')
    if(token =="expired"){
        redirect: window.location.replace("signin.html")  
    }

}