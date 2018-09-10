function validar(){
    let usuario = document.getElementById('usuario').value;
    let pass = document.getElementById("password").value;
            
    if((usuario === "")||(pass === "")){
        alert("El usuario y contraseña no pueden estar vacios");
    }else{
        let urlAuth = "https://talentland.azurewebsites.net/api/Authentication/Login?Username="+ encodeURI(usuario) + "&" + "Password=" + pass
        $.ajax({
            url: urlAuth,
            type: 'POST',
            dataType: 'json',

            success: function(response) {
            console.log(response)
            },
            error: function(error) {
            console.log("Hubo un error")
          }
        })
    } 
}
