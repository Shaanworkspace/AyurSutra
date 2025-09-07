
export const mockDoctorData = {
    id: 1,
    firstName: "Shaan",
    lastName: "Yadav",
    email: "shaan.yadav@doc.com",
    avatarUrl: "https://i.pravatar.cc/150?u=shaanyadav",
    medicalRecords: [
        { id: 1, symptoms: "Fever and headache for the last 2 days, feeling very weak. Also noticed a skin rash on my arm.", patientId: 101, patientName: "Poppy Pop", patientAge: 34, patientGender: "Female", createdDate: "2025-09-07T10:30:00Z", status: "Pending Review", attachments: [{ name: 'skin_rash_photo.jpg', type: 'image', url: '#' },{ name: 'previous_blood_report.pdf', type: 'pdf', url: '#' }], diagnosis: null, prescribedTreatment: null, therapyName: null, },
        { id: 3, symptoms: "Chronic back pain, especially in the lower region. Difficulty sitting for long hours.", patientId: 102, patientName: "Rohan Mehra", patientAge: 45, patientGender: "Male", createdDate: "2025-09-06T18:00:00Z", status: "Pending Review", attachments: [], diagnosis: null, prescribedTreatment: null, therapyName: null, },
        { id: 4, symptoms: "Severe indigestion and acidity issues for the past month.", patientId: 103, patientName: "Anjali Singh", patientAge: 29, patientGender: "Female", createdDate: "2025-09-05T15:20:00Z", status: "Completed", attachments: [], diagnosis: "Aggravated Pitta Dosha leading to Amlapitta (Acid Dyspepsia).", prescribedTreatment: "Pitta-pacifying diet. Avipattikar Churna - 1 tsp twice a day with warm water before meals.", therapyName: "Virechana", noOfDays: 5, startDate: "2025-09-10", doctorNotes: "Patient advised to avoid spicy and oily food completely." },
        { id: 5, symptoms: "Experiencing insomnia and high levels of stress and anxiety from work.", patientId: 104, patientName: "Vikram Batra", patientAge: 38, patientGender: "Male", createdDate: "2025-09-04T11:00:00Z", status: "Completed", attachments: [], diagnosis: "Vata imbalance causing nervous system agitation and sleep disturbances.", prescribedTreatment: "Ashwagandha tablets, 1 tablet after dinner. Brahmi tea before sleeping.", therapyName: "Shirodhara", noOfDays: 7, startDate: "2025-09-08", doctorNotes: "Meditation and breathing exercises are highly recommended." }
    ]
};