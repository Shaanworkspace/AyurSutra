import api from "./axios";

// Register User (Patient)
export const registerUser = async (payload) => {
	const { data } = await api.post("/api/patients", payload);
	return data;
};

// Register Doctor
export const registerDoctor = async (payload) => {
	const { data } = await api.post("/api/doctors", payload);
	return data;
};

// Register Therapist
export const registerTherapist = async (payload) => {
	const { data } = await api.post("/api/therapists", payload);
	return data;
};
