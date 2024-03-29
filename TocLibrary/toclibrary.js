$(document).ready( function() {
    $.fn.setUpToc = function(global_parent) {
	var divTOC = $('<div/>').attr('id', 'toc_list')
	    .append('<p>This is toc_list.</p>')
	    .appendTo(global_parent);
	var ulTOC = $('<ul/>').addClass('toc_items')
	    .append('<p>This is toc_items.</p>')
	    .appendTo(divTOC);
    };

    $.fn.addIdToHeadings = function(heading) {
	var id_heading = heading.replace(' ', '_');
	heading[index].attr('id', id_heading);
    };		   
    
    $.fn.getHeadingNumber = function(obj_h, heading){
	var counter = "";
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
    };
		   
    $.fn.cmpHeadings = function(first, scd, array_headings) {
	var $first_prop = array_headings[first].prop("tagName");
	var $scd_prop = array_headings[scd].prop("tagName");
	var first_number = parseInt($first_prop.charAt(1));
	var scd_number = parseInt($scd_prop.charAt(1));
	return (first_number === scd_number);
    };    

    $.fn.append_li_item = function(id_name, counter) {
	var $link = $("<a/>").attr("href", "#" + id_name);
	var $span = $("<span/>").attr('text', counter)
	    .insertAfter($link);
	var $li = $("<li/>").append($link);
	return $li;

    };

    $.fn.appendItem = function(counter, index, array_headings) {
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
	$.each(obj.headers, function(index) {
	    obj.headers[index]=0;
	});
	$.each(array_headings, function(index) {
	    addIdToHeadings(array_headings[index]);
	    var counter = getHeadingNumber(obj,array_headings[index]);
	    appendItem(counter,index,array_headings);
	});
	
    };
    var $divContent = $("div#content");
    var Obj_headings = { depth: 0,
			 headers: ['H2','H3','H4', 'H5','H6'],
			 count_headers: {}
		       };
    $.fn.setUpToc($divContent);
    /*
    var array_headings = $("div#content:headers").toArray();
    createToc(Obj_headings, array_headings, $divContent);
	*/	   
});







		
