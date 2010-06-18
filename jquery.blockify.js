/*!
 * jQuery Blockify Plugin
 * Copyright (c) 2010 Eli Dupuis
 * Version: 0.3 (June 16, 2010)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) and GPL (http://creativecommons.org/licenses/GPL/2.0/) licenses.
 * Requires: jQuery v1.2 or later
 */

(function($) {

var ver = '0.3';

jQuery.fn.blockify = function(options) {

	// iterate and reformat each matched element
	return this.each(function() {
		var $this = $(this);
		var opts = $.extend({}, $.fn.blockify.defaults, options);

		var elm = $this.find(opts.selector);
		
		//	exit if there's no link found-based on
		if (elm.length < 1) return;

		//	if user option true, use mouse pointer on hover: 
		if (opts.cursor) $(this).css({cursor:opts.cursor});
		
		//	add hover class to element for custom styling
		if (opts.hoverClass) {
			$this.hover(function(){
				$(this).addClass(opts.hoverClass);
			},function(){
				$(this).removeClass(opts.hoverClass);
			});			
		};
		
		$this.bind('click', function(e){
			if (e.target.nodeName.toLowerCase() != 'a') {
				//	target is not a standard <a> link.

				//	make sure no text has been selected:
				if($.fn.blockify.getSelectedText() == "") {
					/*
						tried to trigger click on elm here, but got stuck on recursion
						equivalent to elm.click() would be ideal and we could get rid of externalClass crap
					*/	
					if (elm.hasClass(opts.externalClass)) {
						window.open(elm.attr('href'));
					}else{
						window.location = elm.attr('href');
					};
				};
			};
		});
		
	});
};	

//	defaults
$.fn.blockify.defaults = {
	selector: 'a:last',			//	selector to specific anchor (or other element), in case there's more than one!
	cursor: 'pointer',			//	sets css cursor value. set to false to do nothing
	hoverClass: 'hover',		//	class attached to element on hover
	externalClass: 'ext'		//	if target anchor has this class, link will be opened in a new window
};

$.fn.blockify.getSelectedText = function(){
//	borrowed from http://newism.com.au/blog/post/58/bigtarget-js-increasing-the-size-of-clickable-targets/
//	prehaps look into a better way to do this...but maybe not :)
	if(window.getSelection){
		return window.getSelection().toString();
	}
	else if(document.getSelection){
		return document.getSelection();
	}
	else if(document.selection){
		return document.selection.createRange().text;
	}
	
	
	// http://stackoverflow.com/questions/1317727/get-selected-text-on-the-page-not-in-a-textarea-with-jquery
	// var txt = '';
	//   if (window.getSelection) {
	//     txt = window.getSelection();
	//   } else if (document.getSelection) {
	//     txt = document.getSelection();
	//   } else if (document.selection) {
	//     txt = document.selection.createRange().text;
	//   } else return;
	//   document.aform.selectedtext.value =  txt;	
};

$.fn.blockify.ver = function() { return "jquery.blockify ver. " + ver; };

// end of closure
})(jQuery);