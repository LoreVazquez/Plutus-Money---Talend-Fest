// $('#datetime').mobiscroll().datetime();

mobiscroll.settings = {
    theme: 'ios'
};

$(function () {
    
    $('#demo-labels').mobiscroll().calendar({
        display: 'inline',
        labels: [
        ]
    });
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
                getLabel(response.Data.Summary); 
            })
            .fail(()=>{
                console.log("error");
            })
    }
    }
})

let getLabel = (summary)=>{
    console.log(summary);
    let labels=[]
    summary.forEach(element => {
        let date = new Date(element.Date);

        let label = {
            d: new Date(date.getFullYear(), date.getMonth() , date.getDate()),
            text: ` ${element.Deposit ===0? 'sin transacciones': '$ ' + element.Deposit}`,
            color: '#2ECC71'
        }
        console.log(label)        
        labels.push(label);
    });
    console.log(labels)
    $('#demo-labels').mobiscroll().calendar({
        display: 'inline',
        labels: labels,
        
    });

}


app.getBalanceData();