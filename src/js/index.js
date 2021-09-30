$(document).ready(Core);

function Core()
{
    SetTabSwitcher();
    SetModal();

    InitOwlCarousel();
    ShowMenu();
    CloseMenu();
}

function InitOwlCarousel()
{
    var carousel_projects = $(".carouselProjects").owlCarousel(
        {
            items: 1,
            loop: true,
            dots: false,
            autoplay: false,
            smartSpeed: 1000
        }
    );

    $(".carouselNews").owlCarousel(
        {
            items: 1,
            loop: true,
            dots: true,
            autoplay: false,
            smartSpeed: 1000,
            nav: false
        }
    );

    $('.projects .next').click(function() {
        carousel_projects.trigger('next.owl.carousel');
    });
    $('.projects .prev').click(function() {
        carousel_projects.trigger('prev.owl.carousel', [1000]);
    });
}

function ShowMenu()
{
    $('.btn__menu').click(function(){
        if ($("header .nav").hasClass('showMenu')){
            $("header .nav").removeClass('showMenu');
        }
        else{
            $("header .nav").addClass('showMenu');
        }
    })
}

function CloseMenu()
{
    $('.btnCloseMenu').click(function(){
        $("header .nav").removeClass('showMenu');
    })
}

function SetTabSwitcher()
{
    $('.btn__tab__switch').on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('active'))
        {
            return;
        }

        $('.btn__tab__switch').removeClass('active');
        $(this).addClass('active');

        let targetTab = $(this).attr('target');

        SwitchTab(targetTab)
    })
}

function SwitchTab(target)
{
    
    $('.tab.active').animate({
        opacity: 0
    }, 500, function() {
        $('.tab.active').removeClass('active');

        $(`[tab-name="${target}"]`).css('opacity', 0);
        $(`[tab-name="${target}"]`).addClass('active');
        
        let tabHeight = $(`[tab-name="${target}"]`)[0].clientHeight;
        $(`[tab-name="${target}"]`).closest('.tab__viewer').css('height', `${tabHeight}px`)

        $(`[tab-name="${target}"]`).animate({
            opacity: 1
        }, 500)
    })
}

function SetModal()
{
    $('[modal]').on('click', function()
    {
        let modalId = $(this).attr('modal');
        ShowModal(`#${modalId}`);
    });

    $('.modal__dialog').on('click', function(e) {
        e.stopPropagation();
    });

    $('.modal').on('click', function() {
        HideModal(`#${$(this).attr('id')}`);
    });

    $('.btn__modal__close').on('click', function ()
    {
        let modalId = $(this).closest('.modal').attr('id');
        HideModal(`#${modalId}`);
    });
}

function ShowModal(modalId)
{
    $(modalId + ' .modal__dialog').off('animationend');
    $(modalId).addClass('active');
    $('body').addClass('lock');
    $(modalId + ' .modal__dialog').addClass('fadeInDownBig')
    
    $('body').append('<div class="modal__backdrop"></div>');
    setTimeout(function() {
        $('.modal__backdrop').addClass('active');
    }, 50)
}

function HideModal(modalId)
{
    $(modalId + ' .modal__dialog').removeClass('fadeInDownBig');
    $(modalId + ' .modal__dialog').addClass('fadeOutDownBig');
    $('.modal__backdrop').removeClass('active');
    $('body').removeClass('lock');
    $(modalId + ' .modal__dialog').on('animationend', function() {
        if (!$(modalId).hasClass('active'))
        {
            return;
        }
        $(modalId).removeClass('active');
        $(modalId + ' .modal__dialog').removeClass('fadeOutDownBig');
        $('.modal__backdrop').remove();
    });
}