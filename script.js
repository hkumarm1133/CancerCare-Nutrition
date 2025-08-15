// Global Recipe Data - Organized by Cancer Patient Needs
// Global variables for user recommendations
let currentUserRecommendedFilters = [];

// Utility functions for safe localStorage operations
function safeLocalStorageGet(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.warn('Error reading from localStorage:', error);
        return defaultValue;
    }
}

function safeLocalStorageSet(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.warn('Error writing to localStorage:', error);
        return false;
    }
}

const recipeData = {
    'general-healthy': [
        {
            id: 1,
            name: 'Mediterranean Chickpea Salad',
            description: 'Fresh, nutrient-rich salad with protein-packed chickpeas',
            tags: ['healthy', 'mediterranean', 'preventive', 'no-cook'],
            prepTime: '10 min',
            protein: '12g',
            calories: '280',
            region: 'Europe/Middle East',
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
            ingredients: [
                '1 cup cooked chickpeas (canned or boiled)',
                '1 cucumber, diced',
                '1 tomato, diced',
                '2 tbsp extra virgin olive oil',
                '1 tbsp lemon juice',
                'Fresh parsley, chopped',
                'Salt & pepper to taste'
            ],
            instructions: [
                'Mix chickpeas, cucumber, and tomato in a bowl',
                'Drizzle olive oil and lemon juice over the salad',
                'Season with salt & pepper, garnish with parsley, and serve chilled'
            ],
            nutritionTips: 'Chickpeas provide plant-based protein and fiber. Olive oil offers healthy monounsaturated fats.',
            cancerBenefits: 'High in antioxidants and anti-inflammatory compounds. Easy to digest and nutrient-dense for immune support.'
        },
        {
            id: 2,
            name: 'Brown Rice & Vegetable Stir-Fry',
            description: 'Wholesome Asian-inspired dish with fiber-rich brown rice',
            tags: ['healthy', 'asian', 'vegetarian', 'fiber-rich'],
            prepTime: '15 min',
            protein: '8g',
            calories: '320',
            region: 'East/Southeast Asia',
            image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop',
            ingredients: [
                '1 cup cooked brown rice',
                '1 cup mixed vegetables (broccoli, carrots, snow peas)',
                '1 tbsp sesame oil',
                '1 tsp low-sodium soy sauce'
            ],
            instructions: [
                'Heat sesame oil in a wok or pan',
                'Add vegetables, stir-fry 3–4 minutes',
                'Add rice and soy sauce, toss well until heated through'
            ],
            nutritionTips: 'Brown rice provides complex carbohydrates and B vitamins. Mixed vegetables offer vitamins A, C, and K.',
            cancerBenefits: 'High fiber content supports digestive health. Antioxidants from colorful vegetables may help protect cells.'
        },
        {
            id: 3,
            name: 'Masoor Dal (Red Lentil Stew)',
            description: 'Traditional South Asian comfort food rich in plant protein',
            tags: ['healthy', 'indian', 'comfort', 'protein-rich'],
            prepTime: '25 min',
            protein: '18g',
            calories: '250',
            region: 'South Asia',
            image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
            ingredients: [
                '1 cup red lentils',
                '3 cups water',
                '1 onion, chopped',
                '1 tomato, chopped',
                '1 tsp turmeric powder',
                '1 tsp cumin seeds',
                '1 tbsp cooking oil'
            ],
            instructions: [
                'Rinse lentils; cook with turmeric in water until soft',
                'Heat oil, add cumin seeds, onion, and tomato; sauté 3 minutes',
                'Mix sautéed spices into cooked lentils, simmer 5 minutes'
            ],
            nutritionTips: 'Red lentils are rich in protein, folate, and iron. Turmeric provides anti-inflammatory compounds.',
            cancerBenefits: 'Turmeric contains curcumin with potential anti-inflammatory properties. Easy to digest protein source.'
        },
        {
            id: 4,
            name: 'Quinoa & Roasted Vegetable Bowl',
            description: 'Complete protein bowl with colorful roasted vegetables',
            tags: ['healthy', 'american', 'complete-protein', 'colorful'],
            prepTime: '35 min',
            protein: '14g',
            calories: '350',
            region: 'Americas',
            image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop',
            ingredients: [
                '1 cup quinoa, cooked',
                '1 cup mixed vegetables (zucchini, bell peppers, carrots)',
                '1 tbsp olive oil',
                '1 tsp dried oregano or thyme'
            ],
            instructions: [
                'Preheat oven to 375°F (190°C)',
                'Toss vegetables with olive oil and oregano',
                'Roast 20–25 minutes until tender',
                'Serve over quinoa'
            ],
            nutritionTips: 'Quinoa is a complete protein containing all essential amino acids. Colorful vegetables provide diverse antioxidants.',
            cancerBenefits: 'Complete protein supports tissue repair. Variety of antioxidants may help protect against cellular damage.'
        },
        {
            id: 5,
            name: 'Avocado & Black Bean Wrap',
            description: 'Nutrient-dense wrap with heart-healthy fats and fiber',
            tags: ['healthy', 'latin-american', 'portable', 'heart-healthy'],
            prepTime: '10 min',
            protein: '15g',
            calories: '380',
            region: 'Latin America',
            image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=300&fit=crop',
            ingredients: [
                '1 whole wheat tortilla',
                '1/2 avocado, mashed',
                '1/2 cup cooked black beans',
                '1/4 cup shredded lettuce',
                '1 tbsp lime juice'
            ],
            instructions: [
                'Spread mashed avocado on tortilla',
                'Add beans, lettuce, and drizzle lime juice',
                'Roll up and serve'
            ],
            nutritionTips: 'Avocado provides healthy monounsaturated fats and potassium. Black beans offer protein and fiber.',
            cancerBenefits: 'Healthy fats support nutrient absorption. High fiber content promotes digestive health and satiety.'
        }
    ],
    'symptom-management': [
        {
            id: 6,
            name: 'Ginger & Honey Herbal Tea',
            description: 'Soothing herbal tea specifically designed for nausea relief',
            tags: ['nausea-relief', 'anti-inflammatory', 'herbal', 'warming'],
            prepTime: '10 min',
            protein: '0g',
            calories: '20',
            region: 'Global',
            image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop',
            ingredients: [
                '1 cup hot water',
                '1-inch fresh ginger root, sliced',
                '1 tsp honey (optional)',
                '1 tsp lemon juice (optional)'
            ],
            instructions: [
                'Steep ginger slices in hot water for 5–7 minutes',
                'Strain into a cup',
                'Stir in honey and lemon juice if desired. Serve warm'
            ],
            nutritionTips: 'Ginger contains gingerol compounds that help reduce nausea. Honey provides gentle energy.',
            cancerBenefits: 'Ginger is clinically proven to reduce chemotherapy-induced nausea. Warm liquids help with hydration and comfort.'
        },
        {
            id: 7,
            name: 'Creamy Banana-Oat Smoothie',
            description: 'High-calorie smoothie for appetite loss and weight maintenance',
            tags: ['weight-gain', 'appetite-loss', 'creamy', 'nutritious'],
            prepTime: '20 min',
            protein: '12g',
            calories: '420',
            region: 'Global',
            image: 'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=400&h=300&fit=crop',
            ingredients: [
                '1 banana',
                '1/2 cup rolled oats (soaked in water or milk for 15 minutes)',
                '1 cup milk (or plant-based milk)',
                '1 tbsp peanut butter or almond butter',
                'Honey to taste'
            ],
            instructions: [
                'Blend banana, soaked oats, milk, and nut butter until smooth',
                'Sweeten with honey if desired',
                'Serve immediately for best texture'
            ],
            nutritionTips: 'Oats provide fiber and complex carbs. Nut butter adds healthy fats and protein for sustained energy.',
            cancerBenefits: 'High calorie density helps combat weight loss. Smooth texture easy to consume when appetite is poor.'
        },
        {
            id: 8,
            name: 'Soft Scrambled Eggs with Spinach',
            description: 'Gentle, protein-rich meal perfect for mouth sores and chewing difficulties',
            tags: ['soft-texture', 'mouth-sores', 'protein-rich', 'gentle'],
            prepTime: '10 min',
            protein: '14g',
            calories: '180',
            region: 'Global',
            image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop',
            ingredients: [
                '2 eggs',
                '2 tbsp milk',
                '1/4 cup finely chopped spinach',
                '1 tsp olive oil',
                'Pinch of salt'
            ],
            instructions: [
                'Beat eggs with milk in a bowl',
                'Heat olive oil in a pan, add spinach, and cook for 1–2 minutes',
                'Add egg mixture, stir slowly over low heat until creamy'
            ],
            nutritionTips: 'Eggs provide complete protein and B vitamins. Spinach adds folate and iron in an easily digestible form.',
            cancerBenefits: 'Soft, creamy texture ideal for sensitive mouths. High-quality protein supports healing and immune function.'
        },
        {
            id: 9,
            name: 'Mashed Sweet Potato with Greek Yogurt',
            description: 'Comforting, nutrient-dense dish for digestive comfort and sustained energy',
            tags: ['digestive-comfort', 'energy-boost', 'comfort-food', 'nutritious'],
            prepTime: '25 min',
            protein: '8g',
            calories: '220',
            region: 'Global (US, Asia, Africa)',
            image: 'https://images.unsplash.com/photo-1557844352-761f2565b576?w=400&h=300&fit=crop',
            ingredients: [
                '1 medium sweet potato, peeled and cubed',
                '1/4 cup plain Greek yogurt',
                'Pinch of cinnamon',
                'Pinch of salt'
            ],
            instructions: [
                'Boil or steam sweet potato until soft',
                'Mash well, mix in Greek yogurt, cinnamon, and salt',
                'Serve warm'
            ],
            nutritionTips: 'Sweet potatoes are rich in beta-carotene and fiber. Greek yogurt adds probiotics and protein.',
            cancerBenefits: 'Easy to digest and gentle on the stomach. Beta-carotene supports immune function and may help with healing.'
        },
        {
            id: 10,
            name: 'Miso Soup with Tofu & Seaweed',
            description: 'Light, hydrating soup with probiotics and essential minerals',
            tags: ['hydrating', 'light-nutrition', 'probiotics', 'mineral-rich'],
            prepTime: '15 min',
            protein: '6g',
            calories: '80',
            region: 'East Asia',
            image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop',
            ingredients: [
                '2 cups water or low-sodium vegetable broth',
                '1 tbsp miso paste',
                '1/4 cup soft tofu cubes',
                '1 tbsp dried wakame seaweed',
                '1 green onion, sliced'
            ],
            instructions: [
                'Bring water or broth to a gentle simmer',
                'Add wakame and tofu; cook for 2–3 minutes',
                'Dissolve miso paste in a small bowl with some broth, then stir into soup',
                'Garnish with green onion before serving'
            ],
            nutritionTips: 'Miso provides probiotics and umami flavor. Seaweed offers iodine and minerals.',
            cancerBenefits: 'Probiotics support gut health during treatment. Light, warm broth helps with hydration and is easy to digest.'
        }
    ],
    'high-protein-high-calorie': [
        {
            id: 7,
            name: 'Lentil & Chicken Stew',
            description: 'Hearty protein-rich stew combining red lentils and tender chicken',
            tags: ['high-protein', 'high-calorie', 'south-asian', 'middle-eastern', 'comfort'],
            prepTime: '30 min',
            protein: '28g',
            calories: '420',
            region: 'South Asia / Middle East',
            image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&h=300&fit=crop',
            ingredients: [
                '1/2 cup red lentils (masoor dal), rinsed',
                '100g chicken breast or thigh, diced',
                '1 onion, chopped',
                '1 tomato, chopped',
                '1 tsp turmeric',
                '1 tsp cumin',
                '1 tbsp olive oil or ghee',
                '3 cups water or broth'
            ],
            instructions: [
                'Heat oil, sauté onion until translucent',
                'Add chicken, turmeric, cumin, and cook 5 minutes',
                'Add lentils, tomato, and water; simmer 20–25 minutes until lentils are soft',
                'Serve warm with whole wheat bread or rice'
            ],
            nutritionTips: 'Complete protein from chicken combined with plant protein from lentils. Turmeric provides anti-inflammatory compounds.',
            cancerBenefits: 'High protein content supports muscle maintenance during treatment. Easy to digest and very filling.'
        },
        {
            id: 8,
            name: 'Peanut Butter Banana Overnight Oats',
            description: 'No-cook breakfast packed with protein, healthy fats, and fiber',
            tags: ['high-protein', 'high-calorie', 'american', 'no-cook', 'breakfast'],
            prepTime: '5 min prep + overnight',
            protein: '22g',
            calories: '480',
            region: 'Americas',
            image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop',
            ingredients: [
                '1/2 cup rolled oats',
                '1 tbsp chia seeds',
                '1 banana, sliced',
                '2 tbsp peanut butter',
                '1 cup milk (or plant-based milk)',
                'Honey to taste'
            ],
            instructions: [
                'In a jar, combine oats, chia seeds, banana, peanut butter, and milk',
                'Stir well, cover, and refrigerate overnight',
                'Drizzle with honey before eating'
            ],
            nutritionTips: 'Peanut butter provides healthy fats and protein. Chia seeds add omega-3s and fiber.',
            cancerBenefits: 'No cooking required when energy is low. High calorie density helps with weight maintenance.'
        },
        {
            id: 9,
            name: 'Salmon & Quinoa Bowl',
            description: 'Complete protein powerhouse with omega-3 rich salmon and quinoa',
            tags: ['high-protein', 'high-calorie', 'european', 'omega-3', 'bowl'],
            prepTime: '20 min',
            protein: '35g',
            calories: '520',
            region: 'Europe / Global',
            image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
            ingredients: [
                '100g salmon fillet',
                '1 cup cooked quinoa',
                '1/2 cup steamed broccoli',
                '1 tbsp olive oil',
                'Juice of 1/2 lemon',
                'Salt & pepper to taste'
            ],
            instructions: [
                'Grill or bake salmon at 375°F (190°C) for 12–15 minutes',
                'Arrange quinoa, broccoli, and salmon in a bowl',
                'Drizzle with olive oil and lemon juice, season with salt & pepper'
            ],
            nutritionTips: 'Salmon provides complete protein and omega-3 fatty acids. Quinoa offers all essential amino acids.',
            cancerBenefits: 'Anti-inflammatory omega-3s support immune function. Complete proteins aid in tissue repair and recovery.'
        },
        {
            id: 10,
            name: 'Chickpea & Tahini Power Hummus',
            description: 'Protein-rich, creamy hummus with sesame tahini for extra calories',
            tags: ['high-protein', 'high-calorie', 'middle-eastern', 'no-cook', 'dip'],
            prepTime: '10 min',
            protein: '18g',
            calories: '320',
            region: 'Middle East',
            image: 'https://images.unsplash.com/photo-1571197113382-3a3d3b0f711a?w=400&h=300&fit=crop',
            ingredients: [
                '1 cup cooked chickpeas',
                '2 tbsp tahini (sesame paste)',
                '1 tbsp olive oil',
                '1 tbsp lemon juice',
                '1 garlic clove (optional)',
                'Pinch of salt'
            ],
            instructions: [
                'Blend chickpeas, tahini, lemon juice, and garlic until smooth',
                'Drizzle in olive oil while blending to get a creamy texture',
                'Serve with whole wheat pita bread or veggie sticks'
            ],
            nutritionTips: 'Chickpeas provide plant protein and fiber. Tahini adds healthy fats and calcium.',
            cancerBenefits: 'Easy to eat when appetite is poor. High in protein for muscle maintenance and calories for energy.'
        },
        {
            id: 11,
            name: 'Greek Yogurt Parfait with Nuts & Berries',
            description: 'Layered protein-rich parfait with antioxidant berries and healthy nuts',
            tags: ['high-protein', 'high-calorie', 'european', 'north-american', 'breakfast'],
            prepTime: '5 min',
            protein: '20g',
            calories: '380',
            region: 'Europe / North America',
            image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop',
            ingredients: [
                '1 cup plain Greek yogurt',
                '1/4 cup mixed nuts (walnuts, almonds, cashews)',
                '1/4 cup fresh berries (blueberries, strawberries)',
                '1 tbsp honey'
            ],
            instructions: [
                'In a glass or bowl, layer Greek yogurt, berries, and nuts',
                'Drizzle with honey for sweetness',
                'Serve chilled'
            ],
            nutritionTips: 'Greek yogurt is rich in protein and probiotics. Mixed nuts provide healthy fats and additional protein.',
            cancerBenefits: 'Probiotics support digestive health during treatment. Easy to customize based on taste preferences.'
        }
    ],
    'texture-modified': [
        {
            id: 12,
            name: 'Creamy Carrot & Lentil Soup',
            description: 'Smooth, nutrient-rich soup perfect for sensitive mouths and swallowing difficulties',
            tags: ['pureed', 'smooth', 'european', 'south-asian', 'comfort'],
            prepTime: '25 min',
            protein: '12g',
            calories: '180',
            region: 'Europe / South Asia',
            image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=400&h=300&fit=crop',
            ingredients: [
                '2 medium carrots, peeled & diced',
                '1/2 cup red lentils',
                '1 onion, chopped',
                '1 tbsp olive oil',
                '3 cups low-sodium vegetable broth',
                'Pinch of salt'
            ],
            instructions: [
                'Heat olive oil in a pot, sauté onion until soft',
                'Add carrots, lentils, and broth; simmer 20 minutes',
                'Blend until smooth; serve warm'
            ],
            nutritionTips: 'Carrots provide beta-carotene and fiber. Red lentils offer plant-based protein and folate.',
            cancerBenefits: 'Completely smooth texture ideal for mouth sores or swallowing difficulties. Nutrient-dense and easy to digest.'
        },
        {
            id: 13,
            name: 'Mashed Avocado & Cottage Cheese Bowl',
            description: 'Creamy, protein-rich bowl that requires no chewing',
            tags: ['smooth', 'no-chew', 'north-american', 'latin-american', 'protein-rich'],
            prepTime: '5 min',
            protein: '16g',
            calories: '280',
            region: 'North America / Latin America',
            image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=300&fit=crop',
            ingredients: [
                '1 ripe avocado',
                '1/2 cup cottage cheese',
                'Pinch of salt',
                'Drizzle of olive oil'
            ],
            instructions: [
                'Mash avocado until creamy',
                'Mix with cottage cheese and season with salt',
                'Drizzle with olive oil before serving'
            ],
            nutritionTips: 'Avocado provides healthy monounsaturated fats. Cottage cheese adds complete protein and calcium.',
            cancerBenefits: 'Soft, creamy texture perfect for mouth sores. High protein content supports healing and muscle maintenance.'
        },
        {
            id: 14,
            name: 'Silken Tofu & Banana Smoothie',
            description: 'Ultra-smooth, protein-rich smoothie with silky texture',
            tags: ['smooth', 'liquid', 'east-asian', 'global', 'protein-rich'],
            prepTime: '5 min',
            protein: '12g',
            calories: '220',
            region: 'East Asia / Global',
            image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&h=300&fit=crop',
            ingredients: [
                '1 cup silken tofu',
                '1 banana',
                '1 cup milk (or plant-based milk)',
                '1 tsp honey or maple syrup'
            ],
            instructions: [
                'Blend all ingredients until silky smooth',
                'Serve chilled'
            ],
            nutritionTips: 'Silken tofu provides complete protein and isoflavones. Banana adds potassium and natural sweetness.',
            cancerBenefits: 'Completely liquid nutrition perfect for severe swallowing difficulties. Cold temperature may help with mouth sores.'
        },
        {
            id: 15,
            name: 'Pumpkin & Potato Mash',
            description: 'Smooth, comforting mash rich in vitamins and easy to swallow',
            tags: ['smooth', 'mashed', 'australian', 'global', 'comfort-food'],
            prepTime: '20 min',
            protein: '4g',
            calories: '160',
            region: 'Australia / Global',
            image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=400&h=300&fit=crop',
            ingredients: [
                '1 cup pumpkin, peeled & cubed',
                '1 medium potato, peeled & cubed',
                '1 tbsp unsalted butter',
                'Pinch of nutmeg',
                'Pinch of salt'
            ],
            instructions: [
                'Steam or boil pumpkin and potato until very soft',
                'Mash with butter, nutmeg, and salt until smooth',
                'Serve warm'
            ],
            nutritionTips: 'Pumpkin is rich in vitamin A and beta-carotene. Potatoes provide potassium and complex carbohydrates.',
            cancerBenefits: 'Smooth, warm texture is soothing for sensitive mouths. Beta-carotene supports immune function.'
        },
        {
            id: 16,
            name: 'Oatmeal with Stewed Apples',
            description: 'Soft, creamy breakfast with tender fruit pieces',
            tags: ['soft-texture', 'breakfast', 'european', 'north-american', 'fiber-rich'],
            prepTime: '15 min',
            protein: '8g',
            calories: '240',
            region: 'Europe / North America',
            image: 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=400&h=300&fit=crop',
            ingredients: [
                '1/2 cup rolled oats',
                '1 cup milk (or plant-based milk)',
                '1 apple, peeled & chopped',
                '1 tsp cinnamon',
                '1 tsp honey'
            ],
            instructions: [
                'Cook oats in milk over medium heat until creamy',
                'In a separate pan, stew apples with cinnamon until soft',
                'Mix apples into oatmeal and drizzle with honey'
            ],
            nutritionTips: 'Oats provide soluble fiber and protein. Apples add natural sweetness and additional fiber.',
            cancerBenefits: 'Soft, easy-to-swallow texture. Soluble fiber supports digestive health during treatment.'
        }
    ],
    'therapeutic-medical': [
        {
            id: 17,
            name: 'Omega-3 Rich Salmon & Spinach Soup',
            description: 'Anti-inflammatory, immune support soup with omega-3 rich salmon',
            tags: ['therapeutic', 'anti-inflammatory', 'immune-support', 'european', 'north-american'],
            prepTime: '20 min',
            protein: '22g',
            calories: '280',
            region: 'Europe / North America',
            image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop',
            ingredients: [
                '100g salmon fillet, diced',
                '1 cup baby spinach leaves',
                '1 small carrot, chopped',
                '1/2 onion, chopped',
                '3 cups low-sodium vegetable or fish broth',
                '1 tbsp olive oil',
                '1 tsp turmeric'
            ],
            instructions: [
                'Heat olive oil, sauté onion and carrot for 5 minutes',
                'Add broth, salmon, turmeric; simmer 10 minutes',
                'Stir in spinach; cook 1–2 minutes until wilted',
                'Serve warm'
            ],
            nutritionTips: 'Salmon provides omega-3 fatty acids EPA and DHA. Spinach offers folate and iron. Turmeric contains curcumin with anti-inflammatory properties.',
            cancerBenefits: 'Anti-inflammatory omega-3s support immune function during treatment. Turmeric may help reduce inflammation. Easy to digest liquid nutrition.'
        },
        {
            id: 18,
            name: 'Turmeric & Ginger Rice Congee',
            description: 'Anti-nausea, digestive soothing congee for gentle nutrition',
            tags: ['therapeutic', 'anti-nausea', 'digestive-soothing', 'south-asian', 'east-asian'],
            prepTime: '60 min',
            protein: '8g',
            calories: '180',
            region: 'South Asia / East Asia',
            image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop',
            ingredients: [
                '1/2 cup jasmine or basmati rice',
                '4 cups water or chicken broth',
                '1 tsp turmeric powder',
                '1 tsp freshly grated ginger',
                'Pinch of salt'
            ],
            instructions: [
                'Rinse rice and place in a pot with water/broth',
                'Add turmeric, ginger, and salt; bring to a boil',
                'Reduce heat and simmer 45–60 minutes until rice is very soft and porridge-like',
                'Serve warm; can be pureed for extra softness'
            ],
            nutritionTips: 'Ginger contains gingerol compounds that help reduce nausea. Turmeric provides anti-inflammatory curcumin. Rice offers easily digestible carbohydrates.',
            cancerBenefits: 'Ginger clinically proven to reduce chemotherapy-induced nausea. Soft, warm texture is gentle on digestive system. Easy to consume when appetite is poor.'
        },
        {
            id: 19,
            name: 'Iron & Folate Boost Lentil Spinach Curry',
            description: 'Anemia support curry rich in iron and folate',
            tags: ['therapeutic', 'anemia-support', 'iron-rich', 'south-asian', 'middle-eastern'],
            prepTime: '35 min',
            protein: '16g',
            calories: '220',
            region: 'South Asia / Middle East',
            image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop',
            ingredients: [
                '1/2 cup red or yellow lentils',
                '2 cups baby spinach',
                '1 tomato, chopped',
                '1 tsp cumin seeds',
                '1 tsp turmeric',
                '1 tbsp olive oil or ghee',
                '3 cups water'
            ],
            instructions: [
                'Heat oil, add cumin seeds and turmeric',
                'Add tomato and cook until soft',
                'Stir in lentils and water; simmer 20–25 minutes',
                'Add spinach, cook until wilted; mash lightly before serving'
            ],
            nutritionTips: 'Lentils provide iron and folate. Spinach offers additional iron, folate, and vitamin C which enhances iron absorption.',
            cancerBenefits: 'High in iron and folate to combat treatment-related anemia. Protein supports muscle maintenance. Easy to digest when mashed.'
        },
        {
            id: 20,
            name: 'Calcium-Boosted Almond & Berry Smoothie',
            description: 'Bone health support smoothie for post-treatment recovery',
            tags: ['therapeutic', 'bone-health', 'post-treatment', 'global', 'smoothie'],
            prepTime: '5 min',
            protein: '15g',
            calories: '280',
            region: 'Global',
            image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
            ingredients: [
                '1 cup fortified almond milk',
                '1/2 cup Greek yogurt',
                '1/2 cup mixed berries (blueberries, strawberries)',
                '1 tbsp almond butter',
                '1 tsp honey'
            ],
            instructions: [
                'Blend all ingredients until smooth',
                'Serve chilled'
            ],
            nutritionTips: 'Fortified almond milk and Greek yogurt provide calcium for bone health. Berries offer antioxidants and vitamin C.',
            cancerBenefits: 'High calcium content supports bone health during and after treatment. Antioxidants from berries may help with recovery. Easy liquid nutrition.'
        },
        {
            id: 21,
            name: 'Low-Fiber White Fish Stew',
            description: 'Gentle stew for bowel rest during GI irritation',
            tags: ['therapeutic', 'low-fiber', 'gi-friendly', 'mediterranean', 'gentle'],
            prepTime: '25 min',
            protein: '20g',
            calories: '200',
            region: 'Mediterranean',
            image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop',
            ingredients: [
                '100g white fish (cod, tilapia, haddock)',
                '1 carrot, finely diced',
                '1 small potato, cubed',
                '3 cups low-sodium fish or vegetable broth',
                '1 tbsp olive oil',
                'Pinch of salt'
            ],
            instructions: [
                'Heat oil, sauté carrot and potato for 5 minutes',
                'Add broth and fish; simmer until fish is flaky and vegetables are soft (10–12 minutes)',
                'Mash lightly for easier digestion'
            ],
            nutritionTips: 'White fish provides lean protein that is easy to digest. Low-fiber vegetables reduce GI irritation.',
            cancerBenefits: 'Low-fiber content is gentle on irritated digestive system. High-quality protein supports healing without digestive stress.'
        },
        {
            id: 22,
            name: 'Papaya & Pineapple Digestive Bowl',
            description: 'Enzyme support bowl for improved digestion',
            tags: ['therapeutic', 'digestive-enzymes', 'tropical', 'global', 'enzyme-support'],
            prepTime: '5 min',
            protein: '6g',
            calories: '150',
            region: 'Tropical / Global',
            image: 'https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?w=400&h=300&fit=crop',
            ingredients: [
                '1/2 cup papaya, diced',
                '1/2 cup pineapple, diced',
                '1/4 cup Greek yogurt or dairy-free yogurt',
                '1 tsp chia seeds'
            ],
            instructions: [
                'Mix papaya, pineapple, and yogurt in a bowl',
                'Sprinkle with chia seeds before serving'
            ],
            nutritionTips: 'Papaya contains papain enzyme, pineapple contains bromelain - both aid protein digestion. Chia seeds provide omega-3s.',
            cancerBenefits: 'Natural digestive enzymes help break down proteins when digestion is compromised. Gentle on stomach and supports nutrient absorption.'
        },
        {
            id: 23,
            name: 'Zinc-Rich Chickpea & Pumpkin Soup',
            description: 'Immune support and wound healing soup rich in zinc',
            tags: ['therapeutic', 'immune-support', 'wound-healing', 'middle-eastern', 'global'],
            prepTime: '30 min',
            protein: '12g',
            calories: '190',
            region: 'Middle East / Global',
            image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=400&h=300&fit=crop',
            ingredients: [
                '1 cup pumpkin, cubed',
                '1/2 cup cooked chickpeas',
                '1 small onion, chopped',
                '3 cups vegetable broth',
                '1 tbsp olive oil',
                'Pinch of cinnamon'
            ],
            instructions: [
                'Heat oil, sauté onion until soft',
                'Add pumpkin, chickpeas, broth; simmer until pumpkin is tender',
                'Blend until smooth; season with cinnamon'
            ],
            nutritionTips: 'Chickpeas are rich in zinc, essential for immune function. Pumpkin provides beta-carotene and vitamin A.',
            cancerBenefits: 'High zinc content supports immune system and wound healing. Beta-carotene supports tissue repair. Smooth texture is easy to digest.'
        }
    ]
};

// Educational Resources
const educationalResources = {
    // National Cancer Institute (NCI)
    'nci-nutrition-cancer': {
        title: 'Nutrition in Cancer Care (PDQ®) - 2024 Update',
        url: 'https://www.cancer.gov/about-cancer/treatment/side-effects/appetite-loss/nutrition-hp-pdq',
        description: 'Comprehensive evidence-based guidelines from NCI on nutrition during cancer treatment.',
        journalInfo: 'Updated quarterly by NCI expert panel. Referenced in over 500 peer-reviewed studies.',
        organization: 'National Cancer Institute (NCI)',
        icon: 'fas fa-hospital'
    },
    'nci-eating-hints': {
        title: 'Eating Hints: Before, During, and After Treatment',
        url: 'https://www.cancer.gov/publications/patient-education/eating-hints',
        description: 'Practical eating tips for cancer patients throughout their treatment journey.',
        journalInfo: 'Patient education resource updated annually by NCI nutrition experts.',
        organization: 'National Cancer Institute (NCI)',
        icon: 'fas fa-utensils'
    },
    'nci-nausea-management': {
        title: 'Managing Nausea and Vomiting - Clinical Guidelines',
        url: 'https://www.cancer.gov/about-cancer/treatment/side-effects/nausea',
        description: 'Evidence-based approaches to managing treatment-related nausea and vomiting.',
        journalInfo: 'Clinical guidelines reviewed by multidisciplinary expert panel.',
        organization: 'National Cancer Institute (NCI)',
        icon: 'fas fa-heartbeat'
    },
    'nci-protein-needs': {
        title: 'Protein Requirements During Cancer Treatment (2024)',
        url: 'https://www.cancer.gov/about-cancer/treatment/side-effects/appetite-loss/nutrition-hp-pdq#section/all',
        description: 'Updated protein intake recommendations for cancer patients.',
        journalInfo: 'Based on latest research in oncology nutrition and metabolism.',
        organization: 'National Cancer Institute (NCI)',
        icon: 'fas fa-dumbbell'
    },

    // American Cancer Society (ACS)
    'acs-nutrition-guidelines': {
        title: 'Cancer Prevention & Early Detection Guidelines 2024',
        url: 'https://www.cancer.org/healthy/eat-healthy-get-active.html',
        description: 'Comprehensive nutrition guidelines for cancer prevention and survivor care.',
        journalInfo: 'Evidence-based recommendations updated every 5 years.',
        organization: 'American Cancer Society (ACS)',
        icon: 'fas fa-shield'
    },
    'acs-food-safety': {
        title: 'Food Safety for People with Cancer (ACS, 2024)',
        url: 'https://www.cancer.org/treatment/survivorship-during-and-after-treatment/staying-active/nutrition/weak-immune-system.html',
        description: 'Food safety guidelines for immunocompromised cancer patients.',
        journalInfo: 'Updated annually based on CDC and FDA food safety recommendations.',
        organization: 'American Cancer Society (ACS)',
        icon: 'fas fa-clipboard-check'
    },
    'acs-weight-management': {
        title: 'Nutrition & Physical Activity Guidelines for Cancer Survivors',
        url: 'https://www.cancer.org/healthy/eat-healthy-get-active/acs-guidelines-nutrition-physical-activity-cancer-prevention.html',
        description: 'Comprehensive guidelines for nutrition and physical activity in cancer survivorship.',
        journalInfo: 'Systematic review of evidence published in CA: A Cancer Journal for Clinicians.',
        organization: 'American Cancer Society (ACS)',
        icon: 'fas fa-running'
    },
    'acs-regional-diets': {
        title: 'Cultural Dietary Considerations in Cancer Care',
        url: 'https://www.cancer.org/treatment/survivorship-during-and-after-treatment/staying-active/nutrition.html',
        description: 'Culturally sensitive nutrition approaches for diverse cancer patient populations.',
        journalInfo: 'Multi-institutional collaborative research on dietary patterns.',
        organization: 'American Cancer Society (ACS)',
        icon: 'fas fa-globe'
    },

    // World Health Organization (WHO)
    'who-global-nutrition': {
        title: 'Global Nutrition Targets 2025 - Cancer Care Focus',
        url: 'https://www.who.int/news-room/fact-sheets/detail/malnutrition',
        description: 'WHO targets for addressing malnutrition in cancer care globally.',
        journalInfo: 'Part of WHO Global Action Plan on NCDs and nutrition.',
        organization: 'World Health Organization (WHO)',
        icon: 'fas fa-globe'
    },
    'who-food-safety-cancer': {
        title: 'WHO Food Safety Guidelines for Immunocompromised Patients',
        url: 'https://www.who.int/news-room/fact-sheets/detail/food-safety',
        description: 'International food safety standards for vulnerable populations including cancer patients.',
        journalInfo: 'WHO technical report series on food safety.',
        organization: 'World Health Organization (WHO)',
        icon: 'fas fa-shield'
    },
    'who-regional-nutrition': {
        title: 'Regional Nutrition Patterns & Cancer Recovery (2024)',
        url: 'https://www.who.int/health-topics/nutrition',
        description: 'Analysis of regional dietary patterns and their impact on cancer recovery.',
        journalInfo: 'WHO regional office collaborative research initiative.',
        organization: 'World Health Organization (WHO)',
        icon: 'fas fa-map-marker'
    },
    'who-micronutrients': {
        title: 'Micronutrient Deficiencies in Cancer Care - WHO Report',
        url: 'https://www.who.int/news-room/fact-sheets/detail/micronutrients',
        description: 'Global assessment of micronutrient deficiencies in cancer care.',
        journalInfo: 'WHO technical consultation report on micronutrient requirements.',
        organization: 'World Health Organization (WHO)',
        icon: 'fas fa-pills'
    },

    // Clinical Research Journals
    'jco-nutrition-2024': {
        title: 'Journal of Clinical Oncology: Nutrition Interventions (2024)',
        url: 'https://ascopubs.org/journal/jco',
        description: 'Latest research on nutrition interventions in oncology practice.',
        journalInfo: 'High-impact peer-reviewed journal, IF: 45.3. Latest systematic reviews.',
        organization: 'Journal of Clinical Oncology',
        icon: 'fas fa-microscope'
    },
    'nutrition-cancer-journal': {
        title: 'Nutrition and Cancer: Geographic Dietary Patterns (2024)',
        url: 'https://www.tandfonline.com/toc/hnuc20/current',
        description: 'Research on geographic variations in dietary patterns and cancer outcomes.',
        journalInfo: 'Specialized nutrition and cancer research journal, peer-reviewed.',
        organization: 'Nutrition and Cancer Journal',
        icon: 'fas fa-chart-line'
    },
    'supportive-care-cancer': {
        title: 'Supportive Care in Cancer: Regional Food Guidelines',
        url: 'https://link.springer.com/journal/520',
        description: 'Evidence-based supportive care approaches including regional nutrition guidelines.',
        journalInfo: 'Official journal of MASCC and ISOO, focus on supportive care research.',
        organization: 'Supportive Care in Cancer',
        icon: 'fas fa-hands-helping'
    },
    'oncology-nutrition': {
        title: 'Clinical Journal of Oncology Nutrition (Latest Issue)',
        url: 'https://www.oncologynutrition.org',
        description: 'Specialized clinical nutrition research for oncology practice.',
        journalInfo: 'Peer-reviewed journal focusing on clinical applications.',
        organization: 'Clinical Journal of Oncology Nutrition',
        icon: 'fas fa-stethoscope'
    },

    // Geographic Nutrition Guidelines
    'mediterranean-diet-cancer': {
        title: 'Mediterranean Diet in Cancer Prevention (Europe)',
        url: 'https://www.mdpi.com/journal/nutrients',
        description: 'Research on Mediterranean dietary patterns and cancer prevention in European populations.',
        journalInfo: 'Multi-center European research collaboration, published in Nutrients.',
        organization: 'European Research Consortium',
        icon: 'fas fa-leaf'
    },
    'asian-diet-patterns': {
        title: 'Traditional Asian Diets & Cancer Recovery',
        url: 'https://academic.oup.com/ajcn',
        description: 'Analysis of traditional Asian dietary patterns and their role in cancer recovery.',
        journalInfo: 'Published in American Journal of Clinical Nutrition, Asian cohort studies.',
        organization: 'Asian Nutrition Research Network',
        icon: 'fas fa-circle'
    },
    'plant-based-americas': {
        title: 'Plant-Based Nutrition in the Americas',
        url: 'https://www.nutrition.org/our-journals/advances-in-nutrition/',
        description: 'Research on plant-based dietary approaches in cancer care across the Americas.',
        journalInfo: 'Multi-country collaborative study, published in Advances in Nutrition.',
        organization: 'Pan-American Nutrition Society',
        icon: 'fas fa-seedling'
    },
    'regional-food-access': {
        title: 'Food Security & Cancer Care by Region',
        url: 'https://www.cambridge.org/core/journals/public-health-nutrition',
        description: 'Analysis of food security challenges in cancer care across different regions.',
        journalInfo: 'Global health research published in Public Health Nutrition journal.',
        organization: 'Global Health Nutrition Network',
        icon: 'fas fa-balance-scale'
    }
};

