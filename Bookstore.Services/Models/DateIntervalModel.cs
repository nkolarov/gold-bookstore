// ********************************
// <copyright file="DateIntervalModel.cs" company="Telerik Academy">
// Copyright (c) 2013 Telerik Academy. All rights reserved.
// </copyright>
// ********************************

namespace Bookstore.Services.Models
{
    using System;
    using System.Runtime.Serialization;

    /// <summary>
    /// Represents a date interval model.
    /// </summary>
    [DataContract]
    public class DateIntervalModel
    {
        [DataMember(Name = "startDate")]
        public DateTime? StartDate { get; set; }

        [DataMember(Name = "endDate")]
        public DateTime? EndDate { get; set; }
    }
}