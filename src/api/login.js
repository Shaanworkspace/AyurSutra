import api from "./axios";

// Login request
export const login = async ({ profile, email, password }) => {
	let endpoint = "";

	switch (profile) {
		case "user":
			endpoint = "/api/patients/login";
			break;
		case "doctor":
			endpoint = "/api/doctors/login";
			break;
		case "practitioner":
			endpoint = "/api/therapists/login";
			break;
		default:
			throw new Error("Invalid profile type");
	}

	const { data } = await api.post(endpoint, { email, password });

	// Backend returns a user object (with id, personal details, medicalRecords, etc.)
	if (!data?.id) throw new Error("Invalid response: no user id found");

	return data;
};
