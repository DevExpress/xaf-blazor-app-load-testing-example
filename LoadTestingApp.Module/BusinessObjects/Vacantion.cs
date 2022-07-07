using DevExpress.Persistent.BaseImpl;
using DevExpress.Xpo;
using System;

namespace LoadTestingApp.Module.BusinessObjects {
    public class Vacantion : BaseObject {
        public Vacantion(Session session) : base(session) { }
        private DateTime startDate;
        public DateTime StartDate {
            get => startDate;
            set => SetPropertyValue(nameof(StartDate), ref startDate, value);
        }
        private DateTime endDate;
        public DateTime EndDate {
            get => endDate;
            set => SetPropertyValue(nameof(EndDate), ref endDate, value);
        }

        [Association("Employee-Vacantions")]
        public Employee Employee { get; set; }

        private string reason;
        public string Reason {
            get => reason;
            set => SetPropertyValue(nameof(Reason), ref reason, value);
        }
    }
}
