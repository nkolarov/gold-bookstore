/// <reference path="libs/_references.js" />


(function () {
    var appLayout =
		new kendo.Layout('<div id="main-content"></div>');
    var logoutLayout = new kendo.Layout("<div id='logout-button'></div>");
    var data = persisters.get("gold-bookstore.apphb.comapi/");
    vmFactory.setPersister(data);

    var router = new kendo.Router();
    router.route("/", function () {
        // debugger;

        viewsFactory.getLogView()
            .then(function (loginHtml) {
                // debugger;
                var loginVm = vmFactory.getLogViewModel(
						function () {
						    router.navigate("/");
						}, function () {
						    router.navigate("/");
						});
                // debugger;
                var view = new kendo.View(loginHtml,
                    { model: loginVm });
                logoutLayout.showIn("#logout-button", view);
                // debugger;
                if (data.users.currentUser()) {
                    router.navigate("/logged");
                }
                else {
                    router.navigate("/login");
                }
            });
    });

    router.route("/login", function () {
        // debugger;
        if (data.users.currentUser()) {
            router.navigate("/logged");
        }

        $("#login-container").show();
        $("#logout-container").hide();
        $("#main-content").html("");

        //console.log('is not logged');
    });

    router.route("/logged", function () {
        $("#login-container").hide();
        $("#logout-container").show();
        // debugger;
        viewsFactory.getMainMenuView()
        .then(function (mainMenuHtml) {
            // debugger;
            var view = new kendo.View(mainMenuHtml);
            appLayout.showIn("#main-content", view);
        })
    });

    router.route("/all-books", function () {
        if (!data.users.currentUser()) {
            router.navigate("/login");
        }

        $("#login-container").hide();
        $("#logout-container").show();

        viewsFactory.getBookShortListView()
            .then(function (bookListHtml) {
                // debugger;
                vmFactory.getBookListModel(function (idParam) {
                    router.navigate("/book-details/" + idParam);
                })
                .then(function (vm) {;
                    // debugger;
                    var bookListModel = vm;
                    var view = new kendo.View(bookListHtml, { model: bookListModel });
                    appLayout.showIn("#main-content", view)
                });
            });
    });

    router.route("/book-details/:id", function (id) {
        if (!data.users.currentUser()) {
            router.navigate("/login");
        }

        $("#login-container").hide();
        $("#logout-container").show();

        viewsFactory.getBookDetailsView()
        .then(function (bookDetailsHtml) {
            // debugger;
            vmFactory.getBookDetailModel(id, function () {
                // debugger;
                router.navigate("/redirection/" + id);
            }).then(function (vm) {;
                // debugger;
                var bookDetailsModel = vm;
                var view = new kendo.View(bookDetailsHtml, { model: bookDetailsModel });
                appLayout.showIn("#main-content", view);
            },
                function (err) {
                    // debugger;
                });
        });
    });

    router.route("/redirection/:id", function (id) {
        if (!data.users.currentUser()) {
            router.navigate("/login");
        }

        // debugger;
        router.navigate("/book-details/" + id);

    });

    router.route("/my-comments", function () {
        if (!data.users.currentUser()) {
            router.navigate("/login");
        }

        $("#login-container").hide();
        $("#logout-container").show();

        viewsFactory.getCommentsListView()
            .then(function (commentsListHtml) {
                var vm = vmFactory.getCommentsListViewModel()
                    .then(function (vm) {
                        var view = new kendo.View(commentsListHtml, { model: vm });
                        appLayout.showIn("#main-content", view)
                    });
            });
    });

    router.route("/search-by-date", function () {
        if (!data.users.currentUser()) {
            router.navigate("/login");
        }

        $("#login-container").hide();
        $("#logout-container").show();

        var vm = viewsFactory.getSearchByDateView()
            .then(function (searchHtml) {
                var vm = vmFactory.getSearchByDateViewModel(function (idParam) {
                    // debugger;
                    router.navigate("/book-details/" + idParam);
                });

                // debugger;
                var view = new kendo.View(searchHtml, { model: vm });
                appLayout.showIn("#main-content", view);
                $("#datepicker1").kendoDatePicker();
                $("#datepicker2").kendoDatePicker();
            });


    });

    router.route("/search-by-title", function () {
        if (!data.users.currentUser()) {
            router.navigate("/login");
        }

        $("#login-container").hide();
        $("#logout-container").show();

        // debugger;
        var vm = viewsFactory.getSearchByTitleView()
            .then(function (titleHtml) {
                var vm = vmFactory.getSearchTitleViewModel(function (idParam) {
                    // debugger;
                    router.navigate("/book-details/" + idParam);
                });
                // debugger;
                var view = new kendo.View(titleHtml, { model: vm });
                appLayout.showIn("#main-content", view);
            });


    });

    router.route("/all-authors", function () {
        if (!data.users.currentUser()) {
            router.navigate("/login");
        }

        $("#login-container").hide();
        $("#logout-container").show();

        // debugger;
        viewsFactory.getAuthorSearchView()
            .then(function (searchHtml) {
                var vm = vmFactory.getSearchAuthorViewModel(function (idParam) {
                    // debugger;
                    router.navigate("/book-details/" + idParam);
                }).then(function (vm) {
                    // debugger;
                    var view = new kendo.View(searchHtml, { model: vm });
                    appLayout.showIn("#main-content", view);
                });
            });



    });

    //only for registered users
    router.route("/special", function () {
        if (!data.users.currentUser()) {
            router.navigate("/login");
        }
    });

    $(function () {
        appLayout.render("#app");
        logoutLayout.render("#logout-div");
        router.start();
    });
}());