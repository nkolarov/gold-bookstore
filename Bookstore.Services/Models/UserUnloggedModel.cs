// ********************************
// <copyright file="UserUnloggedModel.cs" company="Telerik Academy">
// Copyright (c) 2013 Telerik Academy. All rights reserved.
// </copyright>
// ********************************

namespace Bookstore.Services.Models
{
    using System.Runtime.Serialization;

    /// <summary>
    /// Represents a user unlogged model.
    /// </summary>
    [DataContract]
    public class UserUnloggedModel
    {
        [DataMember(Name = "username")]
        public string Username { get; set; }

        [DataMember(Name = "authCode")]
        public string AuthCode { get; set; }
    }
}