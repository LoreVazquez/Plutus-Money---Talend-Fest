
mobiscroll.settings = {
    theme: 'ios'
};

const token = localStorage.getItem("id_token")

const app = new Vue({
    el: '#vue',
    data: {
        balanceData:{},
    },
    
    methods:{
        getBalanceData: function(){
            $.ajax({
                url:`https://talentland.azurewebsites.net/api/Account/Balance/2018/09`,
                type: 'GET',
                datatype: 'json',
                headers: {
                    Authorization:  `bearer ${token}`
                }
            })
            .done((response)=>{
                console.log(response);
                this.balanceData = response.Data;
                this.showDeposits();
                
            })
            .fail(()=>{
                console.log("error");
            })
        },
        showDeposits: function(){
            getLabel(this.balanceData.Summary, "Deposit"); 
        },
        showWithdrawal: function(){
            getLabel(this.balanceData.Summary, "Withdrawal"); 
        }
    }

})

const getLabel = (summary,movementType)=>{
    let labels=[]
    summary.forEach(element => {
        const date = new Date(element.Date);

        const label = {
            d: new Date(date.getFullYear(), date.getMonth() , date.getDate()),
            text: ` ${element[movementType] ===0? 'sin transacciones': '$ ' + element[movementType]}`,
            color: (movementType == "Deposit")?'#2ECC71': '#EC452E'

        }
        labels.push(label);
    });

    $('#demo-labels').mobiscroll().calendar({
        display: 'inline',
        labels: labels,
        onSetDate: function (event, inst) {
            console.log(event.date)
            list(event.date)
        }
    });
}

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
        printingItemList(response.Data);
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
    const itemm = `<li class="item"><div class="rounded-icon" style="background-color:${item.Category.Color};"><img src=${item.Category.Icon}
    class="md-img"/></div>${item.Title}<span class="md-price">$ ${item.Amount}</span></li>`;
    $('#demo').append(itemm);
    })
 }






app.getBalanceData();