

(function () {
    
    //id:
    let id = location.search;
    id = id.split('?')[1];
    
    $.ajax({
        type: 'get', 
        data: {
            id
        },
        url: '/api/editGoods',
        success: function(str) {
            console.log(str);

            
        }
    })
})()