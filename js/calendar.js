// $('#datetime').mobiscroll().datetime();

mobiscroll.settings = {
    theme: 'ios'
};

$(function () {

    var now = new Date();

    
    $('#demo-labels').mobiscroll().calendar({
        display: 'inline',
        labels: [
            { d: '12/25', text: 'Christmas', color: "#f48fb1" },
            { d: '1/1', text: 'New year' },
            { d: '12/1', text: 'Meeting', color: '#ffc400' },
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
            { start: new Date(now.getFullYear(), now.getMonth() + 1, 15), end: new Date(now.getFullYear(), now.getMonth() + 1, 18), text: 'Conference', color: '#f4511e' }
        ]
    });

});

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
                    Authorization: "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5UUkVSVEkyTWtFeVJFUkdNMEl6UWtVd1JrSXlRa1pFTlRaRU4wSkZSVGM1TmpBMVJqUTFSZyJ9.eyJuaWNrbmFtZSI6InBsdXR1cyIsIm5hbWUiOiJwbHV0dXNAaXRleGljby5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvYzc5YmRjY2ZjMTlhNmJmZGVlMjAyNTgxZDUwMmQ2YjI_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZwbC5wbmciLCJ1cGRhdGVkX2F0IjoiMjAxOC0wOS0xMFQxODo0Mjo0My43ODJaIiwiZW1haWwiOiJwbHV0dXNAaXRleGljby5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9wbHV0dXMtYXBpLWRldi5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWI4ODMzMWYzMjk4OTUxZGFiYWY1NjU5IiwiYXVkIjoiUkpwSGJvVjFnNm13TjFjV3A3b1V2N2hqWUw4NVNOak8iLCJpYXQiOjE1MzY2MDQ5NjMsImV4cCI6MTUzNjY0MDk2M30.hsu95ycRihIl6Sz1kDswh9LNHmI30HAIWEK17sErHWmK5vXOppgrwIEy3suaZmGuYSUZqbrBnCuFBgN0mnokA2Geznn9pr7gDl1Z6Wl00xRDUWM7MZAhaqOaw0mUXENHvbrPMD-JlfGXakAergehS_LoH9dSk21NxAQ2u7ISESpaMA1qwg-XQ0_Hwz4wD8HH9BG7Tltlkhd8hj34SfbKakxT672JwRNrvrncTo23iJ6NnfFHDLzlxxtmDnTDRWhssVtrFoZotrORwf2Da1hOFR85SuJVj0wJtsUr3Yuu-Hk0yYK4VeN2WMMjJV-DZ-f_I7AUQmQ7Xa7vZ6DLtfZIRQ"
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