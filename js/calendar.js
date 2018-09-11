// $('#datetime').mobiscroll().datetime();
// labels: [
//     { d: new Date(now.getFullYear(), now.getMonth() + 1, 4), text: 'Spa day', color: '#cfd8dc' },
//     { d: new Date(now.getFullYear(), now.getMonth() + 2, 24), text: 'BD Party', color: '#9ccc65' },
//     { d: new Date(now.getFullYear(), now.getMonth() - 2, 13), text: 'Exams', color: '#d4e157' },
//     { d: new Date(now.getFullYear(), now.getMonth() - 1, 6), text: 'Trip', color: "#f4511e" }
// ]


mobiscroll.settings = {
    theme: 'ios'
};

$(function () {
    
    
});



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

let getLabel = (summary,movementType)=>{
    console.log(summary);
    let labels=[]
    summary.forEach(element => {
        let date = new Date(element.Date);

        let label = {
            d: new Date(date.getFullYear(), date.getMonth() , date.getDate()),

            text: ` ${element[movementType] ===0? 'sin transacciones': '$ ' + element[movementType]}`,
            color: (movementType == "Deposit")?'#2ECC71': '#EC452E'

        }
        console.log(label)        
        labels.push(label);
    });
    $('#demo-labels').mobiscroll().calendar({
        display: 'inline',
        labels: labels,
        onSetDate: function (event, inst) {
            console.log(event.date)
        }
    });

}


app.getBalanceData();