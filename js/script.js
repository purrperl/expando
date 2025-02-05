

// Function to get/set cssVar 
const cssVar = ( name, value ) => {
    if(name.substr(0, 2) !== "--") {
        name = "--" + name;
    }

    if(value) {
        document.documentElement.style.setProperty(name, value)
    }

    return getComputedStyle(document.documentElement).getPropertyValue(name);
}

let collapse_icon = var(--collapse-icon);
let expand_icon = var(--expand-icon);


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
