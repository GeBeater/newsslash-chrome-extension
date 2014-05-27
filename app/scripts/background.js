'use strict';

/**
 * Function for showing the notification.
 */
function showNotification(title, message) {

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

    // set notification timeout
    setTimeout(function() {
            chrome.notifications.clear(notificationId, function() {
                // DO NOTHING
            });
        },
        5000
    );
}

/**
 * Function for parsing the ajax result. Will store the actual news in localstorage.
 */
function parseFeed(feed) {

    var title = $('item', feed).find('title').eq(0).text();
    var text = $('item', feed).find('description').eq(0).text();
    var link = $('item', feed).find('link').eq(0).text();

    var lastItem = localStorage.getItem('lastItem');

    if (false === lastItem|| lastItem !== title) {
        showNotification(title, text);
    }

    localStorage.setItem('lastItem', title);
    localStorage.setItem('lastItemUrl', link);

    console.log(title);
    console.log(text);
    console.log(link);
}

/**
 * This function is the background-lifecycle. Will call itself after timeout.
 */
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

/**
 * Function for setting the listener for the notifications. This function will be called once.
 */
function setNotificationListener() {
    // notification onClick function
    chrome.notifications.onClicked.addListener(function () {

        // open link
        window.open(localStorage.getItem('lastItemUrl'));
        chrome.notifications.clear();
    });
}

/**
 * This function starts the background logic. This function will be called once.
 */
$(document).ready(function() {
    setNotificationListener();
    nextTick();
});
