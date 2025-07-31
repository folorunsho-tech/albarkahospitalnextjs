export async function GET(request: Request) {
	try {
		return new Response("<h2>Welcome</h2>", {
			status: 200,
			headers: { "Content-Type": "text/html" },
		});
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ error: "Internal Server Error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
