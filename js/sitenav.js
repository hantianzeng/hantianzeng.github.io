$(function (){
    $.get('http://127.0.0.1:3000/api/getsitenav',function(data){
        var data=data.result;
        var tag='';
        $.each(data,function (i,v){
            tag+=
            '<li>'+
                '<a href="'+ v.navHref+'">'+
            '<div class="logo_pic">'+
                '<img src="'+ v.navImg+'" alt=""/>'+
                '</div>'+
                '<div class="logo_name">'+ v.navTitle+'</div>'+
                '</a>'+
            '</li>'
        })
        $('.shop_logo_list').append(tag);
    })

})