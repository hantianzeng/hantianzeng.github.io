$(function (){
    /*���ñ���*/
    var winHeight=0;
    var domHeight=0;
    var totalLength=0;
    var len=8; //�״μ��صĳ���
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:3000/api/getinlanddiscount',
        success:function (data){
            var dataArr=[];
            var data=data.result;
            dataArr=data;
            /*��ʱ����dataArr�д洢�������������20����������*/
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

            //���ô����¼�,���������ʹ����¼�
            $(window).scroll( function() {
                winHeight = $(window).height();
                //domHeight = $('#discount_info_list').height();
                domHeight = $(document).height();
                console.log($(window).scrollTop());
                var res=domHeight-winHeight;
                console.log(res);
                //if(Math.abs($(window).scrollTop() -res) < 20 && $('#discount_info_list li').length<= totalLength-4){
                if($(window).scrollTop()==res && $('#discount_info_list li').length<= totalLength-4){
                    //���ײ��������
                    console.log($('#discount_info_list li').length  +'current length');
                    addProduct();
                }else if(Math.abs($(window).scrollTop() -res) <10 && $('#discount_info_list li').length ==totalLength){
                  if($('#discount_info_list p').length >0){
                      return;
                  }else{
                      var p='<p>this is the last one !</p>';
                      p+=    '<div class="mmm_footer">'+
                          '<div class="mmm_footer_login">��¼</div>'+
                          '<div class="mmm_footer_signUp">ע��</div>'+
                          '<div class="mmm_footer_toTop">�ص�����</div>'+
                          '</div>'+
                          '<div class="mmm_copyRight">'+
                          '<span><span class="c_orange">�ֻ�APP����  </span> �������ֻ������� --- ���ϱȼ�ƽ̨</span>'+
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
                //���������ײ���ʱ�򣬼����µ�����
                //����������������굽�ײ�����������

            } );
            function addProduct(){
                /*�����ص�ʱ���ü����������ݣ�ʹ�ñ��ش洢�ı����ķ�ʽ*/
                    totalLength = dataArr.length;//������Ʒ
                    //��̬��ӵ����ǵ�ҳ��
                    var div = '';
                    //��len��ʼ����len+4�������ĸ�����
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
//�������
