import { NextResponse } from 'next/server';

export async function GET(req: Request, res: Response) {
  const apiKey = process.env.SPOONACULAR_API_KEY;
  // expected request url: /api/recipes?query=...&number=...&offset=...

  // since req.query seems to be broken, parse query parameters from req.url
  const [_, paramString] = req.url!.split('?');

  const response = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&${paramString}`
  );

  // catch errors, like api quota running out
  if (!response.ok) {
    throw new Error('Failed to fetch recipe list');
  }

  // parse data and forward it
  const data = await response.json();
  return NextResponse.json(data);
}
