$(function (){
    console.log(window.location.search);
    var id=window.location.search;
    /*补充第三级标题*/
    var thirdTitle=GetQueryString('cname');
    var title=decodeURI(thirdTitle);
    /*把这页的第三级标题作为参数再传给商品详情页*/
    $(".smallcategory").text(title);
    /*获取商品id*/
    id=getId(id);

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

    var num=1;
   $.ajax({
        type:'get',
        url:'http://127.0.0.1:3000/api/getproductlist',
        jsonp:'callback',
        data:{categoryid:id,pageid:num},
        success:function(data){
            var tag='';
            var res2=data.totalCount%data.pagesize;
            console.log(res2+'**************res2');
            var pageCount=Math.ceil(data.totalCount/data.pagesize);
            $('.pageTotal').text(pageCount);
            var data=data.result;
            $.each(data, function (i,v){
                        tag+= '<li>'+
                              '<a href="categorydetails.html?categorytitle='+title+'&productid='+v.productId+'">'+
                            '<div class="product_pic">'
                            +v.productImg+
                            '</div>'+
                            '<div class="product_desc">'+
                            '<span>'+ v.productName+' <p class="c_red">'+ v.productPrice+'</p></span>'+
                            '<span class="product_time">'+
                            ''+ v.productQuote+' | <span>'+ v.productCom+'</span>'+
                            '</span>'+
                            '<div class="product_dis"></div>'+
                            '</div>'+
                            '</a>'+
                            '</li>'
                }
            )
            $("#ulList").append(tag);

            /*下一页的刷新功能*/
            var len=10;
            $('#footer_right').click(function (){
                if(num== pageCount){
                    /*达到最后一页，提示用户，并直接返回！*/
                    alert('this  is the last one !');
                    return;

                }else if (num == pageCount-1){
                    /*即将达到最后一页，需要判断，最后一页请求的数据有多少条*/
                    num+=1;
                    len=(res2==0?10:res2);
                    getNext (id,num,len);
                    $('.pageCurrent').text(num);
                    console.log(len+'************last one');
                }
                else{
                    /*除过倒数第一页和倒数第二页的情况*/
                    num+=1;
                    getNext (id,num,len);
                    $('.pageCurrent').text(num);
                    console.log(len+'******normal');
                }
            })
            $('#footer_left').click(function (){
                if(num== 1){
                    num=1;
                    /*已经是第一页*/
                    alert('this is the first one');
                    return;
                }else{
                    num-=1;
                    getNext (id,num,len);
                    $('.pageCurrent').text(num);
                    console.log(len+'******normal');

                }
            })
        }
    })

})


function getNext (id,num,len) {
    /*参数：id是当前商品的id编号，num是当前页面的pageid编号，len表示当前页面可以取到的最大长度*/
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:3000/api/getproductlist',
        jsonp:'callback',
        data:{categoryid:id,pageid:num},
        success:function(data){
            var tag='';
            var res=data.totalCount%10;
            var data=data.result;
            for ( var i=0;i<len;i++){

                var v=data[i];

                   tag+= '<li>'+
                    '<a href="categorydetails.html?productid='+v.productId+'">'+
                    '<div class="product_pic">'
                    +v.productImg+
                    '</div>'+
                    '<div class="product_desc">'+
                    '<span>'+ v.productName+' <p class="c_red">'+ v.productPrice+'</p></span>'+
                    '<span class="product_time">'+
                    ''+ v.productQuote+' | <span>'+ v.productCom+'</span>'+
                    '</span>'+
                    '<div class="product_dis"></div>'+
                    '</div>'+
                    '</a>'+
                    '</li>'

            }
            $("#ulList").html(tag);

        }
    })
}
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    var context = "";
    if (r != null)
        context = r[2];
    reg = null;
    r = null;
    return  context == null || context == "" || context == "undefined" ? "" : context;
}