// Navigation and UI functions
let currentSection = 'welcomeSection';

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section, .welcome-section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        currentSection = sectionId;
        
        // Scroll to top of the page smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Update active navigation item
        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.classList.remove('active');
        });
        
        // Find and activate the corresponding nav item
        const navMapping = {
            'welcomeSection': 'welcome',
            'profileSection': 'profile', 
            'recommendationsSection': 'recommendations',
            'guidanceSection': 'guidance',
            'learnSection': 'learn',
            'recipesSection': 'recipes',
            'trackingSection': 'tracking',
            'resourcesSection': 'resources'
        };
        
        const navKey = navMapping[sectionId];
        if (navKey) {
            const activeNavItem = document.querySelector(`[data-section="${navKey}"]`);
            if (activeNavItem) {
                activeNavItem.classList.add('active');
            }
        }
        
        // Load section-specific content
        if (sectionId === 'recipesSection') {
            loadRecipes();
        } else if (sectionId === 'recommendationsSection') {
            loadRecommendations();
        } else if (sectionId === 'learnSection') {
            initializeLearnSection();
        } else if (sectionId === 'trackingSection') {
            initializeTracking();
        } else if (sectionId === 'resourcesSection') {
            loadResources();
        }
    }
}

// Recipe functions
function loadRecipes() {
    filterRecipes('all');
}

