$(document).ready(function() {
    $('.collapsible .toggle-icon').on('click', function() {
        const $icon = $(this);
        const $content = $icon.next('.content');

        if ($content.hasClass('collapsed')) {
            $content.removeClass('collapsed');
            $icon.text('-');
            $content.find('.content').removeClass('collapsed').prev('.toggle-icon').text('-');
        } else {
            $content.addClass('collapsed');
            $icon.text('+');
            $content.find('.content').addClass('collapsed').prev('.toggle-icon').text('+');
        }
    });
});