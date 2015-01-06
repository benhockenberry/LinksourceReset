This combination of Javascript/jQuery and CSS reformats EBSCO LinkSource's OpenURL resolution page ("LinkSource Menu").
Uses jQuery, which is linked in EBSCO's predefined header (we didn't need to add it)
Adapted from Matthew Reidsma's techniques used for Grand Valley State University (GVSU)'s 360Link Link Resolver
http://github.com/gvsulib/360Link-Reset
Script by Ben Hockenberry, Systems Librarian, St. John Fisher College

Instructions:
**IMPORTANT**
1. Edit CSS and script to reference the section IDs used in your LinkSource Menu site (Use View Source, inspect, or Firebug to check them out).  If you don't make sure the ID numbers are right, *you won't see anything in your link resolver*.
2. Upload the JS file to a web-accessible space.
3. Add this to Edit Custom Header HTML in A-to-Z Admin's LinkSource Menu Customization (this zooms in for small devices)
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
4. Add this to Custom Footer HTML in A-to-Z Admin's LinkSource Menu Customization
	<script type="text/javascript" src="{the path to which you uploaded the files}/ReformatLinksource.js"></script>
5. Insert the CSS into the Use Custom Style Sheet section in A-to-Z Admin's LinkSource Menu Customization


Note: Our Custom Footer HTML also includes this HTML, which is rendered differently post javascript processing.  Remove references if needed.
	<p class="library_footer"><a href="http://libguides.sjfc.edu/getitatfisher" title="Link to Get It @ Fisher FAQ"><img src="http://www.sjfc.edu/dotAsset/d7692022-c96f-422e-b23d-d53ddf75f33d.png" alt="" /></a>
	Need help?  <a href="http://libguides.sjfc.edu/getitatfisher">Get It @ Fisher FAQ</a> | <a href="http://atoz.ebsco.com/titles/13691">Find Journals by Title</a></p>

	<p class="library_footer">A service of <a href="http://www.sjfc.edu/library/" title="Return to SJFC Lavery Library homepage">St. John Fisher College Lavery Library</a><br>
	Library Research Help: (585)385-8141 | <a href="mailto:libraryreference@sjfc.edu" title="Email the librarians">libraryreference@sjfc.edu</a></p>
