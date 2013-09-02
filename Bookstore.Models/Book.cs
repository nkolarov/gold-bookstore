// ********************************
// <copyright file="Book.cs" company="Telerik Academy">
// Copyright (c) 2013 Telerik Academy. All rights reserved.
// </copyright>
// ********************************

namespace Bookstore.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    /// <summary>
    /// Represents a book.
    /// </summary>
    public class Book
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public DateTime PublishDate { get; set; }

        [Required]
        public string CoverUrl { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }

        public virtual ICollection<Author> Authors { get; set; }

        public Book()
        {
            this.Comments = new HashSet<Comment>();
            this.Authors = new HashSet<Author>();
        }
    }
}
