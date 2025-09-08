import api from "./axios";

// Get therapist by id (includes scheduleSlots)
export const getTherapistById = async (id) => {
  const { data } = await api.get(`/api/therapists/${id}`);
  return data;
};

// Assign therapist to a record
export const assignTherapist = async (recordId, therapistId) => {
  const { data } = await api.put(`/api/records/${recordId}/assignTherapist/${therapistId}`);
  return data;
};

// Book a slot for a record
export const bookSlotForRecord = async (recordId, slotId) => {
  const { data } = await api.put(`/api/records/${recordId}/bookSlot/${slotId}`);
  return data;
};