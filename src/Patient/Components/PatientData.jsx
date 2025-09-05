const PatientData = {
  fullName: 'PriyaSharma',
  email: 'priya@example.com',
  treatmentPlan: { name: '7‑din ki Shodhan Chikitsa', totalDays: 7, currentDay: 3 },
  todaySession: {
    therapyName: 'Abhyanga (Full Body Massage)',
    time: '10:00 AM',
    therapist: 'Rahul Verma',
    pre_instructions: 'Therapy se 2 ghante pehle kuch na khayein.',
    post_instructions: 'Garam paani se snan karein aur halka bhojan lein.'
  },
  assignment: {
    byDoctor: { name: 'Dr. Meera', time: '09:12 AM' },
    therapistAssigned: { name: 'Rahul Verma', busyLevel: 'Medium' },
    slotStatus: 'Awaiting Slot',
    slot: { date: 'Wed, 03 Sep', time: '10:00 AM', room: 'T2' }
  },
  upcomingSessions: [
    { day: 4, therapyName: 'Shirodhara', status: 'Assigned', eta: 'Pending Slot' },
    { day: 5, therapyName: 'Swedana', status: 'Assigned', eta: 'Pending Slot' },
    { day: 6, therapyName: 'Virechana Prep', status: 'Draft', eta: 'TBD' }
  ],
  lastSessionFeedbackPending: true
};

export { PatientData };