# Part of the School Attendance module. See README.md for integration constraints.

from odoo.tests.common import TransactionCase

from odoo.addons.school_attendance.models.attendance_summary import summarize_statuses


class TestAttendanceSummary(TransactionCase):

    def test_mixin_declares_required_daily_fields_and_statuses(self):
        attendance_fields = self.env['school.attendance.record.mixin']._fields

        self.assertTrue(attendance_fields['attendance_date'].required)
        self.assertTrue(attendance_fields['status'].required)
        self.assertEqual(
            {value for value, _label in attendance_fields['status'].selection},
            {'hadir', 'izin', 'sakit', 'alpa'},
        )

    def test_counts_all_supported_statuses(self):
        summary = summarize_statuses(['hadir', 'hadir', 'izin', 'sakit', 'alpa'])

        self.assertEqual(summary, {
            'hadir': 2,
            'izin': 1,
            'sakit': 1,
            'alpa': 1,
            'recorded_days': 5,
        })

    def test_counts_each_supported_status_independently(self):
        for status in ('hadir', 'izin', 'sakit', 'alpa'):
            with self.subTest(status=status):
                summary = summarize_statuses([status])

                self.assertEqual(summary[status], 1)
                self.assertEqual(summary['recorded_days'], 1)

    def test_empty_input_is_not_converted_to_attendance_or_absence(self):
        self.assertEqual(summarize_statuses([]), {
            'hadir': 0,
            'izin': 0,
            'sakit': 0,
            'alpa': 0,
            'recorded_days': 0,
        })

    def test_rejects_invalid_status_values(self):
        for invalid_status in ('unknown', None, 0):
            with self.subTest(invalid_status=invalid_status):
                with self.assertRaises(ValueError):
                    summarize_statuses(['hadir', invalid_status])
