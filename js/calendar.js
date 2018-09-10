// $('#datetime').mobiscroll().datetime();

mobiscroll.settings = {
    theme: 'ios'
};

$(function () {

    var now = new Date();

    
    $('#demo-labels').mobiscroll().calendar({
        display: 'inline',
        labels: [
            { d: new Date(now.getFullYear(), now.getMonth() , 4), text: 'Spa day', color: '#cfd8dc' },
            { d: new Date(now.getFullYear(), now.getMonth() + 2, 24), text: 'BD Party', color: '#9ccc65' },
            { d: new Date(now.getFullYear(), now.getMonth() - 2, 13), text: 'Exams', color: '#d4e157' },
            { d: new Date(now.getFullYear(), now.getMonth() - 1, 6), text: 'Trip', color: "#f4511e" },
            { d: new Date(now.getFullYear(), now.getMonth() + 1, 6), color: '#46c4f3', text: 'Pizza Night' },
            { d: new Date(now.getFullYear(), now.getMonth() + 1, 22), color: '#7e56bd', text: 'Beerpong' },
            { d: new Date(now.getFullYear(), now.getMonth() - 1, 11), color: '#46c4f3', text: 'Anniversary' },
            { d: new Date(now.getFullYear(), now.getMonth() - 1, 29), color: '#7e56bd', text: 'Pete BD' },
            { d: new Date(now.getFullYear(), now.getMonth(), 2), color: '#46c4f3', text: 'Ana BD' },
            { d: new Date(now.getFullYear(), now.getMonth(), 3), color: '#7e56bd', text: 'Concert' },
            { d: new Date(now.getFullYear(), now.getMonth(), 11), color: '#f13f77', text: 'Trip' },
            { d: new Date(now.getFullYear(), now.getMonth(), 19), color: '#8dec7d', text: 'Math exam' },
            { d: new Date(now.getFullYear(), now.getMonth(), 28), color: '#ea4986', text: 'Party' },
            
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
            })
            .fail(()=>{
                console.log("error");
            })
    }
    }
})

app.getBalanceData();