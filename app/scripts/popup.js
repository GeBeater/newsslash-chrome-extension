;'use strict';

window.onload = function(){
    $.ajax({type:'GET', dataType:'xml', url: "http://www.newsslash.com/rss", timeout:5000, success:parseFeed, error:handleError, async: false});
}

function parseFeed(feed) {
    console.log(document);

    var feedTable = document.getElementById("feed");
    var count = 0;

    $('item', feed).each( function() {
        var row = document.createElement("tr");
        row.className = "link";
        var number = document.createElement("td");
        number.innerText = ++count;
        var linkContainer = document.createElement("td");

        var link = document.createElement("a");
        link.innerText = $(this).find('title').eq(0).text();
        link.href = $(this).find('link').eq(0).text();
        link.addEventListener("click", openTab);

        linkContainer.appendChild(link)

        row.appendChild(number);
        row.appendChild(linkContainer);

        feedTable.appendChild(row);



//        console.log("item: " + $(this).find('title').eq(0).text());
//        console.log("item_text: " + $(this).find('description').eq(0).text())
//        console.log("-------------------------------------------------------------------------");
    });


}

function openTab() {
    chrome.tabs.create({url: this.href, selected: false});
}

function handleError() {
    console.log("Error while parsing.")
}
