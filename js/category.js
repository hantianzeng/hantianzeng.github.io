
$(function (){
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:3000/api/getcategorytitle',
        jsonp:'callback',
        success:function(data){
            var tag='';
            var data=data.result;
            var arrId=[];
            for (var i=0;i<8;i++){
                arrId.push(data[i].titleId);
            tag+=
            '<li>'+
            '<a href="">'+data[i].title+'</a>'+
             '<div class="mmm_category_head_more">'+
             ' </div>'+
             ' </li>';
            }
            $("#ulList").append(tag);
            $('#ulList li').click(
             function (){
            var length=$(this).find('.itemList li').length;
                  if(length ==0){
                     $(this).siblings().find('.itemList').slideUp("slow");
                     var titleId=$(this).index();
                      getChild(titleId);
                  }else{
                      $(this).siblings().find('.itemList').slideUp("slow");
                      $(this).find('.itemList').slideUp('fast').html(' ');
                  }
              }
            )
        }
    });

    function getChild(index){
        $.get('http://127.0.0.1:3000/api/getcategory?titleid='+index,function(data){
            var tag='<ul class="itemList clearfix">';
            var data=data.result;
            $.each(data,function (i,v){
                tag+=
                    '<li><a href="categorybyid.html?cname='+v.category+'&cid='+v.categoryId+'">'+ v.category+'</a></li>'
            })
            tag+= '</ul>';
            $('#ulList li:eq('+index+')').append(tag);
        })
    }
    /*$.ajax({
        type:'get',
        url:'http://127.0.0.1:3000/api/getcategorytitle',
        jsonp:'callback',
        data:{titleId:titleId},
        success:function(data){
            var tag='';
            var data=data.result;
            $(".mmm_category_head_more").click(function (){
                console.log($(this));
                var titleId=$(this).parent().index();
            })
        }
    });
*/
})