# Part of the School Attendance module. See README.md for integration constraints.

from odoo import fields, models


# [REQUIREMENT] The independent-domain task specifies these supported statuses.
ATTENDANCE_STATUS_SELECTION = [
    ('hadir', 'Hadir'),
    ('izin', 'Izin'),
    ('sakit', 'Sakit'),
    ('alpa', 'Alpa'),
]


class SchoolAttendanceRecordMixin(models.AbstractModel):
    """Common fields for a future student-linked daily attendance record.

    This is deliberately abstract: school_academic owns the Student model and
    its technical model name is not available in this workspace. A concrete
    model must add the verified student relation and duplicate constraint.
    """

    _name = 'school.attendance.record.mixin'
    _description = 'School Attendance Record Fields'

    attendance_date = fields.Date(required=True, index=True)
    status = fields.Selection(
        selection=ATTENDANCE_STATUS_SELECTION,
        required=True,
        index=True,
    )
    explanation = fields.Text()
