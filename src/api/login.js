import api from "./axios";

// Login request
export const login = async (credentials) => {
  const {data} = await api.post("/api/patients", credentials);
  const id = data.id || data._id || data.patientId || data.patient?._id;
  if (!id) throw new Error('No patient id in response');
  return id;
};
