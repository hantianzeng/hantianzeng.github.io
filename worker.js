//worker.js
onmessage =function (evt){
    var d = evt.data;//通过evt.data获得发送来的数据
    var d2=d+' only a test';
    var sum=0;
    for (var i=0;i<d;i++){
        sum+=i;
    }
    var fibonacci =function(n) {
        return n <2? n : arguments.callee(n -1) + arguments.callee(n -2);
    };

    postMessage( fibonacci(10) );//将获取到的数据发送会主线程
}