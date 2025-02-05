document.addEventListener('DOMContentLoaded', function() {
    const defaultIconSize = '20px';

    const iconSize = document.body.getAttribute('data-icon-size') || defaultIconSize;

    document.documentElement.style.setProperty('--icon-size', iconSize);

    const expandoIcons = document.querySelectorAll('.expando');
    expandoIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const content = icon.parentNode.querySelector('.content');
            const isCollapsed = content.classList.contains('collapsed');

            if (isCollapsed) {
                content.classList.remove('collapsed');
                content.classList.add('expanded');
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.classList.add('collapsed');
                content.classList.remove('expanded');
                content.style.maxHeight = '0px';
            }
        });
    });
});
