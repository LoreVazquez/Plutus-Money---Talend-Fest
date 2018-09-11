let urlAuth = "https://talentland.azurewebsites.net/api/";
function authCall(usuario, pass) {
    $.ajax({
        url: urlAuth + "Authentication/Login?Username=" + encodeURI(usuario) + "&" + "Password=" + pass,
        type: 'POST',
        dataType: 'json',

        success: function(response) {
            const miStorage = window.localStorage;
            miStorage.setItem("id_token", response.Data.id_token);
            console.log(response)
            window.location.href = "home.html"
        },
        error: function(error) {
            console.log("Error")
        }
    });
};
