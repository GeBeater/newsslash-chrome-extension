'use strict';

function showNotification(title, message, link) {

    var notificationId = 'NOTIFICATION_ID_' + title;

    var options = {
        type: 'basic',
        title: title,
        message: message,
        iconUrl: 'images/icon48.png'
    };

    chrome.notifications.create(notificationId, options, function() {
        // DO NOTHING
    });

    var tabAlreadyOpened = false;

    // notification onClick function
    chrome.notifications.onClicked.addListener(function () {
        // check, if this tab was already opened
        if (tabAlreadyOpened) {
            // tab already opened; don't open again
            return;
        }

        // open link
        window.open(link);
        chrome.notifications.clear(notificationId, function() {
            // DO NOTHING
        });

        // notification opened link; don't open it any more
        tabAlreadyOpened = true;
    });

    // set notification timeout
    setTimeout(function() {
            chrome.notifications.clear(notificationId, function() {
                // DO NOTHING
            });
        },
        5000
    );
}

function parseFeed(feed) {

    var title = $('item', feed).find('title').eq(0).text();
    var text = $('item', feed).find('description').eq(0).text();
    var link = $('item', feed).find('link').eq(0).text();

    var lastItem = localStorage.getItem('lastItem');

    if (false === lastItem|| lastItem !== title) {
        showNotification(title, text, link);
    }

    localStorage.setItem('lastItem', title);

    console.log(title);
    console.log(text);
    console.log(link);
}

function nextTick() {

    $.ajax({
            type: 'GET',
            dataType: 'xml',
            url: 'http://www.newsslash.com/rss',
            timeout: 5000,
            success: parseFeed,
            async: false
        });

    setTimeout(nextTick, 60000);
}

$(document).ready(function() {
    nextTick();
});
