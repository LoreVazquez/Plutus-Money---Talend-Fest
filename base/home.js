$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
})

function validacion(){
    let cantidad = document.getElementById('money').value;
    console.log(typeof cantidad);
        if(cantidad === ""){
        alert("Ingresa la cantidad");
    }else {
        parseInt(cantidad).toFixed(2);
        console.log(parseInt(cantidad).toFixed(2));
    }
}
