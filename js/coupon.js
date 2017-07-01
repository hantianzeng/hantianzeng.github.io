$(function (){
    $.get('http://127.0.0.1:3000/api/getcoupon',function(data){
        var tag='';
        var data=data.result;
        var arr=[];
        $.each(data,function (i,v){
            arr.push(v.titleId);
            tag+=
                '<a href="couponproduct.html?+couponId='+ v.couponId+'">'+
            '<li>'+
            '<div class="logo_pic">'+
                '<img src="'+ v.couponImg+'" alt=""/>'+
                '</div>'+
                '<p>'+ v.couponTitle+'</p>'+
                '</li>'+
                '</a>'
        })
        $('.logo_list_ul').append(tag);

    })

})