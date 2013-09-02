// ********************************
// <copyright file="HomeController.cs" company="Telerik Academy">
// Copyright (c) 2013 Telerik Academy. All rights reserved.
// </copyright>
// ********************************

namespace Bookstore.Services.Controllers
{
    using System.Web.Mvc;

    /// <summary>
    /// Represents a home controller.
    /// </summary>
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}
