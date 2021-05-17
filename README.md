# test-task-3D
This was a test project that i found in open access for a position of a front-end developer

It consists of four blocks that requires different approach to make it work properly

Block#1
  It has to be a rotating 3D model that reacts to mouse drag events. To make it work, i had to dig in JS library, that works with 3D objects - THREE.js
  It was absolutely new for me, i stumbled upon couple problems such as loading model on the page, adjusting proper scale and lightning but eventually
  found a way to put it together. It was the hardest part among all test since i`m not really familiar with canvas.
  
Block#2
  Really interesting effect, that you can find on a lot of websites when card reacts to mouse hovering over it and (card)skews to the same direction that mouse
  goes. Had to use document mousemove events and simple calculations to evaluate the position of the mouse and correlate cards rotation to the same direction.

Block#3
  It`s a simple form to collect user information and send to the website owner. I decided to replace actual <select> element with artificial <div>
  that works using event listeners and changing actual select active element correspondingly since we can`t simply style select elements. 
  
  Second part was to make dynamic text input size without displaying scrollbar. I found really short and simple script for that and used it.
  
  Also had to google a little bit to decide what is the best approach for a "add new file" option since it`s a browser API and one can`t easily modify it
  if needed to remove uploaded file.

Block#4
  Good old accordeon + tabs block. We click on certain paragraph and it opens up, tab with the same index has to become active. And vice versa - click
  on certain tab and corresponding paragraph will open up.
  
