document.addEventListener('DOMContentLoaded', function() {
    const expandoIcons = document.querySelectorAll('.expando');
    expandoIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const content = icon.parentNode.querySelector('.content');
            const isCollapsed = content.classList.contains('collapsed');

            // Toggle the collapsed class on the content element
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
