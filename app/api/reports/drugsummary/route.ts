// import prisma from "@/config/prisma";
import { snapshot } from "@/lib/sumarizer";
export async function GET(request: Request) {
	try {
		await snapshot();
		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		return new Response(JSON.stringify(error), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
