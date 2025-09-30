import prisma from "@/config/prisma";
export async function POST(request: Request) {
	// Parse the request body
	const body = await request.json();
	const { value } = body;
	try {
		if (value !== "") {
			const found = await prisma.patients.findMany({
				where: {
					OR: [
						{
							hosp_no: {
								contains: value,
							},
						},
						{
							name: {
								contains: value,
							},
						},
					],
				},
				take: 100,
				include: {
					encounters: {
						include: {
							care: true,
						},
					},
					groups: true,
					town: true,
				},
			});
			return new Response(JSON.stringify(found), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			});
		} else {
			return new Response(JSON.stringify([]), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			});
		}
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify(error), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
