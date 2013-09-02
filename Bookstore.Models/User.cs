// ********************************
// <copyright file="User.cs" company="Telerik Academy">
// Copyright (c) 2013 Telerik Academy. All rights reserved.
// </copyright>
// ********************************

namespace Bookstore.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    /// <summary>
    /// Represents a user.
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Username { get; set; }
        
        [Required]
        public string AuthCode { get; set; }

        public string SessionKey { get; set; }

        public bool IsAdmin { get; set; }

        public bool IsActive { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }

        public User()
        {
            this.Comments = new HashSet<Comment>();
        }
    }
}
