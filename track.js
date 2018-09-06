var iffy = {
    jqueryUrl: 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js',
    jqueryError: 'Iffy will fail to start due to inability to load Jquery as its dependency.',
    goMessage: 'Aye Aye Captain',
    hasJquery: false,
    hasCookieWrapper: false,
    callQueue: [],
    hasGeolocation: false,
    elements: null,
    address: {
        address: null,
        city: null,
        country: null,
        country_code: null,
        county: null,
        postcode: null,
        road: null,
        state: null
    },
    locationTypes: {
        STATE:   'state',
        COUNTRY: 'country',
        CITY: 'city'
    }
};




// iffy.isFrom = function() {
//     state = function(location) {
//         console.log("Checking if the user if from " + location);

//     }

// }

// iffy.isFrom =  {
//     state: function(stateName) {
//         return this.check(stateName, state);
//     },
//     // city: function(cityName) {

//     // },
//     // country: function(countryName) {

//     // },
//     // county: function(countyName) {

//     // },
//     check: function(name, key) {
//         if(iffy.address[key].toLowerCase() === name.toLowerCase()) {
//             return true;
//         }
//         return false;
//     }

// }

iffy.addToCallQueue = function(callback) {
    this.callQueue.push(callback);
};

iffy.useLocationTag = function(locationType, locationName) {
    console.log("CHECKING FOR LOCATION:");
    console.log(iffy.location);
    console.log(iffy.address);


        iffy.hasGeolocationAccess().then(function(location) {
            console.log("IN HAS LOCATION ACCESS");
            console.log(location);
       
            iffy.isFrom(locationType, locationName).then(function(res) {
               // Turn the element on?
               console.log("CLASSNAME");
               console.log('.iffy-' + locationType + '-' + locationName);

               var templateString = locationType + '-' + locationName;
               jQuery('.iffy-' + templateString).removeClass('hidden');
               jQuery('#iffy-' + templateString).removeClass('hidden');
            //    jQuery('[id=^iffy]').removeClass('hidden');


             });
         });
}

iffy.parseTemplates = (function() {
    // Break apart city, state, and country attributes
    var interval = setInterval(function() {
        console.log("Running the interval");
        console.log(iffy.elements);
        if(iffy.elements !== null) {
            console.log("ACTUALLY IN THE IF STATEMENT");
            jQuery.each(iffy.elements, function(key, value) {
                console.log("And as we break these things apart:");
          
                var id = jQuery(value).attr('id');
                var classNames = jQuery(value).attr('class');

                if(id) {
    
                }

                if(classNames) {
                    var classNamesArr = classNames.split(" ");
                    
                    classNamesArr.map(function(className) {
                        if(className.includes('iffy')) {
                            console.log(className);

                            var splitClassName = className.split('-');
                            console.log(splitClassName);
                            // Break apart the statement


                            // Figure out the lenght to see when type of statement to look for
                                // If the length is three, check to see if it is a location type

                                // If the length is 
                                if(splitClassName.length === 3) {
                                    if(splitClassName[1] === 'city'  ||
                                       splitClassName[1] === 'state' ||
                                       splitClassName[1] === 'country' 
                                    ) {
                                        console.log("We are checking for the location");
                
                                        iffy.useLocationTag(splitClassName[1], splitClassName[2]);
                                       
                                    }

                                } else if(splitClassName.length === 2) {

                                }

                            // Look for the actual statements



                        }
                    });
                }


                // Only use the iffy- id and classnames
            })
            clearInterval(interval);
        }
    }, 100);

})();

iffy.isFrom = function(locationType, location) {






    return new Promise(function(resolve, reject) {
        iffy.waitToRunForJquery(function() {
            // @TODO: Remove this
            // iffy.address = {
            //     address: null,
            //     city: 'california',
            //     country: 'california',
            //     country_code: null,
            //     county: null,
            //     postcode: null,
            //     road: null,
            //     state: 'california'
            // }

    switch(locationType) {
        case iffy.locationTypes.STATE:
            console.log("IN THE CALLBACK POSITION IS:");
            console.log(iffy.address);
            console.log(location);

            if(iffy.address.address.state.toLowerCase() === location.toLowerCase()) {
                resolve(true);
            }
            resolve(false);
        break;
        case iffy.locationTypes.COUNTRY:
            if(iffy.address.address.country.toLowerCase() === location.toLowerCase()) {
                resolve(true);
            }
            resolve(false);
        break;
        case iffy.locationTypes.CITY:
            if(iffy.address.address.city.toLowerCase() === location.toLowerCase()) {
                resolve(true);
            }
            resolve(false);
        break;
        default:
        break;
    }
    });
});
};

