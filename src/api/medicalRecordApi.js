// src/api/medicalRecordApi.js

// ✅ fetch wrapper for one record
export const getRecordById = async (id) => {
  const res = await fetch(
    `https://ayusutra-backend.onrender.com/api/medical-records/${id}`
  );
  if (!res.ok) throw new Error("Failed to fetch record");
  return res.json();
};

// ✅ update record with sanitized payload (sends only therapy IDs)
export const updateRecord = async (id, record) => {
  const sanitizedTherapies = (record.requiredTherapy || []).map((t) => ({
    id: t.id,
  }));

  const payload = {
    medicalHistoryNotes: record.medicalHistoryNotes || null,
    medications: record.medications || null,
    followUpRequired: record.followUpRequired || null,
    needTherapy: !!record.needTherapy,
    requiredTherapy: sanitizedTherapies,
    therapyPlan: record.therapyPlan ? { id: record.therapyPlan.id } : null,
    diagnosis: record.diagnosis || null,
    prescribedTreatment: record.prescribedTreatment || null,
    doctorNotes: record.doctorNotes || null,
    rating: record.rating != null ? record.rating : null,
    noOfDays: record.noOfDays || null,
    status: record.status || "PENDING",
  };

  console.log("➡️ PUT payload to /medical-records:", payload);

  const res = await fetch(
    `https://ayusutra-backend.onrender.com/api/medical-records/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    const errMsg = await res.text();
    throw new Error(errMsg);
  }
  return res.json();
};

// ✅ fetch therapies (specializations)
export const getTherapies = async () => {
  const res = await fetch(
    `https://ayusutra-backend.onrender.com/api/specializations`
  );
  if (!res.ok) throw new Error("Failed to fetch therapies");
  return res.json();
};