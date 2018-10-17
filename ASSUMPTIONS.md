1.) Error on saving scss:
* File to import not found or unreadable
Solution:
* Added polling in script (--use-polling --polling-interval=500)

2.) Added Normalize.css https://necolas.github.io/normalize.css/
* Normalize.css makes browsers render all elements more consistently and in line with modern standards. It precisely targets only the styles that need normalizing.

3.) I had trouble on importing images on sass
* For SVG: I use font awesome instead
* for background image, I implemented it using inline styles 
* it will take me sometime to implement it on webpack since I'm not yet that experienced using webpack
* This also prevents me to add chevron on dropdowns