$(function (){
    console.log(window.location.search);
    var id=window.location.search;
    /*�������������*/
    var thirdTitle=GetQueryString('cname');
    var title=decodeURI(thirdTitle);
    /*����ҳ�ĵ�����������Ϊ�����ٴ�����Ʒ����ҳ*/
    $(".smallcategory").text(title);
    /*��ȡ��Ʒid*/
    id=getId(id);

    /*��̬������ҳ������Ϣ*/
    /*��ȡ��Ʒid����Ҫ�ж���Ʒid���Ƿ����10 100 ����ȡ��Ӧ�ĳ���*/
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

            /*��һҳ��ˢ�¹���*/
            var len=10;
            $('#footer_right').click(function (){
                if(num== pageCount){
                    /*�ﵽ���һҳ����ʾ�û�����ֱ�ӷ��أ�*/
                    alert('this  is the last one !');
                    return;

                }else if (num == pageCount-1){
                    /*�����ﵽ���һҳ����Ҫ�жϣ����һҳ����������ж�����*/
                    num+=1;
                    len=(res2==0?10:res2);
                    getNext (id,num,len);
                    $('.pageCurrent').text(num);
                    console.log(len+'************last one');
                }
                else{
                    /*����������һҳ�͵����ڶ�ҳ�����*/
                    num+=1;
                    getNext (id,num,len);
                    $('.pageCurrent').text(num);
                    console.log(len+'******normal');
                }
            })
            $('#footer_left').click(function (){
                if(num== 1){
                    num=1;
                    /*�Ѿ��ǵ�һҳ*/
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
    /*������id�ǵ�ǰ��Ʒ��id��ţ�num�ǵ�ǰҳ���pageid��ţ�len��ʾ��ǰҳ�����ȡ������󳤶�*/
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