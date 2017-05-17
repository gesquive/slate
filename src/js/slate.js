


String.prototype.hashCode = function(){
    // djb2 hash algorithm
    var hash = 5381;
    for (i = 0; i < this.length; i++) {
        char = this.charCodeAt(i);
        hash = ((hash << 5) + hash) + char; /* hash * 33 + c */
    }
    return hash >>> 0;
};

var Color = tinycolor;


var Shuffle = window.shuffle;

var shuffle = new Shuffle(document.querySelector('.tile-container'), {
  group: shuffle.ALL_ITEMS,
  itemSelector: '.tile',
  gutterWidth: 16,
  columnWidth: 188,
  buffer: 1,
  delimeter: ",",
  useTransforms: false,
});

var filterTiles = function(tag) {
    shuffle.filter(location.hash.slice(1));
};

window.onhashchange = filterTiles;

var getUrlParts = function(baseUrl) {
    var urlParts = {
        domain: "",
        before: "",
        after: ""
    };
    var url = new URL(baseUrl);
    var host = url.host;
    urlParts.domain = host.replace(/^www\./i, "");

    if (host.match(/^\d+\.\d+\.\d+\.\d+$/)) {
            urlParts.domain = host;
        return urlParts;
    } else if (host.match(/^(\d+\.\d+\.\d+\.\d+)(:(\d+))?$/)) {
        hostParts = host.match(/^(\d+\.\d+\.\d+\.\d+)(:(\d+))?$/);
        urlParts.domain = hostParts[1];
        urlParts.after = hostParts[3];
        return urlParts;
    }

    var hostParts = urlParts.domain.split(".");
    var longestPartIndex = 0;
    for (var i = 1; i < hostParts.length - 1; i++) {
        if (hostParts[i].length > hostParts[longestPartIndex].length) {
            longestPartIndex = i;
        }
    }

    urlParts.domain = hostParts[longestPartIndex];
    urlParts.before = hostParts.slice(0, longestPartIndex).join(".");
    urlParts.after = hostParts.slice(longestPartIndex + 1).join(".");

    if(!urlParts.domain && url.pathname) {
      urlParts.domain = url.pathname.split("/").filter(Boolean).pop();
    }
    return urlParts;
};

var fitText = function(text, boxWidth, boxHeight) {
    var resizer = document.createElement("div");
    resizer.style.visibility = "hidden";
    resizer.style.position = "absolute";
    document.body.appendChild(resizer);

    var size = 40;

    resizer.innerHTML = text;
    resizer.style.fontSize = size;
    while (resizer.offsetWidth > boxWidth) {
        size = size - 1;
        resizer.style.fontSize = size;
    }

    var textInfo = {
        size: size,
        width: resizer.offsetWidth,
        height: resizer.offsetHeight
    };
    resizer.remove();
    return textInfo;
};


var getTileColor = function(domain) {
    var colorMap = [
  "#B42424",
  "#C83D1D",
  "#BB7231",
  "#E06B00",
  "#55931F",
  "#1C941B",
  "#189365",
  "#189196",
  "#2D85A4",
  "#2B6C90",
  "#205396",
  "#39448F",
  "#55338E",
  "#683089",
  "#963A97",
  "#A43343",
  "#982F2F",
  "#D30000",
  "#E54C29",
  "#DA7E2C",
  // "#F0C92C",
  "#73B43A",
  "#3AB43A",
  "#3AB487",
  "#3AB0B4",
  "#47A6C7",
  "#3A88B4",
  "#3A6FB4",
  "#3A4AB4",
  "#673AB4",
  "#863AB4",
  "#C846C9",
  "#C44A5B",
  "#AA4444",
  "#E84545",
  "#FF6946",
  "#EC9344",
  // "#F4D34F",
  // "#8BD34B",
  // "#4AD449",
  // "#6FDFB5",
  // "#45D3D9",
  // "#5CC4E8",
  "#3CA4DF",
  "#3A83E3",
  "#4056E3",
  "#9058F0",
  "#B467E2",
  "#DF7CDF",
  "#E5576B",
  "#D35A5A",
  // "#FF9C44",
  // "#F2B722",
  // "#4DCC7B",
  "#3DC53D",
  "#2DBBB1",
  "#5E95D5",
  // "#41BBF5",
  "#5E5BE7",
  "#1B7EFF",
  "#5F74FF",
  "#8A45FF",
  "#B856F3",
  "#DD66DD"
];

    return colorMap[domain.hashCode() % colorMap.length];

};

