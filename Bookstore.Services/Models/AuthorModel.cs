// ********************************
// <copyright file="AuthorModel.cs" company="Telerik Academy">
// Copyright (c) 2013 Telerik Academy. All rights reserved.
// </copyright>
// ********************************

namespace Bookstore.Services.Models
{
    using System;
    using System.Runtime.Serialization;

    /// <summary>
    /// Represents an author model.
    /// </summary>
    [DataContract]
    public class AuthorModel
    {
        [DataMember(Name = "id")]
        public int Id { get; set; }

        [DataMember(Name = "firstName")]
        public string FirstName { get; set; }

        [DataMember(Name = "lastName")]
        public string LastName { get; set; }

        [DataMember(Name = "birthDate")]
        public DateTime BirthDate { get; set; }
    }
}