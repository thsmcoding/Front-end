( function ( $ ) {

    //Plugin definition:
    $.fn.toccreate = function(ctDiv, headings, options ) {
	/* default settings*/
	var defaults = {
	    depth: 0,
	    headers : ["H2", "H3", "H4", "H5", "H6"],
	    count_headers : {}
	};
	var settings = $.extend(true, {}, defaults, options );
	var tocDiv = this;
	setUpToc(tocDiv);
	addIdToHeadings(headings);
	getHeadingNumber(defaults, headings);
	var last = headings.length;
	cmpHeadings(last-2,last-1,headings);
	return this;
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
	var ulTOC = $('<ul />').addClass('toc_items')
	    .appendTo(divTOC);    
    };    

    
    /*** Adding an ID to all headings(h2,h3,h4,h5,h6) within the main parent ***/
    function addIdToHeadings(headings) {
	$.each(headings, function(index) {
	    var one_heading = $(headings[index]);
	    var id_heading = one_heading.text().replace(/ /g, '_');
	    one_heading.attr('id', id_heading);
	});
    };    

    /*** Creating the appropriate number for member in TOC ***/
    function getHeadingNumber(obj_h, headings) {
	initCountHeadings(obj_h,headings);
	$.each(headings, function(index) {
	    var one_heading = $(headings[index]);
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
		obj_h.count_headers[curr_header]+=1;
		var values_count = $.map(obj_h.count_headers, function(val, key){return val;});
		var items = values_count.slice(0, indx+1);
		counter = items.join(".").toString();
	    }
	   // return counter;
	});

    };

    
    /*** Compares two headings. Returns 0 if they have the same tagname.
	 Returns -1 if first heading has a tagname "less" weight,
	 returns 1 otherwise
	 Headings are HTML elements from h2 to h6
	 first:  index of the first heading in array that contains all the headings of the document
	 scd: index of the second heading in array of headings
	 array_headings:  array that contains all the headings in the body ***/
    function cmpHeadings(first, scd, array_headings) {
	var first_prop = $(array_headings[first]).prop("tagName");
	var scd_prop = $(array_headings[scd]).prop("tagName");
	var first_number = parseInt(first_prop.charAt(1));
	var scd_number = parseInt(scd_prop.charAt(1));
	var res = (first_number === scd_number) ? 0 : (first_number < scd_number ? -1 : 1);
	console.log("FIRST TAG :"+first_prop);
	console.log("SECOND TAG:"+ scd_prop);
	console.log("RESULT COMPARE :"+ res);

    };
    
})( jQuery );

/*
=======
>>>>>>> cb523e0a492ad157ce52f80bb176e157ace5f3b0
$(document).ready( function() {
    $.fn.setUpToc = function(global_parent) {
	var divTOC = $('<div/>').attr('id', 'toc_list')
	    .append('<p>This is toc_list.</p>')
	    .appendTo(global_parent);
	var ulTOC = $('<ul/>').addClass('toc_items')
	    .append('<p>This is toc_items.</p>')
<<<<<<< HEAD
	    .appendTo(divTOC);    
    };


=======
	    .appendTo(divTOC);
    };

>>>>>>> cb523e0a492ad157ce52f80bb176e157ace5f3b0
    $.fn.addIdToHeadings = function(heading) {
	var id_heading = heading.replace(' ', '_');
	heading[index].attr('id', id_heading);
    };		   
<<<<<<< HEAD
 
   
    $.fn.getHeadingNumber = function(obj_h, heading){
    var counter = "";
=======
    
    $.fn.getHeadingNumber = function(obj_h, heading){
	var counter = "";
>>>>>>> cb523e0a492ad157ce52f80bb176e157ace5f3b0
	var curr_header = heading.prop("tagName").toLowerCase();
	if(curr_header === "h2") {
	    obj_h.depth+= 1;
	    obj_h.count_headers[curr_header] = obj_h.depth;
	    var slice_headers = obj_h.headers.slice(1,obj_h.headers.length);
	    $.each(slice_headers, function(i) {
		obj_h.count_headers[i] = 0;
	    });
	    counter= depth.toString();
	}else {
	    var indx = $.indexOf(curr_header.toUpperCase(), obj_h.headers);
	    obj_h.count_headers[curr_header]+=1;
	    var array_values = Object.values(obj_h.count_headers.slice(0,indx+1));
	    counter = array_values.join(".");
	}
	return counter;
<<<<<<< HEAD
   };
		   


=======
    };
		   
>>>>>>> cb523e0a492ad157ce52f80bb176e157ace5f3b0
      
    /*** Compares two headings. Headings are HTML elements from h2 to h6
	 first:  index of the first heading in array that contains all the headings of the document
	 scd: index of the second heading in array of headings
	 array_headings:  array that contains all the headings in the body 
***/
//<<<<<<< HEAD

