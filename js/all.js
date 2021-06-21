$(document).ready(function(){

    // burger button
    $('.mobileMenu-btn').click(function(){
        $(this).toggleClass('open');
        $('.mobileMenu-list').slideToggle();
    });

    // modal
    $('.add-shopping').click(function(){
        $('.modal-shopping').addClass('show');
    });

    $('.add-favorite').click(function(){
        $('.modal-favorite').addClass('show');
    });

    $('.modal-close').click(function(){
        $(this).removeClass('show');
    });

});