$(function (){
    var obj={areaid:0,shopid:0};
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:3000/api/getgsproduct?shopid=0&areaid=0',
        success:function (data){
            var data=data.result;
            var tag='';
            var len=data.length;
            for (var i=0;i<len;i++){
                var v=data[i];
                tag+=
                    '<li>'+
                    '<a href="">'+
                    '<div class="p_img">'+'<img src="'+v.productImg+'"/>'
                    +
                    '</div>'+
                    '<div class="p_des">'+ v.productName+'</div>'+
                    '<div class="p_price c_orange">'+ v.productPrice+'</div>'+
                    '</a>'+
                    '</li>'
            }
            $('#discount_info_list').append(tag);
        }
    })
    //
    function add(obj){
        var a = obj.productid || 3;
    }
    //
    $.get('http://127.0.0.1:3000/api/getgsshop',function(data){
       var data=data.result;
        var tag='';
        var shopArr=[];
        $.each(data,function (i,v){
            shopArr.push(v.shopId);
            tag+='<li>'+ v.shopName+'</li>';
        })
        $('.nav_banner_shoplistul').append(tag);
        $('.nav_banner_shop').click(function (){
            console.log($(this));
            $('.nav_banner_shoplist').toggleClass('choosed');
            $('.nav_banner_shoplist li').click(function (){
                $('.nav_banner_shop').find('span').text($(this).text());
                obj.shopid=shopArr[$(this).index()];
                $.ajax({
                    type:'get',
                    url:'http://127.0.0.1:3000/api/getgsproduct?shopid='+obj.shopid+'&areaid='+obj.areaid+'',
                    success:function (data){
                        var data=data.result;
                        var tag='';
                        var len=data.length;
                        for (var i=0;i<len;i++){
                            var v=data[i];
                            tag+=
                                '<li>'+
                                '<a href="">'+
                                '<div class="p_img">'+'<img src="'+v.productImg+'"/>'
                                +
                                '</div>'+
                                '<div class="p_des">'+ v.productName+'</div>'+
                                '<div class="p_price c_orange">'+ v.productPrice+'</div>'+
                                '</a>'+
                                '</li>'
                        }
                        $('#discount_info_list').html(tag);
                    }
                })
            })
        })
    })
    $.get('http://127.0.0.1:3000/api/getgsshoparea',function(data){
        var data=data.result;
        var tag='';
        var areaidArr=[];
        $.each(data,function (i,v){
            areaidArr.push(v.areaId);
            tag+='<li>'+ v.areaName+'</li>';
        })
        $('.nav_banner_arealistul').append(tag);
        $('.nav_banner_area').click(function (){
            $('.nav_banner_arealist').toggleClass('choosed');
            $('.nav_banner_arealist li').click(function (){
                $('.nav_banner_area').find('span').text($(this).text().substr(0,2));
                obj.areaid=areaidArr[$(this).index()];
                console.log(obj);
                $.ajax({
                    type:'get',
                    url:'http://127.0.0.1:3000/api/getgsproduct?shopid='+obj.shopid+'&areaid='+obj.areaid+'',
                    success:function (data){
                        var data=data.result;
                        var tag='';
                        var len=data.length;
                        for (var i=0;i<len;i++){
                            var v=data[i];
                            tag+=
                                '<li>'+
                                '<a href="">'+
                                '<div class="p_img">'+'<img src="'+v.productImg+'"/>'
                                +
                                '</div>'+
                                '<div class="p_des">'+ v.productName+'</div>'+
                                '<div class="p_price c_orange">'+ v.productPrice+'</div>'+
                                '</a>'+
                                '</li>'
                        }
                        $('#discount_info_list').html(tag);
                    }
                })
            })
        })
    })



})

