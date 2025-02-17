

////////////////////////////

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

const get_node_depth = (node) => {
    let p = node;
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

const autoconvert = () => {
    document.addEventListener('DOMContentLoaded', function() {
	config.registered_tags.forEach(
	    tag => {
		document.querySelectorAll(tag).addClass('expando');
	    }
	);
    });			      
}

////////////////////////////
/*
const read_config = () => {
    import expando_config from "https://purrperl.github.io/expando/config.json" with { type: "json" };
    const config = expando_config;
    return config;
}
*/

/////////////////////////////

const write_config = (data) => {
    const fs = require('fs');
    const jsonString = JSON.stringify(data, null, 2); // Convert to JSON string with indentation

    fs.writeFile('./config.json', jsonString, err => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('Successfully wrote file');
        }
    });

}

/////////////////////////////

document.addEventListener('DOMContentLoaded', function() {


    let config = window.document.expando_config; // read_config();
    log_object(config);
    return;
    document.documentElement.style.setProperty('--icon-size', config.icon_size);


    if ( config.automatic ) {
	autoconvert();
    }

    // Iterate over all expando nodes.
    const expando_nodes = document.querySelectorAll('.expando');
    let outermost_expando = "";
    expando_nodes.forEach(my_node => {
	let depth = get_node_depth( my_node );
	let margin_left = config.expando_indent * depth;
	// console.log("*****Entering text=[" + my_node.textContent + "] depth=[" + depth + "]");

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
	    img = set_img(my_node, config.icon_size, ( isInitiallyCollapsed ? config.expand_icon : config.collapse_icon ) );
        }
   

	content.classList.add( isInitiallyCollapsed ? 'collapsed' : 'expanded');

	if ( outermost_expando === "" ) {
	    my_node.id = "outermost_expando";
	    outermost_expando = my_node;
	}
	
	img.addEventListener('click', function() {
	    const isCollapsed = content.classList.contains('collapsed');

	    if (isCollapsed) {
		content.style.maxHeight = content.scrollHeight + 'px';
		outermost_expando.style.maxHeight += content.scrollHeight + 'px';
		img.src = config.collapse_icon;
	    } else {
		outermost_expando.style.maxHeight -= content.scrollHeight + 'px';
		content.style.maxHeight = '0px';
		img.src = config.expand_icon;
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
	let li_margin_left = (+config.expando_indent) * ( 1 + li_depth );
	// console.log("config.expando_indent=[" + config.expando_indent + "]");
	// console.log("====>Entering node=[" + li_node.textContent + "] depth=[" + li_depth + "] margin_left=[" + li_margin_left + "]");
	li_content.style.marginLeft = li_margin_left + "px";
	li_content.classList.add('content');
	wrap_all(li_node, li_content);
	
	let img = li_node.querySelector('img');
	if (!img) {
	    img = set_img(li_node, config.icon_size, config.blank_icon, "purple");
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
