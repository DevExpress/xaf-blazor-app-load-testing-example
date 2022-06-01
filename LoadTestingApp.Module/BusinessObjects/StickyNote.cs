using DevExpress.Persistent.Base;
using DevExpress.Persistent.BaseImpl;
using DevExpress.Xpo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LoadTestingApp.Module.BusinessObjects {
    [DefaultClassOptions]
    public class StickyNote : BaseObject
    {
        public StickyNote(Session session) : base(session) { }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
