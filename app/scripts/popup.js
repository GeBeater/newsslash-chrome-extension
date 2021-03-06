'use strict';

function parseFeed(feed) {

    var feedTable = document.getElementById('feed');
    var count = 0;

    $('item', feed).each( function() {

        var row = document.createElement('tr');
        row.className = 'link';

        var number = document.createElement('td');
        number.innerText = ++count;

        var linkContainer = document.createElement('td');

        var link = document.createElement('a');
        link.innerText = $(this).find('title').eq(0).text();
        link.href = $(this).find('link').eq(0).text();
        link.addEventListener('click', function() {
            chrome.tabs.create({ url: link.href, selected: false });
        });

        linkContainer.appendChild(link);

        row.appendChild(number);
        row.appendChild(linkContainer);

        feedTable.appendChild(row);
    });
}

function handleError() {
    console.log('Error while parsing.');
}

$(document).ready(function() {

    $.ajax({
        type: 'GET',
        dataType: 'xml',
        url: 'http://www.newsslash.com/rss',
        timeout: 5000,
        success: parseFeed,
        error: handleError,
        async: false
    });

});