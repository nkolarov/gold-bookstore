window.persisters = (function () {
	var sessionKey = "";
	var username = "";
	var UsersPersister = Class.create({
		init: function (apiUrl) {
			this.apiUrl = apiUrl;
		},
		login: function (username, password) {
			var user = {
				username: username,
				authCode: CryptoJS.SHA1(username + password).toString()
			};
			return httpRequester.postJSON(this.apiUrl + "login", user)
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
			return httpRequester.postJSON(this.apiUrl + "register", user)
				.then(function (data) {
				    localStorage.setItem("sessionKey", data.sessionKey);
				    localStorage.setItem("username", data.displayName);
					sessionKey = data.sessionKey;
					bashUsername = data.displayName;
					return data.displayName;
				});
		},
		logout: function () {
			var headers = {
			    "X-sessionKey": localStorage.getItem("sessionKey")
			};
			localStorage.removeItem("sessionKey");
			sessionKey = "";
			localStorage.removeItem("username");
			username = "";
			return httpRequester.putJSON(this.apiUrl + "logout", null, headers);
		},
		getAll: function () {
		    var headers = {
		        "X-sessionKey": localStorage.getItem("sessionKey")
		    };

		    return httpRequester.getJSON(this.apiUrl, headers);
		},
		getUserById: function (id) {
		    var headers = {
		        "X-sessionKey": localStorage.getItem("sessionKey")
		    };

		    return httpRequester.getJSON(this.apiUrl + "/details?id=" + id, headers);
		},
		update: function (id, userModel) {
		    var headers = {
		        "X-sessionKey": localStorage.getItem("sessionKey")
		    };
		    return httpRequester.putJSON(this.apiUrl + "/update", userModel, headers);
		},
		currentUser: function () {
			return localStorage.getItem("username");
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

	        return httpRequester.getJSON(this.apiUrl + "GetAll", headers);
	    },
	    getDetails: function (id) {
	        var headers = {
	            "X-sessionKey": localStorage.getItem("sessionKey")
	        };

	        return httpRequester.getJSON(this.apiUrl + "GetById?id=" + id, headers);
	    },
	    getByDate: function (start, end) {
	        var headers = {
	            "X-sessionKey": localStorage.getItem("sessionKey"),
	            "X-startDate": start,
	            "X-endDate": end
	        };

	        return httpRequester.getJSON(this.apiUrl + "GetByDates", headers);
	    },
	    getByTitle: function (title) {
	        var headers = {
	            "X-sessionKey": localStorage.getItem("sessionKey")
	        };

	        return httpRequester.getJSON(this.apiUrl + "GetByTitle?title=" + title, headers);
	    },
	    getByAuthor: function (authorId) {
	        var headers = {
	            "X-sessionKey": localStorage.getItem("sessionKey")
	        };

	        return httpRequester.getJSON(this.apiUrl + "GetByAuthorId?authorId=" + authorId, headers);
	    },
	    update: function (id, bookModel) {
	        var headers = {
	            "X-sessionKey": localStorage.getItem("sessionKey")
	        };
	        return httpRequester.putJSON(this.apiUrl + "/UpdateBook", bookModel, headers);
	    },
	});

	var DataPersister = Class.create({
		init: function (apiUrl) {
			this.apiUrl = apiUrl;
			this.users = new UsersPersister(apiUrl + "users/");
			this.books = new BooksPersister(apiUrl + "books/");
		}
	});

	return {
		get: function (apiUrl) {
			return new DataPersister(apiUrl);
		}
	}
}());