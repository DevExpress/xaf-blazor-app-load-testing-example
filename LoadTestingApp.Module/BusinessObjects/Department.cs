using DevExpress.Persistent.Base;
using DevExpress.Persistent.BaseImpl;
using DevExpress.Xpo;

namespace LoadTestingApp.Module.BusinessObjects {
    [DefaultClassOptions]
    public class Department : BaseObject {
        public Department(Session session) : base(session) { }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
