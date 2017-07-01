$(function (){
    /*设置变量*/
    var winHeight=0;
    var domHeight=0;
    var totalLength=0;
    var len=8; //首次加载的长度
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:3000/api/getinlanddiscount',
        success:function (data){
            var dataArr=[];
            var data=data.result;
            dataArr=data;
            /*此时变量dataArr中存储的是请求过来的20条完整数据*/
            console.log(data.length);
            totalLength=data.length;
            var tag='';
            for (var i=0;i<8;i++){
                var v=data[i];
                tag+=
                    '<li>'+
                    '<a href="">'+
                    '<div class="p_img">'+
                    v.productImg+
                    '</div>'+
                    '<div class="p_des">'+ v.productName+'</div>'+
                    '<div class="p_price c_orange">'+ v.productPrice+'</div>'+
                    '<div class="p_from">'+ v.productFrom+'</div>'+
                    '</a>'+
                    '</li>'
            }
            $('#discount_info_list').append(tag);

            //设置触发事件,当鼠标滚动就触发事件
            $(window).scroll( function() {
                winHeight = $(window).height();
                //domHeight = $('#discount_info_list').height();
                domHeight = $(document).height();
                console.log($(window).scrollTop());
                var res=domHeight-winHeight;
                console.log(res);
                //if(Math.abs($(window).scrollTop() -res) < 20 && $('#discount_info_list li').length<= totalLength-4){
                if($(window).scrollTop()==res && $('#discount_info_list li').length<= totalLength-4){
                    //到底部添加数据
                    console.log($('#discount_info_list li').length  +'current length');
                    addProduct();
                }else if(Math.abs($(window).scrollTop() -res) <10 && $('#discount_info_list li').length ==totalLength){
                  if($('#discount_info_list p').length >0){
                      return;
                  }else{
                      var p='<p>this is the last one !</p>';
                      p+=    '<div class="mmm_footer">'+
                          '<div class="mmm_footer_login">登录</div>'+
                          '<div class="mmm_footer_signUp">注册</div>'+
                          '<div class="mmm_footer_toTop">回到顶部</div>'+
                          '</div>'+
                          '<div class="mmm_copyRight">'+
                          '<span><span class="c_orange">手机APP下载  </span> 慢慢买手机版下载 --- 掌上比价平台</span>'+
                      '<span>m.manmanmai.com</span>'+
                      '</div>';
                      $('#discount_info_list').append(p);
                  }
                    $('.mmm_footer_toTop').click(function (){
                        $(window).scrollTop(0);
                    })
                    console.log($('#discount_info_list li').length  +'total length');
                    $(window).scrollTop(res);
                }
                //当鼠标滚到底部的时候，加载新的数据
                //解决方案：计算出鼠标到底部，加载数据

            } );
            function addProduct(){
                /*懒加载的时候不用继续请求数据，使用本地存储的变量的方式*/
                    totalLength = dataArr.length;//所有商品
                    //动态添加到我们的页面
                    var div = '';
                    //从len开始，到len+4结束的四个数据
                    console.log(len);
                    for(var i=len;i<len+4;i++){
                        v=dataArr[i];
                        div +=
                            '<li>'+
                            '<a href="">'+
                            '<div class="p_img">'+
                            v.productImg+
                            '</div>'+
                            '<div class="p_des">'+ v.productName+'</div>'+
                            '<div class="p_price c_orange">'+ v.productPrice+'</div>'+
                            '<div class="p_from">'+ v.productFrom+'</div>'+
                            '</a>'+
                            '</li>'
                    }
                    $('#discount_info_list').append(div);
                    len+=4;
            }

        }
    })
})
//添加数据
