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

const set_img = (node, icon_size, src, color) => {
    let my_img = document.createElement('img');
    my_img.classList.add('expando_icon');
    my_img.src = src;
	    
    let data_label = node.getAttribute('data-head') || "";
    let label = document.createElement('span');
    label.innerHTML =  data_label;
    label.style.fontWeight = "bold";
    label.style.fontSize = icon_size;
    label.style.verticalAlign = 'middle';

    let container = document.createElement('div');
    container.style.display = 'inline-flex';
    container.style.verticalAlign = 'middle';
    if (color) {
	container.backgroundColor = color;
	container.color = color;
    }

    container.insertAdjacentElement('afterbegin', label);
    container.insertAdjacentElement('afterbegin', my_img);
    node.insertAdjacentElement('afterbegin', container);

    return my_img;
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

const get_css_attribute = (name) => {
   return getComputedStyle(document.documentElement).getPropertyValue(name).trim().replace(/^url\(['"]?|['"]?\)$/g, '');
}

////////////////////////////



document.addEventListener('DOMContentLoaded', function() {

    // Get basic parameters
    const default_icon_size = get_css_attribute('--icon-size') || '20px';
    const icon_size = document.body.getAttribute('data-icon-size') || default_icon_size;
    const icon_size_num = icon_size.replace(/px$/, '');
    document.documentElement.style.setProperty('--icon-size', icon_size);

    const expand_icon = get_css_attribute('--expand-icon');
    const collapse_icon = get_css_attribute('--collapse-icon');
    const blank_icon = get_css_attribute('--blank-icon');
    const margin_indent = get_css_attribute('--margin-indent').replace(/px$/, '');

    // Iterate over all expando nodes.
    const expando_nodes = document.querySelectorAll('.expando');
    let outermost_expando = "";
    expando_nodes.forEach(my_node => {
	let depth = get_node_depth( my_node );
	let margin_left = margin_indent * depth;
	console.log("*****Entering text=[" + my_node.textContent + "] depth=[" + depth + "]");

        let isInitiallyCollapsed = my_node.hasAttribute('data-collapsed');

        // Wrap the inner content in a div with class 'content'
        let content = my_node.querySelector('.content');
        if (!content) {
	    content = document.createElement('div');
	    content.style.marginLeft = margin_left + "px";
	    content.classList.add('content');
	    log_object( my_node.tagName );
	    let tag_name = my_node.tagName;
	    if ( tag_name === "LI"  ) {
		let my_parent = my_node.offsetParent;

		if ( ! my_parent.getAttribute('indented_correctly') ) {
		    let all_siblings = my_parent.querySelectorAll('li');
		    if ( all_siblings ) {
			all_siblings.forEach(
			    my_li => {
				if ( ! my_li.classList.contains('expando') ) {
				    my_li.classList.add('nonexpando_li');
				}
			    });
		    }
		    my_parent.setAttribute('indented_correctly', true);
		}
	    }
	    wrap_all(my_node, content);
        }

	// Set image
        let img = my_node.querySelector('img.nonexpando_li');
        if (!img) {
	    img = set_img(my_node, icon_size, ( isInitiallyCollapsed ? expand_icon : collapse_icon ) );
        }
   
	content.style.height = 'auto';
	if (isInitiallyCollapsed) {
	    content.classList.add('collapsed');
	    // content.style.height = '0px';
	    content.style.maxHeight = '0px';
	} else {
	    content.classList.add('expanded');
	    // content.style.maxHeight = content.scrollHeight + 'px';
	}

	if ( outermost_expando === "" ) {
	    outermost_expando = my_node;
	    my_node.style.display = "grid";
	    my_node.style.height = 'auto';
	    my_node.classList.add('full_height');
	    // my_node.style.maxHeight = my_node.scrollHeight + 'px';
	}
	
	img.addEventListener('click', function() {
	    const isCollapsed = content.classList.contains('collapsed');

	    if (isCollapsed) {
		content.style.maxHeight = content.scrollHeight + 'px';
		outermost_expando.style.maxHeight += content.scrollHeight + 'px';
		img.src = collapse_icon;
	    } else {
		outermost_expando.style.maxHeight -= content.scrollHeight + 'px';
		content.style.maxHeight = '0px';
		img.src = expand_icon;
	    }
	    content.classList.toggle('collapsed');
	    content.classList.toggle('expanded');
	});

    });


    // Wrap the inner content in a div with class 'content'
    let li_nodes = document.querySelectorAll('.nonexpando_li');
    li_nodes.forEach( (li_node) => {
	li_content = document.createElement('div');
	let li_depth = get_node_depth( li_node );
	let li_margin_left = (+margin_indent) * ( 1 + li_depth );
	console.log("margin_indent=[" + margin_indent + "]");
	console.log("====>Entering node=[" + li_node.textContent + "] depth=[" + li_depth + "] margin_left=[" + li_margin_left + "]");
	li_content.style.marginLeft = li_margin_left + "px";
	li_content.classList.add('content');
	wrap_all(li_node, li_content);
	
	let img = li_node.querySelector('img');
	if (!img) {
	    img = set_img(li_node, icon_size, blank_icon, "purple");
	}    
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
