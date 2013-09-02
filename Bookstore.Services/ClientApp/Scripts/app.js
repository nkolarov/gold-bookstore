/// <reference path="libs/_references.js" />


(function () {
	var appLayout =
		new kendo.Layout('<div id="main-content"></div>');
	var data = persisters.get("api/");
	vmFactory.setPersister(data);

	var router = new kendo.Router();
	router.route("/", function () {
		/*viewsFactory.getCarsView()
			.then(function (carsViewHtml) {
				vmFactory.getCarsVM()
				.then(function (vm) {
					var view =
						new kendo.View(carsViewHtml,
						{ model: vm });
					appLayout.showIn("#main-content", view);
				}, function (err) {
					//...
				});
			});*/

	    if (data.users.currentUser()) {
	        router.navigate("/logged");
	    }
	    else {
	        router.navigate("/login");
	    }
	});

	router.route("/login", function () {
		// // debugger;
		if (data.users.currentUser()) {
			router.navigate("/");
		}
		else {
			viewsFactory.getLoginView()
				.then(function (loginViewHtml) {
					var loginVm = vmFactory.getLoginVM(
						function () {
							router.navigate("/");
						});
					var view = new kendo.View(loginViewHtml,
						{ model: loginVm });
					appLayout.showIn("#main-content", view);
				});
		}

	    //console.log('is not logged');
	});

	router.route("/logged", function () {
	    console.log('islogged');
	});

	//only for registered users
	router.route("/special", function () {
		if (!data.users.currentUser()) {
			router.navigate("/login");
		}
	});

	$(function () {
		appLayout.render("#app");
		router.start();
	});
}());