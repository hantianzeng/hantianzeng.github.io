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
            /*��һҳ��ˢ�¹���*/
            /*��ȡ��ǰ��numֵ������Ѿ�ͨ��������ѡ�У���ô����Ҫ��ȡ��ǰֵ*/
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
                /*���ַ�������ת��Ϊnumber*/
                if(num== pageCount-1){
                    /*�ﵽ���һҳ����ʾ�û�����ֱ�ӷ��أ�*/
                    alert('this  is the last one !');
                    return;

                }else if (num == pageCount-2){
                    /*�����ﵽ���һҳ����Ҫ�жϣ����һҳ����������ж�����*/
                    num=num+1;
                    len=(res2==0?10:res2);
                    getNext (num,len);
                    len=10;
                    $('#pageCurrent').text(num);
                    console.log(len+'************last one');
                }else{
                    /*����������һҳ�͵����ڶ�ҳ�����*/
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
                    /*�Ѿ��ǵ�һҳ*/
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

    /*������ѡ���*/
    CreatList(15);
    /*����ѡ����ѡ���¼�*/
    $('#pageCount').click(function (){
     $('.add_list').toggleClass("hide");
    })
    $('.more_list li').click(function (){
        var text=$(this).find('.pageCurrent').text();
        $('#pageCurrent').text(text);
        $('.add_list').removeClass('hide');
        var num=text;
        if(num== pageCount-1){
            /*�ﵽ���һҳ����ʾ�û�����ֱ�ӷ��أ�*/
            alert('this  is the last one !');
            return;

        }else if (num == pageCount-2){
            /*�����ﵽ���һҳ����Ҫ�жϣ����һҳ����������ж�����*/
            len=(res2==0?10:res2);
            getNext (num,len);
            len=10;
        }else{
            /*����������һҳ�͵����ڶ�ҳ�����*/
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
    /*������id�ǵ�ǰ��Ʒ��id��ţ�num�ǵ�ǰҳ���pageid��ţ�len��ʾ��ǰҳ�����ȡ������󳤶�*/
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
