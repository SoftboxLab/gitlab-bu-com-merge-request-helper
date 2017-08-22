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
    const linkAuthor = elem.querySelector('.author_link').getAttribute('href');
    if (linkLoggedUser === linkAuthor) {
        elem.classList.add('itsmemario');
    }
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

    /*
    // Merge com WIP
    $(".merge-request:contains('WIP:')").css('background-color','#ffead0')
    .css('border-radius','5px');

    // Merge revisados
    $(".merge-request .controls .fa-thumbs-up").parent().each(function(key, item){
        if (($(item).text() * 1) >= 2) {
            $(item).css('color','green').parent().parent().parent().find('.fa-thumbs-up')
            .css('position','absolute')
            .css('color','green')
            .css('left','-24px');
        }
    });
    */
})();
