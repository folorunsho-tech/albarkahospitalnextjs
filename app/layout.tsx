import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { UserProvider } from "@/context/User";
import { DatesProvider } from "@mantine/dates";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Metadata } from "next";
dayjs.extend(customParseFormat);

export const metadata: Metadata = {
	title: "Albarka Hospital Wawa",
	description: "Albarka hospital MS created by Folorunsho Ibrahim @tacheyon",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning={true}>
			<link rel='icon' type='image/svg+xml' href='/favicon.svg' />

			<body className={` antialiased`}>
				<MantineProvider>
					<Notifications
						autoClose={3000}
						className='absolute top-0 '
						style={{ zIndex: 1000 }}
					/>
					<ModalsProvider>
						<DatesProvider settings={{ consistentWeeks: true }}>
							<UserProvider>{children}</UserProvider>
						</DatesProvider>
					</ModalsProvider>
				</MantineProvider>
			</body>
		</html>
	);
}
