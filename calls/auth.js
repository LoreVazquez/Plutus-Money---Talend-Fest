let urlAuth = "https://talentland.azurewebsites.net/api/";
$(function authCall(usuario, pass) {
    $.ajax({
        url: urlAuth + "Authentication/Login?Username=" + encodeURI(usuario) + "&" + "Password=" + pass,
        type: 'POST',
        dataType: 'json',

        success: function(response) {
            console.log(response)
        },
        error: function(error) {
            console.log("Hubo un error")
        }
    });
});