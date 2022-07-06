$(document).ready(function() {
    var tag = $('.articleContent b');

    $.each(tag, function(index, item){
        var str = $(item).text();
        
        if (str.indexOf('{{img') > -1){

            var str_a = str.replace('{{img ', '<img ');
            var str_b = str_a.replace('/>}}', '/>');

            $(item).empty(); 
            $(item).append(str_b);

            $(item).parent().addClass('align-img-inline');
            setTimeout(function() {
                var imgItem = $(item).children();
                var imgHeight = imgItem.height() / 3.2;
                var imgAttr = imgItem.attr('style');
                
                
                
                if(typeof imgAttr !== 'undefined' && imgAttr !== false) {
                console.log('não faz nada');
                } else {
                imgItem.css('margin-bottom' , -imgHeight);
                }
                }, 5000);
        }

        });

    if (location.href.indexOf('file') != -1) {
        var tag = $('.articleContent b');

        tag.each(function(){
            var img = $(this).find('img');
            var id_img = $(this).find('img').attr('id');
            console.log(id_img);

            img.attr('src', 'img/' + id_img + '.png');
        });

    } else {        
        console.log('rodando na wooding');
    }
});