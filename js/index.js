$(function (){
    /*��̬������ҳ������Ϣ*/
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
    /*�����������ۿ��б���Ϣ*/
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
    /*��ȡ�ۿ���Ʒ�б�*/
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
    /*������ظ���  ��ȡ������Ʒ�б�*/
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