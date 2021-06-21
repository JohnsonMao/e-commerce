$(document).ready(function(){
    
    // product inc & dec
    $('.inc').click(function(){
        let n = $(this).siblings('.product-num').val();
        n++;
        $(this).siblings('.product-num').val(n);
    });

    $('.dec').click(function(){
        let n = $(this).siblings('.product-num').val();
        // 0 以下不倒扣
        if(n==0){
            return;
        }
        n--;
        $(this).siblings('.product-num').val(n);
    });

    // 加入購物車後表單歸 0 
    $('.add-shopping').click(function(){
        $(this).siblings('.product-num').val(0);
    })
})