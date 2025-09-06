import api from "./axios";
export const getPatientById = async (id) => {
  const { data } = await api.get(`/api/patients/${id}`);
  return data; // expect { name, ... }
};