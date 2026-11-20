# ZeroGPT & Ensemble Classifier Detection Guide

## How Classifiers Work
1. **Perplexity & Entropy**: Measures how predictable each subsequent word is based on probability distributions. Low-entropy text is flagged as AI.
2. **Burstiness**: Measures the variation in sentence length and syntactic complexity across the passage. Low burstiness is flagged as AI.
3. **Ensemble Models**: Evaluates token clusters against trained models across GPT, Claude, and Gemini families.

## Anti-Detection Writing Invariants
1. **Maximize Entropy**:
   - Use unexpected, precise vocabulary (e.g. 'hauling leaky plastic jugs' instead of 'watering regularly').
   - Avoid standard transition formulas and generic summaries.
2. **Maximize Burstiness**:
   - Mix ultra-short sentences (2-5 words) directly before or after long, natural compound sentences (25-35 words).
3. **Anchor in Granular Facts**:
   - Use specific numbers, dates, tools, locations, and personal frictions.
   - Never write broad generalizations without immediate concrete backing.
