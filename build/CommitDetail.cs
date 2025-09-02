using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace _build
{
    public class CommitDetail
    {
        public string Id { get; set; }
        public string Comment { get; set; }
        public CommitAuthor Author { get; set; }
        public DateTime Date { get; set; }
    }
}
