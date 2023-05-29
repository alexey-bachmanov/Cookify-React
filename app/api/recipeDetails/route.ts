import { NextApiRequest, NextApiResponse } from 'next';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const apiKey = process.env['SPOONACULAR_API_KEY'];
  // expected request url: /api/recipeDetails?recipeID=...

  // since req.query seems to be broken, parse query parameters from req.url
  const [_, paramString] = req.url!.split('?');
  const [__, recipeID] = paramString.split('=');
  console.log('recipe ID:', recipeID);

  const response = await fetch(
    `https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${apiKey}&includeNutrition=false`,
    { method: 'GET' }
  );

  // console.log(
  //   'request string:',
  //   `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&${paramString}`
  // );
  return response;
}
