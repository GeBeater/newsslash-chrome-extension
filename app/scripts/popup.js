'use strict';

requirejs.config({
    //By default load any module IDs from /libs
    baseUrl: 'libs',
    //except, if the module ID starts with another path,
    //load them from their respective directory.
    paths:
    {
        app: '../app'
    }
});

requirejs(
    ['jquery'],

    function (jquery)
    {
        window.onload = function(){
            jquery.ajax({type:'GET', dataType:'xml', url: "http://www.newsslash.com/rss", timeout:5000, success:parseFeed, error:handleError, async: false});
        }

        function parseFeed(feed) {
            console.log(document);

            var feedTable = document.getElementById("feed");
            var count = 0;

            jquery('item', feed).each( function() {
                var row = document.createElement("tr");
                row.className = "link";
                var number = document.createElement("td");
                number.innerText = ++count;
                var linkContainer = document.createElement("td");

                var link = document.createElement("a");
                link.innerText = jquery(this).find('title').eq(0).text();
                link.href = jquery(this).find('link').eq(0).text();
                link.addEventListener("click", openTab);

                linkContainer.appendChild(link)

                row.appendChild(number);
                row.appendChild(linkContainer);

                feedTable.appendChild(row);
            });


        }

        function openTab() {
            chrome.tabs.create({url: this.href, selected: false});
        }

        function handleError() {
            console.log("Error while parsing.")
        }
    }
);
