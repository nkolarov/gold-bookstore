// ********************************
// <copyright file="AuthorsController.cs" company="Telerik Academy">
// Copyright (c) 2013 Telerik Academy. All rights reserved.
// </copyright>
// ********************************

namespace Bookstore.Services.Controllers
{
    using System;
    using System.Linq;
    using System.Web.Http;
    using System.Web.Http.ValueProviders;
    using Bookstore.Data;
    using Bookstore.Services.Attributes;
    using Bookstore.Services.Models;

    /// <summary>
    /// Represents an authors controller.
    /// </summary>
    public class AuthorsController : BaseController
    {
        [HttpGet]
        public IQueryable<AuthorModel> GetAll(
            [ValueProvider(typeof(HeaderValueProviderFactory<string>))] string sessionKey)
        {
            var responseMsg = this.PerformOperationAndHandleExceptions(() =>
            {
                var context = new BookstoreContext();

                var user = context.Users.FirstOrDefault(usr => usr.SessionKey == sessionKey);
                if (user == null)
                {
                    throw new InvalidOperationException("Invalid username or password");
                }

                var authorEntities = context.Authors;
                var models =
                    (from authorEntity in authorEntities
                     select new AuthorModel()
                     {
                         Id = authorEntity.Id,
                         FirstName = authorEntity.FirstName,
                         LastName = authorEntity.LastName,
                         BirthDate = authorEntity.BirthDate
                     });
                return models;
            });

            return responseMsg;
        }
    }
}