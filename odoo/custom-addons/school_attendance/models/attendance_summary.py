# Part of the School Attendance module. See README.md for integration constraints.

from collections import Counter


ATTENDANCE_STATUSES = ('hadir', 'izin', 'sakit', 'alpa')


def summarize_statuses(statuses):
    """Count explicitly recorded statuses without assigning missing days.

    Callers must supply only attendance records in their requested date range.
    Calendar days, holidays, and unrecorded dates are intentionally absent from
    this result because their business treatment has not been defined.
    """
    counts = Counter(statuses)
    invalid_statuses = set(counts).difference(ATTENDANCE_STATUSES)
    if invalid_statuses:
        invalid_values = ', '.join(sorted(map(str, invalid_statuses)))
        raise ValueError(f'Unsupported attendance status: {invalid_values}')

    return {
        'hadir': counts['hadir'],
        'izin': counts['izin'],
        'sakit': counts['sakit'],
        'alpa': counts['alpa'],
        'recorded_days': sum(counts.values()),
    }
