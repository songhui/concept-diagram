var Mod_util = (function(){

	var hasClass= function(el, cls){
		return el.className && new RegExp("(^|\\s)" + cls + "(\\s|$)").test(el.className);
	};
	var addClass= function(el, cls){
		if(!hasClass(el, cls)){
			el.className += " "+cls+" ";
		}
	};
	var removeClass= function(el, cls){
		var reg;
		if(hasClass(el, cls)){
			reg = new RegExp("(^|\\s)" + cls + "(\\s|$)", 'gi');
			el.className = el.className.replace(reg, '');
		}
	};
	var toggleClass = function(el, cls){
		if(hasClass(el, cls)){
			removeClass(el, cls);
		}else{
			addClass(el, cls);
		}
	};
    var addClassAll= function(selector, cls){
		var search = document.querySelectorAll(selector);
        for (var i = 0; i < search.length; i++) {
            addClass(search[i], cls);
        };
	};
    var removeClassAll= function(selector, cls){
		var search = document.querySelectorAll(selector);
        for (var i = 0; i < search.length; i++) {
            removeClass(search[i], cls);
        };
	};
	var publicApi = {
		hasClass: hasClass,
		addClass: addClass,
		removeClass: removeClass,
		toggleClass: toggleClass,
        addClassAll: addClassAll,
        removeClassAll: removeClassAll,
	};

	return publicApi;


}());



var Mod_popup = (function(){
 
    var doc = document;
 
    function mainElm(action){
        var main = doc.querySelector('body');
        if(action === "add"){
            Mod_util.addClass(main, "stop-overflow");
        }else if(action === "remove"){
            Mod_util.removeClass(main, "stop-overflow");
        }
 
        return false;
    }
 
    function popupElm(){
 
        var frag = doc.createDocumentFragment();
        var div = doc.createElement("div");
        var span = doc.createElement("span");
        var body = doc.body;
 
        mainElm("add");
        div.className = 'popup';
 
        function removeElem(){
            doc.body.removeChild(div);
            mainElm("remove");
            span.removeEventListener("click", removeElem, false);
        }
 
        span.addEventListener("click", removeElem, false);
 
        div.appendChild(span);
        frag.appendChild(div);
 
        body.appendChild(frag);
 
        return div;
    }
 
    function closePopup(el){
        doc.body.className = "";
        doc.body.removeChild(el);
    }
 
 
    var publicApi = {
        init: popupElm
    };
 
    return publicApi;
 
}());



