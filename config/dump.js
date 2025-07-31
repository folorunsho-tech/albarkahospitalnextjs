import mysqldump from "mysqldump";
let count = 0;

export const cronDump = async () => {
	await mysqldump({
		connection: {
			host: process.env.DB_HOST,
			password: process.env.DB_PASS,
			user: process.env.DB_USER,
			port: process.env.DB_PORT,
			database: process.env.DB_NAME,
			charset: "utf8",
		},
		dumpToFile: "./backup/hospital-backup.sql",
		dump: {
			schema: {
				table: {
					dropIfExist: true,
				},
			},
		},
	});
	count++;

	console.log(
		`Backup No ${count}, Back up done at ${new Date().toLocaleDateString(
			"en-US",
			{
				year: "numeric",
				month: "long",
				day: "numeric",
				hour: "2-digit",
				minute: "2-digit",
			}
		)}`
	);
};

export const returnedDump = async () => {
	await mysqldump({
		connection: {
			host: process.env.DB_HOST,
			password: process.env.DB_PASS,
			user: process.env.DB_USER,
			port: process.env.DB_PORT,
			database: process.env.DB_NAME,
			charset: "utf8",
		},
		dumpToFile: "./backup/hospital-backup.sql",
		dump: {
			schema: {
				table: {
					dropIfExist: true,
				},
			},
		},
	});
};
