$(function (){

    var num;
    var pageCount;
    var res2;
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:3000/api/getmoneyctrl',
        jsonp:'callback',
        data:{pageid:1},
        success: function (data){
            res2=data.totalCount%data.pagesize;
            console.log(res2+'**************res2');
           pageCount=Math.ceil(data.totalCount/data.pagesize);
            console.log(pageCount);
            $('.pageTotal').text(pageCount);
            var data=data.result;
             var tag='';
             $.each(data,function (i,v){
                 tag+=

                     '<li>'+
                     '<a href="chinamoneyctrl.html?productId='+v.productId+'">'+
                '<div class="product_pic">'+
                     v.productImgSm+
                    '</div>'+
                    '<div class="product_desc">'+
                    '<span>'+ v.productName+'<span class="c_orange">'+ v.productPinkage+'</span></span>'+
                '<span class="product_time">'+ v.productFrom+' | <span>'+ v.productTime+'</span>'+
                '</span>'+
                '<div class="product_dis"></div>'+
                    '</div>'+
                     '</a>'+
                    '</li>'

            })
            $('#pList').append(tag);
            /*下一页的刷新功能*/
            /*获取当前的num值，如果已经通过下拉框选中，那么就需要获取当前值*/
            console.log(typeof(parseInt("12")));
            var len=10;
            $('#footer_right').click(function (){
                //num=$('#pageCurrent')[0].innerText;
                num=document.querySelector('#pageCurrent').innerHTML;
                console.log(num);
                console.log(typeof(num));  //string
                num=num - 0;
                //console.log(parseInt(num));
                console.log(typeof(num));//string
                /*将字符串类型转化为number*/
                if(num== pageCount-1){
                    /*达到最后一页，提示用户，并直接返回！*/
                    alert('this  is the last one !');
                    return;

                }else if (num == pageCount-2){
                    /*即将达到最后一页，需要判断，最后一页请求的数据有多少条*/
                    num=num+1;
                    len=(res2==0?10:res2);
                    getNext (num,len);
                    len=10;
                    $('#pageCurrent').text(num);
                    console.log(len+'************last one');
                }else{
                    /*除过倒数第一页和倒数第二页的情况*/
                    num=num+1;
                    getNext (num,len);
                    $('#pageCurrent').text(num);
                    console.log(len+'******normal');
                }

            })

            $('#footer_left').click(function (){
                num=$('#pageCurrent').text();
                if(num== 1){
                    num=1;
                    /*已经是第一页*/
                    alert('this is the first one');
                    return;
                }else{
                    num=num-1;
                    getNext (num,len);
                    $('#pageCurrent').text(num);
                    console.log(len+'******normal');

                }
            })

        }

    })

    /*先生成选择框*/
    CreatList(15);
    /*下面选项框的选中事件*/
    $('#pageCount').click(function (){
     $('.add_list').toggleClass("hide");
    })
    $('.more_list li').click(function (){
        var text=$(this).find('.pageCurrent').text();
        $('#pageCurrent').text(text);
        $('.add_list').removeClass('hide');
        var num=text;
        if(num== pageCount-1){
            /*达到最后一页，提示用户，并直接返回！*/
            alert('this  is the last one !');
            return;

        }else if (num == pageCount-2){
            /*即将达到最后一页，需要判断，最后一页请求的数据有多少条*/
            len=(res2==0?10:res2);
            getNext (num,len);
            len=10;
        }else{
            /*除过倒数第一页和倒数第二页的情况*/
            len=10;
            getNext (num,len);
        }
    })

})


function CreatList(num){
    var tag='';
    for(var i=2;i<num;i++){
        tag+=
            '<li>'+
            '<span class="pageCurrent">'+i+'</span>'+
            '<span>/</span>'+
            '<span class="pageTotal">15</span>'+
            '</li>'
    }
    $('.more_list').append(tag);
}

function getNext (num,len) {
    /*参数：id是当前商品的id编号，num是当前页面的pageid编号，len表示当前页面可以取到的最大长度*/
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:3000/api/getmoneyctrl',
        jsonp:'callback',
        data:{pageid:num},
        success:function(data){
            var tag='';
            var data=data.result;
            for ( var i=0;i<len;i++){
                var v=data[i];
                tag+='<li>'+
                    '<div class="product_pic">'+
                    v.productImgSm+
                    '</div>'+
                    '<div class="product_desc">'+
                    '<span>'+ v.productName+'<span class="c_orange">'+ v.productPinkage+'</span></span>'+
                    '<span class="product_time">'+ v.productFrom+' | <span>'+ v.productTime+'</span>'+
                    '</span>'+
                    '<div class="product_dis"></div>'+
                    '</div>'+
                    '</li>'
            }
            $("#pList").html(tag);

        }
    })
}
