$(document).ready(function() {
    $(document).on('click', '.expando::before', function() {
        const $icon = $(this);
        const $content = $icon.next('.content');

        if ($content.hasClass('collapsed')) {
            $content.removeClass('collapsed');
            $icon.attr('src', 'icons/collapse.png');
            $content.find('.content').removeClass('collapsed').prev('.toggle-icon').attr('src', 'icons/collapse.png');
        } else {
            $content.addClass('collapsed');
            $icon.attr('src', 'icons/expand.png');
            $content.find('.content').addClass('collapsed').prev('.toggle-icon').attr('src', 'icons/expand.png');
        }
    });
});
