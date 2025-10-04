import axios from "axios";

const api = axios.create({
	baseURL: "/api/",
	responseType: "json",
	withCredentials: true,
	timeout: 5000,
	headers: { "Content-Type": "application/json" },
	validateStatus: function (status) {
		return status < 500; // Resolve only if the status code is less than 500
	},
});

export default api;
