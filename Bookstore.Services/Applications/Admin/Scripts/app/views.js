/// <reference path="../libs/_references.js" />

window.viewsFactory = (function () {
    var rootUrl = "Scripts/partials/";

    var templates = {};

    function getTemplate(name) {
        var promise = new RSVP.Promise(function (resolve, reject) {
            if (templates[name]) {
                resolve(templates[name])
            }
            else {
                $.ajax({
                    url: rootUrl + name + ".html",
                    type: "GET",
                    success: function (templateHtml) {
                        templates[name] = templateHtml;
                        resolve(templateHtml);
                    },
                    error: function (err) {
                        reject(err)
                    }
                });
            }
        });
        return promise;
    }

    function getLoginView() {
        return getTemplate("login-form");
    }

    function getLogoutView() {
        return getTemplate("logout-form");
    }

    function getMainMenuView() {
        return getTemplate("main-menu");
    }

    function getUsersListView() {
        return getTemplate("users-list");
    }

    function getUserDetailsView() {
        return getTemplate("user-details");
    }

    function getBooksListView() {
        return getTemplate("books-list");
    }

    function getBookDetailsView() {
        return getTemplate("book-details");
    }

    function getLogView() {
        return getTemplate("login-full");
    }

    return {
        getLoginView: getLoginView,
        getMainMenuView: getMainMenuView,
        getUsersListView: getUsersListView, 
        getUserDetailsView: getUserDetailsView,
        getBooksListView: getBooksListView,
        getBookDetailsView: getBookDetailsView,
        getLogoutView: getLogoutView,
        getLogView: getLogView
    };
}());