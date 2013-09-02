// ********************************
// <copyright file="BooksController.cs" company="Telerik Academy">
// Copyright (c) 2013 Telerik Academy. All rights reserved.
// </copyright>
// ********************************

namespace Bookstore.Services.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Web.Http;
    using System.Web.Http.ValueProviders;
    using Bookstore.Data;
    using Bookstore.Models;
    using Bookstore.Services.Attributes;
    using Bookstore.Services.Exceptions;
    using Bookstore.Services.Models;

    /// <summary>
    /// Represents a books controller.
    /// </summary>
    public class BooksController : BaseController
    {
        [HttpGet]
        public HttpResponseMessage GetByAuthorId(int authorId)
        {
            var responseMsg = this.PerformOperationAndHandleExceptions(() =>
            {
                BookstoreContext context = new BookstoreContext();
                var bookEntities = context.Books.Include("Authors")
                    .Where(b => b.Authors.Any(a => a.Id == authorId)).ToList();

                var bookModels = (from book in bookEntities
                                  select new BookShortModel()
                                  {
                                      Id = book.Id,
                                      Title = book.Title,
                                      PublishDate = book.PublishDate,
                                      AuthorNames = (from author in book.Authors
                                                     select author.FirstName + " " + author.LastName).ToList()
                                  });

                return Request.CreateResponse(HttpStatusCode.OK, bookModels);
            });

            return responseMsg;
        }

        [HttpGet]
        public HttpResponseMessage GetById(int id)
        {
            var responseMsg = this.PerformOperationAndHandleExceptions(() =>
            {
                BookstoreContext context = new BookstoreContext();
                var bookEntity = context.Books.Include("Authors")
                    .SingleOrDefault(b => b.Id == id);

                if (bookEntity == null)
                {
                    throw new ServerErrorException("Book does not exist");
                }

                var bookModel = new BookFullModel()
                {
                    Id = bookEntity.Id,
                    CoverUrl = bookEntity.CoverUrl,
                    PublishDate = bookEntity.PublishDate,
                    Title = bookEntity.Title,
                    Authors = new HashSet<AuthorModel>()
                };

                foreach (var author in bookEntity.Authors)
                {
                    bookModel.Authors.Add(new AuthorModel()
                    {
                        Id = author.Id,
                        FirstName = author.FirstName,
                        LastName = author.LastName,
                        BirthDate = author.BirthDate
                    });
                }

                return Request.CreateResponse(HttpStatusCode.OK, bookModel);
            });

            return responseMsg;
        }

        [HttpGet]
        public IEnumerable<BookShortModel> GetAll()
        {
            var responseMsg = this.PerformOperationAndHandleExceptions(() =>
            {
                BookstoreContext context = new BookstoreContext();
                var bookEntities = (from book in context.Books.Include("Authors").ToList()
                                    select new BookShortModel()
                                    {
                                        Id = book.Id,
                                        Title = book.Title,
                                        PublishDate = book.PublishDate,
                                        CoverUrl = book.CoverUrl,
                                        AuthorNames = (from author in book.Authors
                                                       select author.FirstName + " " + author.LastName).ToList()
                                    });



                return bookEntities;
            });

            return responseMsg;
        }

        [HttpGet]
        public HttpResponseMessage GetByTitle(string title)
        {
            var responseMsg = this.PerformOperationAndHandleExceptions(() =>
            {
                BookstoreContext context = new BookstoreContext();
                var bookEntities = context.Books.Include("Authors")
                    .Where(b => b.Title.ToLower().Contains(title.ToLower())).ToList();

                var bookModels = (from book in bookEntities
                                  select new BookShortModel()
                                  {
                                      Id = book.Id,
                                      Title = book.Title,
                                      PublishDate = book.PublishDate,
                                      AuthorNames = (from author in book.Authors
                                                     select author.FirstName + " " + author.LastName).ToList()
                                  });

                return Request.CreateResponse(HttpStatusCode.OK, bookModels);
            });

            return responseMsg;
        }

        /*[HttpPost]
        [ActionName("GetByDates")]
        public HttpResponseMessage GetByDateInterval([FromBody]DateIntervalModel model)
        {
            var responseMsg = this.PerformOperationAndHandleExceptions(() =>
            {
                BookstoreContext context = new BookstoreContext();
                var bookEntities = new List<Book>();
                
                if (model.StartDate == null)
                {
                    if (model.EndDate == null)
                    {
                        bookEntities = context.Books.Include("Authors").ToList();
                    }
                    else 
                    {
                        bookEntities = context.Books.Include("Authors")
                            .Where( b => b.PublishDate <= model.EndDate.Value).ToList();
                    }
                }
                else
                {
                    if (model.EndDate == null)
                    {
                        bookEntities = context.Books.Include("Authors")
                            .Where( b => b.PublishDate >= model.StartDate.Value).ToList();
                    }
                    else
                    {
                        bookEntities = context.Books.Include("Authors")
                            .Where( b => b.PublishDate >= model.StartDate.Value 
                                && b.PublishDate <= model.EndDate.Value).ToList();
                    }
                }

                var bookModels = (from book in bookEntities
                                  select new BookShortModel()
                                  {
                                      Id = book.Id,
                                      Title = book.Title,
                                      PublishDate = book.PublishDate,
                                      AuthorNames = (from author in book.Authors
                                                     select author.FirstName + " " + author.LastName).ToList()
                                  });

                return Request.CreateResponse(HttpStatusCode.OK, bookModels);
            });

            return responseMsg;
        }*/

        [HttpGet]
        [ActionName("GetByDates")]
        public HttpResponseMessage GetByDateInterval([ValueProvider(typeof(HeaderValueProviderFactory<string>))]
            string startDate, [ValueProvider(typeof(HeaderValueProviderFactory<string>))]
            string endDate)
        {
            var responseMsg = this.PerformOperationAndHandleExceptions(() =>
            {
                DateTime? StartDate = null;
                if (startDate != null)
                {
                    StartDate = DateTime.Parse(startDate, CultureInfo.InvariantCulture);
                }

                DateTime? EndDate = null;
                if (endDate != null)
                {
                    EndDate = DateTime.Parse(endDate, CultureInfo.InvariantCulture);
                }

                BookstoreContext context = new BookstoreContext();
                var bookEntities = new List<Book>();

                if (startDate == null)
                {
                    if (endDate == null)
                    {
                        bookEntities = context.Books.Include("Authors").ToList();
                    }
                    else
                    {
                        bookEntities = context.Books.Include("Authors")
                            .Where(b => b.PublishDate <= EndDate.Value).ToList();
                    }
                }
                else
                {
                    if (endDate == null)
                    {
                        bookEntities = context.Books.Include("Authors")
                            .Where(b => b.PublishDate >= StartDate.Value).ToList();
                    }
                    else
                    {
                        bookEntities = context.Books.Include("Authors")
                            .Where(b => b.PublishDate >= StartDate.Value
                                && b.PublishDate <= EndDate.Value).ToList();
                    }
                }

                var bookModels = (from book in bookEntities
                                  select new BookShortModel()
                                  {
                                      Id = book.Id,
                                      Title = book.Title,
                                      PublishDate = book.PublishDate,
                                      AuthorNames = (from author in book.Authors
                                                     select author.FirstName + " " + author.LastName).ToList()
                                  });

                return Request.CreateResponse(HttpStatusCode.OK, bookModels);
            });

            return responseMsg;
        }

        [HttpPut]
        public HttpResponseMessage UpdateBook([FromBody] BookShortModel bookModel,
            [ValueProvider(typeof(HeaderValueProviderFactory<string>))]string sessionKey)
        {
            var responseMsg = this.PerformOperationAndHandleExceptions(() =>
            {
                BookstoreContext context = new BookstoreContext();
                var bookEntity = context.Books.SingleOrDefault(u => u.Id == bookModel.Id);
                if (bookModel.Title != null)
                {
                    bookEntity.Title = bookModel.Title;
                }

                if (bookModel.PublishDate != null)
                {
                    bookEntity.PublishDate = bookModel.PublishDate;
                }

                if (bookModel.CoverUrl != null)
                {
                    bookEntity.CoverUrl = bookModel.CoverUrl;
                }

                context.SaveChanges();

                return Request.CreateResponse(HttpStatusCode.OK);
            });

            return responseMsg;
        }

        // /api/Books/DeleteBook/id
        [HttpDelete]
        public HttpResponseMessage DeleteBook(int id,
            [ValueProvider(typeof(HeaderValueProviderFactory<string>))]string sessionKey)
        {
            var responseMsg = this.PerformOperationAndHandleExceptions(() =>
            {
                BookstoreContext context = new BookstoreContext();
                var bookEntity = context.Books.SingleOrDefault(u => u.Id == id);
                if (bookEntity == null)
                {
                    throw new ServerErrorException("User does not exist.");
                }

                context.Books.Remove(bookEntity);
                context.SaveChanges();

                return Request.CreateResponse(HttpStatusCode.OK);
            });

            return responseMsg;
        }

        [HttpPost]
        public HttpResponseMessage CreateBook([FromBody]BookShortModel book,
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


                var bookToAdd = new Book();
                bookToAdd.Title = book.Title;
                if (book.PublishDate != null)
                {
                    bookToAdd.PublishDate = book.PublishDate;
                }

                bookToAdd.CoverUrl = book.CoverUrl;

                context.Books.Add(bookToAdd);
                context.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.Created);
            });

            return responseMsg;
        }
    }
}