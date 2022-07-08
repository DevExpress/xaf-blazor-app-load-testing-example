using DevExpress.Persistent.Base;
using DevExpress.Persistent.BaseImpl;
using DevExpress.Xpo;

namespace LoadTestingApp.Module.BusinessObjects {
    [DefaultClassOptions]
    public class Level : BaseObject {
        public Level (Session session) : base (session) { }

        public string Name { get; set; }
        public string Description { get; set; }
    }
}
