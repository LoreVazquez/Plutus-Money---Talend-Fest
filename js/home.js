$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
})

let register = {
};

function amountEntry(){
    let amount = document.getElementById('money').value;
    console.log(typeof amount);
    if(amount === ""){
        swal("Ingresa una cantidad");
    }else {
        let number = parseInt(amount).toFixed(2);
        register.Amount = number;
        console.log(parseInt(amount).toFixed(2));
    }
    console.log(register);
}

$("button").click(function (){
    let idButtom = this.id;
    register.CategoryId = idButtom;

    $.ajax({
        url:`https://talentland.azurewebsites.net/api/Category/`+ idButtom,
        type: 'GET',
        datatype: 'json',
        headers: {
            Authorization:  `bearer ${token}`
        }
    })
    .done((response)=>{
        console.log(response);
        category(response);        
    })
    .fail(()=>{
        console.log("error");
    })
});

function category(response) {

}


