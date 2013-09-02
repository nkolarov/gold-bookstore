// UserFullModel
// <copyright file="BookFullModel.cs" company="Telerik Academy">
// Copyright (c) 2013 Telerik Academy. All rights reserved.
// </copyright>
// ********************************

namespace Bookstore.Services.Models
{
    using System.Runtime.Serialization;

    /// <summary>
    /// Represents a user full model.
    /// </summary>
    [DataContract]
    public class UserFullModel
    {
        [DataMember(Name = "id")]
        public int Id { get; set; }

        [DataMember(Name = "userName")]
        public string Username { get; set; }

        [DataMember(Name = "authCode")]
        public string AuthCode { get; set; }

        [DataMember(Name = "isAdmin")]
        public bool? IsAdmin { get; set; }

        [DataMember(Name = "isActive")]
        public bool? IsActive { get; set; }
    }
}