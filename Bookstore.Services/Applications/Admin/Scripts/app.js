/// <reference path="libs/_references.js" />

(function () {
    var appLayout =
		new kendo.Layout('<div id="main-content"></div>');
    var logoutLayout = new kendo.Layout("<div id='logout-button'></div>");
    var data = persisters.get("http://gold-bookstore.apphb.com/api/");
    vmFactory.setPersister(data);

    var router = new kendo.Router();
    router.route("/", function () {
        viewsFactory.getLogView()
            .then(function (loginHtml) {
                
                var loginVm = vmFactory.getLogViewModel(
						function () {
						    router.navigate("/");
						}, function () {
						    router.navigate("/");
						});
                
                var view = new kendo.View(loginHtml,
                    { model: loginVm });
                logoutLayout.showIn("#logout-button", view);
                
                if (data.users.currentUser()) {
                    router.navigate("/logged");
                }
                else {
                    router.navigate("/login");
                }
            });
    });

    router.route("/login", function () {
        
        if (data.users.currentUser()) {
            router.navigate("/logged");
        }

        $("#login-container").show();
        $("#logout-container").hide();
        $("#main-content").html("");
    });

    router.route("/logged", function () {
        $("#login-container").hide();
        $("#logout-container").show();
        viewsFactory.getMainMenuView()
        .then(function (mainMenuHtml) {
            var view = new kendo.View(mainMenuHtml);
            appLayout.showIn("#main-content", view);
        });
    });

    router.route("/all-users", function () {
        if (!data.users.currentUser()) {
            router.navigate("/login");
        }

        $("#login-container").hide();
        $("#logout-container").show();
        
        viewsFactory.getUsersListView()
            .then(function (userListHtml) {

                vmFactory.getUserListModel(function (idParam) {
                    router.navigate("/user-details/" + idParam);
                })
                .then(function (vm) {;
                    var userListModel = vm;
                    var view = new kendo.View(userListHtml, { model: userListModel });
                    appLayout.showIn("#main-content", view)
                });
            });
    });

    router.route("/user-details/:id", function (id) {
        if (!data.users.currentUser()) {
            router.navigate("/login");
        }

        $("#login-container").hide();
        $("#logout-container").show();

        viewsFactory.getUserDetailsView()
        .then(function (userDetailsHtml) {
            vmFactory.getUserDetailModel(id,
                function () {
                    router.navigate("/all-users");
                }
            ).then(function (vm) {;
                var userDetailsModel = vm;
                var view = new kendo.View(userDetailsHtml, { model: userDetailsModel });
                appLayout.showIn("#main-content", view);
            },
                function (err) {
                    
                });
        });
    });

    router.route("/all-books", function () {
        if (!data.users.currentUser()) {
            router.navigate("/login");
        }

        $("#login-container").hide();
        $("#logout-container").show();

        viewsFactory.getBooksListView()
            .then(function (bookListHtml) {

                vmFactory.getBookListModel(function (idParam) {
                    router.navigate("/book-details/" + idParam);
                })
                .then(function (vm) {;
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
            vmFactory.getBookDetailModel(id,
                function () {
                    router.navigate("/all-books");
                }
            ).then(function (vm) {
                var bookDetailsModel = vm;
                var view = new kendo.View(bookDetailsHtml, { model: bookDetailsModel });
                appLayout.showIn("#main-content", view);
                var bookPublishDate = kendo.parseDate($("#publishDateId").val(), "yyyy-MM-ddTHH:mm");
                $("#publishDateId").kendoDatePicker({ format: "yyyy/MM/dd hh:mm tt", value: bookPublishDate });
            },
                function (err) {

                });
        });
    });

    $(function () {
        appLayout.render("#app");
        logoutLayout.render("#logout-div");
        router.start();
    });
}());