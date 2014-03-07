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
        // code here
    }
);
