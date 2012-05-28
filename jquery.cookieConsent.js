(function ($) {
  
  $.fn.cookieConsent = function (userConfig) {

    if( ! userConfig ) {
      userConfig = {};
    }
    
    // Default configuration
    var config = {
      color: {
        main: '#29f', // Border & icon color
        bg: '#fff', // Background color
        text: '#444' // Text color
      },
      font: '12px Tahoma, sans-serif', // Font size & family
      width: 'auto', // Width of the banner
      maxWidth: '50%' // Responsiveness
    };

    // Build new DOM element from an object
    var buildElement = function buildElement(elemConfig) {

      var i, l;
  
      // First array element is the new DOM element tag
      var temp = document.createElement(elemConfig[0]);
  
      // Second is an object of attributes
      // 'content' attribute is inserted as element content
      if( elemConfig[1] ) {
        var attr = elemConfig[1];
        for( i in attr ) {
          if( attr.hasOwnProperty(i) ) {
            if( i === 'content' ) {
              $(temp).text(attr[i]);
            } else if( i === 'css' ) {
              $(temp).css(attr[i]);
            } else {
              temp.setAttribute(i, attr[i]);
            }
          }
        }
      }
  
      // Third or greater are child elements
      if( elemConfig.length > 2 ) {
          i = 2, l = elemConfig.length;
          for( ; i < l; i++ ) {
              temp.appendChild(buildElement(elemConfig[i]));
          }
      }
      
      return temp;
  
    };
    
    // The cookieConsent element
    // Sytanx is:
    //  [element [string], attributes [object], childElements... [arrays]]
    // Special attributes:
    //  content - inserted as text content of the element
    //  css - object run through jQuery's css method
    var cookieElement =
    ['div', {id: "cookie-consent"},
      ['div', {id: "cookie-info-icon", content: 'i'}],
      ['p', {},
        ['strong', {content: 'This site uses '},
          ['a', {href: '#', content: 'cookies.'}]
        ]
      ],
      ['p', {content: 'By using this site you agree to our cookie policy.'}],
      ['a', {id: "cookie-close", href: '#', content: 'x'}]
    ];

    // Extend our config file using the user's config
    $.extend(config, userConfig);

    // Build style element
    var style = "";
    style += "#cookie-consent {color: " + config.color.text + ";background: " + config.color.bg + ";clear: both;overflow: hidden;width: " + config.width + ";max-width: " + config.maxWidth + ";margin:0 auto;font: " + config.font + ";padding: 0.5em;border: 2px solid " + config.color.main + ";position: relative;}";
    style += "#cookie-info-icon {font-family: serif; font-size: 1.4em;background: " + config.color.main + ";float: left;padding: .25em .75em;border-radius: 50%;color: white;margin-right: .5em;}";
    style += "#cookie-consent p {margin: 0;overflow: hidden;}";
    style += "#cookie-close {position: absolute;top: 0;right: 0;padding: 0em .5em .25em;text-decoration: none;}";
    style += "#cookie-close:hover {background: #efefef}";
    style = "<style>" + style + "</style>";

    // Build the element
    var elem = buildElement(cookieElement);

    // Set up quit behaviour
    $(elem).on('click', '#cookie-close', function () {
      $(elem).slideUp('fast', function () {
        elem.parentNode.removeChild(elem);
      });
    });

    // Add the elements
    $(style).appendTo('head');
    $(elem).prependTo('body');

  };
  
}(jQuery));