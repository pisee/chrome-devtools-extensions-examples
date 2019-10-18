chrome.devtools.panels.create("My Panel",
    "MyPanelIcon.png",
    "view/panel/Panel.html",
    function(panel) {
      // code invoked on panel creation
    }
);

chrome.devtools.panels.create("Match up",
    "MyPanelIcon.png",
    "view/matchup/matchup.html",
    function(panel) {
      // code invoked on panel creation
    }
);

chrome.devtools.panels.create("D3 SVG",
    "MyPanelIcon.png",
    "view/d3svg/d3svg.html",
    function(panel) {
      // code invoked on panel creation
    }
);