using DevExpress.ExpressApp;
using DevExpress.Data.Filtering;
using DevExpress.Persistent.Base;
using DevExpress.ExpressApp.Updating;
using DevExpress.Xpo;
using DevExpress.ExpressApp.Xpo;
using DevExpress.Persistent.BaseImpl;
using LoadTestingApp.Module.BusinessObjects;

namespace LoadTestingApp.Module.DatabaseUpdate;

// For more typical usage scenarios, be sure to check out https://docs.devexpress.com/eXpressAppFramework/DevExpress.ExpressApp.Updating.ModuleUpdater
public class Updater : ModuleUpdater {
    private const int notesCount = 2000;
    private const int employeesCount = 5;
    public Updater(IObjectSpace objectSpace, Version currentDBVersion) :
        base(objectSpace, currentDBVersion) {
    }
    public override void UpdateDatabaseAfterUpdateSchema() {
        base.UpdateDatabaseAfterUpdateSchema();

        for (int i = 0; i < employeesCount; i++) {
            string employeeName = string.Format("Employee {0}", i);

            Employee employee = ObjectSpace.FirstOrDefault<Employee>(employee => employee.FirstName == employeeName);

            if (employee == null) {
                employee = ObjectSpace.CreateObject<Employee>();
                employee.FirstName = employeeName;
            }
        }

        for (int i = 0; i < notesCount; i++) {
            string noteName = string.Format("Note {0}", i);
            string noteDescription = string.Format("This is sticky note {0}", i);

            StickyNote note = ObjectSpace.FirstOrDefault<StickyNote>(note => note.Name == noteName);

            if (note == null) {
                note = ObjectSpace.CreateObject<StickyNote>();
                note.Name = noteName;
                note.Description = noteDescription;
            }
        }

        ObjectSpace.CommitChanges();
    }
    public override void UpdateDatabaseBeforeUpdateSchema() {
        base.UpdateDatabaseBeforeUpdateSchema();
        //if(CurrentDBVersion < new Version("1.1.0.0") && CurrentDBVersion > new Version("0.0.0.0")) {
        //    RenameColumn("DomainObject1Table", "OldColumnName", "NewColumnName");
        //}
    }
}
