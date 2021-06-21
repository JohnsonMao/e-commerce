$(document).ready(function(){
    
    // product inc & dec
    $('.inc').click(function(){
        let n = $(this).siblings('.product-num').val();
        n++;
        $(this).siblings('.product-num').val(n);
    });

    $('.dec').click(function(){
        let n = $(this).siblings('.product-num').val();
        if(n==0){
            return;
        }

        n--;
        $(this).siblings('.product-num').val(n);
    });
})