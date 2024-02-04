"use strict";

$().height($('.tabs').height())

// Vars

var themeModes         = ['theme-1','theme-2','theme-3'];
var defaultThemeColors = ['rgba(27, 200, 228,1)','rgba(0, 150, 136,1)','rgba(220, 53, 69,1)','rgba(40, 167, 69,1)','rgba(255, 87, 34,1)','rgba(121, 85, 72,1)'];
var appDiv = $('.app');

// Default Setting

appDiv.addClass(themeModes[0]).attr('data-main-color',defaultThemeColors[0]).attr('data-theme-id',0);

$('.tab').on('click',function(){
    $(this).addClass('selected').siblings('li').removeClass('selected');
    $('.contents > .active').removeClass('active');
    $('#'+$(this).data('target')).addClass('active')
})

// Change Theme Mode 

$('.tools i').on('click',function(){
    var selectedMode = $(this).html();
    appDiv.attr('class','app '+themeModes[selectedMode - 1]).attr('data-theme-id',selectedMode - 1)
    $('.tools h6 span').html(selectedMode);
    updatePage();
})

// Append Span Themes Color To themeColor Div

addThemesSpan(defaultThemeColors);

function addThemesSpan(arr){
    $('.theme-colors').html("");
    for(var i = 0 ; i < arr.length ; i++){
        $('.theme-colors').append('<span style="background-color:'+arr[i]+'" data-color-id="'+i+'" title="'+arr[i]+'"><i class="fa fa-close"><i></span>')
    }
    $('.theme-colors').append('<i id="add-color-btn" title="Add New Theme">&#43;</i>')
}

$('.theme-colors').on('click','#add-color-btn',function(){
    var Rvalue = prompt('Enter R Value');
    for(var i = 0 ; !checkThemeColor(Rvalue,0,255) ;i++){
        alert('R must be between 0 and 255 ,Try Again !');
        var Rvalue = prompt('Enter R Value');
    }
    var Gvalue = prompt('Enter G Value');
    for(var i = 0 ; !checkThemeColor(Gvalue,0,255) ;i++){
        alert('G must be between 0 and 255 ,Try Again !');
        var Gvalue = prompt('Enter G Value');
    }
    var Bvalue = prompt('Enter B Value');
    for(var i = 0 ; !checkThemeColor(Bvalue,0,255) ;i++){
        alert('B must be between 0 and 255 ,Try Again !');
        var Bvalue = prompt('Enter B Value');
    }
    var Avalue = prompt('Enter A Value');
    for(var i = 0 ; !checkThemeColor(Avalue,0,1) && Avalue != 1 ;i++){
        alert('A must be between 0 and 1 ,Try Again !');
        var Avalue = prompt('Enter A Value');
    }
    
    var newTheme = 'rgba('+Number(Rvalue)+','+Number(Gvalue)+','+Number(Bvalue)+','+Number(Avalue)+')';

    if(defaultThemeColors.indexOf(newTheme) == -1){
        defaultThemeColors.push(newTheme);
        addThemesSpan(defaultThemeColors);
    }else{
        alert(newTheme+' Exist Already !')
    }
})


$('.theme-colors').on('click','span',function(){
    
    var selectedColor = defaultThemeColors[$(this).data('color-id')];
    $('.app').attr('data-main-color',selectedColor)

    updatePage()
})


// close Theme Color When It's Been Clicked

$('.theme-colors').on('click','.fa-close',function(e){
    e.stopPropagation();
    $(this).parent('span').fadeOut(400,function(){
        $(this).remove()
    })
})

$('#tools-theme-btn').on('click',function(){
    $('.tools').toggleClass('Light');
    if($(this).html() == 'Light'){$(this).html('Dark')}else{$(this).html('Light')}
})

// Function Check Theme Prompt Values

function checkThemeColor(color,min,max){
    if(color < min){return false}
    else if(color > max){return false}
    else if(isNaN(color)){return false}
    else if(color.replace(/ /gi,'') == ""){return false}
    else{return true}
}

function updatePage(){
    
    var mainColor   = $('.app').attr('data-main-color');
    var themeId     = $('.app').attr('data-theme-id');
    var mainColorTrans = detectRgbA(mainColor)
    
    if(themeId == 0){
        
        var code = ".theme-1 .selected{color: "+mainColor+";background-color:  "+mainColorTrans+";border: 1px solid;border-right: none;border-color: "+mainColor+"}.theme-1 .selected:after{content: '';position: absolute;top: 0;right: -2px;height: 3.15em;width: 2px;background: rgb(251, 253, 255)}"+".theme-1 .contents > .active{background-color: "+mainColorTrans+";border: 1px solid "+mainColor+"}";

    }else if(themeId == 1){
        
        var code = ".theme-2 .selected{color: white;background-color: "+mainColor+";border: 1px solid "+mainColor+";border-right: none}.theme-2 .selected:after{content: '';position: absolute;top: .9em;right: -.6em;height: 1.5em;width: 1.5em;background: "+mainColor+";transform: rotate(45deg)}";
        
    }else if(themeId == 2){
        
        var code = ".theme-3 .selected{color: black;background-color: white;border-left: .4em solid;border-color: "+mainColor+";font-weight: bold}";
        
    }
    
        $('body').append('<style>'+code+'</style>');
        $('.mainBackgroundColor').css('background-color',mainColor)
        $('h1,#services i').css('color',mainColor)
    
}

$('.fa-gear').on('click',function(){
    $('.tools').toggleClass('displayed');
})


function detectRgbA(color){
    var lastIndexOfComa = color.lastIndexOf(',');
    var color = color.slice(0,lastIndexOfComa)+',0.02)';
    return color;
}