/*
	$.fn.cmpHeadings = function(first, scd, array_headings) {
=======
    $.fn.cmpHeadings = function(first, scd, array_headings) {
>>>>>>> cb523e0a492ad157ce52f80bb176e157ace5f3b0
	var $first_prop = array_headings[first].prop("tagName");
	var $scd_prop = array_headings[scd].prop("tagName");
	var first_number = parseInt($first_prop.charAt(1));
	var scd_number = parseInt($scd_prop.charAt(1));
	return (first_number === scd_number);
    };    


    /*** Adds the <li>...</li> element into the HTML code
     ***/
//<<<<<<< HEAD
/*
=======
>>>>>>> cb523e0a492ad157ce52f80bb176e157ace5f3b0
    $.fn.append_li_item = function(id_name, counter) {
	var $link = $("<a/>").attr("href", "#" + id_name);
	var $span = $("<span/>").attr('text', counter)
	    .insertAfter($link);
	var $li = $("<li/>").append($link);
	return $li;

    };
    
    /*** content : DOM element to which we add new item
	 counter : tag number for the item (e.g 1? 1.2? 2.2.3?)
	 index: index number in global variable that contains all the HTML headings
	 Adds the necessary HTML code for a new heading
    ***/
//<<<<<<< HEAD
/*    $.fn.appendItem = function(counter, index, array_headings) {
=======
    $.fn.appendItem = function(counter, index, array_headings) {
>>>>>>> cb523e0a492ad157ce52f80bb176e157ace5f3b0
	var id_name = array_headings[index].prop("id");
	var li_to_append = append_li_item(id_name,counter);
	if(index === 0 ||(index > 0 && cmpHeadings(index, index-1) === 0)) {
	    $("ul").last().after($li_to_append);
	} else if (cmpHeadings(index, index-1) === -1) {
	    var current_tagname = array_headings[index].prop("tagName").toLowerCase();
	    var elt_to_add =current_tagname.last().parent("ul");
	    elt_to_add.append($li_to_append);
	}
	else {
	    var prev_tagname = array_headings[index-1];
	    var whole_elt = $("<ul/>").attr('innerHTML',li_to_append);
	    prev_tagname.append(whole_elt);
	}
    };

    
    $.fn.createToc = function(obj, array_headings,global_parent) {
	setUpToc(global_parent);
<<<<<<< HEAD
	
	$.each(obj.headers, function(index) {
	    obj.headers[index]=0;
	});
	
=======
	$.each(obj.headers, function(index) {
	    obj.headers[index]=0;
	});
>>>>>>> cb523e0a492ad157ce52f80bb176e157ace5f3b0
	$.each(array_headings, function(index) {
	    addIdToHeadings(array_headings[index]);
	    var counter = getHeadingNumber(obj,array_headings[index]);
	    appendItem(counter,index,array_headings);
	});
	
    };
<<<<<<< HEAD



    
=======
>>>>>>> cb523e0a492ad157ce52f80bb176e157ace5f3b0
    var $divContent = $("div#content");
    var Obj_headings = { depth: 0,
			 headers: ['H2','H3','H4', 'H5','H6'],
			 count_headers: {}
		       };
<<<<<<< HEAD




=======
>>>>>>> cb523e0a492ad157ce52f80bb176e157ace5f3b0
    $.fn.setUpToc($divContent);
    /*
    var array_headings = $("div#content:headers").toArray();
    createToc(Obj_headings, array_headings, $divContent);
<<<<<<< HEAD
   
});
*/
//=======








		
//>>>>>>> cb523e0a492ad157ce52f80bb176e157ace5f3b0
