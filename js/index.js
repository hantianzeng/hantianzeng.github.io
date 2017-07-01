$(function (){
    /*动态加载首页导航信息*/
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:3000/api/getindexmenu',
        jsonp:'callback',
        success:function(data){
            var tag='';
            var data=data.result;
            for (var i=0;i<8;i++){
                var v=data[i];
                tag+='<li>'+
                    '<a href="'+v.titlehref+'">'+
                    v.img+
                    '<p>'+ v.name+'</p>'+
                    '</a>'+
                    '</li>'
            }
            $("#ulList").append(tag);

        }
    })
    /*点击更多加载折扣列表信息*/
     $.ajax({
     type:'get',
     url:'http://127.0.0.1:3000/api/getindexmenu',
     jsonp:'callback',
     success:function(data){
     var tag='';
     var data=data.result;
         for (var i=8;i<12;i++){
             var v=data[i];
             tag+='<li>'+
                 '<a href="'+v.titlehref+'">'+
                 v.img+
                 '<p>'+ v.name+'</p>'+
                 '</a>'+
                 '</li>'
         }
         $("#ulList").append(tag);
         $("#ulList li:eq(7)").click(
             function (){
          $('#ulList').toggleClass("selected");
         })


     }
     });
    /*获取折扣商品列表*/
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:3000/api/getmoneyctrl',
        jsonp:'callback',
        success:function(data){
            var tag='';
            var data=data.result;
            for (var i=0;i<5;i++){
                var v=data[i];
                tag+= '<li>'+
                    '<div class="product_pic">'
                    +v.productImgSm+
                    '</div>'+
                    '<div class="product_desc">'+
                    '<span>'+ v.productName+' <span class="c_orange">'+ v.productPinkage+'</span></span>'+
                    '<span class="product_time">'+
                    ''+ v.productFrom+' | <span>'+ v.productTime+'</span>'+
                    '</span>'+
                    '<div class="product_dis"></div>'+
                    '</div>'+
                    '</li>'
            }
            $("#pList").append(tag);

        }
    });
    /*点击加载更多  获取更多商品列表*/
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:3000/api/getmoneyctrl',
        jsonp:'callback',
        success:function(data){
            var tag='';
            var data=data.result;
            $(".more_prod_info").click(function (){
                var length=$("#pList li").length;
                for ( i=length;i<length+5;i++){
                    var v=data[i];
                    tag+= '<li>'+
                        '<div class="product_pic">'
                        +v.productImgSm+
                        '</div>'+
                        '<div class="product_desc">'+
                        '<span>'+ v.productName+' <span class="c_orange">'+ v.productPinkage+'</span></span>'+
                        '<span class="product_time">'+
                        ''+ v.productFrom+' | <span>'+ v.productTime+'</span>'+
                        '</span>'+
                        '<div class="product_dis"></div>'+
                        '</div>'+
                        '</li>'
                }
                $("#pList").append(tag);
            })


        }
    });
})