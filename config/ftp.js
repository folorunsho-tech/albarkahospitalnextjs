import { Client } from "basic-ftp";

export async function ftp(localPath, remotePath) {
	const client = new Client();
	try {
		await client.access({
			host: process.env.FTP_HOST,
			user: process.env.FTP_USER,
			password: process.env.FTP_PASS,
			secure: false, // Set to true if using FTPS
		});
		console.log("Connected to FTP server");
		await client.uploadFrom(localPath, remotePath);
	} catch (error) {
		console.error("Error connecting to FTP server:", error);
		throw error;
	}
}