function filterRecipes(category) {
    let recipesToShow = [];
    
    if (category === 'all') {
        // Show all recipes from all categories
        for (const cat in recipeData) {
            recipesToShow = recipesToShow.concat(recipeData[cat]);
        }
    } else if (recipeData[category]) {
        recipesToShow = recipeData[category];
    }
    
    renderRecipes(recipesToShow);
}

function showRecommendedRecipes() {
    // Filter recipes to show only those from recommended categories
    let recommendedRecipes = [];
    
    if (currentUserRecommendedFilters.length === 0) {
        // Fallback to all recipes if no recommendations available
        for (const cat in recipeData) {
            recommendedRecipes = recommendedRecipes.concat(recipeData[cat]);
        }
    } else {
        // Show recipes from recommended categories only
        currentUserRecommendedFilters.forEach(filter => {
            if (recipeData[filter]) {
                recommendedRecipes = recommendedRecipes.concat(recipeData[filter]);
            }
        });
    }
    
    // Update filter buttons to show "recommended" state
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Activate the "All Recipes" button and update its text temporarily
    const allButton = document.querySelector('.filter-btn[data-filter="all"]');
    if (allButton) {
        allButton.classList.add('active');
        const originalText = allButton.textContent;
        allButton.textContent = 'Your Recommended Recipes';
        
        // Restore original text after 3 seconds
        setTimeout(() => {
            if (allButton.classList.contains('active')) {
                allButton.textContent = originalText;
            }
        }, 3000);
    }
    
    renderRecipes(recommendedRecipes);
    
    // Show a message about the filtered results
    const recipesGrid = document.getElementById('recipesGrid');
    if (recipesGrid && recommendedRecipes.length > 0) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'recommendation-notice';
        messageDiv.innerHTML = `
            <i class="fas fa-star"></i>
            <span>Showing ${recommendedRecipes.length} recipes personalized for your profile</span>
            <button onclick="restoreAllRecipes()" class="btn-link">View all recipes</button>
        `;
        recipesGrid.parentNode.insertBefore(messageDiv, recipesGrid);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 5000);
    }
}

function restoreAllRecipes() {
    // Restore the "All Recipes" button text
    const allButton = document.querySelector('.filter-btn[data-filter="all"]');
    if (allButton) {
        allButton.textContent = 'All Recipes';
    }
    
    // Remove any existing recommendation notice
    const existingNotice = document.querySelector('.recommendation-notice');
    if (existingNotice && existingNotice.parentNode) {
        existingNotice.parentNode.removeChild(existingNotice);
    }
    
    // Show all recipes
    filterRecipes('all');
}

