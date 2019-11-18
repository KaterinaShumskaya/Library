using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Library.Models
{
	public class Book : Entity
	{
        public string Title { get; set; }

        public string Author { get; set; }

        public string PublishedBy { get; set; }
	}
}