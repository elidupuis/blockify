/*!
 * jQuery Blockify Plugin
 * http://github.com/elidupuis
 *
 * Copyright 2010, Eli Dupuis
 * Version: 0.4 (Dec 11, 2010)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) and GPL (http://creativecommons.org/licenses/GPL/2.0/) licenses.
 * Requires: jQuery v1.4 or later
 */

(function($) {

  var ver = '0.4';

  $.fn.blockify = function(options) {

  	// iterate and reformat each matched element
  	return this.each(function() {
  		var $this = $(this);
  		var opts = $.extend({}, $.fn.blockify.defaults, options);

  		var elm = $this.find(opts.selector);

  		//	exit if there's no link found-based on
  		if (elm.length < 1) {
  		  if(window.console.warn) window.console.warn('$.blockify', ver, ': No clild elements found. Ignoring', $this);
  		  return;
      };
    
  		//	if user option true, use mouse pointer on hover: 
  		if (opts.cursor) $(this).css( { cursor: opts.cursor } );
		
  		//	add hover class to element for custom styling
  		if ( opts.hoverClass ) {
  			$this.hover( function() {
  				$(this).addClass(opts.hoverClass);
  			}, function() {
  				$(this).removeClass(opts.hoverClass);
  			});			
  		};

  		$this.bind( 'click', function( e ) {
  		  //  take into account elements in the ignore list:
        if ( $(e.target).not(opts.ignore).length > 0 ) {

  				//	make sure no text has been selected:
  				if($.fn.blockify.getSelectedText() == "") {

  					if ( elm.hasClass( opts.externalClass ) ) {
  						window.open( elm.attr('href') );
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
  	selector: 'a:last',			//	selector to specific anchor to be used when parent is clicked.
  	cursor: 'pointer',			//	sets css cursor value. set to false to do nothing.
  	hoverClass: 'hover',		//	class attached to element on hover for styling purposes.
  	externalClass: 'ext',		//	if target anchor has this class, link will be opened in a new window.
  	ignore: 'a, input, textarea, label, button'   //  clicking on these elements will not trigger the selected link.
  };

  $.fn.blockify.getSelectedText = function(){
  //	borrowed from http://newism.com.au/blog/post/58/bigtarget-js-increasing-the-size-of-clickable-targets/
  //	prehaps look into a better way to do this...but maybe not :)
  	if( window.getSelection ){
  		return window.getSelection().toString();
  	}else if( document.getSelection ){
  		return document.getSelection();
  	}else if( document.selection ){
  		return document.selection.createRange().text;
  	}else{
  	  return false;
  	};
  };

  $.fn.blockify.ver = function() { return "jquery.blockify ver. " + ver; };

})(jQuery);