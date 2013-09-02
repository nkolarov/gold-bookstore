// ********************************
// <copyright file="CommentModel.cs" company="Telerik Academy">
// Copyright (c) 2013 Telerik Academy. All rights reserved.
// </copyright>
// ********************************

namespace Bookstore.Services.Models
{
    using System.Runtime.Serialization;

    /// <summary>
    /// Represents a comment model.
    /// </summary>
    [DataContract]
    public class CommentModel
    {
        [DataMember(Name = "id")]
        public int Id { get; set; }

        [DataMember(Name = "text")]
        public string Text { get; set; }

        [DataMember(Name = "username")]
        public string Username { get; set; }

        [DataMember(Name = "bookTitle")]
        public string BookTitle { get; set; }
    }
}