export const toHistoryItems = (patient) => {
    if (!patient?.medicalRecords?.length) return [];
    const fmt = new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    const safeDate = (d) => (d ? new Date(d) : null);
    const fmtOrDash = (d) => (d ? fmt.format(d) : '—');
    const diffDays = (a, b) => {
        if (!a || !b) return null;
        const ms = Math.abs(a.setHours(0, 0, 0, 0) - b.setHours(0, 0, 0, 0));
        return Math.max(1, Math.round(ms / (1000 * 60 * 60 * 24)));
    };

    return patient.medicalRecords.map((r) => {
        const start = safeDate(r.startDate) || safeDate(r.visitDate);
        const end = safeDate(r.endDate);
        const days = r.noOfDays ?? diffDays(start, end) ?? undefined;
        const status = r.status
            ? String(r.status).charAt(0).toUpperCase() + String(r.status).slice(1).toLowerCase()
            : 'Pending';

        
        return ({
            id: `REC-${r.id}`,
            therapyName: r.therapyName || 'Consultation',
            startDate: start ? fmtOrDash(start) : null,
            endDate: end ? fmtOrDash(end) : null,
            days,
            status,
            doctorName: r.doctorName || '—',
            therapistName: r.therapistName || undefined,
            recommendedBy: r.doctorName || undefined,
            location: r.location || undefined,
            symptoms: r.symptoms || '',           
            notes: (r.doctorNotes || '').trim(),  
            raw: r,
        });
    });
};

