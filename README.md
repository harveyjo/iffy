# Iffy

# Installation Instructions

Installation is dead-simple. Simply include the contents of track.js or track.min.js in the page at which you'd like to track cookies or use the dynamic templating.



# Usage Instructions

The first use case is to simply track whether or not a user has visited a page. To track a page-visit for use with a template, place the following javascript code on the page for which visits you'd like to track:

```iffy.track('democookie')```

This will set a cookie in the user's browser that determines that the 'cookieNameHere' page has been visited. Now, you can use iffy-templating tags to conditionally display the content like the following:

```<div class="iffy-democookie"> ... </div>```

In which case the content between the div tags will only be displayed if the user has visited the 'democookie' page.

## Tracking Location

You can also use iffy to track whether or not a user is from a specfic city, state, or country. You can use the automatic template tags

```<div class="iffy-state-oregon">...</div>``` 

and the browser will request to use the user's location. If the user accepts, the template within the div tags will render the content inbetween the div tags if the user is from the given state. Similarly, you can do

```<div class="iffy-city-corvallis">...</div>```

```<div class="iffy-country-us">...</div>```


## Diving in With Javascript Conditionals

You can also directly request location access from the user and process logic based on the result of the request. For example, the following snippet of code displays several console.log statements if the user allows location access and is from the state of Oregon.

```      
      iffy.hasGeolocationAccess().then(function(location) {
        console.log("And location is");
        console.log(location);

       iffy.isFrom('state', 'Oregon').then(function() {
         console.log("User is from oregon!");
        });
      });
```



