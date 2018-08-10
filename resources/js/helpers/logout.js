const logout =()=>{
    delete localStorage.token;
    redirect: window.location.replace("index.html")  
}

export default logout;