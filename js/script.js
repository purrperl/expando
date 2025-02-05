

let collapse_icon = 'icons/collapse.svg';
let expand_icon = 'icons/expland.svg';

// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add click event listener to the toggle icon
    const expandoIcons = document.querySelectorAll('.expando::before');
    for (let i = 0; i < expandoIcons.length; i++) {
        expandoIcons[i].addEventListener('click', function() {
            const icon = this;
            const content = icon.parentNode.querySelector('.content');
            const isCollapsed = content.classList.contains('collapsed');

            // Toggle the collapsed class on the content element
            if (isCollapsed) {
                content.classList.remove('collapsed');
                icon.style.backgroundImage = url(collapse_icon);
                content.style.maxHeight = content.offsetHeight + 'px';
            } else {
                content.classList.add('collapsed');
                icon.style.backgroundImage = url(expand_icon);
                content.style.maxHeight = '0px';
            }
        });
    }
});