document.addEventListener("DOMContentLoaded", function(){


	var doc = document;
	var html = doc.querySelector('html');
	var bd = doc.body;
	var header = doc.querySelector('.main-header');
	var hd = doc.querySelector('.simple-header');
	var side_nav = doc.querySelector('.sidebar-container');
	var demoToggleNav = doc.querySelector('.sidebar-toggle-btn');
    var trackEvent = doc.querySelectorAll('.track-event');
    var buyNowEvent = doc.querySelectorAll('.btn-buy');
    var search = doc.querySelector('.input-search');
    var jsfiddle_nav = doc.querySelector('.jsfiddles-menu');
    var location = window.location.href;
    var side_nav_selected_el;
	var scrollEl;
    var scrollIntoView = function(e) {
        if (!!e && e.scrollIntoView) {
            e.scrollIntoView();
        }
    };
    var setOpenULBranch = function(node) {
        if ( node.nodeName === 'UL') {
            Mod_util.addClass( node, 'open');
        }
        if (Mod_util.hasClass(node, 'searchable')) {
            return;
        } else {
            setOpenULBranch(node.parentNode);
        }
    };

	header = header || hd;

	header.addEventListener('click', function(e){
		var target = e.target;
		if(target.tagName.toLowerCase() === 'nav'){
			if(side_nav && Mod_util.hasClass(side_nav, 'open')){
				side_nav.click();
			}
			Mod_util.toggleClass(target, 'open');
		}
	}, false);
    if (search) {
        search.addEventListener('keypress', function (e) {
            var key = e.which || e.keyCode;
            if (key === 13) {
                window.location.href = location.split('?')[0] + '?search='+search.value;
            }
        });
    }
	if(side_nav){
		side_nav.addEventListener('click', function(e){
			var target = e.target;

            if (target.id === "api-search") {
                return;
            }
			if(target.tagName.toLowerCase() === 'nav'){
				Mod_util.toggleClass(target, 'open');
			}
            if(target.tagName.toLowerCase() === 'a'){

                var ul = target.parentNode.querySelectorAll('ul')[0];
                if (ul) {
                    Mod_util.toggleClass(ul, 'open');

                    if (side_nav_selected_el && side_nav_selected_el !== target) {
                        Mod_util.removeClassAll('.searchable ul', 'open');
                        setOpenULBranch(ul, 'open');
                    }
                }
                side_nav_selected_el = target;
            }
		}, false);
	}

    // open navigation sidebar in rappid documentation page
    if (location.indexOf('rappid/docs') > -1) {
        var url_hash = window.location.hash;
        var url_path;
        if (url_hash) {
            url_path = location.substring(location.indexOf('rappid'), location.indexOf('#'));
        } else {
            url_path = location.substring(location.indexOf('rappid'));
        }
        var loc = url_path.split('/');
        
        if (loc.length > 3) {
            side_nav_selected_el = side_nav.querySelectorAll('a[href="/'+url_path+'"]')[0].parentNode.parentNode;
            Mod_util.toggleClass(
                side_nav.querySelectorAll('a[href="/'+url_path+'"]')[0]
                .parentNode.querySelectorAll('ul')[0], 'open'
            );
            Mod_util.toggleClass(
                side_nav_selected_el, 'open'
            );

        } else if(url_hash) {
            side_nav.querySelectorAll('a[href="'+url_hash+'"]')[0].click();
        }
    }

    // open navigation sidebar in JointJS documentation page
    if (location.indexOf('/api#') > -1) {
        var url_hash = window.location.hash;
        if(url_hash) {
            side_nav_selected_el = side_nav.querySelectorAll('a[href="'+url_hash+'"]')[0];
            setOpenULBranch(side_nav_selected_el, 'open');
            var ul = side_nav_selected_el.parentNode.querySelectorAll('ul')[0];
            if (ul) {
                Mod_util.addClass(ul, 'open');
            } 
        }
    }

    // fix height sidebar navigation
	if(header && side_nav){
        var content_side_nav = doc.querySelector('.sidebar-container > ul');
        var footer_div = doc.querySelector('footer');
        var sc_a, sc_b;
        var side_nav_fix_height = function() {
			scrollEl = bd.scrollTop === 0 ? html : bd;

			if(scrollEl.scrollTop > header.offsetHeight){
				Mod_util.addClass(side_nav, 'sticky');
                                side_nav.style.top = 0;
			}else if(scrollEl.scrollTop < (header.offsetHeight)){
				Mod_util.removeClass(side_nav, 'sticky');
				side_nav.style = '';
                side_nav.style.top = (header.offsetHeight - scrollEl.scrollTop) + 'px';
			}

            if (footer_div) {
                sc_a = window.innerHeight + window.scrollY + footer_div.offsetHeight;
                sc_b = document.body.offsetHeight;
                if (sc_a >= sc_b) {
                    side_nav.style.height = (document.body.offsetHeight - window.scrollY - document.querySelector('footer').clientHeight-4) + 'px';
                } else {
                    side_nav.style.height = '100%';
                }
            }
            content_side_nav.style.height = side_nav.clientHeight - 67 + 'px'; // 67px is height search input
        };
        side_nav_fix_height();
		window.addEventListener('scroll', function(e){
            side_nav_fix_height();
		}, false);
	}

	if(demoToggleNav){
		demoToggleNav.addEventListener('click', function(e){
			e.preventDefault();
			Mod_util.toggleClass(side_nav, 'show');
			if(Mod_util.hasClass(side_nav, 'show')){
				Mod_util.removeClass(side_nav, 'hide');
			}else{
				Mod_util.addClass(side_nav, 'hide');
			}
		}, false);
	}
    for (var i = 0; i < trackEvent.length; i++) {
        trackEvent[i].addEventListener('click', function(e){
              _gaq.push(['_trackEvent', 'download', trackEvent.innerHTML]);
        }, false);
    };
    for (var j = 0; j < buyNowEvent.length; j++) {
        buyNowEvent[j].addEventListener('click', function(e){
            _gaq.push(['_link','https://jointjs.com/store']);
        }, false);
    };
    if (jsfiddle_nav) {
        var detailStyle = document.createElement('style');
        document.body.appendChild(detailStyle);
        var fiddle, fiddles, actualPage = 1;
        var jsfiddle_title_el = doc.querySelector('#jsfiddles_title');
        var jsfiddle_title = jsfiddle_title_el.innerHTML;

        // hide empty menu
        fiddles  = doc.querySelectorAll('.jsfiddles-menu > li:not([data-index="home"])');
        for (var i=0; i !== fiddles.length; i++) {
            if (!fiddles[i].querySelector('li')) {
                Mod_util.addClass( fiddles[i], 'hide');
            }
        }
        // for faster loading - loads only what is visible
        var addFiddleIframe = function(id) {
            fiddle = doc.querySelector('#jsfiddles > div[data-id="' + id + '"] iframe');
            if (!fiddle) {
                fiddle = doc.querySelector('#jsfiddles > div[data-id="' + id + '"] .fiddle');
                var g = document.createElement('script');
                var att = document.createAttribute("src");
                att.value = fiddle.getAttribute('url')+'embed/result,js,html,css/';
                g.setAttributeNode(att);
                fiddle.parentNode.insertBefore(g, fiddle);
            }
        };
        var change_content = function() {
            var hash_id = window.location.hash;

            if ((hash_id.indexOf("#all") !== -1) || (hash_id === "")) {
                if (hash_id.indexOf("#all/") !== -1) {
                    actualPage = parseInt(hash_id.split("/")[1]);
                }
                // pagination
                Mod_util.removeClassAll("#jsfiddles .pagination li", "active");
                Mod_util.addClassAll("#jsfiddles .pagination li.page"+actualPage, "active");
                if (actualPage === 1) {
                    Mod_util.addClassAll("#jsfiddles .pagination li:first-child", "disabled");
                } else {
                    Mod_util.removeClassAll("#jsfiddles .pagination li:first-child", "disabled");
                }
                if (actualPage === LAST_PAGE) {
                    Mod_util.addClassAll("#jsfiddles .pagination li:last-child", "disabled");
                } else {
                    Mod_util.removeClassAll("#jsfiddles .pagination li:last-child", "disabled");
                }
                // show all jsfiddles
                jsfiddle_title_el.innerHTML = jsfiddle_title;
                detailStyle.innerHTML = "#jsfiddles .detail { display:none; }";
                detailStyle.innerHTML += "#jsfiddles > div:not(.page"+actualPage+") { display:none; }";
                fiddles = doc.querySelectorAll('#jsfiddles > div.page'+actualPage);
                for (var i=0; i !== fiddles.length; i++) {
                    addFiddleIframe(fiddles[i].getAttribute('data-id'));
                }
            } else {
                // show fiddle detail
                detailStyle.innerHTML = "#jsfiddles .pagination, #jsfiddles .list { display: none; }";
                detailStyle.innerHTML += "#jsfiddles > div:not([data-id=\"" + hash_id + "\"]) { display: none; }";
                addFiddleIframe(hash_id);
                jsfiddle_title_el.innerHTML =
                    doc.querySelector('#jsfiddles > div[data-id="' + hash_id + '"] h3 a').innerHTML;
            }
            scrollIntoView(jsfiddle_title_el);
            side_nav_fix_height();
        };
        change_content();
        window.addEventListener("hashchange", function(){
            change_content();
        }, false);
    }

    // Search Event
    var removeHideLI = function(node) {
        if ( node.nodeName === 'LI') {
            Mod_util.removeClass( node, 'hide');
        }
        if (Mod_util.hasClass(node, 'searchable')) {
            return;
        } else {
            removeHideLI(node.parentNode);
        }
    };
    var removeHideBranch = function(nodes) {
        for(var k = 0; k !== nodes.length; k++) {
            removeHideLI(nodes[k].parentNode);
        }
    };
    var searchText = function(nodes, value) {
        var r = 0, count = nodes.length;
        for(; r !== count; r++) {
            if (nodes[r].innerHTML.toLowerCase().indexOf(value) > -1) {

                setOpenULBranch(nodes[r].parentNode);
            } else {
                Mod_util.addClass( nodes[r].parentNode, 'hide');
            }
        }
        if (r === count) {
            removeHideBranch(doc.querySelectorAll('.searchable li:not(.hide)'));
        }
    };
    if(side_nav){
        var api = document.getElementById('api-search');
        if (api) {
            api.addEventListener('input', function() {
                Mod_util.removeClassAll('.searchable ul', 'open');
                Mod_util.removeClassAll('.searchable li', 'hide');
                if (!this.value) {
                    return;
                }
                searchText(doc.querySelectorAll('.searchable a'), this.value.toLowerCase());
            });
        }
    }
});
