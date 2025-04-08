document.addEventListener('DOMContentLoaded', function() {

    console.log("==========================read_config BEGIN");
    console.log(window.document.expando_config);
    let config = read_config();
    console.log(window.document.expando_config);
    console.log("==========================read_config END");

    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    log_object(config);
    document.documentElement.style.setProperty('--icon-size', config.icon_size);

    log_object("config.automatic=[" + config.automatic + "]");

    if (config.automatic === "true") {
        log_object("calling autoconvert()");
        autoconvert(config);
    } else {
        log_object("NOT calling autoconvert()");
    }

    // Iterate over all expando nodes.
    const expando_nodes = document.querySelectorAll('.expando');
    let outermost_expando = "";
    expando_nodes.forEach(my_node => {
        let depth = get_node_depth(my_node);
        let margin_left = config.expando_indent * depth;

        let isInitiallyCollapsed = my_node.hasAttribute('data-collapsed');

        // Wrap the inner content in a div with class 'content'
        let content = my_node.querySelector('.content');
        if (!content) {
            content = document.createElement('div');
            content.style.marginLeft = margin_left + "px";
            content.classList.add('content');
            log_object(my_node.tagName);
            let tag_name = my_node.tagName;
            if (tag_name === "LI") {
                let my_parent = my_node.offsetParent;

                if (!my_parent.getAttribute('indented_correctly')) {
                    let all_siblings = my_parent.querySelectorAll('li');
                    if (all_siblings) {
                        all_siblings.forEach(
                            my_li => {
                                if (!my_li.classList.contains('expando')) {
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
            img = set_img(my_node, config.icon_size, (isInitiallyCollapsed ? config.expand_icon : config.collapse_icon));
        }

        content.classList.add(isInitiallyCollapsed ? 'collapsed' : 'expanded');

        if (outermost_expando === "") {
            my_node.id = "outermost_expando";
            outermost_expando = my_node;
        }

        img.addEventListener('click', function() {
            const isCollapsed = content.classList.contains('collapsed');

            if (isCollapsed) {
                content.style.maxHeight = content.scrollHeight + 'px';
                img.src = config.collapse_icon;
                content.scrollIntoView({ behavior: 'smooth', block: 'start' });  // Scroll the expanded content into view
            } else {
                content.style.maxHeight = '0px';
                img.src = config.expand_icon;
            }
            content.classList.toggle('active');
            content.classList.toggle('collapsed');
            content.classList.toggle('expanded');
        });

    });

    // Wrap the inner content in a div with class 'content'
    let li_nodes = document.querySelectorAll('.nonexpando_li');
    li_nodes.forEach((li_node) => {
        li_content = document.createElement('div');
        let li_depth = get_node_depth(li_node);
        let li_margin_left = (+config.expando_indent) * (1 + li_depth);
        li_content.style.marginLeft = li_margin_left + "px";
        li_content.classList.add('content');
        wrap_all(li_node, li_content);

        let img = li_node.querySelector('img');
        if (!img) {
            img = set_img(li_node, config.icon_size, config.blank_icon, "purple");
        }
    });

});

const dump_properties = (el) => {
    for (var i = 0, atts = el.attributes, n = atts.length, arr = []; i < n; i++) {
        console.log(atts[i].nodeName + "=[" + atts[i].nodeValue + "]");
    }
}

const log_object = (my_object) => {
    console.log(JSON.stringify(my_object, null, 2));
}