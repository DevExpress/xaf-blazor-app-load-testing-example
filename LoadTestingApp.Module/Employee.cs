using DevExpress.Persistent.Base;
using DevExpress.Persistent.BaseImpl;
using DevExpress.Xpo;

namespace LoadTestingApp.Module {
    [DefaultClassOptions]
    public class Employee : Person {
        public Employee (Session session) : base (session) { }

        private Employee manager;

        public Employee Manager {
            get {
                return manager;
            }
            set {
                SetPropertyValue(nameof(Manager), ref manager, value);
            }
        }
    }
}
