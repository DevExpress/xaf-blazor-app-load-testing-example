using DevExpress.Persistent.Base;
using DevExpress.Persistent.BaseImpl;
using DevExpress.Xpo;

namespace LoadTestingApp.Module {
    [DefaultClassOptions]
    public class Employee : Person {
        public Employee (Session session) : base (session) { }

        private Employee manager;
        [DataSourceProperty("Department.Employees", DataSourcePropertyIsNullMode.SelectAll)]
        [DataSourceCriteria("Position.Title = 'Manager' AND Oid != '@This.Oid'")]
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
