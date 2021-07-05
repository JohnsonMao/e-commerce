$(document).ready(function(){

    // burger button
    $('.btn-burger').click(function(){
        $(this).toggleClass('open');
        $('#mobile-menu').fadeToggle(200);
    });

    // modal
    $('.add-shopping').click(function(){
        $('#modal-shopping').addClass('show');
    });

    $('.add-favorite').click(function(){
        $('#modal-favorite').addClass('show');
    });

    $('.modal-close').click(function(){
        $(this).removeClass('show');
    });

    // product inc & dec
    $('.inc').click(function(){
        let n = $(this).parents('ul').siblings('.product-num').val();
        n++;
        $(this).parents('ul').siblings('.product-num').val(n);
    });

    $('.dec').click(function(){
        let n = $(this).parents('ul').siblings('.product-num').val();
        // 0 以下不倒扣
        if(n==0){
            return;
        }
        n--;
        $(this).parents('ul').siblings('.product-num').val(n);
    });

    // 加入購物車後表單歸 0 
    $('.add-shopping').click(function(){
        $(this).siblings('.product-num').val(0);
    })
});