// import { NextApiRequest, NextApiResponse } from 'next';

export async function GET(req: Request, res: Response) {
  const apiKey = process.env.SPOONACULAR_API_KEY;
  // expected request url: /api/recipes?query=...&number=...&offset=...

  // since req.query seems to be broken, parse query parameters from req.url
  const [_, paramString] = req.url!.split('?');

  const response = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&${paramString}`,
    { method: 'GET' }
  );

  // console.log(
  //   'request string:',
  //   `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&${paramString}`
  // );
  return response;
}
