# Iffy

# Installation Instructions

Installation is dead-simple. Simply include the contents of track.js or track.min.js in the page at which you'd like to track cookies or use the dynamic templating.



# Usage Instructions

The first use case is to simply track whether or not a user has visited a page. To track a page-visit for use with a template, place the following javascript code on the page for which visits you'd like to track:

```iffy.track('democookie')```

This will set a cookie in the user's browser that determines that the 'cookieNameHere' page has been visited. Now, you can use iffy-templating tags to conditionally display the content like the following:

```<div class="iffy-democookie"> ... </div>```

In which case the content between the div tags will only be displayed if the user has visited the 'democookie' page.

You can also set multiple cookies for a single page or in a single call using the following syntax:
```
iffy.track([
       'trackerOne',
       'trackerTwo',
       'trackerThree'
 ]);
```

If you want to set the duration of the cookies so that they delete themselves from the user's browswer sooner than the default, pass an object where the keys are the cookie names and the values are the duration (in days) that the cookie should persist in the user's browser.

```
   var couldTrackWithDuration = iffy.track({
       trackerFour: 1,
       trackerFive: 2,
       trackerSix: 3,
   });
```


Note that since Iffy relies on using jQuery selectors, the iffy ID or class doesn't have to be applied to a div element. It can be applied to any HTML element, since maybe it makes sense to conditionally display a header, as in the following example

```<h1 class="iffy-headercookie">...</h1> ```

## Tracking Location

You can also use iffy to track whether or not a user is from a specfic city, state, or country. You can use the automatic template tags

```<div class="iffy-state-oregon">...</div>``` 

and the browser will request to use the user's location. If the user accepts, the template within the div tags will render the content inbetween the div tags if the user is from the given state. Similarly, you can do

```<div class="iffy-city-corvallis">...</div>```

```<div class="iffy-country-us">...</div>```

## Conditionally Displaying Content W/Boolean Logic

### Boolean AND

```
<div class="iffy-conditionone">
       <div class="iffy-conditiontwo">...</div>
</div>
```

### Boolean OR

```
<div class="iffy-checkone iffy-checktwo"> 
...
</div>
```

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

# Examples Use Cases

## Based on a previous visit to one of the 12 targeted state page (for example, a visit to Washington page), display dynamic content on the homepage.

Suppose you have 12 targeted landing pages for twelve different states. If a user visits one of those pages and then leaves, the page should store the state that they were on. Then, that data should be used to display a welcome graphic on the homepage the next time the user visits the homepage. Neither of these two things should before waiting 24 hours. The cookies should expire in 60 days. This entire behavior loop should only happen once.

### Step 1: Let the 12 pages know that they should be tracking views

On each of the twelve pages include the following code to let iffy know that it's tracking something for you.

```
  <script type="text/javascript">
    var stateName = 'California' // This is either hardcoded or parsed from the context in some form

    iffy.track({
      thatUserIsFromState: {
        state: stateName, // the key we exemplify for this use case, this can be named anything
        arbitraryKey: arbitraryValue, // add unlimited keys and values for templating 
        delay: 1440 // set an optional delay in minutes
        loop: false // @TODO: Just don't delete the cookie and change a key for whether or not the content has been displayed already? 

        // hasBeenDisplayed: false // 
        ...,
      }
    })

  </script>
```

The first time a user visits one of these pages a cookie with the name "userIsFromTargetState" with the value of the state name will be stored in his/her browsers. We use a generic name like "userIsFromTargetState" in order to impose the constraint that only the latest page visit to one of the 12 pages should be the trigger of the dynamic functionality, since a user visiting one of these pages and then another will cause the cookie to be written over with the state name of the second page.

### Step 2: Program the graphic to conditionally display on the target page

If you are using bootstrap, as an example you could create a block-level call to action that works on this data.

```
  <button type="button" class="iffy-userIsFromTargetState btn btn-primary btn-lg btn-block">
    Welcome back! Did you know 3/4 of {{userIsFromTargetState.statename}} students received scholarships and/or gift aid this    year?  
  </button>
```

## Redirect The user to state-specific landing page based on whether they are from that page

```
<script type="text/javascript">
       // This should only happen once, so track that it happened the first time and that this behavior shouldn't repeat.
       


       iffy.hasGeolocationAccess().then(function(location) {
          iffy.route(location.state, {
            'stateName': 'redirectLink'
          });
       });
</script>


// What location has available to you, and the face that this is essentially a switch statement
```

a.   Graphic displayed in block above content and below main menu, on Admissions homepage only.  Something small like a bubble or elongated button.
                                                               i.      
b.       Modal
                                                               i.      We’re using Modal’s on a few pages, like Apply As a First-Year Student button on the Apply Page.
    ii.      Delivery
    1.       Wait 24 hours before displaying
2.       Expire after 60 days
3.       Opt-out that makes sure it isn’t displayed again
                                                           iii.      Content
1.       Call to action for Explore OSU event:  https://admissions.oregonstate.edu/explore-osu
2.       Links
a.       https://scholarships.oregonstate.edu
b.       https://admissions.oregonstate.edu/scholarshipcalculator
c.       https://admissions.oregonstate.edu/find-your-major
d.       https://visitosu.oregonstate.edu
2.       Location Trigger on homepage
a.       If location is in one of the 12 targeted states, redirect to state landing page
b.       Redirect only once
c.       Because this is triggered by opt-in with location data, is there a way to collect this information provided?
3.       If visiting the Transfer landing page and location in Portland Metro area
a.       Modal
                                                               i.      Deliver one time only
                                                             ii.      Content
1.       Did you know?  OSU is offering Portland Hybrid Programs.  Learn More:  https://portland.oregonstate.edu
2.       Degree partnership Programs (DPP)
4.       If visiting Transfer page in Oregon, not in Portland
a.       Similar to above but just DPP content
5.       Next steps – can we drop cookies based on specific link clicks.






