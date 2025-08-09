import axios from "axios";
// import showNotification from "@/lib/showNoification";

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
// api.interceptors.response.use(
// 	(response) => {
// 		showNotification(response.status);
// 		return response;
// 	},
// 	(error) => {
// 		showNotification(error.response?.status || 500);
// 		return Promise.reject(error);
// 	}
// );
export default api;
