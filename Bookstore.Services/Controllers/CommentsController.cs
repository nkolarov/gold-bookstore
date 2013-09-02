// ********************************
// <copyright file="CommentsController.cs" company="Telerik Academy">
// Copyright (c) 2013 Telerik Academy. All rights reserved.
// </copyright>
// ********************************

namespace Bookstore.Services.Controllers
{
    using System;
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
    /// Represents a comments controller.
    /// </summary>
    public class CommentsController : BaseController
    {
        // /api/comments?userId=1
        [HttpGet]
        public IQueryable<CommentModel> GetByUser(
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

                var commentEntities = context.Comments.Include("User").Include("Book")
                    .Where(c => c.User.Id == user.Id);
                var models =
                    (from commentEntity in commentEntities
                     select new CommentModel()
                     {
                         Id = commentEntity.Id,
                         BookTitle = commentEntity.Book.Title,
                         Text = commentEntity.Text,
                         Username = commentEntity.User.Username
                     });
                return models;
            });

            return responseMsg;
        }

        // /api/comments?bookId=1
        [HttpGet]
        public IQueryable<CommentModel> GetByBookId(int bookId,
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

                var commentEntities = context.Comments.Include("User").Include("Book")
                    .Where(c => c.Book.Id == bookId);
                var models =
                    (from commentEntity in commentEntities
                     select new CommentModel()
                     {
                         Id = commentEntity.Id,
                         BookTitle = commentEntity.Book.Title,
                         Text = commentEntity.Text,
                         Username = commentEntity.User.Username
                     });
                return models;
            });

            return responseMsg;
        }

        // /api/comments/add
        [ActionName("add")]
        [HttpPost]
        public HttpResponseMessage PostComment([FromBody]CommentPostModel comment,
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

                var book = context.Books.SingleOrDefault(b => b.Id == comment.BookId);
                if (book == null)
                {
                    throw new ServerErrorException("Book to comment does not exist.");
                }

                var commentToAdd = new Comment();
                commentToAdd.Text = comment.Text;
                commentToAdd.User = user;
                commentToAdd.Book = book;
                context.Comments.Add(commentToAdd);
                context.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.Created);
            });

            return responseMsg;
        }

        [HttpDelete]
        public HttpResponseMessage DeleteComment(int id,
            [ValueProvider(typeof(HeaderValueProviderFactory<string>))]string sessionKey)
        {
            var responseMsg = this.PerformOperationAndHandleExceptions(() =>
            {
                var context = new BookstoreContext();

                var user = context.Users.FirstOrDefault(usr => usr.SessionKey == sessionKey);
                if (user == null)
                {
                    throw new UnauthorizedAccessException("Invalid username or password");
                }

                var commentEntity = context.Comments.Include("User").SingleOrDefault(u => u.Id == id);
                if (commentEntity == null)
                {
                    throw new ServerErrorException("User does not exist.");
                }

                if (commentEntity.User.Id != user.Id)
                {
                    throw new ServerErrorException("You do not have permissions to delete other users' comments.");
                }

                context.Comments.Remove(commentEntity);
                context.SaveChanges();

                return Request.CreateResponse(HttpStatusCode.OK);
            });

            return responseMsg;
        }
    }
}