$(function (){
    var index;
    $.get('http://127.0.0.1:3000/api/getbaicaijiatitle',function(data){
        var tag='<ul class="baicaijia_list clearfix">';
        var data=data.result;
        var arr=[];
        $.each(data,function (i,v){
            arr.push(v.titleId);
            tag+=
                '<li>'+ v.title+'</li>'
        })
        tag+= '</ul>';
        console.log(arr);
        $('.baicaijia_nav').append(tag);
        $('.mmm_footer_toTop').click(function (){
            $(window).scrollTop(0);
        })
        $('.baicaijia_list li').click(function (){
            $(this).siblings().removeClass('selected').end().addClass('selected');
            index=$(this).index();
            $.get('http://127.0.0.1:3000/api/getbaicaijiaproduct?titleid='+index+'',function(data){
                var tag='';
                var data2=data.result;
                $.each(data2,function (i,v){
                    tag+=
                        '<li>'+
                        '<div class="b_pic">'+
                        v.productImg+
                        '</div>'+
                        '<div class="b_des">'+
                        '<div class="b_des_name">'+ v.productName+'</div>'+
                        '<div class="b_des_price"><span class="c_red">'+ v.productPrice+'</span></div>'+
                        '<p><span class="b_des_range"><span class="b_des_range_inner"></span></span><span class="c_orange" style="padding-left: 3px">get 123 $</span></p>'+
                        '<div class="b_des_youhui">click to get $10</div>'+
                        '<div class="b_des_xiadan">link to buy </div>'+
                        '</div>'+
                        '</li>'
                });
                $('#baicaijia_info_list').html(tag);
            })

        })
        $('.baicaijia_list li:eq(1)').addClass('selected');
        /*横向导航栏滑动事件*/
        var ul = $('.baicaijia_list');
        var maxWidth = ul.width()- ul.parent().width();
        //设置变量
        var startJuli=0,endJuli=0,moveJuli=0,lastPos=0;
        //设置事件
        ul.on('touchstart',function(e){
            startJuli = e.originalEvent.touches[0].clientX;
        })
        ul.on('touchmove',function(e){
            endJuli = e.originalEvent.touches[0].clientX;
            moveJuli = endJuli - startJuli;
            moveUl(lastPos+moveJuli,0);
        })
        ul.on('touchend',function(e){
            lastPos += moveJuli;
            if(lastPos<-maxWidth){
                moveUl(-maxWidth,1);
                lastPos = -maxWidth;
            }
            if(lastPos>0){
                moveUl(0,1);
                lastPos = 0;
            }
        })

        //写一个滑动功能
        function moveUl(len,sec){
            ul.css('transform','translate('+len+'px)');
            ul.css('transition',"all "+sec+"s");
        }
    })

    $.get('http://127.0.0.1:3000/api/getbaicaijiaproduct?titleid=1',function(data){
        var tag='';
        var data=data.result;
        $.each(data,function (i,v){
            tag+=
                '<li>'+
                '<div class="b_pic">'+
                v.productImg+
                '</div>'+
                '<div class="b_des">'+
                '<div class="b_des_name">'+ v.productName+'</div>'+
                '<div class="b_des_price"><span class="c_red">'+ v.productPrice+'</span></div>'+
                '<p><span class="b_des_range"><span class="b_des_range_inner"></span></span><span class="c_orange" style="padding-left: 3px">get 123 $</span></p>'+
                '<div class="b_des_youhui">click to get $10</div>'+
                '<div class="b_des_xiadan">link to buy </div>'+
                '</div>'+
                '</li>'
        });
        $('#baicaijia_info_list').append(tag);
    })



})
