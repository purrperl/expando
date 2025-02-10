

const wrapAll = (target, wrapper = document.createElement('div')) => {
    ;[ ...target.childNodes ].forEach(child => wrapper.appendChild(child))
    target.appendChild(wrapper)
    return wrapper
  }
  
  ////////////////////////////
  
  const resizeAllAncestors = (target, isCollapsed) => {
      let current_node = target;
      let class_list = current_node.classList;
      while ( ! (class_list && class_list.contains("outermost_expando") ) ) {
      if ( isCollapsed ) {
          console.log("Expanding ancestor...");
          console.log(current_node.textContent);
          current_node.style.maxHeight += current_node.scrollHeight + 'px';
      } else {
          console.log("Collapsing ancestor...");
          current_node.style.maxHeight -= current_node.scrollHeight + 'px';
      }
      current_node = current_node.offsetParent.querySelector('.expando');
      class_list = current_node.classList;
      }    
      return current_node;
  }
  
  ////////////////////////////
  
  
  document.addEventListener('DOMContentLoaded', function() {
      const defaultIconSize = getComputedStyle(document.documentElement).getPropertyValue('--icon-size') || '20px';
      const iconSize = document.body.getAttribute('data-icon-size') || defaultIconSize;
      document.documentElement.style.setProperty('--icon-size', iconSize);
  
      const expandIcon = getComputedStyle(document.documentElement).getPropertyValue('--expand-icon').trim().replace(/^url\(['"]?|['"]?\)$/g, '');
      const collapseIcon = getComputedStyle(document.documentElement).getPropertyValue('--collapse-icon').trim().replace(/^url\(['"]?|['"]?\)$/g, '');
  
      const expandoIcons = document.querySelectorAll('.expando');
      let outermost_expando = "";
      expandoIcons.forEach(icon => {
      if ( outermost_expando === "" ) {
          outermost_expando = icon;
          // icon.classList.add('outermost_expando');
      }
      let isInitiallyCollapsed = icon.hasAttribute('data-collapsed');
          
          // Wrap the inner content in a div with class 'content'
          let content = icon.querySelector('.content');
  
          if (!content) {
              content = document.createElement('div');
              content.classList.add('content');
          wrapAll(icon, content);
          content = icon.querySelector('.content');
          console.log("Freshly created content tag");
          dumpProperties(content);
          }
  
          let img = icon.querySelector('img.icon');
          if (!img) {
              img = document.createElement('img');
              img.classList.add('icon');
              img.style.width = iconSize;
              img.style.height = iconSize;
              img.style.cursor = 'pointer';
              icon.insertAdjacentElement('afterbegin', img);
          img.src = isInitiallyCollapsed ? expandIcon : collapseIcon;
          }
     
      //////////////////////////
      if (isInitiallyCollapsed) {
          content.classList.add('collapsed');
          content.style.maxHeight = '0px';
          img.src = expandIcon;
      } else {
          content.classList.add('expanded');
          content.style.maxHeight = content.scrollHeight + 'px';
          img.src = collapseIcon;
      }
  
      img.addEventListener('click', function() {
          const isCollapsed = content.classList.contains('collapsed');
  
          if (isCollapsed) {
          // console.log("Expanding the node...");
          // dumpProperties(content);
          // console.log( content.textContent );
          content.style.maxHeight = content.scrollHeight + 'px';
          outermost_expando.style.maxHeight += content.scrollHeight + 'px';
          img.src = collapseIcon;
          } else {
          // console.log("Collapsing the node...");
          // dumpProperties(content);
          // console.log( content.textContent );
          outermost_expando.style.maxHeight -= content.scrollHeight + 'px';
          content.style.maxHeight = '0px';
          img.src = expandIcon;
          }
          content.classList.toggle('collapsed');
          content.classList.toggle('expanded');
          // resizeAllAncestors(content, isCollapsed);
      });
  
      /////////////////////////
      
      
      });
  });
  
  
  /////////////////////////////
  
  
  function dumpProperties (el) {
      for (var i = 0, atts = el.attributes, n = atts.length, arr = []; i < n; i++){
      console.log( atts[i].nodeName + "=[" + atts[i].nodeValue + "]" );
      }
  }
  
  ////////////////////////////
  
  
  ////////////////////////////
  