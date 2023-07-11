# LiChess Tools, by Siderite
Chrome extension adds extra functionalities to the https://lichess.org web site:
 - randomly play one of the next moves with Ctrl-RightArrow
     - configurable probability to play a move by putting prc:<number> in the move comment, where number is a percentage between 1 and 100
 - highlights for the last move of variations in the analysis/study board
     - also showing which of the last moves that have not ended in mate have no comment
 - highlights the transpositions to the current move in the analysis/study board
     - also an option to show all transpositions in the PGN
 - play multiple variations in Interactive lesson mode in the same chapter! (using the prc: notations if present)
 - automatically open/hide/convert to menu the Friends box at page load
 - sound alert when one of your friends starts playing a game (for various time controls)
 - changing the shortcut for playing the next best computer move from Space to Ctrl-Space
 - a minimum chess engine level (if it is idle in a lower state, it runs until it gets to that level)
 - sticky Interactive lesson Preview mode (remains in Preview when switching between chapters)
 - use keyboard shortcuts (i, m, b, Alt-i, Alt-m, Alt-b) for inaccuracies, mistakes and blunders in analysis
 - show player country flags next to their names (if they have their country specified in the profile)
 - import multiple PGNs in analysis mode and merge them into one
 - show the order of arrows and circles in analysis/study
 - add an item in the Watch menu to go to last watched game (and from there to the previously watched game and so on)
 - show opening name in TV game and mini games
 - opening explorer button to quickly switch between you and the selected user
 - ability to remove usernames from opening explorer selection
 - show history section (last two games) for user TV
 - copy branches from analysis/study to clipboard
 - TV games have a link to the game in the title and can be bookmarked during the game
 - languages supported: English, Romanian
 - extension options in the Preferences menu in LiChess
 - next moves from transpositions are now available in the analysis move list
 - study move list context menu item to automatically go to the last move of every variation and add a comment with the computer evaluation
 - option to save preferences in incognito mode, too (you have to set it from Preferences first!)
 - buttons to change chapter names from the Event or Black/White PGN tags in the chapter edit form
 - custom styles for study comments
 - study chapter navigation controls (including random chapter)
 - auto save and button to reload PGNs in Analysis mode (recover from accidental reloads)
 - enhanced Friends list now shows live online status and TV links, plus allows the option to "mute" playing alerts for each player
 - hide score tally crosstable during play
 - select move from variations, computer list or explorer by pressing . (dot), Ctrl-. and Shift-. respectively, then a digit key
 - global enable/disable extension switch
 - for the currently selected chapter, the ability to selectively remove just the comments, glyphs or drawn shapes
 - mobile device settings (use Kiwi browser on mobiles, it allows extensions)
 - custom user CSS themes (you can create PRs for them or ask me to include them, but you are maintaining them!)
 - delete all PGN tags in bulk or pick individual ones from the current chapter

Version 2 breaking changes:
 - Ctrl-Space replaces Space as the shortcut for "play best computer move", as Shift-Space is used by lichess to play the first explorer move
 - practice voice assist was funny, but not terribly useful. It is removed in V2, unless popular outcry calls for it back
 - the functionality of the "jump to glyph" was changed by lichess, so I had to reimplement it for the analysis keyboard shortcuts
    - just be aware that the i,m,b keys used by lichess for game analysis only only go on the mainline, while with LiChess Tools they cycle to moves in all variations
 - showing the order of circles/arrows is now off by default
 - saving TV games in the browser's history was ugly and prone to errors. Quite invasive, too. I've removed it. You can still use the Last viewed game menu item to cycle through games.
    - now a game is considered viewed at any time when it is opened, not only when you are there to see it end
 - the mechanism to automatically show the Event tag value instead of "Chapter X" as study chapter titles has been removed
    - instead, when editing a chapter, you now have options to quickly change the title to the Event tag content or from the White/Black tags 
 - analysis PGN is saved automatically and copied automatically in the PGN box on reload. You will have to press the button import the PGN, though.

URLs:
 - extension page: https://siderite.dev/blog/new-chrome-extension-lichess-tools/
 - GitHub page: https://github.com/Siderite/lichessTools