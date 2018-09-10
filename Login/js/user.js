
function validar(){
    let usuario = document.getElementById('usuario').value;
    let pass = document.getElementById("password").value;
            
    if((usuario === "")||(pass === "")){
        alert("El usuario y contraseña no pueden estar vacios");
    }else{
        authCall(usuario, pass);
    } 
}


