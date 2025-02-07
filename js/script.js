document.addEventListener('DOMContentLoaded', function() {
    const defaultIconSize = '20px';
    const iconSize = document.body.getAttribute('data-icon-size') || defaultIconSize;
    document.documentElement.style.setProperty('--icon-size', iconSize);

    // Access icon URLs from CSS
    const expandIcon = getComputedStyle(document.documentElement).getPropertyValue('--expand-icon').trim();
    const collapseIcon = getComputedStyle(document.documentElement).getPropertyValue('--collapse-icon').trim();

    const expandoIcons = document.querySelectorAll('.expando');
    expandoIcons.forEach(icon => {
        // Check if an icon 'img' element has already been created
        let img = icon.querySelector('img.icon');
        if (!img) {
            img = document.createElement('img');
            img.classList.add('icon');
            img.style.width = iconSize;
            img.style.height = iconSize;
            img.style.cursor = 'pointer';
            icon.insertAdjacentElement('afterbegin', img);
        }

        const initialState = icon.getAttribute('data-exp') === 'true';
        const content = icon.parentNode.querySelector('.content');

        // Set the initial icon based on the state
        img.src = initialState ? collapseIcon : expandIcon;

        if (initialState) {
            content.classList.add('expanded');
            content.style.maxHeight = content.scrollHeight + 'px';
        } else {
            content.classList.add('collapsed');
            content.style.maxHeight = '0px';
        }

        img.addEventListener('click', function() {
            const isCollapsed = content.classList.contains('collapsed');

            if (isCollapsed) {
                content.classList.remove('collapsed');
                content.classList.add('expanded');
                content.style.maxHeight = content.scrollHeight + 'px';
                img.src = collapseIcon;
            } else {
                content.classList.add('collapsed');
                content.classList.remove('expanded');
                content.style.maxHeight = '0px';
                img.src = expandIcon;
            }
        });
    });
});
