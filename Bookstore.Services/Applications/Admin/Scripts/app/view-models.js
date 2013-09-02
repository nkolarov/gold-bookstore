/// <reference path="../libs/_references.js" />

window.vmFactory = (function () {
    var data = null;

    function getLogViewModel(successCallbackLogin, successCallbackLogout) {
        var viewModel = {
            username: localStorage.getItem("username") || "username",
            password: "password",
            login: function () {
                data.users.login(this.get("username"), this.get("password"))
					.then(function () {
					    if (successCallbackLogin) {
					        successCallbackLogin();
					    }
					}, function (err) {
					    
					    //this.set("message", err.responseJSON.Message);

					});
            },
            register: function () {
                data.users.register(this.get("username"), this.get("password"))
					.then(function () {
					    if (successCallbackLogin) {
					        successCallbackLogin();
					    }
					});
            },
            message: "",
            logout: function () {
                data.users.logout()
                .then(function () {
                    
                    if (successCallbackLogout) {
                        successCallbackLogout();
                    }
                }, function () {
                    
                    if (successCallbackLogout) {
                        successCallbackLogout();
                    }
                });
            }
        };
        return kendo.observable(viewModel);
    }

    function getLoginViewModel(successCallback) {
        var viewModel = {
            username: "username",
            password: "password",
            login: function () {
                data.users.login(this.get("username"), this.get("password"))
					.then(function () {
					    if (successCallback) {
					        successCallback();
					    }
					}, function (err) {
					    //this.set("message", err.responseJSON.Message);

					});
            },
            register: function () {
                data.users.register(this.get("username"), this.get("password"))
					.then(function () {
					    if (successCallback) {
					        successCallback();
					    }
					});
            },
            message: ""
        };
        return kendo.observable(viewModel);
    };

    function getLogoutModel(successCallback) {
        var viewModel = {
            logout: function () {
                data.users.logout()
                .then(function () {
                    if (successCallback) {
                        successCallback();
                    }
                }, function () {
                    if (successCallback) {
                        successCallback();
                    }
                });
            },
            username: localStorage.getItem("username")
        }

        return kendo.observable(viewModel);
    }

    function getUserListModel(functionCallback) {
        return data.users.getAll()
            .then(function (data) {
                var viewModel = {
                    users: data,
                    showDetails: function (ev) {
                        var id = $(ev.target).attr("user-id");
                        functionCallback(id);
                    }
                }

                return kendo.observable(viewModel);
            });
    }

    function getBookListModel(functionCallback) {
        return data.books.getAll()
            .then(function (data) {
                var viewModel = {
                    books: data,
                    showDetails: function (ev) {
                        var id = $(ev.target).attr("book-id");
                        functionCallback(id);
                    }
                }

                return kendo.observable(viewModel);
            });
    }

    function getUserDetailModel(id, sucess) {
        var vm = data.users.getUserById(id)
            .then(function (userDetails) {
                var viewModel = {
                    user: userDetails,
                    updateUserData: function (ev) {
                        var id = $(ev.target).attr("user-id");
                        data.users.update(id, this.get("user"))
                        .then(function () {
                            
                        },
                        function () {
                            sucess();
                        });
                        
                    }
                }

                return kendo.observable(viewModel);
            });

        return vm;
    }

    function getBookDetailModel(id, sucess) {
        var vm = data.books.getDetails(id)
            .then(function (bookDetails) {
                var viewModel = {
                    book: bookDetails,
                    updateBookData: function (ev) {
                        var id = $(ev.target).attr("book-id");
                        data.books.update(id, this.get("book"))
                        .then(function () {

                        },
                        function () {
                            sucess();
                        });

                    }
                }

                return kendo.observable(viewModel);
            });

        return vm;
    }

    return {
        getUserListModel: getUserListModel,
        getUserDetailModel: getUserDetailModel,
        getBookListModel: getBookListModel,
        getBookDetailModel: getBookDetailModel,
        getLoginVM: getLoginViewModel,
        getLogoutModel: getLogoutModel,
        getLogViewModel: getLogViewModel,
        setPersister: function (persister) {
            data = persister
        }
    };
}());