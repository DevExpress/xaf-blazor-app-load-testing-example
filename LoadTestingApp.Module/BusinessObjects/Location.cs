using DevExpress.Persistent.Base;
using DevExpress.Persistent.BaseImpl;
using DevExpress.Xpo;

namespace LoadTestingApp.Module.BusinessObjects {
    [DefaultClassOptions]
    public class Location : BaseObject {
        public Location(Session session) : base(session) { }

        public string Name { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string City { get; set; }
    }
}
