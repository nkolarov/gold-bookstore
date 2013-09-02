// ********************************
// <copyright file="Comment.cs" company="Telerik Academy">
// Copyright (c) 2013 Telerik Academy. All rights reserved.
// </copyright>
// ********************************

namespace Bookstore.Models
{
    using System.ComponentModel.DataAnnotations;

    /// <summary>
    /// Represents a comment.
    /// </summary>
    public class Comment
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Text { get; set; }

        public virtual User User { get; set; }

        public virtual Book Book { get; set; }
    }
}
