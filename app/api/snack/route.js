import Snack from "@/models/Snack";

export async function GET() {
  return Response.json(await Snack.find());
}

export async function POST(request) {
  const body = await request.json();
  console.log(body);
  const snack = new Snack(body);
  await snack.save();
  return Response.json(snack);
}
