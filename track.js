var iffy = {
    jqueryUrl: 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js',
    jqueryError: 'Iffy will fail to start due to inability to load Jquery as its dependency.',
    goMessage: 'Aye Aye Captain',
    hasJquery: false,
    hasCookieWrapper: false,
    callQueue: [],
    trackers: [],
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

iffy.parseTemplates = function() {
    // Break apart city, state, and country attributes
    
        console.log("Running the interval");
        console.log(iffy.elements);
            console.log("ACTUALLY IN THE IF STATEMENT");
            jQuery.each(iffy.elements, function(key, value) {
                console.log("And as we break these things apart:");
          
                var id = jQuery(value).attr('id');
                var classNames = jQuery(value).attr('class');

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
                                if(splitClassName.length === 3) { // iffy-state-business
                                    if(splitClassName[1] === 'city'  ||
                                       splitClassName[1] === 'state' ||
                                       splitClassName[1] === 'country' 
                                    ) {
                                        console.log("We are checking for the location");
                
                                        iffy.useLocationTag(splitClassName[1], splitClassName[2]);
                                       
                                    }

                                } else if(splitClassName.length === 2) { // iffy-arbitrary
                                    console.log("Trackers array is:");
                                    console.log(iffy.trackers);

                                    if (iffy.trackers.includes(splitClassName[1])) {
                                        // Parse the inner html of the template and do a replacement of the tags
                                        
                                        var result = jQuery(value).children().contents()
                                            .filter(function () {
                                                return this.nodeType === 3;
                                            });
                                            console.log("Immediate");
                                            console.log(result);

                                            jQuery.each(result, function(index, resultElm) {
                                                var text = jQuery(resultElm).text()
                                                var startIndex = text.lastIndexOf("{{") + 2;
                                                var endIndex = text.lastIndexOf("}}");
                                                var tag = text.substring(startIndex, endIndex);
                                                
                                                if(tag !== '') {
                                                    // Split the string by dot
                                                    console.log("SPLIT TAGS:");
                                                    console.log(tag.split('.')[0]);
                                                    console.log(tag.split('.')[1]);

                                                    const cookieJson = JSON.parse(Cookies.get(tag.split('.')[0]));
                                                    console.log(cookieJson[tag.split('.')[1]])
                                                    console.log("AND HERE");
                                                    
                                                    var newText = text.substring(0, startIndex - 2) + cookieJson[tag.split('.')[1]] + text.substring(endIndex, text.length - 2);  
                                                    jQuery(this).parent().text(newText);
                                                    console.log(newText.toString());

                                                }
                                                
                                            });

                                        console.log("ACTUALLY REACHING THIS STATEMENT");
                                        console.log(jQuery(value));
                                        jQuery(value).toggleClass('hidden');
                                        console.log(jQuery(value));


                                        



                                    }
                                }

                            // Look for the actual statements



                        }
                    });
                }


                // Only use the iffy- id and classnames
            })
};

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

       // Run everything that has backed up in the call queue
       iffy.callQueue.map(function(fn) {
            fn();
       });

       var interval = setInterval(function() {
        if(iffy.hasJquery) {
            clearInterval(interval);

            // Get the array of stored trackers and push to iffy elements
            var storedTrackers = JSON.parse(Cookies.get('trackers'));

            if (typeof storedTrackers === 'undefined') {
                storedTrackers = [];
            } 
            else {
                console.log("Retrieved");
                console.log(storedTrackers);
                storedTrackers.map(function(tracker) {
                    iffy.trackers.push(tracker)
                });
            }

            // // Get all of the elements with the appropirate attributes
            var setOne = jQuery('[class^=iffy]');
            iffy.elements = jQuery('[id^=iffy]').add(setOne);
            console.log('SETTING THE ELEMENTS');

            jQuery.each(iffy.elements, function(key, value) {
                jQuery(value).addClass('hidden');
            });

            iffy.parseTemplates()

        }
    }, 100);



    
    // AND NOW HIDE THEM ALL.




    });



    

    // Go through the tags and look for respective cookies





};

iffy.track = function(stringOrStringsToTrack) {
    console.log("Tracking something, anything at all");
    var hasSuccess = false;


    // If there isn't a trackers object stored as a cookies, create it
    var storedTrackersRaw = Cookies.get('trackers');
    var storedTrackersArr = [];

    if (typeof storedTrackersRaw !== 'undefined') {
        console.log("TRACKERS FROM COOKIES ARE");
        storedTrackersArr = storedTrackersRaw.split(',');
    } 

    // Or if there is one, get it

    if(typeof stringOrStringsToTrack === 'string') {
        hasSuccess = true;
        iffy.trackers.push(stringOrStringsToTrack);
        storedTrackersArr.push(stringOrStringsToTrack);

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
            storedTrackersArr.push(elm);
            iffy.trackers.push(elm);
            Cookies.set(elm, true);
        });
    });

       // Set A True Cookie For Each Item in the array
    } else if(typeof stringOrStringsToTrack === 'object') {
        iffy.addToCallQueue(function() {
        hasSuccess = true;

        

        console.log("Detected an object and stringifying the cookie");
            console.log(stringOrStringsToTrack);

        // We expect each to to be a number
        Object.keys(stringOrStringsToTrack).map(function(key) {
            storedTrackersArr.push(key);
            console.log(key);
            console.log(storedTrackersArr);
            iffy.trackers.push(key);
            Cookies.set(key, JSON.stringify(stringOrStringsToTrack[key]), { expires: 1800});
        });
    });
    }
    else {
        console.error('Unsupported Tracker Type.');
    }

    iffy.addToCallQueue(function () {
        console.log("SETTING TRACKERS ARR AS");
        console.log(storedTrackersArr);
        var trackersString = JSON.stringify(storedTrackersArr);
        console.log(trackersString);
        Cookies.set('trackers', trackersString);
    })
    return hasSuccess;
}