function renderRecipes(recipes) {
    const container = document.getElementById('recipesGrid');
    if (!container) return;
    
    if (recipes.length === 0) {
        container.innerHTML = '<p class="no-recipes">No recipes found for this filter.</p>';
        return;
    }
    
    const html = recipes.map(recipe => `
        <div class="recipe-card" onclick="openRecipeModal(${recipe.id})" data-recipe-id="${recipe.id}">
            <div class="recipe-image" style="background-image: url('${recipe.image || ''}')">
                <i class="fas fa-utensils"></i>
                ${recipe.region ? `<span class="recipe-region">${recipe.region}</span>` : ''}
            </div>
            <div class="recipe-content">
                <div class="recipe-tags">
                    ${recipe.tags.map(tag => `<span class="recipe-tag">${tag}</span>`).join('')}
                </div>
                <h3>${recipe.name}</h3>
                <p class="recipe-description">${recipe.description}</p>
                <div class="recipe-stats">
                    <span><i class="fas fa-clock"></i> ${recipe.prepTime}</span>
                    <span><i class="fas fa-dumbbell"></i> ${recipe.protein}</span>
                    <span><i class="fas fa-fire"></i> ${recipe.calories}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = html;
}

// Recipe Modal Functions
function openRecipeModal(recipeId) {
    // Find the recipe across all categories
    let recipe = null;
    for (const category in recipeData) {
        recipe = recipeData[category].find(r => r.id === recipeId);
        if (recipe) break;
    }
    
    if (!recipe) return;
    
    // Populate modal content
    const modal = document.getElementById('recipeModal');
    const modalImage = document.getElementById('recipeModalImage');
    const modalTitle = document.getElementById('recipeModalTitle');
    const modalRegion = document.getElementById('recipeModalRegion');
    const modalPrepTime = document.getElementById('modalPrepTime');
    const modalProtein = document.getElementById('modalProtein');
    const modalCalories = document.getElementById('modalCalories');
    const modalIngredients = document.getElementById('modalIngredients');
    const modalInstructions = document.getElementById('modalInstructions');
    const modalNutritionTips = document.getElementById('modalNutritionTips');
    const modalCancerBenefits = document.getElementById('modalCancerBenefits');
    
    // Set background image
    if (recipe.image) {
        modalImage.style.backgroundImage = `url('${recipe.image}')`;
    }
    
    // Populate content
    modalTitle.textContent = recipe.name;
    modalRegion.textContent = recipe.region || 'International';
    modalPrepTime.textContent = recipe.prepTime;
    modalProtein.textContent = recipe.protein;
    modalCalories.textContent = recipe.calories;
    
    // Populate ingredients
    modalIngredients.innerHTML = recipe.ingredients 
        ? recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')
        : '<li>Ingredients not available</li>';
    
    // Populate instructions
    modalInstructions.innerHTML = recipe.instructions 
        ? recipe.instructions.map(instruction => `<li>${instruction}</li>`).join('')
        : '<li>Instructions not available</li>';
    
    // Populate benefits
    modalNutritionTips.textContent = recipe.nutritionTips || 'Nutrition information not available.';
    modalCancerBenefits.textContent = recipe.cancerBenefits || 'Cancer-specific benefits not available.';
    
    // Show modal
    modal.classList.remove('hidden');
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeRecipeModal() {
    const modal = document.getElementById('recipeModal');
    modal.classList.add('hidden');
    
    // Restore body scroll
    document.body.style.overflow = '';
}

// Other placeholder functions
function loadRecommendations() {
    const userData = getUserProfile();
    if (!userData) {
        document.getElementById('personalizedContent').innerHTML = `
            <div class="alert alert-warning">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Please complete your personal assessment first to get customized recommendations.</p>
                <button class="btn btn-primary" onclick="showSection('profileSection')">
                    <i class="fas fa-user-circle"></i> Complete Assessment
                </button>
            </div>
        `;
        return;
    }

    generatePersonalizedRecommendations(userData);
}

function generatePersonalizedRecommendations(userData) {
    const container = document.getElementById('personalizedContent');
    
    // Generate location-based recommendations
    const locationRecommendations = getLocationBasedRecommendations(userData.location);
    
    // Generate symptom-based recommendations
    const symptomRecommendations = getSymptomBasedRecommendations(userData.symptoms);
    
    // Generate treatment stage recommendations
    const treatmentRecommendations = getTreatmentStageRecommendations(userData.treatmentStage);
    
    // Generate cancer type specific recommendations
    const cancerTypeRecommendations = getCancerTypeRecommendations(userData.cancerType);

    // Helper function to format text
    const formatText = (text) => {
        return text.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    container.innerHTML = `
        <div class="recommendations-container">
            <div class="user-summary">
                <h3><i class="fas fa-user"></i> Your Profile Summary</h3>
                <div class="profile-tags">
                    <span class="profile-tag">${formatText(userData.cancerType)} Cancer</span>
                    <span class="profile-tag">${formatText(userData.treatmentStage)}</span>
                    <span class="profile-tag">${formatText(userData.location)}</span>
                    ${userData.symptoms.length > 0 ? userData.symptoms.map(s => `<span class="profile-tag symptom">${formatText(s)}</span>`).join('') : ''}
                </div>
            </div>

            ${cancerTypeRecommendations}
            ${treatmentRecommendations}
            ${symptomRecommendations}
            ${locationRecommendations}

            <div class="recommendation-card">
                <h3><i class="fas fa-utensils"></i> Recommended Recipe Categories</h3>
                <div class="recipe-category-recommendations">
                    ${getRecommendedRecipeCategories(userData)}
                </div>
            </div>

            <div class="recommendation-card">
                <h3><i class="fas fa-chart-line"></i> Next Steps</h3>
                <div class="next-steps">
                    <button class="btn btn-primary" onclick="showSection('recipesSection'); setTimeout(() => showRecommendedRecipes(), 100);">
                        <i class="fas fa-utensils"></i> Explore Recommended Recipes
                    </button>
                    <button class="btn btn-secondary" onclick="showSection('trackingSection')">
                        <i class="fas fa-chart-pie"></i> Start Tracking Nutrition
                    </button>
                    <button class="btn btn-secondary" onclick="showSection('guidanceSection')">
                        <i class="fas fa-book-medical"></i> View General Guidelines
                    </button>
                </div>
            </div>
        </div>
    `;
}

function getUserProfile() {
    return safeLocalStorageGet('userProfile');
}

function saveUserProfile(profileData) {
    if (!safeLocalStorageSet('userProfile', profileData)) {
        console.error('Failed to save user profile');
        // Could show user notification here
    }
}

function getLocationBasedRecommendations(location) {
    const locationGuides = {
        'north-america': {
            title: 'North American Nutrition Guidelines',
            content: 'Following NCI (National Cancer Institute) and ACS (American Cancer Society) guidelines for optimal nutrition during cancer treatment.',
            resources: ['Focus on anti-inflammatory foods', 'Ensure food safety with proper cooking temperatures', 'Consider Mediterranean diet patterns']
        },
        'europe': {
            title: 'European Nutrition Standards',
            content: 'Based on ESMO (European Society for Medical Oncology) nutritional guidelines and local dietary patterns.',
            resources: ['Emphasize whole grains and lean proteins', 'Include traditional fermented foods', 'Follow DASH diet principles']
        },
        'asia-pacific': {
            title: 'Asia-Pacific Dietary Approaches',
            content: 'Incorporating traditional Asian dietary wisdom with modern oncology nutrition science.',
            resources: ['Include miso and fermented foods for gut health', 'Emphasize rice-based carbohydrates', 'Use ginger and turmeric for anti-inflammatory effects']
        },
        'middle-east': {
            title: 'Middle Eastern Nutrition Guidance',
            content: 'Incorporating traditional Mediterranean and Middle Eastern foods with evidence-based cancer nutrition.',
            resources: ['Use olive oil and nuts for healthy fats', 'Include legumes and whole grains', 'Emphasize fresh herbs and spices']
        },
        'africa': {
            title: 'African Dietary Approaches',
            content: 'Combining traditional African foods with modern nutritional science for cancer care.',
            resources: ['Include traditional grains like millet and sorghum', 'Use indigenous vegetables and fruits', 'Focus on plant-based proteins']
        },
        'south-america': {
            title: 'South American Nutrition Guidelines',
            content: 'Incorporating traditional South American foods with evidence-based cancer nutrition principles.',
            resources: ['Include quinoa and other ancient grains', 'Use tropical fruits for antioxidants', 'Emphasize beans and legumes']
        },
        'australia': {
            title: 'Australian/Oceanian Guidelines',
            content: 'Following Australian cancer nutrition guidelines with focus on fresh, local produce.',
            resources: ['Emphasize fresh seafood for omega-3s', 'Include native fruits and vegetables', 'Focus on outdoor-fresh produce']
        }
    };

    const guide = locationGuides[location] || locationGuides['north-america'];
    
    return `
        <div class="recommendation-card">
            <h3><i class="fas fa-globe"></i> ${guide.title}</h3>
            <p>${guide.content}</p>
            <ul>
                ${guide.resources.map(resource => `<li>${resource}</li>`).join('')}
            </ul>
        </div>
    `;
}

function getSymptomBasedRecommendations(symptoms) {
    if (!symptoms || symptoms.length === 0) return '';
    
    const symptomGuides = {
        'nausea': 'Try ginger tea, bland foods, and small frequent meals',
        'appetite-loss': 'Focus on nutrient-dense, high-calorie foods and protein smoothies',
        'mouth-sores': 'Choose soft, smooth foods and avoid acidic or spicy items',
        'fatigue': 'Prioritize easy-to-prepare, energy-dense meals',
        'taste-changes': 'Experiment with herbs, spices, and temperature variations',
        'digestive': 'Consider low-fiber options and probiotic foods'
    };

    return `
        <div class="recommendation-card">
            <h3><i class="fas fa-stethoscope"></i> Symptom Management</h3>
            <p>Targeted nutrition strategies for your current symptoms:</p>
            <ul>
                ${symptoms.map(symptom => `<li><strong>${symptom}:</strong> ${symptomGuides[symptom] || 'Consult with your healthcare team for specific guidance'}</li>`).join('')}
            </ul>
        </div>
    `;
}

function getTreatmentStageRecommendations(stage) {
    const stageGuides = {
        'pre-treatment': {
            title: 'Pre-Treatment Preparation',
            recommendations: ['Build nutrient stores', 'Focus on immune-supporting foods', 'Maintain healthy weight']
        },
        'active-treatment': {
            title: 'During Active Treatment',
            recommendations: ['Prioritize protein intake', 'Stay hydrated', 'Manage side effects through nutrition']
        },
        'post-treatment': {
            title: 'Recovery Phase',
            recommendations: ['Rebuild strength with balanced nutrition', 'Support healing with anti-inflammatory foods', 'Gradually increase activity']
        },
        'survivorship': {
            title: 'Long-term Survivorship',
            recommendations: ['Focus on cancer prevention foods', 'Maintain healthy weight', 'Follow general healthy eating patterns']
        }
    };

    const guide = stageGuides[stage] || stageGuides['active-treatment'];
    
    return `
        <div class="recommendation-card">
            <h3><i class="fas fa-heartbeat"></i> ${guide.title}</h3>
            <ul>
                ${guide.recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
        </div>
    `;
}

function getCancerTypeRecommendations(cancerType) {
    const cancerGuides = {
        // Most Common Cancers
        'breast': {
            title: 'Breast Cancer',
            guidance: 'Focus on soy foods (tofu, tempeh), cruciferous vegetables (broccoli, cauliflower), omega-3 fatty acids, and maintain healthy weight. Limit alcohol and processed foods.',
            keyNutrients: ['Fiber', 'Antioxidants', 'Omega-3s', 'Isoflavones'],
            foods: ['Soy products', 'Leafy greens', 'Berries', 'Fatty fish', 'Whole grains']
        },
        'lung': {
            title: 'Lung Cancer',
            guidance: 'Emphasize antioxidant-rich foods, maintain protein intake, and include anti-inflammatory foods. Beta-carotene from food sources, not supplements.',
            keyNutrients: ['Antioxidants', 'Protein', 'Vitamin C', 'Beta-carotene'],
            foods: ['Citrus fruits', 'Sweet potatoes', 'Spinach', 'Lean proteins', 'Green tea']
        },
        'colorectal': {
            title: 'Colorectal Cancer',
            guidance: 'Include high-fiber foods post-treatment, limit processed and red meats, focus on plant-based proteins and prebiotics for gut health.',
            keyNutrients: ['Fiber', 'Folate', 'Calcium', 'Prebiotics'],
            foods: ['Whole grains', 'Legumes', 'Vegetables', 'Yogurt', 'Fish']
        },
        'prostate': {
            title: 'Prostate Cancer',
            guidance: 'Consider lycopene-rich foods, limit high-fat dairy, include cruciferous vegetables and green tea. Focus on plant-based diet.',
            keyNutrients: ['Lycopene', 'Selenium', 'Vitamin E', 'Omega-3s'],
            foods: ['Tomatoes', 'Watermelon', 'Cruciferous vegetables', 'Nuts', 'Green tea']
        },
        'skin': {
            title: 'Skin Cancer (Melanoma)',
            guidance: 'Focus on antioxidants, vitamin D optimization, and anti-inflammatory foods. Include foods rich in vitamins C and E.',
            keyNutrients: ['Antioxidants', 'Vitamin D', 'Vitamin C', 'Vitamin E'],
            foods: ['Colorful fruits', 'Nuts', 'Seeds', 'Leafy greens', 'Fatty fish']
        },
        'bladder': {
            title: 'Bladder Cancer',
            guidance: 'Stay well-hydrated, include cruciferous vegetables, limit processed meats, and focus on antioxidant-rich foods.',
            keyNutrients: ['Antioxidants', 'Folate', 'Vitamin C', 'Fluids'],
            foods: ['Broccoli', 'Berries', 'Green tea', 'Water-rich fruits', 'Whole grains']
        },
        'kidney': {
            title: 'Kidney Cancer',
            guidance: 'Monitor protein and phosphorus intake, stay hydrated, include antioxidants, and work with dietitian for kidney function.',
            keyNutrients: ['Controlled protein', 'Antioxidants', 'Potassium balance'],
            foods: ['Lean proteins', 'Berries', 'Apples', 'Cabbage', 'Cauliflower']
        },
        'thyroid': {
            title: 'Thyroid Cancer',
            guidance: 'Focus on iodine balance, selenium-rich foods, and anti-inflammatory diet. Monitor cruciferous vegetables if on thyroid medication.',
            keyNutrients: ['Selenium', 'Iodine balance', 'Antioxidants'],
            foods: ['Brazil nuts', 'Seafood', 'Berries', 'Lean proteins', 'Whole grains']
        },
        'pancreatic': {
            title: 'Pancreatic Cancer',
            guidance: 'Focus on digestive enzymes, small frequent meals, healthy fats, and blood sugar management. Work closely with dietitian.',
            keyNutrients: ['Healthy fats', 'Digestive enzymes', 'B vitamins'],
            foods: ['Avocado', 'Olive oil', 'Small meals', 'Cooked vegetables', 'Lean proteins']
        },
        'liver': {
            title: 'Liver Cancer',
            guidance: 'Limit protein if liver function compromised, avoid alcohol completely, include antioxidants, and monitor sodium intake.',
            keyNutrients: ['Controlled protein', 'Antioxidants', 'Low sodium'],
            foods: ['Leafy greens', 'Berries', 'Low-sodium foods', 'Whole grains', 'Lean proteins']
        },
        
        // Blood Cancers
        'leukemia': {
            title: 'Leukemia',
            guidance: 'Prioritize food safety and infection prevention, maintain energy intake, include immune-supporting nutrients.',
            keyNutrients: ['Protein', 'Iron', 'B vitamins', 'Immune support'],
            foods: ['Well-cooked foods', 'Lean proteins', 'Fortified foods', 'Pasteurized dairy']
        },
        'lymphoma': {
            title: 'Lymphoma',
            guidance: 'Focus on immune-supporting nutrients, maintain energy intake, and follow food safety guidelines during treatment.',
            keyNutrients: ['Antioxidants', 'Protein', 'Immune support'],
            foods: ['Colorful fruits', 'Vegetables', 'Lean proteins', 'Well-cooked foods']
        },
        'myeloma': {
            title: 'Multiple Myeloma',
            guidance: 'Focus on bone health with calcium and vitamin D, maintain protein for muscle mass, and support kidney function.',
            keyNutrients: ['Calcium', 'Vitamin D', 'Protein', 'Kidney support'],
            foods: ['Dairy products', 'Leafy greens', 'Lean proteins', 'Fortified foods']
        },
        
        // Head & Neck Cancers
        'head-neck': {
            title: 'Head & Neck Cancer',
            guidance: 'Focus on soft, moist textures, nutrient-dense foods, and maintain hydration. May need texture modifications.',
            keyNutrients: ['High calories', 'Protein', 'Vitamins', 'Hydration'],
            foods: ['Smoothies', 'Soft proteins', 'Cooked vegetables', 'Nutritional supplements']
        },
        'brain': {
            title: 'Brain Cancer',
            guidance: 'Focus on anti-inflammatory foods, omega-3s, and maintaining energy for cognitive function. Include antioxidants.',
            keyNutrients: ['Omega-3s', 'Antioxidants', 'B vitamins'],
            foods: ['Fatty fish', 'Walnuts', 'Berries', 'Leafy greens', 'Whole grains']
        },
        'oral': {
            title: 'Oral Cancer',
            guidance: 'Soft, moist foods, avoid spicy/acidic foods, maintain nutrition with liquid supplements if needed.',
            keyNutrients: ['High calories', 'Protein', 'Vitamins'],
            foods: ['Smoothies', 'Soft fruits', 'Cooked grains', 'Protein shakes']
        },
        'throat': {
            title: 'Throat Cancer',
            guidance: 'Soft, easy-to-swallow foods, avoid irritating textures, focus on liquid nutrition if swallowing difficult.',
            keyNutrients: ['High calories', 'Protein', 'Hydration'],
            foods: ['Purees', 'Smoothies', 'Soft proteins', 'Nutritional drinks']
        },
        
        // Digestive System Cancers
        'stomach': {
            title: 'Stomach Cancer',
            guidance: 'Small, frequent meals, limit spicy foods, focus on easily digestible proteins and carbohydrates.',
            keyNutrients: ['B12', 'Iron', 'Protein', 'Easy digestion'],
            foods: ['Small meals', 'Lean proteins', 'Rice', 'Bananas', 'Cooked vegetables']
        },
        'esophageal': {
            title: 'Esophageal Cancer',
            guidance: 'Soft, moist foods, avoid hot/spicy foods, may need liquid nutrition, focus on swallowing-friendly textures.',
            keyNutrients: ['High calories', 'Protein', 'Soft textures'],
            foods: ['Smoothies', 'Purees', 'Soft proteins', 'Moist grains']
        },
        'gallbladder': {
            title: 'Gallbladder Cancer',
            guidance: 'Low-fat diet, avoid fried foods, focus on lean proteins and complex carbohydrates.',
            keyNutrients: ['Low fat', 'Fiber', 'Lean protein'],
            foods: ['Lean meats', 'Vegetables', 'Whole grains', 'Low-fat dairy']
        },
        'bile-duct': {
            title: 'Bile Duct Cancer',
            guidance: 'Low-fat diet, support liver function, include antioxidants, work with dietitian for fat absorption.',
            keyNutrients: ['Low fat', 'Antioxidants', 'Liver support'],
            foods: ['Lean proteins', 'Vegetables', 'Whole grains', 'Berries']
        },
        'small-intestine': {
            title: 'Small Intestine Cancer',
            guidance: 'Focus on easy digestion, may need low-fiber during treatment, maintain hydration and electrolytes.',
            keyNutrients: ['Easy digestion', 'Electrolytes', 'Hydration'],
            foods: ['White rice', 'Bananas', 'Cooked vegetables', 'Lean proteins']
        },
        
        // Gynecologic Cancers
        'ovarian': {
            title: 'Ovarian Cancer',
            guidance: 'Anti-inflammatory foods, maintain healthy weight, include folate-rich foods and antioxidants.',
            keyNutrients: ['Folate', 'Antioxidants', 'Anti-inflammatory'],
            foods: ['Leafy greens', 'Berries', 'Whole grains', 'Fatty fish']
        },
        'cervical': {
            title: 'Cervical Cancer',
            guidance: 'Focus on folate, antioxidants, and immune-supporting nutrients. Include colorful fruits and vegetables.',
            keyNutrients: ['Folate', 'Antioxidants', 'Vitamin C'],
            foods: ['Citrus fruits', 'Leafy greens', 'Whole grains', 'Colorful vegetables']
        },
        'uterine': {
            title: 'Uterine Cancer',
            guidance: 'Maintain healthy weight, include fiber and antioxidants, focus on plant-based foods.',
            keyNutrients: ['Fiber', 'Antioxidants', 'Phytonutrients'],
            foods: ['Whole grains', 'Vegetables', 'Fruits', 'Legumes']
        },
        'vulvar': {
            title: 'Vulvar Cancer',
            guidance: 'Focus on immune-supporting nutrients, antioxidants, and maintaining overall nutrition status.',
            keyNutrients: ['Antioxidants', 'Immune support', 'Protein'],
            foods: ['Colorful fruits', 'Vegetables', 'Lean proteins', 'Whole grains']
        },
        'vaginal': {
            title: 'Vaginal Cancer',
            guidance: 'Include antioxidants, immune-supporting foods, and maintain healthy weight with balanced nutrition.',
            keyNutrients: ['Antioxidants', 'Immune support', 'Balance'],
            foods: ['Berries', 'Leafy greens', 'Lean proteins', 'Whole grains']
        },
        
        // Urologic Cancers
        'testicular': {
            title: 'Testicular Cancer',
            guidance: 'Focus on antioxidants, maintain energy for treatment, include zinc and selenium-rich foods.',
            keyNutrients: ['Antioxidants', 'Zinc', 'Selenium'],
            foods: ['Nuts', 'Seeds', 'Lean meats', 'Whole grains', 'Fruits']
        },
        'penile': {
            title: 'Penile Cancer',
            guidance: 'Focus on immune-supporting nutrients, antioxidants, and maintaining overall nutritional status.',
            keyNutrients: ['Immune support', 'Antioxidants', 'Protein'],
            foods: ['Colorful fruits', 'Vegetables', 'Lean proteins', 'Whole grains']
        },
        
        // Bone & Soft Tissue
        'bone': {
            title: 'Bone Cancer',
            guidance: 'Focus on bone health with calcium and vitamin D, maintain protein for healing, include anti-inflammatory foods.',
            keyNutrients: ['Calcium', 'Vitamin D', 'Protein', 'Anti-inflammatory'],
            foods: ['Dairy products', 'Leafy greens', 'Fatty fish', 'Lean proteins']
        },
        'soft-tissue': {
            title: 'Soft Tissue Sarcoma',
            guidance: 'Focus on protein for tissue repair, include antioxidants and anti-inflammatory foods.',
            keyNutrients: ['Protein', 'Antioxidants', 'Anti-inflammatory'],
            foods: ['Lean proteins', 'Berries', 'Leafy greens', 'Fatty fish']
        },
        
        // Endocrine Cancers
        'adrenal': {
            title: 'Adrenal Cancer',
            guidance: 'Focus on blood sugar balance, stress-supporting nutrients, and anti-inflammatory foods.',
            keyNutrients: ['Blood sugar balance', 'B vitamins', 'Magnesium'],
            foods: ['Whole grains', 'Lean proteins', 'Vegetables', 'Nuts']
        },
        'parathyroid': {
            title: 'Parathyroid Cancer',
            guidance: 'Monitor calcium levels, focus on bone health, and work closely with healthcare team on mineral balance.',
            keyNutrients: ['Calcium balance', 'Vitamin D', 'Phosphorus'],
            foods: ['Balanced calcium', 'Leafy greens', 'Lean proteins']
        },
        
        // Rare Cancers
        'mesothelioma': {
            title: 'Mesothelioma',
            guidance: 'Focus on anti-inflammatory foods, maintain energy, and support respiratory health with antioxidants.',
            keyNutrients: ['Anti-inflammatory', 'Antioxidants', 'Energy'],
            foods: ['Fatty fish', 'Berries', 'Leafy greens', 'Whole grains']
        },
        'neuroendocrine': {
            title: 'Neuroendocrine Tumors',
            guidance: 'May need to limit certain foods that trigger symptoms, focus on balanced nutrition and work with specialist.',
            keyNutrients: ['Balanced nutrition', 'Symptom management'],
            foods: ['Whole foods', 'Lean proteins', 'Complex carbs', 'Vegetables']
        },
        'carcinoid': {
            title: 'Carcinoid Tumor',
            guidance: 'May need to avoid tyramine-rich foods, focus on niacin, and work with dietitian for trigger foods.',
            keyNutrients: ['Niacin', 'Trigger avoidance', 'Balance'],
            foods: ['Fresh foods', 'Lean proteins', 'Whole grains', 'Vegetables']
        },
        'gastrointestinal-stromal': {
            title: 'GIST',
            guidance: 'Focus on easy digestion, may need texture modifications, maintain nutrition during targeted therapy.',
            keyNutrients: ['Easy digestion', 'Protein', 'Energy'],
            foods: ['Soft foods', 'Lean proteins', 'Cooked vegetables', 'Whole grains']
        },
        'other': {
            title: 'Other Cancer Types',
            guidance: 'Follow general cancer nutrition guidelines with focus on your specific needs and treatment requirements.',
            keyNutrients: ['Balanced nutrition', 'Individualized care'],
            foods: ['Variety of whole foods', 'Lean proteins', 'Fruits', 'Vegetables']
        }
    };

    const guide = cancerGuides[cancerType] || cancerGuides['other'];
    
    return `
        <div class="recommendation-card">
            <h3><i class="fas fa-dna"></i> ${guide.title} Specific Guidance</h3>
            <p><strong>Key Recommendations:</strong> ${guide.guidance}</p>
            <div class="nutrition-details">
                <div class="key-nutrients">
                    <h4><i class="fas fa-star"></i> Key Nutrients:</h4>
                    <ul>
                        ${guide.keyNutrients.map(nutrient => `<li>${nutrient}</li>`).join('')}
                    </ul>
                </div>
                <div class="recommended-foods">
                    <h4><i class="fas fa-apple-alt"></i> Recommended Foods:</h4>
                    <ul>
                        ${guide.foods.map(food => `<li>${food}</li>`).join('')}
                    </ul>
                </div>
            </div>
            <div class="disclaimer">
                <p><small><i class="fas fa-info-circle"></i> These are general guidelines. Always consult with your healthcare team and registered dietitian for personalized recommendations based on your specific treatment plan and individual needs.</small></p>
            </div>
        </div>
    `;
}

function getRecommendedRecipeCategories(userData) {
    let categories = [];
    
    // Based on symptoms
    if (userData.symptoms.includes('nausea') || userData.symptoms.includes('appetite-loss')) {
        categories.push({name: 'Symptom Management', filter: 'symptom-management', icon: 'fas fa-heart-pulse'});
    }
    
    if (userData.symptoms.includes('mouth-sores') || userData.symptoms.includes('digestive')) {
        categories.push({name: 'Texture Modified', filter: 'texture-modified', icon: 'fas fa-blender'});
    }
    
    // Based on treatment stage
    if (userData.treatmentStage === 'active-treatment' || userData.treatmentStage === 'post-treatment') {
        categories.push({name: 'High Protein/Calorie', filter: 'high-protein-high-calorie', icon: 'fas fa-dumbbell'});
        categories.push({name: 'Therapeutic/Medical', filter: 'therapeutic-medical', icon: 'fas fa-pills'});
    }
    
    // Always include general healthy
    categories.push({name: 'General Healthy', filter: 'general-healthy', icon: 'fas fa-leaf'});
    
    // Store the recommended filters globally for use by "Explore Recommended Recipes" button
    currentUserRecommendedFilters = categories.map(cat => cat.filter);
    
    return categories.map(cat => `
        <button class="recipe-category-btn" onclick="showSection('recipesSection'); setTimeout(() => filterRecipes('${cat.filter}'), 100);">
            <i class="${cat.icon}"></i>
            <span>${cat.name}</span>
        </button>
    `).join('');
}

function initializeTracking() {
    // Initialize current date
    const today = new Date();
    let currentTrackingDate = new Date(today);
    updateDateDisplay();
    
    // Load today's nutrition data
    loadNutritionData(formatDateForStorage(currentTrackingDate));
    
    // Add event listeners for date navigation
    const prevDayBtn = document.getElementById('prevDay');
    const nextDayBtn = document.getElementById('nextDay');
    
    if (prevDayBtn) {
        prevDayBtn.addEventListener('click', () => {
            currentTrackingDate.setDate(currentTrackingDate.getDate() - 1);
            updateDateDisplay();
            loadNutritionData(formatDateForStorage(currentTrackingDate));
        });
    }
    
    if (nextDayBtn) {
        nextDayBtn.addEventListener('click', () => {
            currentTrackingDate.setDate(currentTrackingDate.getDate() + 1);
            updateDateDisplay();
            loadNutritionData(formatDateForStorage(currentTrackingDate));
        });
    }
    
    function updateDateDisplay() {
        const dateElement = document.getElementById('currentDate');
        if (dateElement) {
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            dateElement.textContent = currentTrackingDate.toLocaleDateString('en-US', options);
        }
    }
    
    function formatDateForStorage(date) {
        return date.toISOString().split('T')[0]; // YYYY-MM-DD format
    }
}

function loadNutritionData(dateString) {
    // Get stored nutrition data for the date
    const nutritionData = JSON.parse(localStorage.getItem(`nutrition_${dateString}`) || '{"foods": [], "totals": {"calories": 0, "protein": 0, "fluids": 0}}');
    
    // Update nutrition summary displays
    updateNutritionSummary(nutritionData.totals);
    
    // Update food log
    updateFoodLog(nutritionData.foods);
}

function updateNutritionSummary(totals) {
    // Update calorie count
    const caloriesElement = document.getElementById('caloriesCount');
    if (caloriesElement) {
        caloriesElement.textContent = totals.calories || 0;
    }
    
    // Update protein count
    const proteinElement = document.getElementById('proteinCount');
    if (proteinElement) {
        proteinElement.textContent = totals.protein || 0;
    }
    
    // Update fluids count
    const fluidsElement = document.getElementById('fluidsCount');
    if (fluidsElement) {
        fluidsElement.textContent = totals.fluids || 0;
    }
}

function updateFoodLog(foods) {
    const foodLogContainer = document.getElementById('foodLogEntries');
    if (!foodLogContainer) return;
    
    if (foods.length === 0) {
        foodLogContainer.innerHTML = '<p class="empty-log">No foods or fluids logged today. Start by adding your first meal or drink!</p>';
        return;
    }
    
    // Group foods by meal type and fluids by time
    const mealGroups = {
        breakfast: [],
        lunch: [],
        dinner: [],
        snack: [],
        fluids: []  // All fluids go into a separate group
    };
    
    foods.forEach(item => {
        if (item.type === 'fluid') {
            mealGroups.fluids.push(item);
        } else if (mealGroups[item.meal]) {
            mealGroups[item.meal].push(item);
        }
    });
    
    let html = '';
    
    // Display meal groups first
    const mealOrder = ['breakfast', 'lunch', 'dinner', 'snack'];
    mealOrder.forEach(mealType => {
        const mealFoods = mealGroups[mealType];
        if (mealFoods.length > 0) {
            const mealName = mealType.charAt(0).toUpperCase() + mealType.slice(1);
            html += `
                <div class="meal-group">
                    <h4 class="meal-title"><i class="fas fa-utensils"></i> ${mealName}</h4>
                    <div class="meal-foods">
                        ${mealFoods.map(food => `
                            <div class="food-entry">
                                <div class="food-info">
                                    <span class="food-name">${food.name}</span>
                                    <span class="food-portion">${food.portion || food.amount}</span>
                                </div>
                                <div class="food-nutrition">
                                    <span class="calories">${food.calories || 0} cal</span>
                                    <span class="protein">${food.protein || 0}g protein</span>
                                </div>
                                <button class="remove-food-btn" onclick="removeFoodItem('${food.id}')">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
    });
    
    // Display fluids group
    if (mealGroups.fluids.length > 0) {
        html += `
            <div class="meal-group">
                <h4 class="meal-title"><i class="fas fa-tint"></i> Fluid Intake</h4>
                <div class="meal-foods">
                    ${mealGroups.fluids.map(fluid => `
                        <div class="food-entry fluid-entry">
                            <div class="food-info">
                                <span class="food-name">${fluid.name}</span>
                                <span class="food-portion">${fluid.amount} - ${fluid.time}</span>
                            </div>
                            <div class="food-nutrition">
                                <span class="calories">${fluid.calories || 0} cal</span>
                                <span class="fluids">${fluid.fluids || 0}ml</span>
                            </div>
                            <button class="remove-food-btn" onclick="removeFoodItem('${fluid.id}')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    foodLogContainer.innerHTML = html;
}

function openFoodModal() {
    const modal = document.getElementById('foodModal');
    if (modal) {
        // Scroll to top before showing modal
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Show modal after a brief delay to ensure smooth scrolling
        setTimeout(() => {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            
            // Clear form fields
            document.getElementById('foodName').value = '';
            document.getElementById('portion').value = '';
            document.getElementById('mealType').selectedIndex = 0;
        }, 100);
    }
}

function closeFoodModal() {
    const modal = document.getElementById('foodModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

function addFoodItem() {
    const foodName = document.getElementById('foodName').value.trim();
    const portion = document.getElementById('portion').value.trim();
    const mealType = document.getElementById('mealType').value;
    
    // Validate required fields
    if (!foodName) {
        alert('Please enter a food name');
        document.getElementById('foodName').focus();
        return;
    }
    
    if (!portion) {
        alert('Please enter a portion size');
        document.getElementById('portion').focus();
        return;
    }
    
    if (!foodName || !portion) {
        alert('Please enter both food name and portion size');
        return;
    }
    
    // Create food item with estimated nutrition values
    const foodItem = {
        id: Date.now().toString(),
        name: foodName,
        portion: portion,
        meal: mealType,
        calories: estimateCalories(foodName, portion),
        protein: estimateProtein(foodName, portion),
        fluids: estimateFluids(foodName, portion),
        timestamp: new Date().toISOString()
    };
    
    // Get current date for storage
    const today = new Date();
    const dateString = today.toISOString().split('T')[0];
    
    // Get existing nutrition data
    const nutritionData = JSON.parse(localStorage.getItem(`nutrition_${dateString}`) || '{"foods": [], "totals": {"calories": 0, "protein": 0, "fluids": 0}}');
    
    // Add new food item
    nutritionData.foods.push(foodItem);
    
    // Update totals
    nutritionData.totals.calories += foodItem.calories;
    nutritionData.totals.protein += foodItem.protein;
    nutritionData.totals.fluids += foodItem.fluids;
    
    // Save updated data
    localStorage.setItem(`nutrition_${dateString}`, JSON.stringify(nutritionData));
    
    // Refresh displays
    updateNutritionSummary(nutritionData.totals);
    updateFoodLog(nutritionData.foods);
    
    // Close modal
    closeFoodModal();
}

// Fluid Tracking Functions
function openFluidModal() {
    const modal = document.getElementById('fluidModal');
    if (modal) {
        // Scroll to top before showing modal
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Show modal after a brief delay to ensure smooth scrolling
        setTimeout(() => {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            
            // Clear form fields
            document.getElementById('fluidType').selectedIndex = 0;
            document.getElementById('customFluid').value = '';
            document.getElementById('fluidAmount').value = '';
            document.getElementById('fluidTime').selectedIndex = 0;
            
            // Hide custom fluid input initially
            const customFluidGroup = document.querySelector('.custom-fluid-group');
            if (customFluidGroup) {
                customFluidGroup.style.display = 'none';
            }
        }, 100);
    }
}

function closeFluidModal() {
    const modal = document.getElementById('fluidModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

function addFluidItem() {
    const fluidType = document.getElementById('fluidType').value;
    const customFluid = document.getElementById('customFluid').value.trim();
    const fluidAmount = parseInt(document.getElementById('fluidAmount').value);
    const fluidTime = document.getElementById('fluidTime').value;
    
    // Validate required fields
    if (!fluidAmount || fluidAmount <= 0) {
        alert('Please enter a valid fluid amount');
        document.getElementById('fluidAmount').focus();
        return;
    }
    
    if (fluidAmount > 2000) {
        alert('Amount seems too large. Please enter a reasonable amount (max 2000ml)');
        document.getElementById('fluidAmount').focus();
        return;
    }
    
    // Determine fluid name
    let fluidName = fluidType;
    if (fluidType === 'other' && customFluid) {
        fluidName = customFluid;
    } else if (fluidType === 'other' && !customFluid) {
        alert('Please specify the fluid type');
        document.getElementById('customFluid').focus();
        return;
    }
    
    // Create fluid item
    const fluidItem = {
        id: Date.now().toString(),
        type: 'fluid',
        name: getFluidDisplayName(fluidName),
        amount: `${fluidAmount}ml`,
        time: fluidTime,
        calories: getFluidCalories(fluidName, fluidAmount),
        protein: 0, // Most fluids don't contain significant protein
        fluids: fluidAmount,
        timestamp: new Date().toISOString()
    };
    
    // Get current date for storage
    const today = new Date();
    const dateString = today.toISOString().split('T')[0];
    
    // Get existing nutrition data
    const nutritionData = JSON.parse(localStorage.getItem(`nutrition_${dateString}`) || '{"foods": [], "totals": {"calories": 0, "protein": 0, "fluids": 0}}');
    
    // Add new fluid item
    nutritionData.foods.push(fluidItem);
    
    // Update totals
    nutritionData.totals.calories += fluidItem.calories;
    nutritionData.totals.protein += fluidItem.protein;
    nutritionData.totals.fluids += fluidItem.fluids;
    
    // Save updated data
    localStorage.setItem(`nutrition_${dateString}`, JSON.stringify(nutritionData));
    
    // Refresh displays
    updateNutritionSummary(nutritionData.totals);
    updateFoodLog(nutritionData.foods);
    
    // Close modal
    closeFluidModal();
}

function getFluidDisplayName(fluidType) {
    const displayNames = {
        'water': 'Water',
        'herbal-tea': 'Herbal Tea',
        'green-tea': 'Green Tea',
        'broth': 'Broth/Soup',
        'juice': 'Fruit/Vegetable Juice',
        'milk': 'Milk',
        'smoothie': 'Smoothie'
    };
    return displayNames[fluidType] || fluidType;
}

function getFluidCalories(fluidType, amount) {
    // Rough calorie estimates per 100ml
    const caloriesPerMl = {
        'water': 0,
        'herbal-tea': 0,
        'green-tea': 0,
        'broth': 0.1,
        'juice': 0.4,
        'milk': 0.42,
        'smoothie': 0.6
    };
    
    const calorieRate = caloriesPerMl[fluidType] || 0;
    return Math.round(calorieRate * amount);
}

function removeFoodItem(foodId) {
    const today = new Date();
    const dateString = today.toISOString().split('T')[0];
    
    // Get existing nutrition data
    const nutritionData = JSON.parse(localStorage.getItem(`nutrition_${dateString}`) || '{"foods": [], "totals": {"calories": 0, "protein": 0, "fluids": 0}}');
    
    // Find and remove food item (ensure ID comparison works with both string and number IDs)
    const foodIndex = nutritionData.foods.findIndex(food => food.id.toString() === foodId.toString());
    if (foodIndex === -1) {
        console.warn('Food item not found:', foodId);
        return;
    }
    
    const removedFood = nutritionData.foods[foodIndex];
    nutritionData.foods.splice(foodIndex, 1);
    
    // Update totals
    nutritionData.totals.calories -= removedFood.calories;
    nutritionData.totals.protein -= removedFood.protein;
    nutritionData.totals.fluids -= removedFood.fluids;
    
    // Ensure totals don't go below 0
    nutritionData.totals.calories = Math.max(0, nutritionData.totals.calories);
    nutritionData.totals.protein = Math.max(0, nutritionData.totals.protein);
    nutritionData.totals.fluids = Math.max(0, nutritionData.totals.fluids);
    
    // Save updated data
    localStorage.setItem(`nutrition_${dateString}`, JSON.stringify(nutritionData));
    
    // Refresh displays
    updateNutritionSummary(nutritionData.totals);
    updateFoodLog(nutritionData.foods);
}

// Simple nutrition estimation functions (could be enhanced with a real nutrition database)
function estimateCalories(foodName, portion) {
    const food = foodName.toLowerCase();
    let baseCalories = 100; // default estimate
    
    // Simple estimation based on food type
    if (food.includes('rice') || food.includes('pasta') || food.includes('bread')) {
        baseCalories = 200;
    } else if (food.includes('chicken') || food.includes('beef') || food.includes('fish')) {
        baseCalories = 250;
    } else if (food.includes('vegetable') || food.includes('salad')) {
        baseCalories = 50;
    } else if (food.includes('fruit') || food.includes('apple') || food.includes('banana')) {
        baseCalories = 80;
    } else if (food.includes('nuts') || food.includes('oil') || food.includes('butter')) {
        baseCalories = 400;
    }
    
    // Adjust for portion (very basic)
    const portionLower = portion.toLowerCase();
    let multiplier = 1;
    if (portionLower.includes('large') || portionLower.includes('2 cup')) {
        multiplier = 1.5;
    } else if (portionLower.includes('small') || portionLower.includes('1/2 cup')) {
        multiplier = 0.5;
    }
    
    return Math.round(baseCalories * multiplier);
}

function estimateProtein(foodName, portion) {
    const food = foodName.toLowerCase();
    let baseProtein = 3; // default estimate
    
    if (food.includes('chicken') || food.includes('beef') || food.includes('fish')) {
        baseProtein = 25;
    } else if (food.includes('egg')) {
        baseProtein = 12;
    } else if (food.includes('beans') || food.includes('lentil')) {
        baseProtein = 15;
    } else if (food.includes('nuts')) {
        baseProtein = 8;
    } else if (food.includes('rice') || food.includes('pasta')) {
        baseProtein = 5;
    } else if (food.includes('vegetable') || food.includes('fruit')) {
        baseProtein = 1;
    }
    
    const portionLower = portion.toLowerCase();
    let multiplier = 1;
    if (portionLower.includes('large') || portionLower.includes('2 cup')) {
        multiplier = 1.5;
    } else if (portionLower.includes('small') || portionLower.includes('1/2 cup')) {
        multiplier = 0.5;
    }
    
    return Math.round(baseProtein * multiplier);
}

function estimateFluids(foodName, portion) {
    const food = foodName.toLowerCase();
    let baseFluid = 0; // default estimate for solid foods
    
    if (food.includes('water') || food.includes('juice') || food.includes('tea') || food.includes('coffee')) {
        baseFluid = 250; // assuming 1 cup
    } else if (food.includes('soup') || food.includes('broth')) {
        baseFluid = 200;
    } else if (food.includes('smoothie') || food.includes('milk')) {
        baseFluid = 250;
    } else if (food.includes('fruit') || food.includes('vegetable')) {
        baseFluid = 50; // water content in fruits/vegetables
    }
    
    const portionLower = portion.toLowerCase();
    let multiplier = 1;
    if (portionLower.includes('large') || portionLower.includes('2 cup')) {
        multiplier = 1.5;
    } else if (portionLower.includes('small') || portionLower.includes('1/2 cup')) {
        multiplier = 0.5;
    }
    
    return Math.round(baseFluid * multiplier);
}

function initializeLearnSection() {
    // Add event listeners for learning tabs
    const learningTabs = document.querySelectorAll('.learning-tab');
    const learningPanels = document.querySelectorAll('.learning-panel');
    
    learningTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and panels
            learningTabs.forEach(t => t.classList.remove('active'));
            learningPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            this.classList.add('active');
            document.getElementById(`${tabName}-panel`).classList.add('active');
        });
    });
}

function loadResources() {
    // Resources are already loaded in HTML, just ensure they're interactive
    console.log('Resources section loaded with', Object.keys(educationalResources).length, 'resources');
}

function openResource(resourceId) {
    const resource = educationalResources[resourceId];
    if (!resource) {
        console.error('Resource not found:', resourceId);
        return;
    }
    
    // Create and show resource modal
    showResourceModal(resource);
}

function showResourceModal(resource) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('resourceModal');
    if (!modal) {
        modal = createResourceModal();
    }
    
    // Populate modal content
    const modalTitle = modal.querySelector('.resource-modal-title');
    const modalOrganization = modal.querySelector('.resource-modal-organization');
    const modalDescription = modal.querySelector('.resource-modal-description');
    const modalJournalInfo = modal.querySelector('.resource-modal-journal');
    const modalLink = modal.querySelector('.resource-modal-link');
    
    modalTitle.textContent = resource.title;
    modalOrganization.innerHTML = `<i class="${resource.icon}"></i> ${resource.organization}`;
    modalDescription.textContent = resource.description;
    modalJournalInfo.textContent = resource.journalInfo;
    modalLink.href = resource.url;
    modalLink.onclick = () => {
        window.open(resource.url, '_blank', 'noopener,noreferrer');
        closeResourceModal();
        return false;
    };
    
    // Scroll to top before showing modal
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Show modal after a brief delay to ensure smooth scrolling
    setTimeout(() => {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }, 100);
}

function createResourceModal() {
    const modal = document.createElement('div');
    modal.id = 'resourceModal';
    modal.className = 'modal hidden';
    
    modal.innerHTML = `
        <div class="modal-content resource-modal-content">
            <div class="modal-header">
                <div class="resource-modal-organization"></div>
                <button class="close-modal" onclick="closeResourceModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <h3 class="resource-modal-title"></h3>
                <p class="resource-modal-description"></p>
                <div class="resource-modal-meta">
                    <div class="journal-info">
                        <i class="fas fa-info-circle"></i>
                        <span class="resource-modal-journal"></span>
                    </div>
                </div>
                <div class="resource-modal-actions">
                    <a href="#" class="btn btn-primary resource-modal-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i> View Resource
                    </a>
                    <button class="btn btn-secondary" onclick="closeResourceModal()">
                        Close
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    return modal;
}

function closeResourceModal() {
    const modal = document.getElementById('resourceModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// Accessibility Functions
function initializeAccessibilityToggle() {
    const toggleBtn = document.getElementById('toggleHighContrast');
    if (!toggleBtn) return;
    
    // Check if high contrast was previously enabled
    const isHighContrastEnabled = localStorage.getItem('highContrastMode') === 'true';
    if (isHighContrastEnabled) {
        document.body.classList.add('high-contrast');
        updateToggleButtonState(toggleBtn, true);
    }
    
    // Add click event listener
    toggleBtn.addEventListener('click', function() {
        const isCurrentlyEnabled = document.body.classList.contains('high-contrast');
        
        if (isCurrentlyEnabled) {
            // Disable high contrast
            document.body.classList.remove('high-contrast');
            localStorage.setItem('highContrastMode', 'false');
            updateToggleButtonState(toggleBtn, false);
        } else {
            // Enable high contrast
            document.body.classList.add('high-contrast');
            localStorage.setItem('highContrastMode', 'true');
            updateToggleButtonState(toggleBtn, true);
        }
    });
}

function updateToggleButtonState(button, isHighContrast) {
    const icon = button.querySelector('i');
    if (isHighContrast) {
        icon.className = 'fas fa-eye-slash';
        button.setAttribute('aria-label', 'Disable high contrast mode');
        button.title = 'Disable high contrast mode';
    } else {
        icon.className = 'fas fa-eye';
        button.setAttribute('aria-label', 'Enable high contrast mode');
        button.title = 'Enable high contrast mode';
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    // Show welcome section by default
    showSection('welcomeSection');
    
    // Initialize high contrast toggle
    initializeAccessibilityToggle();
    
    // Add form submission handler
    const assessmentForm = document.getElementById('assessmentForm');
    if (assessmentForm) {
        assessmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get symptoms
            const symptoms = [];
            document.querySelectorAll('input[name="symptoms"]:checked').forEach(checkbox => {
                symptoms.push(checkbox.value);
            });
            
            const profileData = {
                cancerType: document.getElementById('cancerType').value,
                treatmentStage: document.getElementById('treatmentStage').value,
                location: document.getElementById('location').value,
                specificLocation: document.getElementById('specificLocation').value,
                symptoms: symptoms,
                allergies: document.getElementById('allergies').value,
                timestamp: new Date().toISOString()
            };
            
            // Validate required fields
            if (!profileData.cancerType || !profileData.treatmentStage || !profileData.location) {
                alert('Please fill in all required fields (marked with *)');
                return;
            }
            
            // Save profile data
            saveUserProfile(profileData);
            
            // Show success message and redirect to recommendations
            const submitBtn = assessmentForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Saved! Loading recommendations...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showSection('recommendationsSection');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
    }
    
    // Add event listeners for filter buttons
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter recipes
            const category = this.getAttribute('data-filter');
            filterRecipes(category);
        });
    });
    
    // Add event listener for fluid type selection
    const fluidTypeSelect = document.getElementById('fluidType');
    if (fluidTypeSelect) {
        fluidTypeSelect.addEventListener('change', function() {
            const customFluidGroup = document.getElementById('customFluidGroup');
            if (this.value === 'other') {
                customFluidGroup.style.display = 'block';
                document.getElementById('customFluid').focus();
            } else {
                customFluidGroup.style.display = 'none';
            }
        });
    }
    
    // Close modal on backdrop click
    document.addEventListener('click', (e) => {
        const recipeModal = document.getElementById('recipeModal');
        const resourceModal = document.getElementById('resourceModal');
        const foodModal = document.getElementById('foodModal');
        const fluidModal = document.getElementById('fluidModal');
        
        if (e.target === recipeModal) {
            closeRecipeModal();
        } else if (e.target === resourceModal) {
            closeResourceModal();
        } else if (e.target === foodModal) {
            closeFoodModal();
        } else if (e.target === fluidModal) {
            closeFluidModal();
        }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeRecipeModal();
            closeResourceModal();
            closeFoodModal();
            closeFluidModal();
        }
    });
});

// Clear Profile Form Function
function clearProfileForm() {
    if (confirm('Are you sure you want to clear all form data? This action cannot be undone.')) {
        // Clear all form fields
        document.getElementById('cancerType').value = '';
        document.getElementById('treatmentStage').value = '';
        document.getElementById('location').value = '';
        document.getElementById('specificLocation').value = '';
        document.getElementById('allergies').value = '';
        
        // Clear all checkboxes by selecting all checkboxes with name="symptoms"
        const symptomCheckboxes = document.querySelectorAll('input[name="symptoms"]');
        symptomCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Clear any saved profile data from localStorage
        localStorage.removeItem('userProfile');
        
        // Show success message
        alert('Profile form cleared successfully!');
    }
}

// Clear Today's Tracking Data Function
function clearTodayTracking() {
    if (confirm('Are you sure you want to clear all food and fluid entries for today? This action cannot be undone.')) {
        const today = new Date();
        const dateString = today.toISOString().split('T')[0];
        
        // Clear today's nutrition data from localStorage
        localStorage.removeItem(`nutrition_${dateString}`);
        
        // Reset the UI
        document.getElementById('caloriesCount').textContent = '0';
        document.getElementById('proteinCount').textContent = '0';
        document.getElementById('fluidsCount').textContent = '0';
        
        // Clear the food log display
        const foodLogEntries = document.getElementById('foodLogEntries');
        if (foodLogEntries) {
            foodLogEntries.innerHTML = '<p class="empty-log">No foods logged today. Start by adding your first meal!</p>';
        }
        
        // Show success message
        alert('Today\'s tracking data cleared successfully!');
    }
}
