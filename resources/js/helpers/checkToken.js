const checkToken =()=>{
    if(!token){
        redirect: window.location.replace("signin.html")  
    }
}
export default checkToken;