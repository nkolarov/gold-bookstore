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

    function getCarsView() {
        return getTemplate("cars");
    }

    function getLogoutView() {
        return getTemplate("logout-form");
    }

    function getMainMenuView() {
        return getTemplate("main-menu");
    }

    function getBookShortListView() {
        return getTemplate("book-short-list");
    }

    function getBookDetailsView() {
        return getTemplate("book-details");
    }

    function getCommentsListView() {
        return getTemplate("comments-list");
    }

    function getSearchByDateView() {
        return getTemplate("search-by-date");
    }

    function getSearchByTitleView() {
        return getTemplate("title-search");
    }

    function getAuthorSearchView() {
        return getTemplate("author-search");
    }

    function getLogView() {
        return getTemplate("login-full");
    }

    return {
        getLoginView: getLoginView,
        getCarsView: getCarsView,
        getMainMenuView: getMainMenuView,
        getLogoutView: getLogoutView,
        getBookShortListView: getBookShortListView,
        getBookDetailsView: getBookDetailsView,
        getCommentsListView: getCommentsListView,
        getSearchByDateView: getSearchByDateView,
        getSearchByTitleView: getSearchByTitleView,
        getAuthorSearchView: getAuthorSearchView,
        getLogView: getLogView
    };
}());