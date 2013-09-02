window.persisters = (function () {
	var sessionKey = "";
	var username = "";
	function getJSON(requestUrl, headers) {
		var promise = new RSVP.Promise(function (resolve, reject) {
			$.ajax({
				url: requestUrl,
				type: "GET",
				dataType: "json",
				headers: headers,
				success: function (data) {
					resolve(data);
				},
				error: function (err) {
					reject(err);
				}
			});
		});
		return promise;
	}

	function deleteJSON(requestUrl, headers) {
	    var promise = new RSVP.Promise(function (resolve, reject) {
	        $.ajax({
	            url: requestUrl,
	            type: "DELETE",
	            dataType: "json",
	            headers: headers,
	            success: function (data) {
	                resolve(data);
	            },
	            error: function (err) {
	                reject(err);
	            }
	        });
	    });
	    return promise;
	}

	function postJSON(requestUrl, data, headers) {
		var promise = new RSVP.Promise(function (resolve, reject) {
			$.ajax({
				url: requestUrl,
				type: "POST",
				contentType: "application/json",
				data: JSON.stringify(data),
				dataType: "json",
				headers: headers,
				success: function (data) {
					resolve(data);
				},
				error: function (err) {
					reject(err);
				}
			});
		});
		return promise;
	}

	function putJSON(requestUrl, data, headers) {
	    // debugger;
	    var promise = new RSVP.Promise(function (resolve, reject) {
	        $.ajax({
	            url: requestUrl,
	            type: "PUT",
	            contentType: "application/json",
	            data: JSON.stringify(data),
	            dataType: "json",
	            headers: headers,
	            success: function (data) {
	                resolve(data);
	            },
	            error: function (err) {
	                resolve(err);
	            }
	        });
	    });
	    return promise;
	}

	var UsersPersister = Class.create({
		init: function (apiUrl) {
			this.apiUrl = apiUrl;
		},
		login: function (username, password) {
			var user = {
				username: username,
				authCode: CryptoJS.SHA1(username + password).toString()
			};
			return postJSON(this.apiUrl + "login", user)
				.then(function (data) {
				    localStorage.setItem("sessionKey", data.sessionKey);
				    localStorage.setItem("username", data.displayName);
					sessionKey = data.sessionKey;
					username = data.displayName;
					//return data;
				});
		},
		register: function (username, password) {
			var user = {
				username: username,
				authCode: CryptoJS.SHA1(username + password).toString()
			};
			return postJSON(this.apiUrl + "register", user)
				.then(function (data) {
				    localStorage.setItem("sessionKey", data.sessionKey);
				    localStorage.setItem("username", data.displayName);
				    sessionKey = data.sessionKey;
				    //debugger;
					bashUsername = data.displayName;
					return data.displayName;
				});
		},
		logout: function () {
			if (!sessionKey) {
				//gyrmi
			}
			var headers = {
			    "X-sessionKey": localStorage.getItem("sessionKey")
			};
			localStorage.removeItem("sessionKey");
			sessionKey = "";
			localStorage.removeItem("username");
			username = "";
			// debugger;
			return putJSON(this.apiUrl + "logout", null, headers);
		},
		currentUser: function () {
			return localStorage.getItem("username");
		}
	});

	var CarsPersister = Class.create({
		init: function (apiUrl) {
			this.apiUrl = apiUrl;
		},
		all: function () {
			return getJSON(this.apiUrl);
		}
	});

	var BooksPersister = Class.create({
	    init: function (apiUrl) {
	        this.apiUrl = apiUrl;
	    },
	    getAll: function () {
	        var headers = {
	            "X-sessionKey": localStorage.getItem("sessionKey")
	        };

	        return getJSON(this.apiUrl + "GetAll", headers);
	    },
	    getDetails: function (id) {
	        var headers = {
	            "X-sessionKey": localStorage.getItem("sessionKey")
	        };

	        return getJSON(this.apiUrl + "GetById?id="+id, headers);
	    },
	    getByDate: function (start, end) {
	        var headers = {
	            "X-sessionKey": localStorage.getItem("sessionKey"),
	            "X-startDate": start,
                "X-endDate": end
	        };

	        return getJSON(this.apiUrl + "GetByDates", headers);
	    },
	    getByTitle: function (title) {
	        var headers = {
	            "X-sessionKey": localStorage.getItem("sessionKey")
	        };

            return getJSON(this.apiUrl + "GetByTitle?title=" + title, headers);
	    },
	    getByAuthor: function (authorId) {
	        var headers = {
	            "X-sessionKey": localStorage.getItem("sessionKey")
	        };

	        return getJSON(this.apiUrl + "GetByAuthorId?authorId=" + authorId, headers);
	    }
	});

	var CommentsPersister = Class.create({
	    init: function (apiUrl) {
	        this.apiUrl = apiUrl;
	    },
	    getById: function (id) {
	        var headers = {
	            "X-sessionKey": localStorage.getItem("sessionKey")
	        };

	        return getJSON(this.apiUrl + "?bookId=" + id, headers);
	    },
	    postComment: function (text, id) {
	        var headers = {
	            "X-sessionKey": localStorage.getItem("sessionKey")
	        };

	        var data = {
	            text: text,
                bookId: id
	        };

	        return postJSON(this.apiUrl + "?bookId=" + id, data, headers);
	    },
	    getAll: function () {
	        var headers = {
	            "X-sessionKey": localStorage.getItem("sessionKey")
	        };

	        return getJSON(this.apiUrl, headers);
	    },
	    deleteComment: function (id) {
	        var headers = {
	            "X-sessionKey": localStorage.getItem("sessionKey")
	        };

	        return deleteJSON(this.apiUrl + id, headers);
	    }
	});

	var AuthorsPersister = Class.create({
	    init: function (apiUrl) {
	        this.apiUrl = apiUrl;
	    },
	    getAll: function () {
	        var headers = {
	            "X-sessionKey": localStorage.getItem("sessionKey")
	        };

	        return getJSON(this.apiUrl, headers);
	    }
	})

	var DataPersister = Class.create({
		init: function (apiUrl) {
			this.apiUrl = apiUrl;
			this.users = new UsersPersister(apiUrl + "users/");
			this.books = new BooksPersister(apiUrl + "books/");
			this.cars = new CarsPersister(apiUrl + "cars/");
			this.comments = new CommentsPersister(apiUrl + "Comments/");
			this.authors = new AuthorsPersister(apiUrl + "Authors/");
		}
	});


	return {
		get: function (apiUrl) {
			return new DataPersister(apiUrl);
		}
	}
}());