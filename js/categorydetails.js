$(function (){
    console.log(window.location.search);
    var id=window.location.search;
    /*�������������*/
    var thirdTitle=GetQueryString('categorytitle');
    var title=decodeURI(thirdTitle);
    console.log(title);
    $('.categoryTitle').text(title);

    /*��ȡ��Ʒid*/
    id=getId(id);
    console.log(id+'*************productid');
    /*��̬������ҳ������Ϣ*/
    /*��ȡ��Ʒid����Ҫ�ж���Ʒid���Ƿ����10 100 1000����ȡ��Ӧ�ĳ���*/
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
            /*���ݻ�ȡ�ɹ������ڶ���������϶�Ӧ������*/
            $('.categoryTitle').attr({ href: "categorybyid.html?cname="+title+"&cid="+data[0].categoryId });
            /*��ȡ��ǰ��Ʒ���ֵ�ǰ���������Ϊ���������������*/
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
