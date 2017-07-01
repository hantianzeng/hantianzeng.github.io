$(function (){
    var id=window.location.search;
    var id2=id.substr(window.location.search.length-1,1);
    var img;
    var index;
    console.log(id2);
    console.log(id);
    $.get('http://127.0.0.1:3000/api/getcouponproduct?couponid='+id2+'',function(data){
        var tag='';
        var data=data.result;
        var arr=[];
        $.each(data,function (i,v){
            arr.push(v.couponProductImg);
            tag+=
            '<li>'+
            '<div class="couponproductz-pic">'+
            v.couponProductImg+
                '</div>'+
                '<div class="couponproductz-des">'+
                '<div class="couponproductz-name">'+ v.couponProductName+'</div>'+
                '<div class="couponproductz-price">'+ v.couponProductPrice+'</div>'+
                '<div class="couponproductz-time c_orange">'+ v.couponProductTime+'</div>'+
                '</div>'+
                '</li>'
        })
        $('.couponproduct_info_list').append(tag);
        var domHeight=$(document).height();
        $('.couponproduct_info_list li').click(function (){
          $('.mask').toggleClass("selected");
           index=$(this).index();
            img=arr[index];
            $('.mask_pic').html($(img));
            var len=$('.couponproduct_info_list li').length;
          $('.next').click(function (){
              if(index==len){
              alert('this is the last one!')
              }
              index++;
              $('.mask').toggleClass("selected");
             img=arr[index];
              $('.mask_pic').html(img);
          })
            $('.before').click(function (){
                if(index==0){
                    alert('this is the first one!')
                }
                index--;
                $('.mask').toggleClass("selected");
                img=arr[index];
                $('.mask_pic').html(img);
            })

      })
        $('.mask').click(function (){
            $('.mask').toggleClass("selected");
        })
        /*使用当前图片填充mask遮罩的中间部分*/

    })

})