// jQuery.when(
//     jQuery.ajax({
//         url: " https://nominatim.openstreetmap.org/reverse?format=json&lat=" + lat + "&lon=" + long + "&zoom=18&addressdetails=1",
//         context: document.body,
//     }) 
// ).then(function(res) {
//     iffy.hasGeolocation = true;
//     iffy.location = res;
//     callback();
// });




iffy.waitToRunForJquery = function(callback) {
    // Now wait until jquery is loaded, then when it is,
    var interval = setInterval(function() {
        if(iffy.hasJquery) {
            clearInterval(interval);
            callback();
        }
    }, 100);
};

iffy.hasGeolocationAccess = function(callback) {
    iffy.attemptToloadJquery();


    return new Promise(function(resolve, reject) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                lat  = position.coords.latitude;
                long = position.coords.longitude;
            
                // Now wait until jquery is loaded, then when it is,
                iffy.waitToRunForJquery(function() {
                    jQuery.ajax({
                        url: "https://nominatim.openstreetmap.org/reverse?format=json&lat=" + lat + "&lon=" + long + "&zoom=18&addressdetails=1",
                        context: document.body
                    }).then(function(res) {
                        console.log("Address data is:");
                        console.log(res);
                        iffy.address = res;
                        resolve(res)
                    });
                });
                // resolve from the method call.

            });
        }
    });
    // var returnVal = null;

    // this.addToCallQueue(function() {

    // // });

    // if(navigator.geolocation) {
    
    // }

    // return new Promise(function(resolve, reject) {
    //     jQuery.ajax(
    //         { url: "https://nominatim.openstreetmap.org/reverse?format=json&lat=" + lat + "&lon=" + long + "&zoom=18&addressdetails=1",
    //           context: document.body
    //         }
    //     ).then(function() {
    //         resolve(1);
    //     });
    //   });
};


iffy.init = (function() {
    iffy.waitToRunForJquery(function() {
        /// Find all the location flags

        // if-state-*
        // if-city-*
        
    });
})();


// Vanilla Implementation of Waiting for the document to load
(function(funcName, baseObj) {
    // The public function name defaults to window.docReady
    // but you can pass in your own object and own function name and those will be used
    // if you want to put them in a different namespace
    funcName = funcName || "docReady";
    baseObj = baseObj || window;
    var readyList = [];
    var readyFired = false;
    var readyEventHandlersInstalled = false;

    // call this when the document is ready
    // this function protects itself against being called more than once
    function ready() {
        if (!readyFired) {
            // this must be set to true before we start calling callbacks
            readyFired = true;
            for (var i = 0; i < readyList.length; i++) {
                // if a callback here happens to add new ready handlers,
                // the docReady() function will see that it already fired
                // and will schedule the callback to run right after
                // this event loop finishes so all handlers will still execute
                // in order and no new ones will be added to the readyList
                // while we are processing the list
                readyList[i].fn.call(window, readyList[i].ctx);
            }
            // allow any closures held by these functions to free
            readyList = [];
        }
    }

    function readyStateChange() {
        if ( document.readyState === "complete" ) {
            ready();
        }
    }

    // This is the one public interface
    // docReady(fn, context);
    // the context argument is optional - if present, it will be passed
    // as an argument to the callback
    baseObj[funcName] = function(callback, context) {
        if (typeof callback !== "function") {
            throw new TypeError("callback for docReady(fn) must be a function");
        }
        // if ready has already fired, then just schedule the callback
        // to fire asynchronously, but right away
        if (readyFired) {
            setTimeout(function() {callback(context);}, 1);
            return;
        } else {
            // add the function and context to the list
            readyList.push({fn: callback, ctx: context});
        }
        // if document already ready to go, schedule the ready function to run
        if (document.readyState === "complete") {
            setTimeout(ready, 1);
        } else if (!readyEventHandlersInstalled) {
            // otherwise if we don't have event handlers installed, install them
            if (document.addEventListener) {
                // first choice is DOMContentLoaded event
                document.addEventListener("DOMContentLoaded", ready, false);
                // backup is window load event
                window.addEventListener("load", ready, false);
            } else {
                // must be IE
                document.attachEvent("onreadystatechange", readyStateChange);
                window.attachEvent("onload", ready);
            }
            readyEventHandlersInstalled = true;
        }
    }
})("docIsReady", iffy);


