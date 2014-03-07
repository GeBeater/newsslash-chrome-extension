'use strict';

window.onload = function(){
    nextTick();
}

function nextTick() {
    $.ajax({type:'GET', dataType:'xml', url: "http://www.newsslash.com/rss", timeout:5000, success:parseFeed, async: false});
    setTimeout(nextTick, 60000);
}

function parseFeed(feed) {
    var title = $('item', feed).find('title').eq(0).text();
    var text = $('item', feed).find('description').eq(0).text();
    var link = $('item', feed).find('link').eq(0).text()

    var lastItem = localStorage.getItem("lastItem");

    if (!lastItem || lastItem != title) {
        showNotification(title, text, link);
    }

    localStorage.setItem("lastItem", title);

    console.log(title);
    console.log(text);
    console.log(link);
}

function showNotification(title, text, link) {
    var notification = webkitNotifications.createNotification("images/icon48.png", "Newsslash - New entry", title);

    // notification onClick function
    notification.addEventListener("click", function () {
        window.open(link);
        notification.clear();
    });

    // set notification timeout
    setTimeout(function() { notification.clear(); }, 5000);

    notification.show();
}
