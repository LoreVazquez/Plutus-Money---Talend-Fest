
mobiscroll.settings = {
    theme: 'ios'
};

const token = localStorage.getItem("id_token")

const app = new Vue({
    el: '#vue',
    data: {
        balanceData:{},
        labels:[],
        calendar: {},
        hasExpenses: true,
    },
    
    methods:{
        init: function(){
            const date = new Date;

            app.getBalanceData(date.getFullYear(),date.getMonth() +1, function(result){
                app.balanceData = result;
                app.addEvents();

                $('#demo-labels').mobiscroll().calendar({
                    display: 'inline',
                    labels: app.labels,
                    onSetDate: function (event, inst) {
                        app.calendar = inst;
                        console.log(event.date)
                        list(event.date)
                    },
                    onMonthChange: function (event, inst) {
                        console.log(event);
                        
                        app.getBalanceData(event.year, event.month+1, function(result){
                            app.balanceData = result;
                            app.setSummary(app.hasExpenses);

                            // for( let i = app.labels.length -1; i >= 0; i--){
                            //     app.labels.pop();
                            // }

                            // inst.refresh();

                            // for( let j =0; j < app.balanceData.Summary.length; j++ ){
                            //     let element = app.balanceData.Summary[j];
                            //     const date = new Date(element.Date);
                            //     app.labels.push({
                            //         d: new Date(date.getFullYear(), date.getMonth() , date.getDate()),
                            //         text: ` $ ${element["Withdrawal"]}`,
                            //         color: '#F44336'
                            //     });
                            // }

                            // inst.refresh();
                        });

                        
                    }
                });
            })
            
        },
        getBalanceData: function(year,month, callback){
            $.ajax({
                url:`https://talentland.azurewebsites.net/api/Account/Balance/${year}/${month}`,
                type: 'GET',
                datatype: 'json',
                headers: {
                    Authorization:  `bearer ${token}`
                }
            })
            .done((response)=>{
                // console.log(response);
                // this.balanceData = response.Data;
                // this.showDeposits();
                callback(response.Data);
                
            })
            .fail(()=>{
                console.log("error");
            })
        },
        setSummary: function(hasExpenses){
            app.hasExpenses = hasExpenses;

            for( let i = app.labels.length -1; i >= 0; i--){
                app.labels.pop();
            }
            
            app.calendar.refresh();
            app.addEvents();

            // for( let j =0; j < app.balanceData.Summary.length; j++ ){
            //     let element = app.balanceData.Summary[j];
            //     const date = new Date(element.Date);
            //     app.labels.push({
            //         d: new Date(date.getFullYear(), date.getMonth() , date.getDate()),
            //         text: ` $ ${element["Withdrawal"]}`,
            //         color: '#F44336'
            //     });
            // }

            app.calendar.refresh();
        },
        addEvents: function(){
            for( let j =0; j < app.balanceData.Summary.length; j++ ){
                let element = app.balanceData.Summary[j];
                const date = new Date(element.Date);
                let amount = app.hasExpenses ? element["Withdrawal"] : element["Deposit"];

                if(amount>0){
                app.labels.push({
                    d: new Date(date.getFullYear(), date.getMonth() , date.getDate()),
                    text: ` $ ${amount}`,
                    color: app.hasExpenses?'#F44336': '#2ECC71'
                });
                }
            }
        }
        //CIERRA GETLABEL

    }//CIERRA METHODS

})//CIERRA VUE

// const getLabel = (summary,movementType)=>{
//     let labels=[]
//     summary.forEach(element => {
//         const date = new Date(element.Date);

//         if(element[movementType] != 0){
//         const label = {
//             d: new Date(date.getFullYear(), date.getMonth() , date.getDate()),
//             text: ` $ ${element[movementType]}`,
//             color: (movementType == "Deposit")?'#2ECC71': '#F44336'

//         }
        
//         labels.push(label);
//     }
//     });

//     $('#demo-labels').mobiscroll().calendar({
//         display: 'inline',
//         labels: labels,
//         onSetDate: function (event, inst) {
//             console.log(event.date)
//             list(event.date)
//         }
//     });
// }
let data;

const list= (date) => {
    let d = moment(date).format('YYYY-MM-DD');
    console.log(d);
 
 
    // console.log(`${d.getFullYear()}-0${d.getMonth()+1}-${d.getDate()}`)
 
    $.ajax({
        url:`https://talentland.azurewebsites.net/api/Receipt/Detail/${d}`,
        datatype: 'json',
        headers: {
            Authorization: `bearer ${token}`
        }
    })
    .done((response)=>{
        console.log(response.Data);
        data = response.Data;
        printingItemList(data);
        // showingItemDetails(response.Data);
    })
    .fail(()=>{
        console.log("error");
    })
 }
 
 
 $(function () {
 
    $('#demo').mobiscroll().listview({
        theme: 'ios',
        swipe: false,
        enhance: true
    });
 
 });
 
 
 const printingItemList = function(arrayItems){
    $('#demo').empty();
    arrayItems.forEach(item =>{
    const itemm = `<li data-target="#modalDetail" data-toggle="modal" class="item" ><div class="rounded-icon" style="background-color:${item.Category.Color};"><img src=${item.Category.Icon}
    class="md-img"/></div>${item.Title}<span class="md-price">$ ${item.Amount}</span></li>`;
    $('#demo').append(itemm);
    $('.item').click(showingItemDetails(item));
    })
 }

 const showingItemDetails = function(item){
     console.log(item);
     
     let detailTemplate = `<div id="modalDetail" class="modal fade container-fluid" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
     <div class="modal-dialog" role="document">
         <div class="modal-content">
             <div class="modal-header">
                 <h5 class="modal-title textModal" id="exampleModalLabel">Detalle</h5>
                 <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                     <span aria-hidden="true">&times;</span>
                 </button>
             </div>
             <div class="modal-body">
                <ul style="list-style: none; padding:0;">
                 <li class="itemDetail" ><span>Date:</span>${moment(item.TransactionDate).format('DD MMMM YYYY')}</li>
                 <li class="itemDetail"><span>Amount: </span>$ ${item.Amount}</li>
                 <li class="itemDetail"><span>Category: </span>${item.Category.Title}</li>
                </ul>
             </div>
             
            </div>
        </div>
    </div>`;
    $("#modalItemDetail").append(detailTemplate);

 }
 


app.init();