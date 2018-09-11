
function validar(){
    let usuario = document.getElementById('usuario').value;
    let pass = document.getElementById("password").value;
            
    if((usuario === "")||(pass === "")){
        swal({
            title: "Error!!",
            text: "El usuario y contraseña no pueden estar vacios",
            icon: "warning",
            button: "Aceptar",
          })
    }else{
        authCall(usuario, pass);
    } 
}


