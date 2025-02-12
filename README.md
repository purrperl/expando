# expando



A class to let you create "foldable" HTML content.

## Usage:

1. To use the *expando* class, add the following lines to the `<head>` section of your HTML file:

```html
<link rel="stylesheet" href="https://purrperl.github.io/expando/css/styles.css">
<script src="https://purrperl.github.io/expando/js/script.js"></script>
```


2. Add the `"expando"` class to any tag you want to make foldable:

```html
<div class="expando">
   <P>This content can be expanded or collapsed.</P>
   <P>You can add any content.</P>
</div>
```

3. Add the `data-collapsed` attribute to any tag you want to initialize as collapsed.

```html
<div class="expando" data-collapsed>
  <P>All expandos are expanded by default.</P>
  <P>This one is initially collapsed..</P>
</div>
```


4. To set attibutes, use the `set_expando()` function. All attributes are optional.

```html
<SCRIPT>
  set_expando('icon_size', '20px');
  set_expando('expand_icon_url', 'https://purrperl.github.io/icons/expand.svg');
  set_expando('collapse_icon_url', 'https://purrperl.github.io/icons/collapse.svg');
  set_expando('title', 'Chapter 1');
</SCRIPT>
```

5. To convert an existing page to use expandos, use the `expando_magic()` function.

```javascript
<SCRIPT>

1. tag ( query selector )
2. node
3. nodelist


    expando_magic(); // add class expando to all <div>, <ol>, and <ul> tags.
    expando_magic(); // add class expando to all <ol>, and <ul> tags.
    expando_magic(); // add class expando to all <div>, <ol>, and <ul> tags.
    expando_magic('<dl>'); // add class expando to all <dl> tags.
    expando_magic('<div>', '<li>', '<ul>', ); // add class expando to all <div>, <ol>, and <ul> tags.
    
</SCRIPT>
```

<HR NOSHADE>

## Example Story: <A HREF="example.html">The Tale of The Rogue Cyborg</A> ( Draft )
This is an example of how one can quickly take notes.
