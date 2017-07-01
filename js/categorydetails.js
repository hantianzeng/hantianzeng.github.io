$(function (){
    console.log(window.location.search);
    var id=window.location.search;
    /*补充第三级标题*/
    var thirdTitle=GetQueryString('categorytitle');
    var title=decodeURI(thirdTitle);
    console.log(title);
    $('.categoryTitle').text(title);

    /*获取商品id*/
    id=getId(id);
    console.log(id+'*************productid');
    /*动态加载首页导航信息*/
    /*获取商品id，需要判断商品id数是否大于10 100 1000来截取对应的长度*/
    function getId (id){
        if(id.substr(id.length-5,5)>=10000){
            return id.substr(id.length-5,5);}
        else if(id.substr(id.length-4,4)>=1000){
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
        url:'http://127.0.0.1:3000/api/getproduct',
        jsonp:'callback',
        data:{productid:id},
        success:function (data){
            var data=data.result;
            /*数据获取成功，给第二级标题加上对应的链接*/
            $('.categoryTitle').attr({ href: "categorybyid.html?cname="+title+"&cid="+data[0].categoryId });
            /*截取当前产品名字的前面的名字作为第三级标题的名字*/
            var index2=data[0].productName.indexOf(' ');
            $('.smallcategory').text(data[0].productName.substr(0,index2));

            var tag='';
            tag+=
            '<div class="product_title"><span>'+data[0].productName+'</span></div>'+
             '<div class="product_img">'+data[0].productImg+'</div>';
             tag+=data.bjShop;
             $(tag).insertBefore(".shoucang");
            var tag2='';
            tag2+=data[0].bjShop;
            $(tag2).insertAfter(".product_details_nav");
        }
    })
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:3000/api/getproductcom',
        jsonp:'callback',
        data:{productid:id},
        success:function (data){
            var data=data.result;
            var tag='';
            $.each(data,function (i,v){
                tag+=
                    '<div class="comment_info">'+
                    '<div class="comment_name">'+ v.comName+'</div>'+
                    '<div class="comment_time">'+ v.comTime+'</div>'+
                    '<div class="comment_shop c_orange">'+ v.comFrom+'</div>'+
                '</div>'+
                '<div class="comment_body">'+ v.comContent+'</div>'+
                '<hr>'
            })
            $('.product_comment_info').append(tag);
        }
    })
})

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
