import api from "./axios";

// Fetch a patient by ID
export const getPatientById = async (id) => {
  const { data } = await api.get(`/api/patients/${id}`);
  return data;
};