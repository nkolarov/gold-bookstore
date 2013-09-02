// ********************************
// <copyright file="BookstoreContext.cs" company="Telerik Academy">
// Copyright (c) 2013 Telerik Academy. All rights reserved.
// </copyright>
// ********************************

namespace Bookstore.Data
{
    using Bookstore.Models;
    using System.Data.Entity;

    /// <summary>
    /// Represents a bookstore context.
    /// </summary>
    public class BookstoreContext : DbContext
    {
        public BookstoreContext() :
            base("BookstoreDb")
        { 
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Author> Authors { get; set; }

        public DbSet<Comment> Comments { get; set; }

        public DbSet<Book> Books { get; set; }
    }
}
