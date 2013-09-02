// ********************************
// <copyright file="BookFullModel.cs" company="Telerik Academy">
// Copyright (c) 2013 Telerik Academy. All rights reserved.
// </copyright>
// ********************************

namespace Bookstore.Services.Models
{
    using System;
    using System.Collections.Generic;
    using System.Runtime.Serialization;

    /// <summary>
    /// Represents a book full model.
    /// </summary>
    [DataContract]
    public class BookFullModel
    {
        [DataMember(Name = "id")]
        public int Id { get; set; }

        [DataMember(Name = "title")]
        public string Title { get; set; }

        [DataMember(Name = "publishDate")]
        public DateTime PublishDate { get; set; }

        [DataMember(Name = "coverUrl")]
        public string CoverUrl { get; set; }

        [DataMember(Name = "authors")]
        public ICollection<AuthorModel> Authors { get; set; }

        public BookFullModel()
        {
            this.Authors = new HashSet<AuthorModel>();
        }
    }
}