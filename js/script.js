document.addEventListener('DOMContentLoaded', function() {
    const defaultIconSize = '20px';
    const iconSize = document.body.getAttribute('data-icon-size') || defaultIconSize;
    document.documentElement.style.setProperty('--icon-size', iconSize);

    const expandIcon = getComputedStyle(document.documentElement).getPropertyValue('--expand-icon').trim().replace(/^url\(['"]?|['"]?\)$/g, '');
    const collapseIcon = getComputedStyle(document.documentElement).getPropertyValue('--collapse-icon').trim().replace(/^url\(['"]?|['"]?\)$/g, '');

    const expandoIcons = document.querySelectorAll('.expando');
    expandoIcons.forEach(icon => {
        let img = icon.querySelector('img.icon');
        if (!img) {
            img = document.createElement('img');
            img.classList.add('icon');
            img.style.width = iconSize;
            img.style.height = iconSize;
            img.style.cursor = 'pointer';
            icon.insertAdjacentElement('afterbegin', img);
        }

        const isInitiallyCollapsed = icon.hasAttribute('data-collapsed');
        
        // Wrap the inner content in a div with class 'content'
        let content = icon.querySelector('.content');
        if (!content) {
            content = document.createElement('div');
            content.classList.add('content');
            while (icon.firstChild && icon.firstChild !== img) {
                content.appendChild(icon.firstChild);
            }
            icon.appendChild(content);
        }

        if (isInitiallyCollapsed) {
            content.classList.add('collapsed');
            content.style.maxHeight = '0px';
            img.src = expandIcon;
        } else {
            content.classList.add('expanded');
            content.style.maxHeight = '1000px'; // TO_DO: revise
            img.src = collapseIcon;
        }

        img.addEventListener('click', function() {
            const isCollapsed = content.classList.contains('collapsed');

            if (isCollapsed) {
                content.classList.remove('collapsed');
                content.classList.add('expanded');
                content.style.maxHeight = '1000px'; // TO_DO: revise ( content.scrollHeight + 'px'; )
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
