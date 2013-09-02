// ********************************
// <copyright file="UserLoggedModel.cs" company="Telerik Academy">
// Copyright (c) 2013 Telerik Academy. All rights reserved.
// </copyright>
// ********************************

namespace Bookstore.Services.Models
{
    using System.Runtime.Serialization;

    /// <summary>
    /// Represents a user logged model.
    /// </summary>
    [DataContract]
    public class UserLoggedModel
    {
        [DataMember(Name = "displayName")]
        public string DisplayName { get; set; }

        [DataMember(Name = "sessionKey")]
        public string SessionKey { get; set; }
    }
}