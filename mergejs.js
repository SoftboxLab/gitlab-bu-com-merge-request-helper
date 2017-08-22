const isMergeRequestPage = () => window.location.href.trim('/').endsWith('merge_requests');

const addBUCom = (elem) => elem.classList.add('bucom');

const handleWIP = (elem) => {
    if (elem.querySelector('.merge-request-title-text a').textContent.startsWith('WIP')) {
        elem.classList.add('wip');
    }
};

const handleCanMerge = (elem) => {
    const elemThumbsup = elem.querySelector('.controls .fa.fa-thumbs-up');
    const elemThumbsdown = elem.querySelector('.controls .fa.fa-thumbs-down');

    const numThumbsup = null === elemThumbsup ? 0 : parseInt(elemThumbsup.parentElement.textContent.trim(), 10);

    if (null !== elemThumbsdown) {
        elem.classList.add('merge-denied');
    }

    if (null === elemThumbsdown) {
        if (numThumbsup < 2) {
            elem.classList.add('need-more-thumbs');
        } else {
            elem.classList.add('good-to-go');
        }
    }
};

const linkLoggedUser = document.querySelector('.header-user-dropdown-toggle').getAttribute('href');

const handleMyMerges = (elem) => {
    const linkAuthor = elem.querySelector('.merge-request-info .author_link').getAttribute('href');
    if (linkLoggedUser === linkAuthor) {
        elem.classList.add('itsmemario');
    } 
    const colorBg = stringToColour(linkAuthor);
    const colorFont = fontColorByBg(colorBg);
    const colorRgb = 'rgba('+hexToRgb(colorBg)+',0.6)';
    elem.querySelector('.merge-request-info .author_link').style.cssText = 'background-color: '+colorRgb+'!important; color: '+colorFont+' !important; text-shadow: 0 1px 1px '+colorBg+';';
};

const stringToColour = (str) => {
    let colour = '#'
    if (str) {
      let hash = 0
      for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash)
      }
      for (var i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 0xFF;
        colour += ('00' + value.toString(16)).substr(-2)
      }
    } else {
      colour = "#FFFFFF"
    }
    return colour
};

const fontColorByBg = (hexcolor, dark = '#333333', light = '#FFFFFF') =>  {
    var r = parseInt(hexcolor.substr(1,2),16);
    var g = parseInt(hexcolor.substr(3,2),16);
    var b = parseInt(hexcolor.substr(5,2),16);
    var yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 155) ? dark : light;
};

const hexToRgb = (hex) => {
    var bigint = parseInt(hex.substr(-6), 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    return r + "," + g + "," + b;
};

(function style() {
       
    const elementos = document.querySelectorAll(".merge-request");
    const pipeline = [
        addBUCom,
        handleWIP,
        handleCanMerge,
        handleMyMerges
    ];

    for (const elemento of elementos) {
        pipeline.map(fn => fn(elemento));
    }

})();
