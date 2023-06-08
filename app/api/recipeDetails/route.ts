// import { NextApiRequest, NextApiResponse } from 'next';

export async function GET(req: Request, res: Response) {
  const apiKey = process.env.SPOONACULAR_API_KEY;
  // expected request url: /api/recipeDetails?recipeID=...

  // since req.query seems to be broken, parse query parameters from req.url
  const [_, paramString] = req.url!.split('?');
  const [__, recipeID] = paramString.split('=');

  // fetch recipe details from spoonacular
  const response = await fetch(
    `https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${apiKey}&includeNutrition=false`,
    { method: 'GET', headers: { 'Access-Control-Allow-Origin': '*' } }
  );
  return response;
}
