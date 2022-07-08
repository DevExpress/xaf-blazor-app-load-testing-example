using DevExpress.Persistent.Base;
using DevExpress.Persistent.BaseImpl;
using DevExpress.Xpo;

namespace LoadTestingApp.Module.BusinessObjects {
    [DefaultClassOptions]
    public class Workplace : BaseObject {
        public Workplace(Session session) : base(session) { }

        public string Room { get; set; }
        public string ComputerId { get; set; }
    }
}
