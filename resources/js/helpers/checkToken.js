const checkToken =(token)=>{
    if(!token){
        redirect: window.location.replace("signin.html")  
    }
}
export default checkToken;