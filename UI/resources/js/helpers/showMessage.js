const showMessage=(data,status)=>{
    const position=document.getElementById('messageBox');
    position.insertAdjacentHTML('afterbegin',`<p class="span31 span3-center" id='msg'>${data.message}</p>`)
   const  msgPosition=document.getElementById('msg');
    msgPosition.className=`msg_output_${status} span31 span3-center`

    setTimeout(() => {
        document.querySelector(`.msg_output_${status}`).remove()
    }, 5000);
}



export default showMessage;