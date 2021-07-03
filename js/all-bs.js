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

});