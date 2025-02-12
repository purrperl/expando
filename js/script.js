const wrapAll = (target, wrapper = document.createElement('div')) => {
    [ ...target.childNodes ].forEach(
	child => {
	    wrapper.appendChild(child);
	}
    );
    target.appendChild(wrapper);
    return wrapper;
}

////////////////////////////

const getNodeDepth = (n) => {
    let p = n;
    let depth = 0;
    while ( p !== document.body ) {
	if ( p.classList.contains('expando') ) {
	    depth++;
	}
	p = p.parentNode;
    }
    return depth;
}

////////////////////////////

const resizeAllAncestors = (target, isCollapsed) => {
    let current_node = target;
    let class_list = current_node.classList;
    while ( ! (class_list && class_list.contains("outermost_expando") ) ) {
	if ( isCollapsed ) {
	    // console.log("Expanding ancestor...");
	    current_node.style.maxHeight += current_node.scrollHeight + 'px';
	} else {
	    // console.log("Collapsing ancestor...");
	    current_node.style.maxHeight -= current_node.scrollHeight + 'px';
	}
	current_node = current_node.offsetParent.querySelector('.expando');
	class_list = current_node.classList;
    }    
    return current_node;
}

////////////////////////////

let left_margin = 20;
let left_margin_increment = 20;

document.addEventListener('DOMContentLoaded', function() {
    const defaultIconSize = getComputedStyle(document.documentElement).getPropertyValue('--icon-size') || '20px';
    const iconSize = document.body.getAttribute('data-icon-size') || defaultIconSize;
    document.documentElement.style.setProperty('--icon-size', iconSize);

    const expandIcon = getComputedStyle(document.documentElement).getPropertyValue('--expand-icon').trim().replace(/^url\(['"]?|['"]?\)$/g, '');
    const collapseIcon = getComputedStyle(document.documentElement).getPropertyValue('--collapse-icon').trim().replace(/^url\(['"]?|['"]?\)$/g, '');
    
    const expandoIcons = document.querySelectorAll('.expando');
    let outermost_expando = "";
    expandoIcons.forEach(icon => {
	let depth = getNodeDepth( icon );
	console.log("*****Entering id=[" + icon.id + "] depth=[" + depth + "]");

        let isInitiallyCollapsed = icon.hasAttribute('data-collapsed');

        // Wrap the inner content in a div with class 'content'
        let content = icon.querySelector('.content');
        if (!content) {
            content = document.createElement('div');
	    content.style.marginLeft = ( left_margin * depth ) + "px";
            content.classList.add('content');
	    wrapAll(icon, content);
	    content = icon.querySelector('.content');
        }

        let img = icon.querySelector('img.icon');
        if (!img) {	    
            img = document.createElement('img');
            img.classList.add('expando_icon');
	    img.src = isInitiallyCollapsed ? expandIcon : collapseIcon;
	    
	    let data_label = icon.getAttribute('data-head') || " = ";
	    let label = document.createElement('span');
	    label.innerHTML =  data_label;
	    label.style.fontWeight = "bold";
	    label.style.fontSize = iconSize;
	    label.style.verticalAlign = 'middle';

	    let container = document.createElement('div');
	    container.style.display = 'inline-flex';
	    container.style.verticalAlign = 'middle';

            container.insertAdjacentElement('afterbegin', label);
            container.insertAdjacentElement('afterbegin', img);
            icon.insertAdjacentElement('afterbegin', container);

        }
   
	content.style.height = 'auto';
	if (isInitiallyCollapsed) {
	    content.classList.add('collapsed');
	    // content.style.height = '0px';
	    content.style.maxHeight = '0px';
	    img.src = expandIcon;
	} else {
	    content.classList.add('expanded');
	    // content.style.maxHeight = content.scrollHeight + 'px';
	    img.src = collapseIcon;
	}

	if ( outermost_expando === "" ) {
	    outermost_expando = icon;
	    icon.style.display = "grid";
	    icon.style.height = 'auto';
	    icon.classList.add('full-height');
	    // icon.style.maxHeight = icon.scrollHeight + 'px';
	}
	
	img.addEventListener('click', function() {
	    const isCollapsed = content.classList.contains('collapsed');

	    if (isCollapsed) {
		content.style.maxHeight = content.scrollHeight + 'px';
		outermost_expando.style.maxHeight += content.scrollHeight + 'px';
		img.src = collapseIcon;
	    } else {
		outermost_expando.style.maxHeight -= content.scrollHeight + 'px';
		content.style.maxHeight = '0px';
		img.src = expandIcon;
	    }
	    content.classList.toggle('collapsed');
	    content.classList.toggle('expanded');
	});

    });
});


/////////////////////////////


function dumpProperties (el) {
    for (var i = 0, atts = el.attributes, n = atts.length, arr = []; i < n; i++){
	console.log( atts[i].nodeName + "=[" + atts[i].nodeValue + "]" );
    }
}

////////////////////////////

function log_object(myObject) {
    console.log(JSON.stringify(myObject, null, 2));
}
////////////////////////////
