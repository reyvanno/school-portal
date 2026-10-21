# School Attendance

## Scope and current state

This addon is an independently developed foundation for the `school_attendance`
domain on Odoo 19.0. It does not create a Student, Class, Teacher, Parent, or
User master model, and it does not depend on `hr_attendance`.

### [REQUIREMENT]

- `school_attendance` owns attendance records, student achievement/violation
  notes, and monthly attendance recap behavior.
- `school_academic` owns Student and Class master data.
- The independently agreed attendance statuses are `hadir`, `izin`, `sakit`,
  and `alpa`.
- An attendance record has an attendance date, status, and optional
  explanation/notes. Odoo's standard audit fields provide the recording user
  (`create_uid`) and timestamps (`create_date`, `write_date`) for concrete
  models that retain Odoo's default access logging.
- Missing records must not be treated as `hadir` or `alpa`.
- Odoo ORM is the only permitted database access path.

### [DESIGN INFERENCE]

- `school.attendance.record.mixin` provides common daily fields as an abstract
  model. A later concrete record model should inherit it after the verified
  Student relation is available.
- `summarize_statuses()` counts only supplied records. A future ORM query is
  responsible for selecting the date range before passing statuses to it.

### [TBD]

- The technical Student and Class model names and relationships supplied by
  `school_academic`.
- The concrete attendance-record model, its `student_id` field, and the
  duplicate-prevention rule (expected to be based on the verified student
  relation and attendance date).
- Whether `izin` or `sakit` requires an explanation; no such requirement is
  stated in the available protocol.
- Attendance-session workflow, official-holiday/calendar behavior, and the
  treatment of unrecorded school days. This module intentionally creates no
  calendar model and infers no absence from a missing record.
- Achievement/violation record fields, point scales, aggregation rules, and
  authorization. No notes model is created until those rules and the Student
  relation are verified.
- Access groups, record rules, portal authorization, JWT, controllers, and
  the OpenAPI response schema. No HTTP API is included.

## Decision record

### DEC-SA-001 — Recorded-status summary scope

- **Status:** [DESIGN INFERENCE]
- **What it counts:** `summarize_statuses()` counts only the supplied,
  explicitly recorded status values. `recorded_days` is the total number of
  those supplied records, including every supported status.
- **What it does not calculate:** calendar days, expected school days,
  official holidays (`libur`), unrecorded dates, attendance percentages, or
  an absence classification inferred from a date range.
- **Why missing dates remain unclassified:** a missing record is not evidence
  of `hadir`, `alpa`, or `libur`. Treating it as any of them would invent a
  business rule and could misstate attendance.
- **Future decisions requiring `school_academic`:** the verified Student
  relation is required for student-specific queries, duplicate prevention,
  record ownership, and authorization.
- **Future decisions requiring a school calendar policy:** expected school
  days, official holidays, date-range denominators, and whether an unrecorded
  expected school day should be escalated or classified.

## Integration plan

After `school_academic` supplies its actual model contract, add an explicit
manifest dependency and a concrete student-linked attendance model. That
change must include ORM-level duplicate prevention, backend access rights and
record rules, student/parent authorization tests, views, and API work only when
the shared authentication and OpenAPI contract are available.

## Tests

### Currently present

`tests/test_attendance_summary.py` verifies the abstract mixin declares a
required attendance date and status with exactly `hadir`, `izin`, `sakit`, and
`alpa`. It also covers status-summary arithmetic, empty input, and rejection
of invalid status values.

### Deferred: verified Student relation required

No test creates an attendance record because the verified Student model and
relation are unavailable. The following tests are deferred with that relation:

- duplicate prevention for the verified student and attendance date;
- date-range ORM summaries over real attendance records;
- record rules and authorization for students, parents, teachers, and staff;
- achievement/violation records and any point aggregation.

### Runtime requirement

The current tests use Odoo's `TransactionCase`; they require a working Odoo
runtime and test database. They have not been executed in this workspace.
