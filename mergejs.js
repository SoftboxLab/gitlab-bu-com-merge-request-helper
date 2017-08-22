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

const insertAfter = (newNode, target) => {
    target.parentNode.insertBefore(newNode, target.nextSibiling);
};

const main = () => {
    const element = `<a href='/groups/mv.com/merge_requests'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="m5 5.563v4.875c1.024.4 1.75 1.397 1.75 2.563 0 1.519-1.231 2.75-2.75 2.75-1.519 0-2.75-1.231-2.75-2.75 0-1.166.726-2.162 1.75-2.563v-4.875c-1.024-.4-1.75-1.397-1.75-2.563 0-1.519 1.231-2.75 2.75-2.75 1.519 0 2.75 1.231 2.75 2.75 0 1.166-.726 2.162-1.75 2.563m-1 8.687c.69 0 1.25-.56 1.25-1.25 0-.69-.56-1.25-1.25-1.25-.69 0-1.25.56-1.25 1.25 0 .69.56 1.25 1.25 1.25m0-10c.69 0 1.25-.56 1.25-1.25 0-.69-.56-1.25-1.25-1.25-.69 0-1.25.56-1.25 1.25 0 .69.56 1.25 1.25 1.25"></path><path d="m10.501 2c1.381.001 2.499 1.125 2.499 2.506v5.931c1.024.4 1.75 1.397 1.75 2.563 0 1.519-1.231 2.75-2.75 2.75-1.519 0-2.75-1.231-2.75-2.75 0-1.166.726-2.162 1.75-2.563v-5.931c0-.279-.225-.506-.499-.506v.926c0 .346-.244.474-.569.271l-2.952-1.844c-.314-.196-.325-.507 0-.71l2.952-1.844c.314-.196.569-.081.569.271v.93m1.499 12.25c.69 0 1.25-.56 1.25-1.25 0-.69-.56-1.25-1.25-1.25-.69 0-1.25.56-1.25 1.25 0 .69.56 1.25 1.25 1.25"></path></svg></a>`;
    const li = document.createElement('li');
    li.innerHTML = element;

    insertAfter(li, document.querySelector('.nav.navbar-nav .visible-sm.visible-xs'));
};

const mergeRequestPipeline = [
    addBUCom,
    handleWIP,
    handleCanMerge,
    handleMyMerges
];

const mergeRequest = () => {
    const elementos = document.querySelectorAll(".merge-request");
    for (const elemento of elementos) {
        mergeRequestPipeline.map(fn => fn(elemento));
    }
};

const mainPipeline = [
    main,
    mergeRequest
];

const run = () => {
    mainPipeline.map(pipeline => pipeline());
};

(function mainLoop() {
    if (!document.body.classList.contains('superextensao')) {
        document.body.classList.add('superextensao');
        run();
    }

    setTimeout(mainLoop, 1000);
}());