iffy.getScript = function(url, success) {
        
    var script     = document.createElement('script');
        script.src = url;
    
    var head = document.getElementsByTagName('head')[0],
    done = false;
    
    // Attach handlers for all browsers
    script.onload = script.onreadystatechange = function() {
    
        if ( !done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') ) {
            
            // callback function provided as param
            success();
            
            script.onload = script.onreadystatechange = null;
            head.removeChild(script);
            
        };
    
    };
    
    head.appendChild(script);

};


iffy.attemptToloadJquery = function(callback = function(){}) {
    var hasSuccess = false;

    // The following snippet to detect JQuery Presence via https://css-tricks.com/snippets/jquery/load-jquery-only-if-not-present/
    // Only do anything if jQuery isn't defined
    if ( typeof jQuery == 'undefined' ) {

        this.getScript(this.jqueryUrl, function() {
        
            if ( typeof jQuery !== 'undefined' ) {
                iffy.hasJquery = true;
                callback();
            } else {
                console.error(iffy.jqueryError);
            }
        });
    } 
    iffy.hasJquery = true;
    callback();
};

iffy.whenReady = function(callback) {
    iffy.attemptToloadJquery(callback? callback : function(){});
    return this;
}

iffy.docIsReady(function() {
    iffy.attemptToloadJquery(iffy.go);
});

iffy.go = function() {
    // Jquery Is Loaded
    // Load In Cookie Tracking Dependencies
    iffy.getScript('https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js', function() {
       // Run all functions in the call queue here

       iffy.callQueue.map(function(fn) {
            fn();
       });

       var interval = setInterval(function() {
        if(iffy.hasJquery) {
            clearInterval(interval);
           

            jQuery.each(iffy.elements, function(key, value) {
                jQuery(value).addClass('hidden');
        
                var id = jQuery(value).attr('id')
                var classNames = jQuery(value).attr('class')
        
        
                if(id) {
        
                } else if(classNames) {
                    var splitClassNames = classNames.split(" ");
                    var templateTagsArr = null;
                    splitClassNames.map(function(elm) {
                        if(elm.includes('iffy')) {
                          templateTagsArr = elm.split('-');  
                        }
                    });
        
                    if(templateTagsArr.length === 2) {
                        console.log("Template tags arr");
                        console.log(templateTagsArr);
                        console.log(Cookies.get('business'));

                        if(Cookies.get(templateTagsArr[1])) {
                            jQuery('.iffy-' + templateTagsArr[1]).removeClass('hidden');
                        }

                    }
                }
        
            });

        }
    }, 100);
    // Get all of the elements with the appropirate attributes
    var setOne = jQuery('[class^=iffy]');
    iffy.elements = jQuery('[id^=iffy]').add(setOne);
    console.log('SETTING THE ELEMENTS');

    
    // AND NOW HIDE THEM ALL.




    });



    

    // Go through the tags and look for respective cookies





};

iffy.track = function(stringOrStringsToTrack) {
    var hasSuccess = false;

    if(typeof stringOrStringsToTrack === 'string') {
        hasSuccess = true;
        console.log("Tracking a string for sure.");

        iffy.addToCallQueue(function() {
            console.log("Adding the cookie in now");
            Cookies.set(stringOrStringsToTrack, true);
        });
        

        // Set a True Cookie For The String
    } else if(Array.isArray(stringOrStringsToTrack)) {
        iffy.addToCallQueue(function() {
        hasSuccess = true;
        console.log("Tracking an array for sure.");

        stringOrStringsToTrack.map(function(elm) {
            
            Cookies.set(elm, true);
        });
    });

       // Set A True Cookie For Each Item in the array
    } else if(typeof stringOrStringsToTrack === 'object') {
        iffy.addToCallQueue(function() {
        hasSuccess = true;
        console.log("Now we have an object type.");
        // We expect each to to be a number
        Object.keys(stringOrStringsToTrack).map(function(key) {
            if(isNaN(stringOrStringsToTrack[key])) {
                console.error('Tracking Duration Should Be An Integer For Number of Hours...Key: ' + key);
                hasSuccess = false;
            } else {
                console.log("KEY IS****");
                console.log(key);
                console.log(stringOrStringsToTrack[key]);
                Cookies.set(key, true, { expires: stringOrStringsToTrack[key] });
            }
        });
    });
    }
    else {
        console.error('Unsupported Tracker Type.');
    }
    return hasSuccess;
}

















