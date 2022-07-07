using DevExpress.Persistent.Base;
using DevExpress.Persistent.BaseImpl;
using DevExpress.Xpo;

namespace LoadTestingApp.Module.BusinessObjects {
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

        private string notes;
        [Size(SizeAttribute.Unlimited)]
        public string Notes { 
            get => notes;
            set => SetPropertyValue(nameof(Notes), ref notes, value);
        }

        [Association("Employee-Vacantions")]
        public XPCollection<Vacantion> Vacantions { 
            get => GetCollection<Vacantion>(nameof(Vacantions));
        }

        private string githubProfile;
        public string GitHubProfile { 
            get => githubProfile;
            set => SetPropertyValue(nameof(GitHubProfile), ref githubProfile, value);
        }

        private string stackoverflowProfile;
        public string StackoverflowProfile {
            get => stackoverflowProfile;
            set => SetPropertyValue(nameof(StackoverflowProfile), ref stackoverflowProfile, value);
        }

        private string linkedinProfile;
        public string LinkedinProfile {
            get => linkedinProfile;
            set => SetPropertyValue(nameof(LinkedinProfile), ref linkedinProfile, value);
        }
    }
}
