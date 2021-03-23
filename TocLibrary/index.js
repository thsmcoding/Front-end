$( document ).ready( function () {
    var tocDiv = $("div#content-toc");
    var contentDiv = $("div#content");
    var headings = $(":header");
    tocDiv.toccreate(contentDiv, headings);    

});
