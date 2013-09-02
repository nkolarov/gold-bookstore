// ********************************
// <copyright file="CommentPostModel.cs" company="Telerik Academy">
// Copyright (c) 2013 Telerik Academy. All rights reserved.
// </copyright>
// ********************************

namespace Bookstore.Services.Models
{
    using System.Runtime.Serialization;

    /// <summary>
    /// Represents a comment post model.
    /// </summary>
    [DataContract]
    public class CommentPostModel
    {
        [DataMember(Name = "text")]
        public string Text { get; set; }

        [DataMember(Name = "bookId")]
        public int BookId { get; set; }
    }
}