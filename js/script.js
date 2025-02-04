$(document).ready(function() {
    $('.collapsible').each(function() {
        const $collapsible = $(this);
        const $toggleIcon = $collapsible.find('.toggle-icon');
        const $content = $collapsible.find('.content');

        $toggleIcon.on('click', function() {
            if ($content.hasClass('collapsed')) {
                $content.removeClass('collapsed');
                $toggleIcon.text('-');
            } else {
                $content.addClass('collapsed');
                $toggleIcon.text('+');
            }
        });
    });
});
