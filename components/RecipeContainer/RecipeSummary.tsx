import React from 'react';
import { RecipeDetails } from '@/types/types';
import { Markup } from 'interweave';

const RecipeSummary: React.FC<{ recipeDetails: RecipeDetails }> = function ({
  recipeDetails,
}) {
  // handle missing summary section
  let recipeSummary = '';
  if (recipeDetails?.summary) {
    // cut out last sentence with links //
    const recipeSummaryChunks = recipeDetails!.summary.split('. ');
    recipeSummaryChunks.pop();
    recipeSummary = recipeSummaryChunks.join('. ') + '.';
  }
  return (
    <>
      {recipeDetails?.summary && (
        <section>
          <h3>Summary</h3>
          <p>
            <Markup content={recipeSummary} noHtml={true} />
          </p>
        </section>
      )}
    </>
  );
};

export default RecipeSummary;
