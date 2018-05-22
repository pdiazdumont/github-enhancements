# Chrome extension to enhance the GitHub experience

This project was an exercise to understand how a Chrome extension works and how to implement a development environment for it. The practical goal was to show the size of each file listed in a repository. Sample:

![Image of Yaktocat](/readme/preview.JPG)

## Known issues
- The detection method of the current location can be improved, using specific paths instead of a big regular expression
- Instead of weird workarounds to detect when the ajax on the GitHub page has finished you could only attach a callback to the "pjax:end" event
- The production configuration is not implemented
