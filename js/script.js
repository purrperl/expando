const wrap_all = (target, wrapper) => {
    [ ...target.childNodes ].forEach(
	child => {
	    wrapper.appendChild(child);
	}
    );
    target.appendChild(wrapper);
    return wrapper;
}

////////////////////////////

const get_node_depth = (n) => {
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

const expando = () => {
    document.addEventListener('DOMContentLoaded', function() {
	config.registered_tags.forEach(
	    tag => {
		document.querySelectorAll(tag).addClass('expando');
	    }
	);
    });			      
}

////////////////////////////

const read_config = () => {
    let config = '';

    return config;
}


////////////////////////////

const resize_all_ancestors = (target, isCollapsed) => {
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

const margin_indent = 20;

document.addEventListener('DOMContentLoaded', function() {
    const default_icon_size = getComputedStyle(document.documentElement).getPropertyValue('--icon-size') || '20px';
    const icon_size = document.body.getAttribute('data-icon-size') || default_icon_size;
    const icon_size_num = icon_size.replace(/px$/, '');
    document.documentElement.style.setProperty('--icon-size', icon_size);

    const expandIcon = getComputedStyle(document.documentElement).getPropertyValue('--expand-icon').trim().replace(/^url\(['"]?|['"]?\)$/g, '');
    const collapseIcon = getComputedStyle(document.documentElement).getPropertyValue('--collapse-icon').trim().replace(/^url\(['"]?|['"]?\)$/g, '');
    
    const expandoIcons = document.querySelectorAll('.expando');
    let outermost_expando = "";
    expandoIcons.forEach(icon => {
	let depth = get_node_depth( icon );
	let margin_left = margin_indent * depth;
	console.log("*****Entering id=[" + icon.id + "] depth=[" + depth + "]");

        let isInitiallyCollapsed = icon.hasAttribute('data-collapsed');

        // Wrap the inner content in a div with class 'content'
        let content = icon.querySelector('.content');
        if (!content) {
	    content = document.createElement('div');
	    content.style.marginLeft = margin_left + "px";
	    content.classList.add('content');
	    log_object( icon.tagName );
	    let tag_name = icon.tagName;
	    if ( tag_name === "LI"  ) {
		let my_parent = icon.offsetParent;

		if ( ! my_parent.getAttribute('indented_correctly') ) {
		    let all_siblings = my_parent.querySelectorAll('li');
		    if ( all_siblings ) {
			all_siblings.forEach(
			    my_li => {
				let content_div = document.createElement('div');
				let mg = (+margin_left) + (+icon_size_num);
				content_div.style.marginLeft = mg + "px";
				content_div.appendChild(my_li);
				icon.appendChild(content_div);
				log_object( "indented [" + my_li.textContent + "] by margin=[" + mg + "px]" );
			    }
			);
		    }
		    my_parent.setAttribute('indented_correctly', true);
		}
	    }
	    wrap_all(icon, content);
//	    if ( icon.tagName !== "LI" ) {

	    /*	    
	    } else {
		let other_lis = icon.getChildNodes;
		if ( other_lis ) {
		    other_lis.forEach(
			child => {
			    content.appendChild(child);
			}
		    );
		}
		icon.appendChild(content);
		}
*/		
	    // content = icon.querySelector('.content');
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
	    label.style.fontSize = icon_size;
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

const dump_properties = (el) => {
    for (var i = 0, atts = el.attributes, n = atts.length, arr = []; i < n; i++){
	console.log( atts[i].nodeName + "=[" + atts[i].nodeValue + "]" );
    }
}

////////////////////////////

const log_object = (my_object) => {
    console.log(JSON.stringify(my_object, null, 2));
}
////////////////////////////