var renderImgTile = function(tile) {
    tile.innerHTML = "";

    var bgColor = tile.getAttribute("data-bg-color");
    if (!bgColor) {
        bgColor = "rgba(255,255,255,.8)";
    }
    bgColor = Color(bgColor);
    bgColor.setAlpha(0.8);
    tile.style.backgroundColor = bgColor;

    var img = new Image();
    img.src = tile.getAttribute("data-img");
    img.className = "logo";
    tile.appendChild(img);
};

var renderPlainTile = function(tile) {
    var urlParts = getUrlParts(tile.getAttribute("data-url"));
    tile.innerHTML = "";

    var bgColor = tile.getAttribute("data-bg-color");
    if (!bgColor) {
        bgColor = "rgba(255,255,255,.8)";
    }
    bgColor = Color(bgColor);
    bgColor.setAlpha(0.8);
    tile.style.backgroundColor = bgColor;

    var txtColor = tile.getAttribute("data-txt-color");
    if (!txtColor) {
        txtColor = getTileColor(urlParts.domain);
        if (bgColor.isDark()) {
            tile.style.color = "white";
        }
    }
    txtColor = Color(txtColor);
    tile.style.color = txtColor;

    var boxWidth = 188, boxHeight = 120;
    var margin = 8;

    var textInfo = fitText(urlParts.domain, boxWidth-margin*2, boxHeight);

    var domainDiv = document.createElement("div");
    domainDiv.style.fontSize = textInfo.size;
    domainDiv.style.position = "absolute";
    tile.appendChild(domainDiv);

    var beforeDiv = document.createElement("div");
    beforeDiv.innerHTML = urlParts.before;
    // original forumla is 7/18*size-10
    beforeDiv.style.top = 0.35*textInfo.size-10;
    beforeDiv.className = "pre-domain";
    beforeDiv.style.textShadow = "-1px 0 "+bgColor+",0 1px "+bgColor+",1px 0 "+bgColor+",0 -1px "+bgColor;

    var afterDiv = document.createElement("div");
    afterDiv.innerHTML = urlParts.after;
    afterDiv.style.top = textInfo.size-0.05*textInfo.size;
    afterDiv.className = "post-domain";
    afterDiv.style.textShadow = "-1px 0 "+bgColor+",0 1px "+bgColor+",1px 0 "+bgColor+",0 -1px "+bgColor;


    domainDiv.appendChild(beforeDiv);
    domainDiv.append(urlParts.domain);
    domainDiv.appendChild(afterDiv);

    var top = (boxHeight + margin)/2 - domainDiv.clientHeight/2;
    var left = (boxWidth + margin)/2 + margin - domainDiv.clientWidth/2;
    domainDiv.style.top = top;
    domainDiv.style.left = left;

    // console.log(urlParts.domain+"="+urlParts.domain.hashCode().toString());
};

var renderTiles = function() {
    var tiles = document.getElementsByClassName("tile-box");
    for(var i = 0; i < tiles.length; i++)
    {
        try {
            if (tiles.item(i).getAttribute("data-img")) {
                renderImgTile(tiles.item(i));
            } else {
                renderPlainTile(tiles.item(i));
            }
        }
        catch(err) {
            console.log("err:"+err);
        }
    }
};

renderTiles();

var getBackgroundImages = function() {
    var backgrounds = document.getElementsByTagName("body");
    var images = [];
    var imgString = backgrounds[0].getAttribute("data-backgrounds");
    if (imgString) {
        images = imgString.split(/[\s,]+/).filter(Boolean);
    }
    return images;
};

var preloadBackgrounds = function() {
    var images = getBackgroundImages();
    for(var i = 0; i < images.length; i++)
    {
        // caches images, avoiding white flash between background replacements
        new Image().src = images[i];
    }
};

var rotateBackground = function(count) {
    if (count === undefined || count === null) {
        count = 0;
    }

    var images = getBackgroundImages();
    if (images.length > 0) {
        count = (count+1) % images.length;
        // console.log("rotating background to "+count);

        document.body.style.background = 'url("' + images[count] +'")';
        document.body.style.backgroundSize = "cover";
        if (images.length > 1) {
            setTimeout(rotateBackground.bind(null, count), 30000);
        }
    }
};
preloadBackgrounds();
rotateBackground();
