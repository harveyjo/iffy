# Iffy

# Installation Instructions

## Install By Adding Tracking And Templating Features As A New Block


## Install Tracker and/or Templating  on Individual Pages by Adding It To A Javascript Paragraph


# Usage Instructions

The first use case is to simply track whether or not a user has visited a page. To track a page-visit for use with a template, place the following javascript code on the page for which visits you'd like to track:

```iffy.track('democookie')```

This will set a cookie in the user's browser that determines that the 'cookieNameHere' page has been visited. Now, you can use iffy-templating tags to conditionally display the content like the following:

```<div class="iffy-democookie"> ... </div>```

In which case the content between the div tags will only be displayed if the user has visited the 'democookie' page.

## Tracking Things


## Using Templating



