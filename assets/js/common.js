$(document).ready(function() {
    $('a.abstract').click(function() {
        $(this).parent().parent().find(".abstract.hidden").toggleClass('open');
        $(this).parent().parent().find(".bibtex.hidden.open").toggleClass('open');
        $(this).parent().parent().find(".tldr.hidden.open").toggleClass('open');
    });
    $('a.tldr').click(function() {
        $(this).parent().parent().find(".tldr.hidden").toggleClass('open');
        $(this).parent().parent().find(".abstract.hidden.open").toggleClass('open');
        $(this).parent().parent().find(".bibtex.hidden.open").toggleClass('open');
    });
$('a.bibtex').click(function() {
        $(this).parent().parent().find(".bibtex.hidden").toggleClass('open');
        $(this).parent().parent().find(".abstract.hidden.open").toggleClass('open');
        $(this).parent().parent().find(".tldr.hidden.open").toggleClass('open');
    });
    $('a').removeClass('waves-effect waves-light');
    
    // Trigger the click event on page load
    $('a.tldr').trigger('click');
});
