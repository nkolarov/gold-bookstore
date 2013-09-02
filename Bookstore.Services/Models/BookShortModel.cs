// ********************************
// <copyright file="BookShortModel.cs" company="Telerik Academy">
// Copyright (c) 2013 Telerik Academy. All rights reserved.
// </copyright>
// ********************************

namespace Bookstore.Services.Models
{
    using System;
    using System.Collections.Generic;
    using System.Runtime.Serialization;

    /// <summary>
    /// Represents a book short model.
    /// </summary>
    [DataContract]
    public class BookShortModel
    {
        [DataMember(Name = "id")]
        public int Id { get; set; }

        [DataMember(Name = "title")]
        public string Title { get; set; }

        [DataMember(Name = "publishDate")]
        public DateTime PublishDate { get; set; }

        [DataMember(Name = "coverUrl")]
        public string CoverUrl { get; set; }

        [DataMember(Name = "authorNames")]
        public IEnumerable<string> AuthorNames { get; set; }
    }
}