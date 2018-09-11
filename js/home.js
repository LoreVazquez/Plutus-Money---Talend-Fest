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

$(document).on('click','#2', '#1', function (){
    console.log("entro")
    let idButtom =this.id;
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
        conceptEntry(response.Data);
          
                
    })
    .fail(()=>{
        console.log("error");
    })
    
});

$(document).on ('click','.regresar', function (){
    $("#listCategory").empty();  

        const items = ` <div class="modal-header">
                            <h5 class="modal-title textModal" >Registrar transacción</h5>
                             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                         </div>
                         <div class="modal-body">
                             <span class="textModalBody">MXN</span>
                             <input id="money" type="number">
                        </div>
                        <div class="modal-footer">
                            <button id="1" type="button" class="btn btn-secondary textDep " onclick="amountEntry();">Depósito</button>
                            <button id="2" type="button" class="btn btn-primary textRet" onclick="amountEntry();">Retiro</button>
                        </div>`

       
$("#listCategory").append(items);
});


const conceptEntry =  (data) => {
    $("#listCategory").empty();

    $(function () {
 
        $('#concepto').mobiscroll().listview({
            theme: 'ios',
            swipe: false,
            enhance: true
        });
     
     });
    

        const items = `<div class="modal-header">
                            <h5 class="modal-title textModal">MXN</h5>
                            <h5 id="amountNumber" class="modal-title textModal">${register.Amount}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>
                        </div>
                        <div class="modal-body">
                            <ul id="concepto" class="mbsc-cloak"></ul></div></div>

                        </div>
                        <div class="modal-footer">
                             <button id="regresar" type="button" class="btn btn-secondary regresar" >Regresar</button>
                            <button id="siguiente" type="button" class="btn btn-primary" >Siguiente</button>
                        </div>`

let list = document.getElementById("listCategory")
list.innerHTML = items;
printingCategoryList(data);

}

const printingCategoryList = (arrayCategory) => {
    // $('#concepto').empty();
     arrayCategory.forEach(item =>{
         console.log(item)
     const items = `<li class="item"><div class="rounded-icon" style="background-color:${item.Color};"><img src=${item.Icon}
     class="md-img"/></div>${item.Title}</li>`;
     let container = document.getElementById("concepto");
     container.innerHTML += items;
     //$('#concepto').append(items);
     })
 }
 
 console.log(printingCategoryList);
