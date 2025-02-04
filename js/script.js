$(document).ready(function() {
    $(document).on('click', '.expando::before', function() {
        const $icon = $(this);
        const $content = $icon.next('.content');

        if ($content.hasClass('collapsed')) {
            $content.removeClass('collapsed');
            $icon.attr('src', 'icons/collapse.svg');
            $content.find('.content').removeClass('collapsed').prev('.toggle-icon').attr('src', 'icons/collapse.svg');
        } else {
            $content.addClass('collapsed');
            $icon.attr('src', 'icons/expand.svg');
            $content.find('.content').addClass('collapsed').prev('.toggle-icon').attr('src', 'icons/expand.svg');
        }
    });
});
