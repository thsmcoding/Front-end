( function ( $ ) {
    var start = performance.now();
    //Plugin definition:
    $.fn.toccreate = function(ctDiv, headings, options ) {
	/* default settings*/
	var defaults = {
	    depth: 0,
	    headers : ["H2", "H3", "H4", "H5", "H6"],
	    count_headers : {},
	    jqueryObjs: {"h2":$("li.h2"),
			 "h3":$("li.h3"),
			 "h4":$("li.h4"),
			 "h5":$("li.h5"),
			 "h6":$("li.h6")
			}			
	};
	var settings = $.extend(true, {}, defaults, options );
	var tocDiv = this;
	createToc(defaults, headings,tocDiv);
	var end= performance.now();
	console.log("Plugin took " + (end-start) + " milliseconds to execute.");
	return tocDiv;
    };
    
    function initCountHeadings(obj_h,allHeaders) {
	$.each(allHeaders, function(index) {
	    var one_heading = $(allHeaders[index]);
	    var tagN = one_heading.prop("tagName").toLowerCase();
	    obj_h.count_headers[tagN] = 0;
	});
    };
    
    /*** Creating the main parent DIV and ul that contains the toc  ***/
    function setUpToc(global_parent) {
	var divTOC = $('<div />').attr('id', 'toc_list')
	    .appendTo(global_parent);
	var $ulTOC = $('<ul />').addClass('toc_items')
	    .appendTo(divTOC);
	return $ulTOC;
    };    

    
    /*** Adding an ID to all headings(h2,h3,h4,h5,h6) within the main parent ***/
    function addIdToHeadings(headings) {
	$.each(headings, function(index) {
	    var one_heading = $(headings[index]);
	    var id_heading = one_heading.text().replace(/ /g, '_');
	    one_heading.attr('id', id_heading);
	});
    };    

    function append_another_child(prev_tagname, li_to_append) {
	var result ="";
	switch(prev_tagname) {
	case "h2":
	    result = $(".h2").last();
	    break;
	case "h3":
	    result = $(".h3").last();
	    break;
	case "h4":
	    result = $(".h4").last();
	    break;
	case "h5":
	    result = $(".h5").last();
	    break;
	case "h6":
	    result = $(".h6").last();
	    break;
	default:
	    break;	    
	}
	if( result.has("ul").length ) {
	    var ulLast = result.find("ul > li").last();
	    li_to_append.insertAfter(ulLast);
	}else {
	    var whole_elt = $("<ul />").append(li_to_append);
	    result.append(whole_elt);
	}
    };
    
    function append_after_parent(tagname, li_to_append) {
	var result ="";
	switch(tagname) {
	case "h2":
	    result = $(".h2").last();
	    break;
	case "h3":
	    result = $(".h3").last();
	    break;
	case "h4":
	    result = $(".h4").last();
	    break;
	case "h5":
	    result = $(".h5").last();
	    break;
	case "h6":
	    result = $(".h6").last();
	    break;
	default:
	    break;	    
	}
	li_to_append.insertAfter(result);
    };
    
    /*** Creating the appropriate number for member in TOC ***/
    function getHeadingNumber(obj_h, headings, current_index) {
	var one_heading = $(headings[current_index]);
	var counter = "";
	var curr_header = one_heading.prop("tagName").toLowerCase();
	if(curr_header === "h2") {
	    obj_h.depth += 1;
	    obj_h.count_headers[curr_header] = obj_h.depth;
	    var slice_headers = obj_h.headers.slice(1,obj_h.headers.length);
	    $.each(slice_headers, function(i) {
		var key = slice_headers[i].toLowerCase();
		obj_h.count_headers[key] = 0;
	    });	    
	    counter= obj_h.depth.toString();
	} else {
	    var indx = $.inArray(curr_header.toUpperCase(), obj_h.headers);
	    obj_h.count_headers[curr_header] += 1;
	    var values_count = $.map(obj_h.count_headers, function(val, key){return val;});
	    var items = values_count.slice(0, indx+1);
	    counter = items.join(".").toString();
	}
	return counter;
    };    
     
    /*** Compares two headings. Returns 0 if they have the same tagname.
	 Returns -1 if first heading has a tagname "less" weight,
	 returns 1 otherwise
	 Headings are HTML elements from h2 to h6
	 first:  index of the first heading in array that contains all the headings of the document
	 scd: index of the second heading in array of headings
	 array_headings:  array that contains all the headings in the body ***/
    function cmpHeadings(current, previous, array_headings) {
	var current_prop = $(array_headings[current]).prop("tagName");
	var prev_prop = $(array_headings[previous]).prop("tagName");
	var current_number = parseInt(current_prop.charAt(1));
	var prev_number = parseInt(prev_prop.charAt(1));
	var res = (current_number === prev_number) ? 0 : (current_number < prev_number ? -1 : 1);
	return res;
    };
    

    /*** Add HTML code for one item of the TOC ***/
    function create_li_item(id_name, counter, title,tagname) {
	var $link = $("<a />").attr("href", "#" + id_name);
	var $span = $("<span />").text(counter+') ');
	$link.html($span);
	$span.after(document.createTextNode(title));
	var $li = $("<li />").addClass(tagname);
	$li.html($link);
	return $li;
    };

    function appendItem(counter, index, array_headings, settings, tocItems) {
	var id_name = $(array_headings[index]).prop("id").toString();
	var prop_tagname = $(array_headings[index]).prop("tagName")
	    .toLowerCase();
	var title = $(array_headings[index]).text();
	var li_to_append = create_li_item(id_name, counter, title,prop_tagname);
	var current_tagname = $(array_headings[index]).prop("tagName").toLowerCase();
	var prev_tagname = (index>0) ? $(array_headings[index-1]).prop("tagName").toLowerCase() : null; 	
	if(index === 0 ||(index > 0 && cmpHeadings(index, index-1, array_headings) === 0)) {
	    if (index === 0)
		//$(".toc_items").append(li_to_append);
		tocItems.append(li_to_append);
	    else {
		//$(".toc_items").find("li").last().append(li_to_append);
		tocItems.find("li").last().append(li_to_append);
	    }
	}	
	else if (cmpHeadings(index, index-1, array_headings) === -1) {
	    append_after_parent(current_tagname,li_to_append);
	}	
	else {
	    append_another_child(prev_tagname,li_to_append);    
	}
    };
    
   /*** Creates the whole TOC ***/
    function createToc(obj, array_headings, global_parent,settings) {
	var $tocItems = setUpToc(global_parent);
	addIdToHeadings(array_headings);
	$.each(array_headings, function(index) {
	    var counter = getHeadingNumber(obj, array_headings, index);
	    appendItem(counter,index, array_headings, obj.jqueryObjs, $tocItems);
	});
    };

})( jQuery );
