function Card(card, cardData) {
    debuglog('building card ' + card);

    var div = $('#templateCard').clone();
    div.attr('id', 'card' + card);
    div.find('.design-card').addClass('c-' + cardData.aspect);

    div.find('.c-self-link').attr('href', 'c?' + card);
    div.find('.c-title').html(card + ' ' + cardData.name);
    div.find('.c-illus').html(card);

    div.find('.c-catchphrase').html('»' + cardData.catchphrase + '«');
    div.find('.c-description').html(cardData.description);
    div.find('.c-wikilink a').attr('href', 'http://www.principles-wiki.net/' + cardData.wikiLink);

    div.find('.c-set').attr('src', 'img/cards/' + cardData.set + '_' + color(cardData) + '.png');
    for (link in cardData.links) {
        div.find('.c-links').append(buildLink(cardData.links[link]));
    }
    div.find('.c-dimension a').attr('href', 'dimensions.html?dimension=' + cardData.aspect);
    div.find('.c-dimension img').attr('alt', cardData.aspect);
    div.find('.c-dimension img').attr('src', 'img/cards/' + cardData.aspect + '.png');

    $('#design-cards').append(div);

    function buildLink(link) {
        var cssClass = link.set == 'basic' ? 'c-link-emph' : 'c-link';
        return '<a class="' + cssClass + '" href="c?' + link.abbreviation + '" title="' + link.name + '">' + link.type + link.abbreviation + '</a>&nbsp;';
    }

    function color(cardData) {
        switch (cardData.aspect) {
            case 'simple':
            case 'powerful':
                return 'green';
            case 'abstract':
            case 'concrete':
                return 'blue';
            case 'pragmatic':
            case 'idealistic':
                return 'red';
            case 'robust':
            case 'technologic':
                return 'yellow';

        }
    }
}

function Cards(filter) {
    var cards = buildCards();

    function buildCards() {
        if (filter.length > 0) {
            return buildFilteredCards();
        } else {
            return buildAllCards();
        }
    }

    function buildFilteredCards() {
        debuglog('building ' + filter.length + ' card(s)');
        filter.map(card => new Card(card, cardsData[card]));
    }

    function buildAllCards() {
        debuglog('building all card');
        var result = [];
        for (card in cardsData) {
            result.push(new Card(card, cardsData[card]));
        }
        return result;
    }
}

$(document).ready(function () {
    var filter = window.location.search.substring(1)
        .split(',')
        .filter(f => cardsData[f] != undefined);

    var cards = new Cards(filter);
    $('#templateCard').hide();
});
