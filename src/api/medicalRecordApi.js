import api from "./axios";

// Fetch single medical record
export const getRecordById = async (id) => {
  const { data } = await api.get(`/api/medical-records/${id}`);
  return data;
};

// Update record
export const updateRecord = async (id, payload) => {
  const { data } = await api.put(`/api/medical-records/${id}`, payload);
  return data;
};