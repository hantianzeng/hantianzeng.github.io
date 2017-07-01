$(function (){
    console.log(window.location.search);
    var id=window.location.search;
    /*把这页的第三级标题作为参数再传给商品详情页*/
    /*获取商品id*/
    id=getId(id);
    console.log(id);
    /*动态加载首页导航信息*/
    /*获取商品id，需要判断商品id数是否大于10 100 来截取对应的长度*/
    function getId (id){
        if(id.substr(id.length-4,4)>=1000){
            return id.substr(id.length-4,4);}
        else if(id.substr(id.length-3,3)>=100){
            return id.substr(id.length-3,3);
        }else if(id.substr(id.length-2,2)>=10){
            return id.substr(id.length-2,2);
        }else if (id.substr(id.length-1,1)<10){
            return id.substr(id.length-1,1);
        }
    }
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:3000/api/getmoneyctrl',
        jsonp:'callback',
        data:{productid:id},
         success:function (data){
             var data=data.result;
             var tag='';
             var v=data[6];
                tag+=
                    '<div class="chinaProduct_info">'+
                    '<div class="chinaProduct_info_head">'+ v.productName+'</div>'+
                    '<p class="chinaProduct_info_details">'+
                    '<span class="chinaProduct_from">'+ v.productFrom+'</span>'+
                    '<b>| </b>'+
                    '<span class="chinaProduct_time">'+ v.productTime+'</span>'+
                    '<b>| </b>'+
                    '<span class="chinaProduct_author">'+ v.productTips+'</span>'+
                    '</p>'+
                    '<div class="chinaProduct_info_word">'+
                    v.productImgSm+ v.productInfo2+'</div>'+
                    '<div class="chinaProduct_info_bigImg">'+ v.productImgSm+'</div>'+
                    '<div class="chinaProduct_info_city_list"></div>'+
                    '<div class="chinaProduct_info_buy">'+
                    '<div class="chinaProduct_info_buy_city_list">'+ v.productCity+'</div>'+
                    '<div class="chinaProduct_info_buy_head">to buy</div>'+
                    '</div>'+
                    '<div class="chinaProduct_info_comment">'+ v.productComment+'</div>'+
                    '</div>'
             $(tag).insertAfter(".getmoneyctrl_news");
         }

    })
})