/*
Script to reformat EBSCO LinkSource's OpenURL resolution page ("LinkSource Menu").
Uses jQuery, which is linked in EBSCO's predefined header (we didn't need to add it)
Adapted from Matthew Reidsma's techniques used for Grand Valley State University (GVSU)'s 360Link Link Resolver
http://github.com/gvsulib/360Link-Reset

Script by Ben Hockenberry, Systems Librarian, St. John Fisher College
*/

function get_banner() {
	if ($(window).width() <= 600){
		banner_image = 'http://www.sjfc.edu/library/include/getfulltext_header_mobile.png';
	} else {
		banner_image = 'http://www.sjfc.edu/library/include/getfulltext_header.png';
	}
}
$(window).resize(function() {
	get_banner();
	$('img#banner_image').attr('src',banner_image);
});

$(function() {
 if(!($('.reviseRequestFormContainer')[0])){
    get_banner();
	//on document ready, get the illiadform variable from the url
	 
	 //Remove Ulrichsweb and Interlibrary loan links from main box
	 $('#3863_Section').hide();
	 $('#3878_Section').hide();
	 //Build citation display into its own element, outside the table
	 var citation_display = '<div id="citation_div"><h3>You searched for:</h3><p><span id="citation_title">&quot;' + $('#ctl00_ContentPlaceHolder1__citationArea__titleDisplay').html() + '&quot;</span><br /><span class="citation_source">' + $('#ctl00_ContentPlaceHolder1__citationArea__sourceDisplay').html() + '</span></p><p id="citation_reviserequest">Not what you were looking for? <a href="../ReviseRequest.aspx" title="Is this citation information incorrect? Edit the request.">Edit Request</a></p></div>';
	 //$('#3834_body a,#3832_body a').addClass('journal-button');
	 var increment_fulltext = 1;
	 $('#3834_body a').each(function(){
		$(this).addClass('journal-button');
		$(this).parents('td').siblings('td').hide();
		var link_text = $(this).text();
		/*Split string*/
		provider = link_text.replace(/.*( at .*)|.*( through .*)/i, '$1$2');
		$(this).text('Get Full Text');
		$(this).siblings('.small').hide();
		var coverage;
		if($(this).siblings('.small')[0]){
			coverage = '. Coverage: ' + $(this).siblings('.small').text();
		} else {
			coverage = '.';
		}
		var fulltext_link_id = 'fulltext_link_id_' + increment_fulltext ;
		$(this).after('<span class="fulltext_provider">' + provider + '</span> <span class="show_detail_toggle" onclick="$(&quot;#' + fulltext_link_id + '&quot;).toggle()">Details</span><div class="link_detail" id="' + fulltext_link_id + '">' + link_text + coverage + '</div>');
		increment_fulltext += 1;
	 });
	 $('#3832_body a').each(function(){
		$(this).addClass('journal-button');
		$(this).parents('td').siblings('td').hide();
		var link_text = $(this).text();
		/*Split string*/
		search_type = link_text.replace(/.*( \(by .*\))/i, '$1');
		$(this).text("Search Lavery Library's catalog");
		var fulltext_link_id = 'fulltext_link_id_' + increment_fulltext ;
		$(this).after('<span class="catalog_search_type">' + search_type + '</span>');
		increment_fulltext += 1;
	 });
	 var full_text_links;
	 var ill_link = '<div id="ill"><label for="ill_link" id="ill_link_label">Not available online?</label> <span id="ill_link">' + $('#3863_Section a').parent().html() + '</span></div>';
	 var additional_content = ill_link;
	 if($('#3834_body')[0]){
		full_text_links = $('#3834_body').html();
	 } else {
		if($('#3832_body')[0]){
			full_text_links = '<p><strong>This appears to be a book.</strong></p>' + $('#3832_body').html();
		} else {
			$('#3863_Section a').addClass('journal-button');
			additional_content='';
			ill_link = '<div id="ill_above_line"><span id="ill_link">' + $('#3863_Section a').parent().html() + '</span></div>';
			/* if no full-text or book links available, display No Full Text. */
			full_text_links = '<p><strong>No full text was found in library databases.</strong></p>' + ill_link;
		}
	 }
	 additional_content += '<div id="supplemental_links"><p>Found a problem? <a href="mailto:librarysystems@sjfc.edu?subject=Bad%20Full%20Text%20Link&body=%0A%0AProblem%20URL:' + escape(document.URL) + '">Let our crack team of link fixers know!</a></p><p><a href="http://libguides.sjfc.edu/getitatfisher" title="Link to Get It @ Fisher FAQ"><img src="http://www.sjfc.edu/dotAsset/d7692022-c96f-422e-b23d-d53ddf75f33d.png" alt=""></a> Need help? <a href="http://libguides.sjfc.edu/getitatfisher">Get It @ Fisher FAQ</a> | <a href="http://atoz.ebsco.com/titles/13691">Find Journals by Title</a></p></div>';
	 //var additional_content = additional_content + $('#3878_Section a').parent().html();
	 var library_footer = '<div id="library_footer">  A service of <a href="http://www.sjfc.edu/library/" title="Return to SJFC Lavery Library homepage">St. John Fisher College Lavery Library</a><br>  Library Research Help: (585)385-8141 | <a href="mailto:libraryreference@sjfc.edu" title="Email the librarians">libraryreference@sjfc.edu</a>  </div>';
	 get_banner();
	 if($('#ctl00_ContentPlaceHolder1__techSupport')[0]){
		/*If this is an error page, generate error text *within* a branded wrapper, not the default ugly table*/
		$('#aspnetForm').prepend('<div id="full_wrapper"><div id="lavery_header"><img src="' + banner_image + '" id="banner_image"></div><div id="mainfocus_div"><div id="citation_display"><h3>An error has occurred.</h3><p>Technical support has been alerted and will work to address this problem quickly.</p><p>Please <strong>close this tab</strong> and try your request again.</p></div></div><hr><div class="pre-footer_links">' + additional_content + '</div>' + library_footer + '</div>');
		 
	 } else {
		 /*If not an error page, generate the content within a branded wrapper*/
		 $('#aspnetForm').prepend('<div id="full_wrapper"><div id="lavery_header"><img src="' + banner_image + '" id="banner_image"></div><div id="mainfocus_div">' + citation_display + '<div id="fulltext_div">' + full_text_links + '</div></div><hr><div class="pre-footer_links">' + additional_content + '</div>' + library_footer + '</div>');
	 }
	 /*Remove the default table display, now that we've pulled all of the relevant content out of it*/
	 $('.primaryContainerTable').remove();
	 /*hide error messages from their default table*/
	 $('#ctl00_ContentPlaceHolder1__techSupport').parents('table').hide();
     /*Hide the default footer*/
	 $('#ctl00__brandingPageFooter').remove();
	 $('#ctl00__copyrightLabel').parents('table').hide();
 }
});