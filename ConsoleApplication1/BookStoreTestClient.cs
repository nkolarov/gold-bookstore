// ********************************
// <copyright file="BookStoreTestClient.cs" company="Telerik Academy">
// Copyright (c) 2013 Telerik Academy. All rights reserved.
// </copyright>
// ********************************

namespace BookStoreTestClient
{
    using System.Data.Entity;
    using Bookstore.Models;
    using Bookstore.Data;
    using Bookstore.Data.Migrations;

    public class BookStoreTestClient
    {
        public static void Main()
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<BookstoreContext, Configuration>());
            using (BookstoreContext context = new BookstoreContext())
            {
                var user = new User();
                user.Username = "Todor";
                user.AuthCode = "0123456789012345678901234567890123456789";
                context.Users.Add(user);
                context.SaveChanges();
            }
        }
    }
}
