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
					    // debugger;
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
                    // debugger;
                    if (successCallbackLogout) {
                        successCallbackLogout();
                    }
                }, function () {
                    // debugger;
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
					    // debugger;
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

    function getCarsViewModel() {
        return data.cars.all()
			.then(function (cars) {
			    var viewModel = {
			        cars: cars,
			        message: ""
			    };
			    return kendo.observable(viewModel);
			});
    }

    function getLogoutModel(successCallback) {
        var viewModel = {
            logout: function () {
                data.users.logout()
                .then(function () {
                    // debugger;
                    if (successCallback) {
                        successCallback();
                    }
                }, function () {
                    // debugger;
                    if (successCallback) {
                        successCallback();
                    }
                });
            },
            username: localStorage.getItem("username")
        }

        return kendo.observable(viewModel);
    }

    /*function getMainMenuModel(successCallback) {
	    var viewModel = {
	        logout: function () {
	            data.users.logout()
                .then(function () {
                    // debugger;
                    if (successCallback) {
                        successCallback();
                    }
                }, function () {
                    // debugger;
                    if (successCallback) {
                        successCallback();
                    }
                });
	        }
	    }

	    return kendo.observable(viewModel);
	}*/

    function getBookListModel(functionCallback) {
        return data.books.getAll()
            .then(function (data) {
                // debugger;
                for (var i = 0; i < data.length; i++) {
                    var currentDate = data[i]["publishDate"];
                    var dateParts = currentDate.split("-");
                    var transformedDate = dateParts[0] + "-" + dateParts[1] + "-" + dateParts[2].substring(0, 2);
                    data[i]["publishDate"] = transformedDate;
                }

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

    function getBookDetailModel(id, callbackFunction) {
        var vm = data.books.getDetails(id)
            .then(function (bookDetails) {
                // debugger;
                var currentDate = bookDetails["publishDate"];
                var dateParts = currentDate.split("-");
                var transformedDate = dateParts[0] + "-" + dateParts[1] + "-" + dateParts[2].substring(0, 2);
                bookDetails["publishDate"] = transformedDate;
                var usr = data.comments.getById(id)
                    .then(function (commentDetails) {
                        // debugger;
                        var viewModel = {
                            book: [bookDetails],
                            comments: commentDetails,
                            postedCommentText: "",
                            postComment: function (ev) {
                                // debugger;
                                var commentText = this.get("postedCommentText");
                                var id = $(ev.target).attr("book-id");
                                var transition = this;
                                data.comments.postComment(commentText, id).then(function () {
                                    // debugger;
                                    //callbackFunction();
                                },
                                function () {
                                    // debugger;
                                    data.comments.getById(id)
                                        .then(function (data) {
                                            transition.set("comments", data);
                                        });
                                    //transition.set("comments", []);
                                    //callbackFunction();
                                });
                            }
                        }

                        return kendo.observable(viewModel);
                    });

                return usr;
            });

        return vm;
    }

    function getCommentsListViewModel() {
        var vm = data.comments.getAll()
            .then(function (comments) {
                // debugger;
                var viewModel = {
                    comments: comments,
                    deleteComment: function (ev) {
                        var id = $(ev.target).attr("comment-id");
                        var transition = this;
                        data.comments.deleteComment(id)
                            .then(
                            function () {
                                // debugger;
                                data.comments.getAll()
                                    .then(function (commentData) {
                                        transition.set("comments", commentData);
                                    });
                            },
                            function () {
                                // debugger;
                                data.comments.getAll()
                                    .then(function (commentData) {
                                        transition.set("comments", commentData);
                                    });
                            });
                    }
                }

                return kendo.observable(viewModel);
            });

        return vm;
    }

    function getSearchByDateViewModel(functionCallback) {
        var viewModel = {
            startDate: "",
            endDate: "",
            books: [],
            showDetails: function (ev) {
                // debugger;
                var id = $(ev.target).attr("book-id");
                functionCallback(id);
            },
            searchByDate: function () {
                // debugger;
                var startDateData = this.get("startDate");
                startDateData = kendo.toString(startDateData, "MM/dd/yyyy");
                var endDateData = this.get("endDate");
                endDateData = kendo.toString(endDateData, "MM/dd/yyyy");
                var transition = this;
                data.books.getByDate(startDateData, endDateData)
                    .then(function (data) {
                        for (var i = 0; i < data.length; i++) {
                            var currentDate = data[i]["publishDate"];
                            var dateParts = currentDate.split("-");
                            var transformedDate = dateParts[0] + "-" + dateParts[1] + "-" + dateParts[2].substring(0, 2);
                            data[i]["publishDate"] = transformedDate;
                        }

                        transition.set("books", data);
                    });
            }
        };

        // debugger;
        return kendo.observable(viewModel);
    }

    function getSearchTitleViewModel(functionCallback) {
        var viewModel = {
            title: "",
            books: [],
            showDetails: function (ev) {
                // debugger;
                var id = $(ev.target).attr("book-id");
                functionCallback(id);
            },
            searchByTitle: function () {
                var transition = this;
                var titleData = this.get("title");
                data.books.getByTitle(titleData)
                    .then(function (data) {
                        for (var i = 0; i < data.length; i++) {
                            var currentDate = data[i]["publishDate"];
                            var dateParts = currentDate.split("-");
                            var transformedDate = dateParts[0] + "-" + dateParts[1] + "-" + dateParts[2].substring(0, 2);
                            data[i]["publishDate"] = transformedDate;
                        }

                        transition.set("books", data);
                    });
            }
        };

        return kendo.observable(viewModel);
    }

    function getSearchAuthorViewModel(functionCallback) {
        return data.authors.getAll()
            .then(function (authors) {
                for (var i = 0, len = authors.length; i < len; i++) {
                    var fullName = authors[i]["firstName"] + " " + authors[i]["lastName"];
                    authors[i]["fullName"] = fullName;
                }

                if (authors.length > 0) {
                    return data.books.getByAuthor(authors[0]["id"])
                        .then(function (books) {
                            var viewModel = {
                                authors: authors,
                                books: books,
                                authorIdValue: authors[0]["id"] || 1,
                                showDetails: function (ev) {
                                    var id = $(ev.target).attr("book-id");
                                    functionCallback(id);
                                },
                                changeBooks: function () {
                                    //var authorId = $("#select-author-field").val();
                                    // debugger;
                                    var authorId = this.get("authorIdValue");
                                    var transition = this;
                                    data.books.getByAuthor(authorId)
                                        .then(function (data) {
                                            // debugger;
                                            transition.set("books", data);
                                        });
                                }
                            }

                            return kendo.observable(viewModel);
                        });
                }
                else {
                    var viewModel = {
                        authors: authors,
                        books: [],
                        authorIdValue: authors[0]["id"] || 1,
                        showDetails: function (ev) {
                            var id = $(ev.target).attr("book-id");
                            functionCallback(id);
                        },
                        changeBooks: function () {
                            //var authorId = $("#select-author-field").val();
                            // debugger;
                            var authorId = this.get("authorIdValue");
                            var transition = this;
                            data.books.getByAuthor(authorId)
                                .then(function (data) {
                                    // debugger;
                                    transition.set("books", data);
                                });
                        }
                    }

                    return kendo.observable(viewModel);
                }
            }
            );
    }

    return {
        getLoginVM: getLoginViewModel,
        getCarsVM: getCarsViewModel,
        //getMainMenuModel: getMainMenuModel,
        getLogoutModel: getLogoutModel,
        getBookListModel: getBookListModel,
        getBookDetailModel: getBookDetailModel,
        getCommentsListViewModel: getCommentsListViewModel,
        getSearchByDateViewModel: getSearchByDateViewModel,
        getSearchTitleViewModel: getSearchTitleViewModel,
        getSearchAuthorViewModel: getSearchAuthorViewModel,
        getLogViewModel: getLogViewModel,
        setPersister: function (persister) {
            data = persister
        }
    };
}());