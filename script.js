// Global CAM Recipe Data - Organized by Holistic & Complementary Medicine Approaches
// Global variables for user recommendations
let currentUserRecommendedFilters = [];
let currentRecipeMode = 'cam'; // 'conventional' or 'cam'

// Global object for user holistic preferences
let userHolisticPreferences = {
    approach: 'conventional',
    traditions: [],
    mindBody: [],
    constitution: ''
};

// Global variables for weekly history navigation
let currentWeekStart = new Date();
currentWeekStart.setDate(currentWeekStart.getDate() - currentWeekStart.getDay()); // Start of current week

// Function to show/hide sections
function showSection(sectionId) {
    // Hide all sections first
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show the requested section
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.remove('hidden');
        // Scroll into view smoothly
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Helper functions for date handling
function getWeekRange(startDate) {
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return { start, end };
}

function formatWeekRange(range) {
    const options = { month: 'short', day: 'numeric' };
    return `${range.start.toLocaleDateString('en-US', options)} - ${range.end.toLocaleDateString('en-US', options)}`;
}

function formatDate(date) {
    return date.toISOString().split('T')[0];
}

// Helper: return storage date string (YYYY-MM-DD) for a given Date object (normalized to noon)
function getStorageDateStringFrom(d) {
    const dt = new Date(d);
    dt.setHours(12,0,0,0);
    return dt.toISOString().split('T')[0];
}

// Helper: return storage date string for currently selected tracking date or today
function getSelectedStorageDateString() {
    const sel = window.currentTrackingDate ? new Date(window.currentTrackingDate) : new Date();
    sel.setHours(12,0,0,0);
    return sel.toISOString().split('T')[0];
}

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

// Conventional Recipe Data - Original categories
const conventionalRecipeData = {
    'healthy': [
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
                '2 tomatoes, chopped',
                '1 tsp turmeric',
                '1 tsp cumin seeds',
                '2 tbsp ghee or oil',
                'Salt to taste'
            ],
            instructions: [
                'Rinse lentils and boil with turmeric until soft',
                'Heat ghee, add cumin seeds until they splutter',
                'Add onions, cook until golden, then add tomatoes',
                'Mix with cooked lentils, simmer for 10 minutes'
            ],
            nutritionTips: 'Red lentils are high in folate and iron. Complete protein when paired with rice.',
            cancerBenefits: 'Easy to digest protein source. Turmeric provides anti-inflammatory benefits.'
        },
        {
            id: 201,
            name: 'Quinoa & Roasted Vegetable Bowl',
            description: 'Nutrient-dense superfood bowl with complete protein quinoa',
            tags: ['healthy', 'vegetarian', 'complete-protein', 'fiber-rich'],
            prepTime: '30 min',
            protein: '14g',
            calories: '350',
            region: 'Americas',
            image: 'file:///c:/Users/hkumarm/Pictures/Screenshots/Screenshot%202025-08-16%20125956.png',
            ingredients: [
                '1 cup quinoa, cooked',
                '1 cup mixed vegetables (zucchini, bell peppers, carrots)',
                '1 tbsp olive oil',
                '1 tsp dried oregano or thyme',
                'Salt and pepper to taste'
            ],
            instructions: [
                'Preheat oven to 375°F (190°C)',
                'Toss vegetables with olive oil and oregano',
                'Roast 20–25 minutes until tender',
                'Serve over quinoa'
            ],
            nutritionTips: 'Quinoa is a complete protein containing all essential amino acids. Colorful vegetables provide diverse antioxidants.',
            cancerBenefits: 'High in fiber and plant-based protein. Antioxidants from mixed vegetables support immune function and may help reduce inflammation.'
        },
        {
            id: 202,
            name: 'Avocado & Black Bean Wrap',
            description: 'Heart-healthy wrap with plant protein and healthy fats',
            tags: ['healthy', 'vegetarian', 'portable', 'heart-healthy'],
            prepTime: '10 min',
            protein: '12g',
            calories: '320',
            region: 'Latin America',
            image: 'file:///c:/Users/hkumarm/Pictures/Screenshots/Screenshot%202025-08-16%20125956.png',
            ingredients: [
                '1 whole wheat tortilla',
                '1/2 avocado, mashed',
                '1/2 cup cooked black beans',
                '1/4 cup shredded lettuce',
                '1 tbsp lime juice',
                'Salt and pepper to taste'
            ],
            instructions: [
                'Spread mashed avocado on tortilla',
                'Add beans, lettuce, and drizzle lime juice',
                'Season with salt and pepper',
                'Roll up and serve'
            ],
            nutritionTips: 'Avocados provide monounsaturated fats and potassium. Black beans offer plant protein and fiber.',
            cancerBenefits: 'Rich in folate and fiber. Healthy fats support nutrient absorption and may help reduce inflammation.'
        }
    ],
    
    'symptom-management': [
        {
            id: 4,
            name: 'Ginger Mint Tea',
            description: 'Soothing herbal tea to combat nausea and digestive discomfort',
            tags: ['nausea', 'herbal', 'digestive', 'warm'],
            prepTime: '5 min',
            protein: '0g',
            calories: '5',
            region: 'Global',
            image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop',
            ingredients: [
                '1 inch fresh ginger root',
                '10 fresh mint leaves',
                '2 cups water',
                '1 tsp honey (optional)'
            ],
            instructions: [
                'Slice ginger thinly',
                'Boil water with ginger for 5 minutes',
                'Add mint leaves, steep for 2 minutes',
                'Strain and add honey if desired'
            ],
            nutritionTips: 'Ginger contains gingerol, which helps reduce nausea. Mint soothes the digestive tract.',
            cancerBenefits: 'Highly effective for chemotherapy-induced nausea. Helps maintain hydration.'
        },
        {
            id: 5,
            name: 'Banana Rice Porridge',
            description: 'Gentle, easy-to-digest meal for sensitive stomachs',
            tags: ['bland', 'easy-digest', 'comfort', 'potassium'],
            prepTime: '15 min',
            protein: '4g',
            calories: '180',
            region: 'Global',
            image: 'https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?w=400&h=300&fit=crop',
            ingredients: [
                '½ cup white rice',
                '2 cups water',
                '1 ripe banana, mashed',
                '1 tbsp honey',
                '⅛ tsp cinnamon',
                'Pinch of salt'
            ],
            instructions: [
                'Cook rice with extra water until very soft',
                'Mash banana and mix into warm rice',
                'Add honey, cinnamon, and salt',
                'Serve warm in small portions'
            ],
            nutritionTips: 'Bananas provide potassium and easy carbohydrates. White rice is easily digestible.',
            cancerBenefits: 'Ideal for mouth sores or digestive upset. Provides quick energy and electrolytes.'
        },
        {
            id: 6,
            name: 'Coconut Water Smoothie',
            description: 'Hydrating smoothie with electrolytes for treatment days',
            tags: ['hydrating', 'electrolytes', 'cold', 'refreshing'],
            prepTime: '5 min',
            protein: '2g',
            calories: '120',
            region: 'Tropical',
            image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop',
            ingredients: [
                '1 cup coconut water',
                '½ frozen banana',
                '¼ cup frozen mango chunks',
                '1 tbsp chia seeds',
                '1 tsp fresh lime juice'
            ],
            instructions: [
                'Combine all ingredients in blender',
                'Blend until smooth',
                'Add ice if thinner consistency desired',
                'Serve immediately'
            ],
            nutritionTips: 'Coconut water naturally contains electrolytes. Chia seeds provide omega-3s and fiber.',
            cancerBenefits: 'Excellent for hydration during treatment. Gentle on sensitive stomachs.'
        },
        {
            id: 203,
            name: 'Ginger & Honey Herbal Tea',
            description: 'Anti-nausea herbal tea with natural ginger and soothing honey',
            tags: ['nausea', 'herbal', 'digestive', 'anti-inflammatory'],
            prepTime: '8 min',
            protein: '0g',
            calories: '15',
            region: 'Global',
            image: 'file:///c:/Users/hkumarm/Pictures/Screenshots/Screenshot%202025-08-16%20125956.png',
            ingredients: [
                '1 cup hot water',
                '1-inch fresh ginger root, sliced',
                '1 tsp honey (optional)',
                '1 tsp lemon juice (optional)'
            ],
            instructions: [
                'Steep ginger slices in hot water for 5–7 minutes',
                'Strain into a cup',
                'Stir in honey and lemon juice if desired',
                'Serve warm'
            ],
            nutritionTips: 'Fresh ginger contains gingerol compounds that effectively reduce nausea. Honey provides gentle energy.',
            cancerBenefits: 'Highly effective for chemotherapy-induced nausea. Natural anti-inflammatory properties support digestive comfort.'
        },
        {
            id: 204,
            name: 'Creamy Banana-Oat Smoothie',
            description: 'High-calorie smoothie for appetite stimulation and weight maintenance',
            tags: ['appetite-loss', 'weight-gain', 'high-calorie', 'protein'],
            prepTime: '20 min',
            protein: '12g',
            calories: '380',
            region: 'Global',
            image: 'file:///c:/Users/hkumarm/Pictures/Screenshots/Screenshot%202025-08-16%20125956.png',
            ingredients: [
                '1 banana',
                '1/2 cup rolled oats (soaked in water or milk for 15 minutes)',
                '1 cup milk (or plant-based milk)',
                '1 tbsp peanut butter or almond butter',
                'Honey to taste'
            ],
            instructions: [
                'Soak oats in water or milk for 15 minutes',
                'Blend banana, soaked oats, milk, and nut butter until smooth',
                'Sweeten with honey if desired',
                'Serve immediately for best texture'
            ],
            nutritionTips: 'Oats provide sustained energy and fiber. Nut butter adds healthy fats and protein for weight maintenance.',
            cancerBenefits: 'Excellent for patients with appetite loss. High-calorie content helps prevent unintended weight loss during treatment.'
        },
        {
            id: 205,
            name: 'Soft Scrambled Eggs with Spinach',
            description: 'Gentle protein-rich meal for patients with mouth sores or swallowing difficulties',
            tags: ['mouth-sores', 'soft-texture', 'protein', 'easy-chew'],
            prepTime: '8 min',
            protein: '14g',
            calories: '180',
            region: 'Global',
            image: 'file:///c:/Users/hkumarm/Pictures/Screenshots/Screenshot%202025-08-16%20125956.png',
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
                'Add egg mixture, stir slowly over low heat until creamy',
                'Remove from heat while still soft and creamy'
            ],
            nutritionTips: 'Eggs provide complete protein and choline. Spinach adds iron, folate, and vitamins A, C, and K.',
            cancerBenefits: 'Soft texture ideal for mouth sores or chewing difficulties. High-quality protein supports tissue repair and immune function.'
        },
        {
            id: 206,
            name: 'Mashed Sweet Potato with Greek Yogurt',
            description: 'Comforting, easy-to-digest meal with probiotics and sustained energy',
            tags: ['digestive-comfort', 'probiotics', 'energy', 'soft-texture'],
            prepTime: '20 min',
            protein: '8g',
            calories: '220',
            region: 'Global',
            image: 'file:///c:/Users/hkumarm/Pictures/Screenshots/Screenshot%202025-08-16%20125956.png',
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
            nutritionTips: 'Sweet potatoes provide beta-carotene and complex carbohydrates. Greek yogurt adds probiotics and protein.',
            cancerBenefits: 'Gentle on digestive system. Probiotics support gut health during treatment. Beta-carotene supports immune function.'
        },
        {
            id: 207,
            name: 'Miso Soup with Tofu & Seaweed',
            description: 'Light, hydrating soup with umami flavors and gentle nutrition',
            tags: ['hydration', 'light-nutrition', 'probiotics', 'easy-digest'],
            prepTime: '10 min',
            protein: '6g',
            calories: '80',
            region: 'East Asia',
            image: 'file:///c:/Users/hkumarm/Pictures/Screenshots/Screenshot%202025-08-16%20125956.png',
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
            nutritionTips: 'Miso provides probiotics and umami flavor. Seaweed offers iodine and minerals. Tofu adds plant-based protein.',
            cancerBenefits: 'Light and hydrating for treatment days. Probiotics support digestive health. Easy to consume when appetite is low.'
        }
    ],
    
    'high-protein-high-calorie': [
        {
            id: 7,
            name: 'Protein-Packed Smoothie Bowl',
            description: 'Nutrient-dense breakfast bowl with plant and dairy proteins',
            tags: ['protein', 'calories', 'breakfast', 'antioxidants'],
            prepTime: '10 min',
            protein: '22g',
            calories: '450',
            region: 'Modern/Global',
            image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400&h=300&fit=crop',
            ingredients: [
                '1 scoop vanilla protein powder',
                '1 cup whole milk or fortified plant milk',
                '½ avocado',
                '½ frozen banana',
                '1 tbsp almond butter',
                '1 tbsp ground flaxseed',
                '¼ cup blueberries',
                '1 tbsp chopped almonds'
            ],
            instructions: [
                'Blend protein powder, milk, avocado, banana, and almond butter',
                'Pour into bowl',
                'Top with flaxseed, blueberries, and almonds',
                'Serve immediately'
            ],
            nutritionTips: 'Combines complete proteins with healthy fats. Avocado adds calories and creaminess.',
            cancerBenefits: 'High calorie density helps prevent weight loss. Antioxidants support immune function.'
        },
        {
            id: 8,
            name: 'Quinoa Power Salad',
            description: 'Complete protein salad with quinoa, nuts, and tahini dressing',
            tags: ['protein', 'complete-protein', 'filling', 'mediterranean'],
            prepTime: '20 min',
            protein: '18g',
            calories: '420',
            region: 'Mediterranean/Andean',
            image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop',
            ingredients: [
                '1 cup cooked quinoa',
                '¼ cup chickpeas',
                '2 tbsp mixed nuts (walnuts, almonds)',
                '2 tbsp tahini',
                '1 tbsp olive oil',
                '1 tbsp lemon juice',
                'Mixed greens',
                'Cherry tomatoes'
            ],
            instructions: [
                'Mix cooked quinoa with chickpeas and nuts',
                'Whisk tahini, olive oil, and lemon juice for dressing',
                'Toss quinoa mixture with dressing',
                'Serve over mixed greens with tomatoes'
            ],
            nutritionTips: 'Quinoa provides all essential amino acids. Tahini adds healthy fats and calcium.',
            cancerBenefits: 'Plant-based complete protein supports tissue repair. High in fiber and antioxidants.'
        },
        {
            id: 208,
            name: 'Lentil & Chicken Stew',
            description: 'Protein-rich stew combining lean chicken with fiber-packed lentils',
            tags: ['protein', 'comfort', 'high-calorie', 'warming'],
            prepTime: '35 min',
            protein: '28g',
            calories: '420',
            region: 'South Asia / Middle East',
            image: 'file:///c:/Users/hkumarm/Pictures/Screenshots/Screenshot%202025-08-16%20125956.png',
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
            nutritionTips: 'Combines complete animal protein with plant protein and fiber. Turmeric provides anti-inflammatory benefits.',
            cancerBenefits: 'High protein content supports muscle maintenance during treatment. Easy to digest and very filling.'
        },
        {
            id: 209,
            name: 'Peanut Butter Banana Overnight Oats',
            description: 'High-calorie breakfast with plant protein and healthy fats',
            tags: ['protein', 'high-calorie', 'breakfast', 'make-ahead'],
            prepTime: '5 min (overnight)',
            protein: '16g',
            calories: '480',
            region: 'Americas',
            image: 'file:///c:/Users/hkumarm/Pictures/Screenshots/Screenshot%202025-08-16%20125956.png',
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
            nutritionTips: 'Peanut butter provides plant protein and healthy fats. Chia seeds add omega-3s and fiber.',
            cancerBenefits: 'High calorie density for weight maintenance. Easy to prepare when energy is low. Rich in protein for muscle support.'
        },
        {
            id: 210,
            name: 'Salmon & Quinoa Bowl',
            description: 'Omega-3 rich salmon with complete protein quinoa and vegetables',
            tags: ['protein', 'omega-3', 'anti-inflammatory', 'complete-meal'],
            prepTime: '20 min',
            protein: '32g',
            calories: '520',
            region: 'Europe / Global',
            image: 'file:///c:/Users/hkumarm/Pictures/Screenshots/Screenshot%202025-08-16%20125956.png',
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
            nutritionTips: 'Salmon provides high-quality protein and omega-3 fatty acids. Quinoa offers complete plant protein.',
            cancerBenefits: 'Omega-3s may help reduce inflammation. High protein supports tissue repair and immune function.'
        },
        {
            id: 211,
            name: 'Chickpea & Tahini Power Hummus',
            description: 'Protein-rich Middle Eastern dip with complete amino acid profile',
            tags: ['protein', 'plant-based', 'healthy-fats', 'versatile'],
            prepTime: '10 min',
            protein: '12g',
            calories: '280',
            region: 'Middle East',
            image: 'file:///c:/Users/hkumarm/Pictures/Screenshots/Screenshot%202025-08-16%20125956.png',
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
            nutritionTips: 'Chickpeas and tahini together provide complete protein. Rich in fiber, folate, and healthy fats.',
            cancerBenefits: 'Plant-based protein supports muscle maintenance. Easy to eat and digest. High in folate for cell repair.'
        },
        {
            id: 212,
            name: 'Greek Yogurt Parfait with Nuts & Berries',
            description: 'Probiotic-rich parfait with protein, antioxidants, and healthy fats',
            tags: ['protein', 'probiotics', 'antioxidants', 'quick'],
            prepTime: '5 min',
            protein: '20g',
            calories: '350',
            region: 'Europe / North America',
            image: 'file:///c:/Users/hkumarm/Pictures/Screenshots/Screenshot%202025-08-16%20125956.png',
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
            nutritionTips: 'Greek yogurt provides probiotics and high-quality protein. Nuts add healthy fats and vitamin E.',
            cancerBenefits: 'Probiotics support gut health during treatment. High protein helps maintain muscle mass. Antioxidants from berries support immune function.'
        }
    ],
    
    'texture-modified': [
        {
            id: 9,
            name: 'Silky Butternut Squash Soup',
            description: 'Smooth, nutritious soup perfect for swallowing difficulties',
            tags: ['smooth', 'pureed', 'vitamins', 'comfort'],
            prepTime: '35 min',
            protein: '6g',
            calories: '165',
            region: 'Global',
            image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=400&h=300&fit=crop',
            ingredients: [
                '2 cups roasted butternut squash',
                '2 cups low-sodium vegetable broth',
                '¼ cup coconut milk',
                '1 tsp fresh ginger, grated',
                '⅛ tsp nutmeg',
                'Salt and pepper to taste'
            ],
            instructions: [
                'Roast cubed squash at 400°F for 25 minutes',
                'Blend roasted squash with broth until smooth',
                'Heat gently, stir in coconut milk and seasonings',
                'Strain if extra smooth texture needed'
            ],
            nutritionTips: 'High in vitamin A and beta-carotene. Coconut milk adds healthy fats.',
            cancerBenefits: 'Easy to swallow for mouth sores. Provides essential nutrients in smooth form.'
        },
        {
            id: 10,
            name: 'Protein-Enriched Mashed Sweet Potato',
            description: 'Creamy mashed sweet potato fortified with protein powder',
            tags: ['smooth', 'protein', 'beta-carotene', 'comfort'],
            prepTime: '25 min',
            protein: '15g',
            calories: '280',
            region: 'Global',
            image: 'https://images.unsplash.com/photo-1447433589675-4aaa569f3e05?w=400&h=300&fit=crop',
            ingredients: [
                '2 medium sweet potatoes',
                '1 scoop unflavored protein powder',
                '2 tbsp butter or ghee',
                '¼ cup warm milk',
                '1 tsp cinnamon',
                'Pinch of salt'
            ],
            instructions: [
                'Bake sweet potatoes until very soft',
                'Scoop out flesh and mash until smooth',
                'Mix protein powder with warm milk',
                'Combine all ingredients, adjust consistency as needed'
            ],
            nutritionTips: 'Sweet potatoes are rich in vitamin A. Added protein supports healing.',
            cancerBenefits: 'Smooth texture for swallowing difficulties. High nutritional density.'
        },
        {
            id: 213,
            name: 'Creamy Carrot & Lentil Soup',
            description: 'Smooth, protein-rich soup with beta-carotene and plant protein',
            tags: ['smooth', 'pureed', 'protein', 'beta-carotene'],
            prepTime: '25 min',
            protein: '10g',
            calories: '200',
            region: 'Europe / South Asia',
            image: 'file:///c:/Users/hkumarm/Pictures/Screenshots/Screenshot%202025-08-16%20125956.png',
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
            nutritionTips: 'Carrots provide beta-carotene for immune support. Red lentils offer easily digestible plant protein.',
            cancerBenefits: 'Completely smooth texture ideal for swallowing difficulties. High in immune-supporting nutrients.'
        },
        {
            id: 214,
            name: 'Mashed Avocado & Cottage Cheese Bowl',
            description: 'Creamy, protein-rich bowl with healthy fats and probiotics',
            tags: ['smooth', 'protein', 'healthy-fats', 'probiotics'],
            prepTime: '5 min',
            protein: '14g',
            calories: '280',
            region: 'North America / Latin America',
            image: 'file:///c:/Users/hkumarm/Pictures/Screenshots/Screenshot%202025-08-16%20125956.png',
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
            nutritionTips: 'Avocados provide monounsaturated fats and potassium. Cottage cheese adds complete protein and probiotics.',
            cancerBenefits: 'Soft, creamy texture perfect for mouth sores. High in calories and protein for weight maintenance.'
        },
        {
            id: 215,
            name: 'Silken Tofu & Banana Smoothie',
            description: 'Ultra-smooth protein smoothie with plant-based nutrition',
            tags: ['smooth', 'protein', 'plant-based', 'easy-digest'],
            prepTime: '5 min',
            protein: '12g',
            calories: '220',
            region: 'East Asia / Global',
            image: 'file:///c:/Users/hkumarm/Pictures/Screenshots/Screenshot%202025-08-16%20125956.png',
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
            nutritionTips: 'Silken tofu provides complete plant protein with smooth texture. Bananas add potassium and natural sweetness.',
            cancerBenefits: 'Completely smooth for swallowing difficulties. Plant-based protein supports healing without digestive strain.'
        },
        {
            id: 216,
            name: 'Pumpkin & Potato Mash',
            description: 'Smooth, comforting mash rich in beta-carotene and potassium',
            tags: ['smooth', 'comfort', 'beta-carotene', 'warming'],
            prepTime: '25 min',
            protein: '4g',
            calories: '160',
            region: 'Australia / Global',
            image: 'file:///c:/Users/hkumarm/Pictures/Screenshots/Screenshot%202025-08-16%20125956.png',
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
            nutritionTips: 'Pumpkin is rich in beta-carotene and vitamin A. Potatoes provide potassium and energy.',
            cancerBenefits: 'Completely smooth texture for oral difficulties. Rich in immune-supporting vitamins and minerals.'
        },
        {
            id: 217,
            name: 'Oatmeal with Stewed Apples',
            description: 'Soft, comforting oatmeal with naturally sweetened fruit',
            tags: ['smooth', 'comfort', 'fiber', 'warming'],
            prepTime: '15 min',
            protein: '8g',
            calories: '240',
            region: 'Europe / North America',
            image: 'file:///c:/Users/hkumarm/Pictures/Screenshots/Screenshot%202025-08-16%20125956.png',
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
            nutritionTips: 'Oats provide soluble fiber and sustained energy. Stewed apples are easy to digest and naturally sweet.',
            cancerBenefits: 'Soft texture suitable for oral difficulties. Fiber supports digestive health during treatment.'
        }
    ],
    
    'therapeutic-medical': [
        {
            id: 11,
            name: 'Anti-Inflammatory Golden Milk',
            description: 'Turmeric-based drink with proven anti-inflammatory benefits',
            tags: ['anti-inflammatory', 'turmeric', 'therapeutic', 'warming'],
            prepTime: '8 min',
            protein: '8g',
            calories: '150',
            region: 'India/Global',
            image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop',
            ingredients: [
                '1 cup whole milk or fortified plant milk',
                '1 tsp turmeric powder',
                '½ tsp ginger powder',
                '¼ tsp cinnamon',
                'Pinch of black pepper',
                '1 tsp honey or maple syrup',
                '1 tsp coconut oil'
            ],
            instructions: [
                'Gently heat milk in a saucepan',
                'Whisk in turmeric, ginger, cinnamon, and pepper',
                'Simmer for 5 minutes, stirring constantly',
                'Add honey and coconut oil, whisk until smooth'
            ],
            nutritionTips: 'Curcumin absorption enhanced by black pepper and fat. Anti-inflammatory properties.',
            cancerBenefits: 'May help reduce treatment-related inflammation. Supports immune function.'
        },
        {
            id: 12,
            name: 'Omega-3 Rich Salmon Bowl',
            description: 'Therapeutic bowl with wild salmon and anti-inflammatory vegetables',
            tags: ['omega-3', 'anti-inflammatory', 'protein', 'therapeutic'],
            prepTime: '25 min',
            protein: '35g',
            calories: '485',
            region: 'Nordic/Global',
            image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
            ingredients: [
                '5 oz wild salmon fillet',
                '1 cup steamed broccoli',
                '½ cup cooked brown rice',
                '¼ avocado, sliced',
                '1 tbsp olive oil',
                '1 tsp lemon juice',
                '1 tsp fresh dill',
                'Sea salt and pepper'
            ],
            instructions: [
                'Season salmon with salt, pepper, and dill',
                'Bake at 400°F for 15 minutes',
                'Steam broccoli until tender',
                'Arrange salmon over rice with vegetables',
                'Drizzle with olive oil and lemon juice'
            ],
            nutritionTips: 'Wild salmon provides high-quality omega-3 fatty acids. Complete protein source.',
            cancerBenefits: 'Omega-3s may help reduce inflammation. High-quality protein supports healing.'
        },
        {
            id: 218,
            name: 'Omega-3 Rich Salmon & Spinach Soup',
            description: 'Anti-inflammatory soup with salmon and iron-rich spinach for immune support',
            tags: ['anti-inflammatory', 'omega-3', 'immune-support', 'protein'],
            prepTime: '20 min',
            protein: '25g',
            calories: '320',
            region: 'Europe / North America',
            image: 'file:///c:/Users/hkumarm/Pictures/Screenshots/Screenshot%202025-08-16%20125956.png',
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
            nutritionTips: 'Salmon provides omega-3 fatty acids that reduce inflammation. Spinach offers iron, folate, and vitamin K.',
            cancerBenefits: 'Anti-inflammatory omega-3s support healing. Iron from spinach helps prevent treatment-related anemia.'
        },
        {
            id: 219,
            name: 'Turmeric & Ginger Rice Congee',
            description: 'Soothing anti-nausea congee with therapeutic spices for digestive comfort',
            tags: ['anti-nausea', 'digestive-soothing', 'turmeric', 'therapeutic'],
            prepTime: '60 min',
            protein: '6g',
            calories: '180',
            region: 'South Asia / East Asia',
            image: 'file:///c:/Users/hkumarm/Pictures/Screenshots/Screenshot%202025-08-16%20125956.png',
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
            nutritionTips: 'Ginger contains gingerol compounds that combat nausea. Turmeric provides anti-inflammatory curcumin.',
            cancerBenefits: 'Highly effective for chemotherapy-induced nausea. Easy to digest and provides sustained energy.'
        },
        {
            id: 220,
            name: 'Iron & Folate Boost Lentil Spinach Curry',
            description: 'Therapeutic curry designed to combat treatment-related anemia',
            tags: ['anemia-support', 'iron-rich', 'folate', 'therapeutic'],
            prepTime: '30 min',
            protein: '16g',
            calories: '280',
            region: 'South Asia / Middle East',
            image: 'file:///c:/Users/hkumarm/Pictures/Screenshots/Screenshot%202025-08-16%20125956.png',
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
            nutritionTips: 'Lentils provide iron and folate essential for blood production. Spinach enhances iron absorption when combined with vitamin C.',
            cancerBenefits: 'Specifically designed to combat chemotherapy-induced anemia. High in blood-building nutrients.'
        },
        {
            id: 221,
            name: 'Calcium-Boosted Almond & Berry Smoothie',
            description: 'Bone health support smoothie for post-treatment recovery',
            tags: ['bone-health', 'calcium-rich', 'recovery', 'antioxidants'],
            prepTime: '5 min',
            protein: '15g',
            calories: '280',
            region: 'Global',
            image: 'file:///c:/Users/hkumarm/Pictures/Screenshots/Screenshot%202025-08-16%20125956.png',
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
            nutritionTips: 'Fortified almond milk and Greek yogurt provide calcium for bone health. Berries offer antioxidants for recovery.',
            cancerBenefits: 'Supports bone health during and after treatment. Antioxidants aid in cellular repair and recovery.'
        },
        {
            id: 222,
            name: 'Low-Fiber White Fish Stew',
            description: 'Gentle stew for bowel rest during gastrointestinal irritation',
            tags: ['low-fiber', 'bowel-rest', 'gi-friendly', 'gentle'],
            prepTime: '18 min',
            protein: '22g',
            calories: '200',
            region: 'Mediterranean',
            image: 'file:///c:/Users/hkumarm/Pictures/Screenshots/Screenshot%202025-08-16%20125956.png',
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
            nutritionTips: 'White fish provides easily digestible protein. Low-fiber vegetables reduce digestive strain.',
            cancerBenefits: 'Designed for patients with gastrointestinal side effects. Provides nutrition while allowing bowel rest.'
        },
        {
            id: 223,
            name: 'Papaya & Pineapple Digestive Bowl',
            description: 'Enzyme-rich fruit bowl to support digestion and nutrient absorption',
            tags: ['digestive-enzymes', 'tropical', 'enzyme-support', 'probiotics'],
            prepTime: '5 min',
            protein: '8g',
            calories: '160',
            region: 'Tropical / Global',
            image: 'file:///c:/Users/hkumarm/Pictures/Screenshots/Screenshot%202025-08-16%20125956.png',
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
            nutritionTips: 'Papaya contains papain enzyme, pineapple contains bromelain - both aid protein digestion. Probiotics support gut health.',
            cancerBenefits: 'Natural digestive enzymes help with treatment-related digestive issues. Supports nutrient absorption and gut health.'
        },
        {
            id: 224,
            name: 'Zinc-Rich Chickpea & Pumpkin Soup',
            description: 'Immune-boosting soup with zinc for wound healing and immune support',
            tags: ['immune-support', 'zinc-rich', 'wound-healing', 'therapeutic'],
            prepTime: '25 min',
            protein: '12g',
            calories: '220',
            region: 'Middle East / Global',
            image: 'file:///c:/Users/hkumarm/Pictures/Screenshots/Screenshot%202025-08-16%20125956.png',
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
            nutritionTips: 'Chickpeas are high in zinc, essential for immune function and wound healing. Pumpkin provides beta-carotene.',
            cancerBenefits: 'Zinc supports immune system recovery and wound healing post-surgery. Beta-carotene aids in cellular repair.'
        }
    ]
};

// Function to count recipes in each category
function getRecipeCounts(recipeData) {
    const counts = {};
    let total = 0;
    
    for (const category in recipeData) {
        // Apply allergy filtering before counting
        const safeRecipes = filterRecipesForAllergies(recipeData[category]);
        counts[category] = safeRecipes.length;
        total += safeRecipes.length;
        
        // Debug logging
        console.log(`Category ${category}: ${recipeData[category].length} total recipes, ${safeRecipes.length} safe recipes`);
        if (recipeData[category].length > 0 && safeRecipes.length === 0) {
            console.warn(`All recipes in category ${category} were filtered out due to allergies!`);
        }
    }
    
    counts.all = total;
    return counts;
}

// Enhanced CAM Recipe Data Structure
const camRecipeData = {
    'ayurveda': [
        {
            id: 'ayur_001',
            name: 'Golden Turmeric Khichdi',
            description: 'Traditional Ayurvedic healing porridge with mung dal and basmati rice',
            tradition: 'Ayurveda',
            region: 'South Asia',
            origin: 'Ancient India (3000+ years)',
            purpose: 'Digestive healing, inflammation reduction, easy assimilation during treatment',
            prepTime: '30 min',
            servings: '4',
            image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop',
            ingredients: [
                'Â½ cup split yellow mung dal',
                'Â½ cup basmati rice',
                '1 tsp turmeric powder',
                '1 tsp ghee (clarified butter)',
                '1 tsp cumin seeds',
                '1 inch fresh ginger, minced',
                '4 cups water',
                'Rock salt to taste'
            ],
            instructions: [
                'Wash and soak mung dal and rice for 20 minutes',
                'Heat ghee, add cumin seeds and ginger',
                'Add drained dal and rice, stir for 2 minutes',
                'Add water, turmeric, and salt',
                'Simmer on low heat for 25-30 minutes until soft',
                'Serve warm with ghee drizzle'
            ],
            benefits: [
                'Easy to digest during chemo',
                'Anti-inflammatory properties',
                'Balances all three doshas',
                'Provides complete protein'
            ],
            researchLinks: [
                {
                    title: 'Turmeric in Cancer Care',
                    summary: 'Curcumin shows anti-inflammatory and antioxidant properties beneficial for cancer patients',
                    source: 'Journal of Clinical Medicine, 2021'
                }
            ],
            nutritionFacts: {
                calories: '245',
                protein: '12g',
                carbs: '42g',
                fiber: '6g',
                fat: '3g'
            }
        },
        {
            id: 'ayur_002',
            name: 'Tridoshic Vegetable Soup',
            description: 'Balanced soup that harmonizes Vata, Pitta, and Kapha doshas',
            tradition: 'Ayurveda',
            region: 'South Asia',
            origin: 'Ancient India (3000+ years)',
            purpose: 'Constitutional balance, immune support, gentle nourishment',
            prepTime: '25 min',
            servings: '4',
            image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop',
            ingredients: [
                '1 cup mixed seasonal vegetables (carrots, zucchini, green beans)',
                '1 tsp ghee',
                'Â½ tsp ground coriander',
                'Â½ tsp ground fennel',
                'Â¼ tsp ground turmeric',
                '3 cups vegetable broth',
                'Fresh cilantro for garnish',
                'Lime juice to taste'
            ],
            instructions: [
                'Heat ghee in a pot, add spices and sautÃ© for 30 seconds',
                'Add chopped vegetables and cook for 5 minutes',
                'Pour in broth and simmer for 15 minutes',
                'Blend partially for desired consistency',
                'Garnish with cilantro and lime juice'
            ],
            benefits: [
                'Balances all constitutional types',
                'Easy digestion',
                'Supports agni (digestive fire)',
                'Hydrating and nourishing'
            ],
            researchLinks: [
                {
                    title: 'Ayurvedic Nutrition in Oncology',
                    summary: 'Traditional Ayurvedic principles show promise in supportive cancer care',
                    source: 'Integrative Cancer Therapies, 2020'
                }
            ],
            nutritionFacts: {
                calories: '125',
                protein: '4g',
                carbs: '18g',
                fiber: '5g',
                fat: '4g'
            }
        },
        {
            id: 'ayur_003',
            name: 'Abhayarista Digestive Elixir',
            description: 'Traditional fermented herbal tonic for digestive health and appetite stimulation',
            tradition: 'Ayurveda',
            region: 'South Asia',
            origin: 'Ancient India (3000+ years)',
            purpose: 'Digestive strength, appetite enhancement, toxin elimination',
            prepTime: '15 min',
            servings: '2',
            image: './recipe-background.jpg',
            ingredients: [
                '2 cups water',
                '1 tsp dried haritaki powder',
                '1/2 tsp dried ginger powder',
                '1/4 tsp long pepper powder',
                '1 tbsp raw honey',
                '1/2 tsp ghee',
                'Pinch of rock salt'
            ],
            instructions: [
                'Boil water and let it cool to lukewarm',
                'Mix haritaki, ginger, and long pepper powders',
                'Add spice mixture to warm water',
                'Stir in honey and ghee',
                'Add rock salt and mix well',
                'Consume 30 minutes before meals'
            ],
            benefits: [
                'Enhances digestive fire (agni)',
                'Stimulates appetite naturally',
                'Supports liver detoxification',
                'Balances Vata and Kapha doshas'
            ],
            researchLinks: [
                {
                    title: 'Ayurvedic Digestive Formulations',
                    summary: 'Traditional Ayurvedic digestive tonics show promise in improving appetite and digestion',
                    source: 'Journal of Ayurveda Research, 2021'
                }
            ],
            nutritionFacts: {
                calories: '35',
                protein: '0g',
                carbs: '9g',
                fiber: '1g',
                fat: '2g'
            }
        },
        {
            id: 'ayur_004',
            name: 'Spiced Mung Bean Pancakes (Pesalu)',
            description: 'Protein-rich savory pancakes made with fermented mung bean batter',
            tradition: 'Ayurveda',
            region: 'South Asia',
            origin: 'Ancient India (3000+ years)',
            purpose: 'Easy protein absorption, digestive comfort, sustained energy',
            prepTime: '20 min (plus 4 hours soaking)',
            servings: '4',
            image: './recipe-background.jpg',
            ingredients: [
                '1 cup whole green mung beans',
                '1/4 cup fresh ginger',
                '2 green chilies',
                '1 tsp cumin seeds',
                '1/2 tsp asafoetida',
                '1 tsp rock salt',
                '2 tbsp coconut oil',
                'Fresh curry leaves'
            ],
            instructions: [
                'Soak mung beans for 4 hours, then drain',
                'Grind beans with ginger and chilies to coarse paste',
                'Add cumin, asafoetida, and salt to batter',
                'Heat oil in pan, add curry leaves',
                'Pour batter to form small pancakes',
                'Cook until golden on both sides'
            ],
            benefits: [
                'High in easily digestible protein',
                'Supports muscle maintenance',
                'Gentle on sensitive stomachs',
                'Provides sustained energy'
            ],
            researchLinks: [
                {
                    title: 'Mung Bean Nutrition in Clinical Care',
                    summary: 'Mung beans provide complete protein and are easily digestible for patients',
                    source: 'Clinical Nutrition Research, 2020'
                }
            ],
            nutritionFacts: {
                calories: '195',
                protein: '14g',
                carbs: '28g',
                fiber: '8g',
                fat: '6g'
            }
        },
        {
            id: 'ayur_005',
            name: 'Ashwagandha Moon Milk',
            description: 'Calming bedtime drink with adaptogenic herbs for stress relief and sleep',
            tradition: 'Ayurveda',
            region: 'South Asia',
            origin: 'Ancient India (3000+ years)',
            purpose: 'Stress reduction, sleep enhancement, nervous system support',
            prepTime: '10 min',
            servings: '1',
            image: './recipe-background.jpg',
            ingredients: [
                '1 cup warm almond milk',
                '1/2 tsp ashwagandha powder',
                '1/4 tsp turmeric powder',
                'Pinch of cardamom powder',
                'Pinch of nutmeg',
                '1 tsp ghee',
                '1 tsp raw honey',
                'Few strands of saffron'
            ],
            instructions: [
                'Warm almond milk gently in a saucepan',
                'Whisk in ashwagandha and turmeric',
                'Add cardamom, nutmeg, and saffron',
                'Stir in ghee until well blended',
                'Remove from heat and add honey',
                'Drink warm 30 minutes before bedtime'
            ],
            benefits: [
                'Reduces stress and anxiety',
                'Promotes restful sleep',
                'Supports adrenal function',
                'Enhances immune resilience'
            ],
            researchLinks: [
                {
                    title: 'Ashwagandha in Cancer Care',
                    summary: 'Withania somnifera shows stress-reducing and immune-supporting properties',
                    source: 'Integrative Medicine Research, 2021'
                }
            ],
            nutritionFacts: {
                calories: '145',
                protein: '6g',
                carbs: '12g',
                fiber: '2g',
                fat: '9g'
            }
        },
        {
            id: 'ayur_006',
            name: 'Triphala Detox Water',
            description: 'Traditional three-fruit formula for gentle detoxification and digestive balance',
            tradition: 'Ayurveda',
            region: 'South Asia',
            origin: 'Ancient India (3000+ years)',
            purpose: 'Gentle detoxification, digestive regulation, antioxidant support',
            prepTime: '5 min (plus overnight steeping)',
            servings: '1',
            image: './recipe-background.jpg',
            ingredients: [
                '1/2 tsp triphala powder',
                '1 cup lukewarm water',
                '1/4 tsp raw honey (optional)',
                '1 drop lime juice',
                'Pinch of rock salt'
            ],
            instructions: [
                'Mix triphala powder with lukewarm water',
                'Let steep overnight at room temperature',
                'Strain in the morning if desired',
                'Add honey and lime juice',
                'Add pinch of salt and stir',
                'Drink on empty stomach'
            ],
            benefits: [
                'Supports natural detoxification',
                'Regulates digestive function',
                'Rich in vitamin C and antioxidants',
                'Balances all three doshas'
            ],
            researchLinks: [
                {
                    title: 'Triphala in Digestive Health',
                    summary: 'Triphala shows beneficial effects on digestive health and antioxidant status',
                    source: 'Journal of Alternative Medicine, 2020'
                }
            ],
            nutritionFacts: {
                calories: '10',
                protein: '0g',
                carbs: '3g',
                fiber: '1g',
                fat: '0g'
            }
        },
        {
            id: 'ayur_007',
            name: 'Ojas-Building Date and Nut Balls',
            description: 'Energy-dense sweet treats made with dates, nuts, and rejuvenative spices',
            tradition: 'Ayurveda',
            region: 'South Asia',
            origin: 'Ancient India (3000+ years)',
            purpose: 'Vital energy (ojas) building, strength restoration, immune support',
            prepTime: '15 min',
            servings: '8',
            image: './recipe-background.jpg',
            ingredients: [
                '1 cup pitted Medjool dates',
                '1/2 cup almonds, soaked',
                '1/4 cup cashews',
                '1 tbsp ghee',
                '1/2 tsp cardamom powder',
                '1/4 tsp saffron threads',
                '2 tbsp coconut flakes',
                '1 tbsp sesame seeds'
            ],
            instructions: [
                'Soak almonds in warm water for 2 hours',
                'Remove almond skins and roughly chop',
                'Pit dates and mash into paste',
                'Mix dates with nuts, ghee, and spices',
                'Form mixture into small balls',
                'Roll in coconut flakes and sesame seeds',
                'Chill for 30 minutes before serving'
            ],
            benefits: [
                'Builds vital energy and strength',
                'Supports immune function',
                'Provides healthy fats and proteins',
                'Natural energy boost'
            ],
            researchLinks: [
                {
                    title: 'Nutrient-Dense Foods in Recovery',
                    summary: 'Date and nut combinations provide concentrated nutrition for healing',
                    source: 'Nutrition in Clinical Practice, 2021'
                }
            ],
            nutritionFacts: {
                calories: '185',
                protein: '5g',
                carbs: '22g',
                fiber: '4g',
                fat: '9g'
            }
        },
        {
            id: 'ayur_008',
            name: 'Brahmi Ghee Infusion',
            description: 'Memory-enhancing medicated ghee with Brahmi (Bacopa monnieri) for cognitive support',
            tradition: 'Ayurveda',
            region: 'South Asia',
            origin: 'Ancient India (3000+ years)',
            purpose: 'Cognitive support, memory enhancement, nervous system nourishment',
            prepTime: '25 min',
            servings: '10',
            image: './recipe-background.jpg',
            ingredients: [
                '1/2 cup organic ghee',
                '2 tbsp dried Brahmi (Bacopa) leaves',
                '1 tbsp fresh Brahmi juice (if available)',
                '1/4 tsp turmeric powder',
                '2 green cardamom pods',
                '1 tsp raw honey'
            ],
            instructions: [
                'Heat ghee gently in heavy-bottomed pan',
                'Add dried Brahmi leaves and cardamom',
                'Simmer on lowest heat for 15 minutes',
                'Add turmeric and fresh Brahmi juice',
                'Strain through fine cloth',
                'Cool slightly and mix in honey',
                'Store in glass jar, take 1 tsp daily'
            ],
            benefits: [
                'Enhances memory and concentration',
                'Supports nervous system health',
                'Reduces mental fatigue',
                'Provides brain-nourishing fats'
            ],
            researchLinks: [
                {
                    title: 'Bacopa monnieri in Cognitive Health',
                    summary: 'Brahmi shows neuroprotective and memory-enhancing properties',
                    source: 'Phytotherapy Research, 2021'
                }
            ],
            nutritionFacts: {
                calories: '45',
                protein: '0g',
                carbs: '1g',
                fiber: '0g',
                fat: '5g'
            }
        }
    ],
    'tcm': [
        {
            id: 'tcm_001',
            name: 'Healing Congee with Goji Berries',
            description: 'Traditional Chinese rice porridge for blood nourishment and energy restoration',
            tradition: 'Traditional Chinese Medicine',
            region: 'East Asia',
            origin: 'Ancient China (2000+ years)',
            purpose: 'Blood building, Qi restoration, digestive healing',
            prepTime: '45 min',
            servings: '4',
            image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop',
            ingredients: [
                'Â¾ cup jasmine rice',
                '6 cups water',
                '2 tbsp dried goji berries',
                '4 dried red dates (jujube)',
                '1 tbsp dried longan (optional)',
                '1 tsp fresh ginger, sliced',
                'Pinch of sea salt'
            ],
            instructions: [
                'Rinse rice until water runs clear',
                'Combine rice and water in slow cooker or heavy pot',
                'Add goji berries, dates, longan, and ginger',
                'Cook on low heat for 40-45 minutes, stirring occasionally',
                'Season with salt and serve warm'
            ],
            benefits: [
                'Tonifies blood and Qi',
                'Strengthens spleen and stomach',
                'Easy to digest',
                'Supports immune function'
            ],
            researchLinks: [
                {
                    title: 'Goji Berries in Cancer Support',
                    summary: 'Lycium barbarum shows immunomodulatory effects in cancer patients',
                    source: 'Evidence-Based Complementary Medicine, 2021'
                }
            ],
            nutritionFacts: {
                calories: '180',
                protein: '5g',
                carbs: '38g',
                fiber: '2g',
                fat: '1g'
            }
        },
        {
            id: 'tcm_002',
            name: 'Black Sesame Walnut Porridge',
            description: 'Kidney-nourishing porridge with black sesame and walnuts for essence building',
            tradition: 'Traditional Chinese Medicine',
            region: 'East Asia',
            origin: 'Ancient China (2000+ years)',
            purpose: 'Kidney essence nourishment, bone marrow support, brain function',
            prepTime: '35 min',
            servings: '3',
            image: './recipe-background.jpg',
            ingredients: [
                '1/2 cup black glutinous rice',
                '3 tbsp black sesame seeds',
                '1/4 cup walnuts',
                '4 cups water',
                '2 tbsp rock sugar',
                '1 tbsp Chinese black vinegar',
                'Pinch of sea salt'
            ],
            instructions: [
                'Soak black rice for 2 hours',
                'Toast sesame seeds and walnuts lightly',
                'Grind sesame seeds and walnuts to powder',
                'Cook rice in water for 25 minutes until soft',
                'Stir in ground nuts and seeds',
                'Add rock sugar, vinegar, and salt',
                'Simmer 5 more minutes and serve warm'
            ],
            benefits: [
                'Nourishes kidney essence (jing)',
                'Supports bone and marrow health',
                'Enhances brain function',
                'Provides healthy fats and minerals'
            ],
            researchLinks: [
                {
                    title: 'Black Sesame in Bone Health',
                    summary: 'Sesamol and sesamin in black sesame support bone density and calcium absorption',
                    source: 'Journal of Nutritional Biochemistry, 2021'
                }
            ],
            nutritionFacts: {
                calories: '285',
                protein: '8g',
                carbs: '35g',
                fiber: '5g',
                fat: '14g'
            }
        },
        {
            id: 'tcm_003',
            name: 'Five-Element Harmony Soup',
            description: 'Balanced soup representing all five elements with organ-supporting ingredients',
            tradition: 'Traditional Chinese Medicine',
            region: 'East Asia',
            origin: 'Ancient China (2000+ years)',
            purpose: 'Organ system harmony, elemental balance, comprehensive nourishment',
            prepTime: '40 min',
            servings: '4',
            image: './recipe-background.jpg',
            ingredients: [
                '1/2 cup mung beans (green - liver/wood)',
                '1/4 cup adzuki beans (red - heart/fire)',
                '1/4 cup yellow soybeans (earth - spleen)',
                '2 tbsp pearl barley (white - lung/metal)',
                '2 tbsp black beans (water - kidney)',
                '6 cups vegetable broth',
                '1 tbsp Chinese cooking wine',
                'White pepper to taste'
            ],
            instructions: [
                'Soak all beans overnight separately',
                'Drain and rinse all beans',
                'Combine beans with broth in large pot',
                'Bring to boil, then simmer 35 minutes',
                'Add cooking wine in final 5 minutes',
                'Season with white pepper',
                'Serve with balanced portions of each bean'
            ],
            benefits: [
                'Harmonizes all organ systems',
                'Provides complete amino acid profile',
                'Supports elemental balance',
                'Rich in fiber and minerals'
            ],
            researchLinks: [
                {
                    title: 'Traditional Chinese Nutrition Theory',
                    summary: 'Five-element nutrition shows promise in supporting overall health balance',
                    source: 'Integrative Medicine International, 2020'
                }
            ],
            nutritionFacts: {
                calories: '225',
                protein: '16g',
                carbs: '38g',
                fiber: '12g',
                fat: '2g'
            }
        },
        {
            id: 'tcm_004',
            name: 'Cordyceps and Chicken Essence',
            description: 'Concentrated broth with cordyceps mushrooms for lung and kidney support',
            tradition: 'Traditional Chinese Medicine',
            region: 'East Asia',
            origin: 'Ancient China (2000+ years)',
            purpose: 'Lung and kidney qi tonification, immune enhancement, energy restoration',
            prepTime: '2 hours',
            servings: '6',
            image: './recipe-background.jpg',
            ingredients: [
                '1 whole organic chicken (3 lbs)',
                '10g dried cordyceps mushrooms',
                '4 slices fresh ginger',
                '2 green onions',
                '8 cups filtered water',
                '1 tbsp Shaoxing wine',
                '1 tsp sea salt'
            ],
            instructions: [
                'Blanch chicken in boiling water for 5 minutes',
                'Rinse and place in slow cooker',
                'Add cordyceps, ginger, and green onions',
                'Cover with water and wine',
                'Cook on low for 2 hours',
                'Strain and season with salt',
                'Serve warm in small cups'
            ],
            benefits: [
                'Tonifies lung and kidney qi',
                'Enhances immune function',
                'Supports respiratory health',
                'Provides easily absorbed protein'
            ],
            researchLinks: [
                {
                    title: 'Cordyceps in Cancer Supportive Care',
                    summary: 'Cordyceps militaris shows immunomodulatory and anti-fatigue effects',
                    source: 'Evidence-Based Complementary Medicine, 2021'
                }
            ],
            nutritionFacts: {
                calories: '165',
                protein: '25g',
                carbs: '2g',
                fiber: '0g',
                fat: '6g'
            }
        },
        {
            id: 'tcm_005',
            name: 'Chrysanthemum and Pear Cooling Tea',
            description: 'Heat-clearing herbal tea with chrysanthemum flowers and Asian pears',
            tradition: 'Traditional Chinese Medicine',
            region: 'East Asia',
            origin: 'Ancient China (2000+ years)',
            purpose: 'Heat clearing, liver fire reduction, eye and throat soothing',
            prepTime: '15 min',
            servings: '2',
            image: './recipe-background.jpg',
            ingredients: [
                '2 tbsp dried chrysanthemum flowers',
                '1 Asian pear, sliced',
                '1 tbsp dried wolfberries (goji)',
                '3 cups hot water',
                '1 tbsp raw honey',
                '1/2 tsp lemon juice'
            ],
            instructions: [
                'Rinse chrysanthemum flowers',
                'Place flowers and pear slices in teapot',
                'Add wolfberries',
                'Pour hot water (not boiling) over herbs',
                'Steep for 10 minutes',
                'Strain and add honey and lemon',
                'Serve warm or at room temperature'
            ],
            benefits: [
                'Clears heat and inflammation',
                'Soothes dry throat and eyes',
                'Supports liver detoxification',
                'Hydrating and cooling'
            ],
            researchLinks: [
                {
                    title: 'Chrysanthemum in Traditional Medicine',
                    summary: 'Chrysanthemum morifolium shows anti-inflammatory and hepatoprotective effects',
                    source: 'Journal of Ethnopharmacology, 2021'
                }
            ],
            nutritionFacts: {
                calories: '55',
                protein: '1g',
                carbs: '14g',
                fiber: '3g',
                fat: '0g'
            }
        },
        {
            id: 'tcm_006',
            name: 'Dang Gui Blood-Building Soup',
            description: 'Traditional herbal soup with Angelica sinensis for blood nourishment',
            tradition: 'Traditional Chinese Medicine',
            region: 'East Asia',
            origin: 'Ancient China (2000+ years)',
            purpose: 'Blood nourishment, circulation improvement, women\'s health support',
            prepTime: '45 min',
            servings: '4',
            image: './recipe-background.jpg',
            ingredients: [
                '15g dried Dang Gui (Angelica sinensis)',
                '1/2 cup red dates, pitted',
                '1 tbsp dried longan meat',
                '1/4 cup Chinese yam, sliced',
                '6 cups vegetable broth',
                '1 tbsp brown sugar',
                '1 tsp sesame oil'
            ],
            instructions: [
                'Rinse Dang Gui and soak for 30 minutes',
                'Combine all herbs in soup pot',
                'Add vegetable broth and bring to boil',
                'Reduce heat and simmer 35 minutes',
                'Strain herbs if desired',
                'Stir in brown sugar and sesame oil',
                'Serve warm in small bowls'
            ],
            benefits: [
                'Nourishes blood and yin',
                'Improves circulation',
                'Supports hormonal balance',
                'Reduces fatigue and weakness'
            ],
            researchLinks: [
                {
                    title: 'Angelica sinensis in Hematological Support',
                    summary: 'Dang Gui shows promise in supporting healthy blood formation and circulation',
                    source: 'Chinese Medicine Research, 2021'
                }
            ],
            nutritionFacts: {
                calories: '95',
                protein: '2g',
                carbs: '22g',
                fiber: '3g',
                fat: '1g'
            }
        },
        {
            id: 'tcm_007',
            name: 'Schisandra Berry Liver Tonic',
            description: 'Five-flavor berry preparation for liver protection and mental clarity',
            tradition: 'Traditional Chinese Medicine',
            region: 'East Asia',
            origin: 'Ancient China (2000+ years)',
            purpose: 'Liver protection, mental clarity, stress adaptation, kidney support',
            prepTime: '20 min',
            servings: '3',
            image: './recipe-background.jpg',
            ingredients: [
                '2 tbsp dried schisandra berries',
                '1 tbsp dried licorice root',
                '1 tsp dried orange peel',
                '3 cups water',
                '1 tbsp Chinese rock sugar',
                '1/2 tsp apple cider vinegar'
            ],
            instructions: [
                'Lightly crush schisandra berries',
                'Combine berries, licorice, and orange peel',
                'Bring water to boil, add herbs',
                'Simmer on low heat for 15 minutes',
                'Strain through fine mesh',
                'Stir in rock sugar and vinegar',
                'Drink warm, 1/2 cup twice daily'
            ],
            benefits: [
                'Protects liver function',
                'Enhances mental clarity',
                'Supports stress adaptation',
                'Tonifies kidney essence'
            ],
            researchLinks: [
                {
                    title: 'Schisandra in Hepatoprotection',
                    summary: 'Schisandra chinensis shows significant liver protective and adaptogenic properties',
                    source: 'Phytomedicine Journal, 2021'
                }
            ],
            nutritionFacts: {
                calories: '25',
                protein: '0g',
                carbs: '6g',
                fiber: '1g',
                fat: '0g'
            }
        }
    ],
    'herbal-remedies': [
        {
            id: 'herb_001',
            name: 'Immune-Boosting Green Tea Blend',
            description: 'Adaptogenic herbal tea with green tea, astragalus, and ginger',
            tradition: 'Global Herbalism',
            region: 'Global',
            origin: 'Traditional herbalism worldwide',
            purpose: 'Immune support, antioxidant protection, energy balance',
            prepTime: '10 min',
            servings: '2',
            image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop',
            ingredients: [
                '2 tsp high-quality green tea',
                '1 tsp dried astragalus root',
                '½ tsp fresh ginger, grated',
                '1 tsp raw honey (optional)',
                '2 cups filtered water',
                'Lemon slice for serving'
            ],
            instructions: [
                'Bring water to 175°F (just before boiling)',
                'Add astragalus and simmer for 5 minutes',
                'Remove from heat, add green tea and ginger',
                'Steep for 3-4 minutes',
                'Strain, add honey if desired, serve with lemon'
            ],
            benefits: [
                'Powerful antioxidants',
                'Immune system support',
                'Anti-inflammatory properties',
                'Gentle energy boost'
            ],
            researchLinks: [
                {
                    title: 'Green Tea in Cancer Prevention',
                    summary: 'EGCG in green tea shows protective effects against various cancers',
                    source: 'Nutrients Journal, 2022'
                }
            ],
            nutritionFacts: {
                calories: '5',
                protein: '0g',
                carbs: '1g',
                fiber: '0g',
                fat: '0g'
            }
        },
        {
            id: 'herb_002',
            name: 'Reishi Mushroom Immunity Broth',
            description: 'Healing bone broth with reishi mushrooms and anti-inflammatory herbs',
            tradition: 'Traditional Chinese Medicine',
            origin: 'Ancient Chinese healing practices',
            purpose: 'Immune modulation, stress adaptation, energy restoration',
            prepTime: '45 min',
            servings: '4',
            image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop',
            ingredients: [
                '4 cups organic bone broth',
                '2 tsp dried reishi mushroom powder',
                '1 tbsp fresh ginger, sliced',
                '2 cloves garlic, minced',
                '1 tsp turmeric powder',
                '½ tsp astragalus powder',
                '1 tbsp coconut aminos',
                '1 green onion, chopped',
                'Sea salt to taste'
            ],
            instructions: [
                'Heat bone broth in a large pot',
                'Add ginger, garlic, and reishi powder',
                'Simmer gently for 20 minutes',
                'Stir in turmeric and astragalus',
                'Season with coconut aminos and salt',
                'Garnish with green onions before serving'
            ],
            benefits: [
                'Adaptogenic immune support',
                'Stress reduction properties',
                'Anti-inflammatory compounds',
                'Gut health promotion'
            ],
            researchLinks: [
                {
                    title: 'Reishi Mushroom in Cancer Support',
                    summary: 'Reishi shows immune-modulating effects beneficial for cancer patients',
                    source: 'Integrative Cancer Therapies, 2021'
                }
            ],
            nutritionFacts: {
                calories: '45',
                protein: '8g',
                carbs: '2g',
                fiber: '1g',
                fat: '1g'
            }
        },
        {
            id: 'herb_003',
            name: 'Nettle & Dandelion Detox Tea',
            description: 'Gentle detoxifying herbal blend with liver-supporting herbs',
            tradition: 'European Herbalism',
            origin: 'Traditional European folk medicine',
            purpose: 'Liver support, gentle detoxification, mineral replenishment',
            prepTime: '15 min',
            servings: '3',
            image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop',
            ingredients: [
                '1 tbsp dried nettle leaves',
                '1 tbsp dried dandelion root',
                '1 tsp dried red clover',
                '1 tsp dried burdock root',
                '3 cups filtered water',
                'Fresh lemon juice (optional)',
                'Raw honey (optional)'
            ],
            instructions: [
                'Bring water to a boil',
                'Add dandelion and burdock root, simmer 10 minutes',
                'Remove from heat, add nettle and red clover',
                'Steep covered for 5 minutes',
                'Strain and add lemon or honey if desired'
            ],
            benefits: [
                'Liver detoxification support',
                'Rich in minerals and vitamins',
                'Anti-inflammatory properties',
                'Gentle diuretic effect'
            ],
            researchLinks: [
                {
                    title: 'Herbal Support for Cancer Treatment',
                    summary: 'Traditional herbs may support liver function during cancer therapy',
                    source: 'Phytotherapy Research, 2022'
                }
            ],
            nutritionFacts: {
                calories: '3',
                protein: '0g',
                carbs: '1g',
                fiber: '0g',
                fat: '0g'
            }
        },
        {
            id: 'herb_004',
            name: 'Elderberry Immune Syrup',
            description: 'Traditional elderberry syrup with immune-boosting herbs and spices',
            tradition: 'Traditional European Medicine',
            origin: 'European folk healing traditions',
            purpose: 'Immune system strengthening, antiviral support, respiratory health',
            prepTime: '30 min + cooling',
            servings: '16',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
            ingredients: [
                '1 cup dried elderberries',
                '3 cups filtered water',
                '1 inch fresh ginger, sliced',
                '4 whole cloves',
                '1 cinnamon stick',
                '1 tsp echinacea powder',
                '½ cup raw honey',
                '2 tbsp apple cider vinegar'
            ],
            instructions: [
                'Combine elderberries, water, ginger, cloves, and cinnamon',
                'Bring to boil, reduce heat and simmer 20 minutes',
                'Strain out solids, pressing berries to extract juice',
                'Let cool to lukewarm, stir in echinacea',
                'Add honey and vinegar, mix well',
                'Store in refrigerator, take 1 tbsp daily'
            ],
            benefits: [
                'High antioxidant content',
                'Immune system support',
                'Anti-inflammatory effects',
                'Natural antiviral properties'
            ],
            researchLinks: [
                {
                    title: 'Elderberry for Immune Support',
                    summary: 'Elderberry shows significant immune-enhancing properties in clinical studies',
                    source: 'Journal of Functional Foods, 2021'
                }
            ],
            nutritionFacts: {
                calories: '25',
                protein: '0g',
                carbs: '7g',
                fiber: '1g',
                fat: '0g'
            }
        },
        {
            id: 'herb_005',
            name: 'Milk Thistle Liver Support Decoction',
            description: 'Concentrated herbal decoction for liver health and detoxification',
            tradition: 'Mediterranean Herbalism',
            origin: 'Ancient Greek and Roman medicine',
            purpose: 'Liver protection, cellular regeneration, toxin elimination',
            prepTime: '40 min',
            servings: '4',
            image: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=400&h=300&fit=crop',
            ingredients: [
                '2 tbsp milk thistle seeds, ground',
                '1 tbsp yellow dock root',
                '1 tbsp Oregon grape root',
                '1 tsp fennel seeds',
                '4 cups filtered water',
                '1 tsp raw honey per serving',
                'Fresh lemon juice to taste'
            ],
            instructions: [
                'Combine all herbs and water in a pot',
                'Bring to boil, reduce heat to low simmer',
                'Cover and simmer for 30 minutes',
                'Strain through fine mesh, pressing herbs',
                'Serve warm with honey and lemon',
                'Drink ½ cup twice daily before meals'
            ],
            benefits: [
                'Liver cell protection and regeneration',
                'Enhanced detoxification processes',
                'Antioxidant protection',
                'Digestive system support'
            ],
            researchLinks: [
                {
                    title: 'Milk Thistle in Cancer Care',
                    summary: 'Silymarin shows hepatoprotective effects during chemotherapy',
                    source: 'Cancer Chemotherapy and Pharmacology, 2020'
                }
            ],
            nutritionFacts: {
                calories: '8',
                protein: '0g',
                carbs: '2g',
                fiber: '1g',
                fat: '0g'
            }
        },
        {
            id: 'herb_009',
            name: 'Echinacea Immune Defense Tincture',
            description: 'Potent immune-supporting herbal extract with echinacea and elderberry',
            tradition: 'Global Herbalism',
            region: 'Americas/Europe',
            origin: 'Native American & European traditions (500+ years)',
            purpose: 'Immune system activation, infection prevention, lymphatic support',
            prepTime: '10 min (plus 2 weeks extraction)',
            servings: '30',
            image: './recipe-background.jpg',
            ingredients: [
                '1/4 cup dried echinacea root',
                '2 tbsp dried elderberries',
                '1 tbsp dried astragalus root',
                '2 cups 80-proof vodka',
                '1 tbsp raw honey',
                'Glass jar with tight lid'
            ],
            instructions: [
                'Combine all dried herbs in glass jar',
                'Pour vodka over herbs completely',
                'Seal jar and store in dark place',
                'Shake daily for 2 weeks',
                'Strain through cheesecloth',
                'Add honey to finished tincture',
                'Take 1 dropper full as needed'
            ],
            benefits: [
                'Activates immune response',
                'Supports lymphatic drainage',
                'Reduces infection duration',
                'Antioxidant and anti-inflammatory'
            ],
            researchLinks: [
                {
                    title: 'Echinacea in Immune Support',
                    summary: 'Echinacea species show immunomodulatory effects and reduced infection risk',
                    source: 'Cochrane Review, 2021'
                }
            ],
            nutritionFacts: {
                calories: '5',
                protein: '0g',
                carbs: '1g',
                fiber: '0g',
                fat: '0g'
            }
        },
        {
            id: 'herb_010',
            name: 'Nettle and Red Clover Mineral Tea',
            description: 'Nutrient-rich herbal blend for mineral replenishment and blood cleansing',
            tradition: 'Global Herbalism',
            region: 'Europe',
            origin: 'European folk medicine (1000+ years)',
            purpose: 'Mineral restoration, blood purification, gentle detoxification',
            prepTime: '15 min',
            servings: '2',
            image: './recipe-background.jpg',
            ingredients: [
                '2 tbsp dried nettle leaves',
                '1 tbsp dried red clover blossoms',
                '1 tsp dried dandelion leaf',
                '1 tsp dried alfalfa',
                '3 cups boiling water',
                '1 tsp raw honey',
                'Lemon slice for garnish'
            ],
            instructions: [
                'Combine all dried herbs in teapot',
                'Pour boiling water over herbs',
                'Cover and steep for 10 minutes',
                'Strain herbs from liquid',
                'Add honey while tea is warm',
                'Garnish with lemon slice',
                'Drink 1 cup morning and evening'
            ],
            benefits: [
                'Rich in minerals and vitamins',
                'Supports kidney and liver function',
                'Gentle blood cleansing',
                'Alkalizing and anti-inflammatory'
            ],
            researchLinks: [
                {
                    title: 'Nettle in Nutritional Support',
                    summary: 'Urtica dioica provides significant mineral content and anti-inflammatory compounds',
                    source: 'Journal of Herbal Medicine, 2020'
                }
            ],
            nutritionFacts: {
                calories: '15',
                protein: '1g',
                carbs: '3g',
                fiber: '1g',
                fat: '0g'
            }
        },
        {
            id: 'herb_011',
            name: 'Milk Thistle Liver Support Decoction',
            description: 'Concentrated herbal preparation for liver protection and regeneration',
            tradition: 'Global Herbalism',
            region: 'Mediterranean',
            origin: 'Mediterranean traditional medicine (2000+ years)',
            purpose: 'Liver protection, hepatocyte regeneration, toxin elimination',
            prepTime: '30 min',
            servings: '3',
            image: './recipe-background.jpg',
            ingredients: [
                '3 tbsp crushed milk thistle seeds',
                '1 tbsp dried dandelion root',
                '1 tsp dried burdock root',
                '1 tsp dried yellow dock root',
                '4 cups water',
                '1/2 tsp ginger powder',
                'Pinch of black pepper'
            ],
            instructions: [
                'Combine all roots and seeds in pot',
                'Add water and bring to boil',
                'Reduce heat and simmer 20 minutes',
                'Add ginger and black pepper',
                'Simmer 5 more minutes',
                'Strain through fine mesh',
                'Drink 1/2 cup three times daily'
            ],
            benefits: [
                'Protects liver cells from damage',
                'Supports liver regeneration',
                'Enhances detoxification pathways',
                'Anti-inflammatory and antioxidant'
            ],
            researchLinks: [
                {
                    title: 'Silymarin in Hepatoprotection',
                    summary: 'Milk thistle seed extract shows significant liver protective and regenerative effects',
                    source: 'World Journal of Hepatology, 2021'
                }
            ],
            nutritionFacts: {
                calories: '20',
                protein: '1g',
                carbs: '4g',
                fiber: '2g',
                fat: '0g'
            }
        },
        {
            id: 'herb_006',
            name: 'Calendula and Chamomile Healing Balm',
            description: 'Topical herbal preparation for skin healing and inflammation reduction',
            tradition: 'Global Herbalism',
            region: 'Europe',
            origin: 'European folk medicine (1000+ years)',
            purpose: 'Skin healing, inflammation reduction, wound care support',
            prepTime: '45 min',
            servings: '1 jar',
            image: './recipe-background.jpg',
            ingredients: [
                '1/4 cup dried calendula petals',
                '2 tbsp dried chamomile flowers',
                '1 tbsp dried plantain leaves',
                '1/2 cup olive oil',
                '2 tbsp beeswax pellets',
                '10 drops lavender essential oil'
            ],
            instructions: [
                'Infuse herbs in olive oil for 2 weeks, or',
                'Heat oil and herbs gently for 2 hours',
                'Strain oil through cheesecloth',
                'Melt beeswax in double boiler',
                'Combine infused oil with melted wax',
                'Add lavender oil and stir',
                'Pour into clean jar and cool'
            ],
            benefits: [
                'Promotes skin healing',
                'Reduces inflammation and irritation',
                'Antimicrobial properties',
                'Soothes damaged skin'
            ],
            researchLinks: [
                {
                    title: 'Calendula in Wound Healing',
                    summary: 'Calendula officinalis shows significant wound healing and anti-inflammatory effects',
                    source: 'Evidence-Based Complementary Medicine, 2021'
                }
            ],
            nutritionFacts: {
                calories: '0',
                protein: '0g',
                carbs: '0g',
                fiber: '0g',
                fat: '0g'
            }
        },
        {
            id: 'herb_007',
            name: 'Elderberry Antiviral Syrup',
            description: 'Traditional immune-boosting syrup with elderberries and warming spices',
            tradition: 'Global Herbalism',
            region: 'Europe',
            origin: 'European folk medicine (1000+ years)',
            purpose: 'Antiviral support, immune enhancement, respiratory health',
            prepTime: '40 min',
            servings: '20',
            image: './recipe-background.jpg',
            ingredients: [
                '1 cup dried elderberries',
                '3 cups water',
                '1 cinnamon stick',
                '4 whole cloves',
                '1 tbsp fresh ginger, sliced',
                '1 cup raw honey',
                '2 tbsp apple cider vinegar'
            ],
            instructions: [
                'Combine elderberries, water, and spices',
                'Bring to boil, then simmer 20 minutes',
                'Mash berries lightly with spoon',
                'Simmer 10 more minutes until reduced by half',
                'Strain through fine mesh',
                'Cool to lukewarm, add honey and vinegar',
                'Take 1 tbsp daily for prevention'
            ],
            benefits: [
                'Powerful antiviral properties',
                'Supports immune function',
                'Rich in antioxidants',
                'Respiratory system support'
            ],
            researchLinks: [
                {
                    title: 'Elderberry in Immune Support',
                    summary: 'Sambucus nigra shows significant antiviral and immune-enhancing effects',
                    source: 'Nutrients Journal, 2021'
                }
            ],
            nutritionFacts: {
                calories: '35',
                protein: '0g',
                carbs: '9g',
                fiber: '0g',
                fat: '0g'
            }
        },
        {
            id: 'herb_008',
            name: 'Adaptogenic Stress-Relief Blend',
            description: 'Balanced herbal formula with adaptogens for stress management and energy',
            tradition: 'Global Herbalism',
            region: 'Global',
            origin: 'Multiple traditions (3000+ years combined)',
            purpose: 'Stress adaptation, energy regulation, hormone balance',
            prepTime: '12 min',
            servings: '2',
            image: './recipe-background.jpg',
            ingredients: [
                '1 tsp dried rhodiola root',
                '1 tsp dried holy basil (tulsi)',
                '1/2 tsp dried ashwagandha root',
                '1/2 tsp dried licorice root',
                '2 cups hot water',
                '1 tsp coconut oil',
                '1/2 tsp raw honey'
            ],
            instructions: [
                'Combine all dried herbs in teapot',
                'Pour hot (not boiling) water over herbs',
                'Cover and steep for 8 minutes',
                'Strain herbs from liquid',
                'Stir in coconut oil and honey',
                'Drink warm twice daily',
                'Best taken between meals'
            ],
            benefits: [
                'Helps body adapt to stress',
                'Balances cortisol levels',
                'Supports sustained energy',
                'Calms nervous system'
            ],
            researchLinks: [
                {
                    title: 'Adaptogens in Stress Management',
                    summary: 'Multiple adaptogenic herbs show stress-reducing and energy-balancing effects',
                    source: 'Pharmaceuticals Journal, 2021'
                }
            ],
            nutritionFacts: {
                calories: '25',
                protein: '0g',
                carbs: '3g',
                fiber: '0g',
                fat: '2g'
            }
        }
    ],
    'functional-foods': [
        {
            id: 'func_001',
            name: 'Omega-3 Rich Chia Seed Pudding',
            description: 'Nutrient-dense pudding with chia seeds, berries, and plant-based milk',
            tradition: 'Modern Functional Nutrition',
            region: 'Global',
            origin: 'Contemporary nutritional science',
            purpose: 'Omega-3 delivery, antioxidant support, sustained energy',
            prepTime: '5 min + 4 hours chilling',
            servings: '2',
            image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400&h=300&fit=crop',
            ingredients: [
                '¼ cup black chia seeds',
                '1 cup unsweetened almond milk',
                '2 tbsp pure maple syrup',
                '½ tsp vanilla extract',
                '½ cup mixed berries',
                '1 tbsp chopped walnuts',
                '1 tsp ground flaxseed'
            ],
            instructions: [
                'Whisk chia seeds, almond milk, maple syrup, and vanilla',
                'Let sit for 10 minutes, whisk again to prevent clumping',
                'Refrigerate for at least 4 hours or overnight',
                'Serve topped with berries, walnuts, and flaxseed'
            ],
            benefits: [
                'High in omega-3 fatty acids',
                'Complete protein source',
                'Rich in antioxidants',
                'Supports heart health'
            ],
            researchLinks: [
                {
                    title: 'Omega-3s in Cancer Care',
                    summary: 'Omega-3 fatty acids may help reduce inflammation and support treatment outcomes',
                    source: 'Clinical Nutrition, 2021'
                }
            ],
            nutritionFacts: {
                calories: '220',
                protein: '8g',
                carbs: '22g',
                fiber: '12g',
                fat: '12g'
            }
        },
        {
            id: 'func_002',
            name: 'Fermented Kimchi & Quinoa Bowl',
            description: 'Probiotic-rich bowl with fermented vegetables and complete protein',
            tradition: 'Functional Medicine',
            origin: 'Korean fermentation + Modern nutrition',
            purpose: 'Gut microbiome support, immune enhancement, digestive health',
            prepTime: '20 min',
            servings: '2',
            image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop',
            ingredients: [
                '1 cup cooked quinoa',
                '½ cup fermented kimchi',
                '¼ cup edamame beans',
                '1 tbsp sesame oil',
                '1 tsp rice vinegar',
                '1 tsp low-sodium tamari',
                '1 tbsp pumpkin seeds',
                '1 sheet nori, shredded',
                '1 avocado, sliced'
            ],
            instructions: [
                'Cook quinoa according to package directions',
                'Mix sesame oil, vinegar, and tamari for dressing',
                'Arrange quinoa in bowls',
                'Top with kimchi, edamame, and avocado',
                'Drizzle with dressing',
                'Sprinkle with pumpkin seeds and nori'
            ],
            benefits: [
                'Beneficial probiotics',
                'Complete amino acid profile',
                'Anti-inflammatory compounds',
                'Digestive system support'
            ],
            researchLinks: [
                {
                    title: 'Probiotics in Cancer Treatment',
                    summary: 'Fermented foods may help maintain gut health during cancer therapy',
                    source: 'Gut Microbes Journal, 2022'
                }
            ],
            nutritionFacts: {
                calories: '385',
                protein: '14g',
                carbs: '42g',
                fiber: '11g',
                fat: '18g'
            }
        },
        {
            id: 'func_003',
            name: 'Antioxidant Superfood Smoothie',
            description: 'Concentrated antioxidant blend with superfoods and adaptogens',
            tradition: 'Functional Nutrition',
            origin: 'Modern superfood science',
            purpose: 'Oxidative stress reduction, cellular protection, energy boost',
            prepTime: '8 min',
            servings: '1',
            image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop',
            ingredients: [
                '1 cup coconut water',
                '½ frozen banana',
                '½ cup frozen wild blueberries',
                '1 tbsp açaí powder',
                '1 tsp spirulina powder',
                '1 tbsp almond butter',
                '1 tsp maca powder',
                '1 tbsp hemp hearts',
                '½ tsp cinnamon'
            ],
            instructions: [
                'Add coconut water and banana to blender',
                'Add blueberries, açaí, and spirulina',
                'Include almond butter and maca powder',
                'Blend until completely smooth',
                'Top with hemp hearts and cinnamon'
            ],
            benefits: [
                'Extremely high antioxidant content',
                'Adaptogenic stress support',
                'Natural energy enhancement',
                'Cellular protection compounds'
            ],
            researchLinks: [
                {
                    title: 'Antioxidants in Cancer Prevention',
                    summary: 'High-antioxidant foods may help protect against treatment-related oxidative stress',
                    source: 'Free Radical Biology & Medicine, 2023'
                }
            ],
            nutritionFacts: {
                calories: '295',
                protein: '12g',
                carbs: '38g',
                fiber: '8g',
                fat: '12g'
            }
        },
        {
            id: 'func_004',
            name: 'Prebiotic-Rich Leek & Garlic Soup',
            description: 'Gut-healing soup with prebiotic fibers and anti-inflammatory spices',
            tradition: 'Functional Medicine',
            origin: 'Modern gut health research',
            purpose: 'Microbiome nourishment, digestive healing, immune support',
            prepTime: '35 min',
            servings: '4',
            image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=400&h=300&fit=crop',
            ingredients: [
                '3 large leeks, white and light green parts',
                '6 cloves garlic, minced',
                '1 large onion, chopped',
                '4 cups vegetable broth',
                '1 can white beans, drained',
                '2 tbsp olive oil',
                '1 tsp turmeric',
                '1 tbsp fresh thyme',
                'Sea salt and pepper to taste'
            ],
            instructions: [
                'Clean and slice leeks thoroughly',
                'Heat olive oil, sauté onions and leeks until soft',
                'Add garlic, cook for 1 minute until fragrant',
                'Add broth, beans, turmeric, and thyme',
                'Simmer for 20 minutes until vegetables are tender',
                'Season with salt and pepper before serving'
            ],
            benefits: [
                'Rich in prebiotic fibers',
                'Supports beneficial gut bacteria',
                'Anti-inflammatory compounds',
                'Immune system enhancement'
            ],
            researchLinks: [
                {
                    title: 'Prebiotics in Cancer Recovery',
                    summary: 'Prebiotic fibers support gut health and immune function during treatment',
                    source: 'Nutrition and Cancer, 2022'
                }
            ],
            nutritionFacts: {
                calories: '165',
                protein: '8g',
                carbs: '28g',
                fiber: '7g',
                fat: '4g'
            }
        },
        {
            id: 'func_005',
            name: 'Adaptogenic Cacao Energy Bars',
            description: 'No-bake bars with adaptogens, superfoods, and sustained energy',
            tradition: 'Functional Nutrition',
            origin: 'Modern adaptogen research',
            purpose: 'Stress adaptation, sustained energy, cognitive support',
            prepTime: '20 min + 2 hours setting',
            servings: '12 bars',
            image: 'https://images.unsplash.com/photo-1606787620819-8bdf0c44c293?w=400&h=300&fit=crop',
            ingredients: [
                '2 cups pitted dates',
                '1 cup raw almonds',
                '3 tbsp raw cacao powder',
                '2 tbsp coconut oil',
                '1 tsp ashwagandha powder',
                '1 tsp rhodiola powder',
                '1 tbsp chia seeds',
                '2 tbsp goji berries',
                'Pinch of sea salt'
            ],
            instructions: [
                'Process almonds in food processor until fine',
                'Add dates, process until paste forms',
                'Mix in cacao, coconut oil, and adaptogens',
                'Fold in chia seeds and goji berries',
                'Press into lined 8x8 pan',
                'Refrigerate 2 hours, cut into bars'
            ],
            benefits: [
                'Adaptogenic stress support',
                'Sustained energy release',
                'Cognitive function support',
                'Antioxidant protection'
            ],
            researchLinks: [
                {
                    title: 'Adaptogens in Cancer Support',
                    summary: 'Adaptogenic herbs may help manage treatment-related stress and fatigue',
                    source: 'Integrative Medicine Research, 2021'
                }
            ],
            nutritionFacts: {
                calories: '145',
                protein: '4g',
                carbs: '18g',
                fiber: '4g',
                fat: '7g'
            }
        },
        {
            id: 'func_003',
            name: 'Miso-Glazed Tempeh Power Bowl',
            description: 'Fermented protein bowl with probiotic-rich miso and nutrient-dense vegetables',
            tradition: 'Modern Functional Nutrition',
            region: 'East Asia',
            origin: 'Asian fermentation traditions adapted (1000+ years)',
            purpose: 'Gut health support, complete protein, microbiome nourishment',
            prepTime: '25 min',
            servings: '2',
            image: './recipe-background.jpg',
            ingredients: [
                '8 oz tempeh, sliced',
                '2 tbsp white miso paste',
                '1 tbsp rice vinegar',
                '1 tsp sesame oil',
                '2 cups cooked quinoa',
                '1 cup steamed broccoli',
                '1/2 avocado, sliced',
                '1 tbsp hemp seeds',
                '1 sheet nori, crumbled'
            ],
            instructions: [
                'Steam tempeh slices for 10 minutes',
                'Mix miso, vinegar, and sesame oil for glaze',
                'Pan-fry tempeh with miso glaze until golden',
                'Arrange quinoa in bowls',
                'Top with glazed tempeh and broccoli',
                'Add avocado slices',
                'Sprinkle with hemp seeds and nori'
            ],
            benefits: [
                'Rich in probiotics and prebiotics',
                'Complete amino acid profile',
                'Supports digestive health',
                'Anti-inflammatory compounds'
            ],
            researchLinks: [
                {
                    title: 'Fermented Foods in Cancer Care',
                    summary: 'Fermented soy products show beneficial effects on gut microbiome and immune function',
                    source: 'Current Opinion in Clinical Nutrition, 2021'
                }
            ],
            nutritionFacts: {
                calories: '485',
                protein: '28g',
                carbs: '52g',
                fiber: '12g',
                fat: '18g'
            }
        },
        {
            id: 'func_004',
            name: 'Spirulina Energy Smoothie Bowl',
            description: 'Antioxidant-rich smoothie bowl with spirulina, berries, and superfoods',
            tradition: 'Modern Functional Nutrition',
            region: 'Global',
            origin: 'Ancient superfood traditions modernized (500+ years)',
            purpose: 'Detoxification support, antioxidant boost, sustained energy',
            prepTime: '10 min',
            servings: '2',
            image: './recipe-background.jpg',
            ingredients: [
                '1 frozen banana',
                '1 cup frozen mixed berries',
                '1 tsp spirulina powder',
                '1 tbsp almond butter',
                '1 cup coconut milk',
                '1 tbsp chia seeds',
                '1 tbsp cacao nibs',
                '1/4 cup granola',
                'Fresh berries for topping'
            ],
            instructions: [
                'Blend banana, berries, and coconut milk',
                'Add spirulina and almond butter',
                'Blend until smooth and creamy',
                'Pour into bowls',
                'Top with chia seeds, cacao nibs',
                'Add granola and fresh berries',
                'Serve immediately'
            ],
            benefits: [
                'High in antioxidants and phytonutrients',
                'Supports cellular detoxification',
                'Provides sustained energy',
                'Rich in essential fatty acids'
            ],
            researchLinks: [
                {
                    title: 'Spirulina in Clinical Nutrition',
                    summary: 'Spirulina platensis shows antioxidant and immunomodulatory effects in cancer patients',
                    source: 'Marine Drugs Journal, 2021'
                }
            ],
            nutritionFacts: {
                calories: '295',
                protein: '8g',
                carbs: '35g',
                fiber: '10g',
                fat: '12g'
            }
        },
        {
            id: 'func_005',
            name: 'Mushroom Immunity Broth',
            description: 'Concentrated medicinal mushroom broth with reishi, shiitake, and maitake',
            tradition: 'Modern Functional Nutrition',
            region: 'East Asia',
            origin: 'Traditional Asian medicine modernized (2000+ years)',
            purpose: 'Immune system support, cellular protection, energy restoration',
            prepTime: '2 hours',
            servings: '6',
            image: './recipe-background.jpg',
            ingredients: [
                '1 oz dried reishi mushrooms',
                '1 cup fresh shiitake mushrooms',
                '1 cup fresh maitake mushrooms',
                '8 cups vegetable broth',
                '2 tbsp miso paste',
                '1 tbsp coconut aminos',
                '1 tsp fresh ginger, minced',
                '2 green onions, sliced'
            ],
            instructions: [
                'Soak reishi mushrooms for 30 minutes',
                'Slice fresh mushrooms',
                'Combine all mushrooms with broth',
                'Simmer on low for 1.5 hours',
                'Strain if desired, or leave mushrooms in',
                'Whisk in miso and coconut aminos',
                'Garnish with ginger and green onions'
            ],
            benefits: [
                'Powerful immune system support',
                'Adaptogenic stress response',
                'Anti-cancer compounds',
                'Liver and kidney support'
            ],
            researchLinks: [
                {
                    title: 'Medicinal Mushrooms in Oncology',
                    summary: 'Multiple mushroom species show immunomodulatory and anti-tumor effects',
                    source: 'Integrative Cancer Therapies, 2021'
                }
            ],
            nutritionFacts: {
                calories: '45',
                protein: '3g',
                carbs: '8g',
                fiber: '2g',
                fat: '1g'
            }
        },
        {
            id: 'func_006',
            name: 'Fermented Turmeric Kvass',
            description: 'Probiotic-rich fermented drink with turmeric and ginger for gut health',
            tradition: 'Modern Functional Nutrition',
            region: 'Global',
            origin: 'Traditional fermentation adapted (1000+ years)',
            purpose: 'Gut microbiome support, inflammation reduction, digestive health',
            prepTime: '15 min (plus 3-5 days fermentation)',
            servings: '8',
            image: './recipe-background.jpg',
            ingredients: [
                '2 tbsp fresh turmeric, grated',
                '1 tbsp fresh ginger, grated',
                '1/4 cup organic sugar',
                '1/4 tsp sea salt',
                '4 cups filtered water',
                '1/4 cup whey or kombucha starter',
                '1 lemon, juiced'
            ],
            instructions: [
                'Dissolve sugar and salt in warm water',
                'Cool to room temperature',
                'Add grated turmeric and ginger',
                'Stir in whey or starter culture',
                'Add lemon juice',
                'Cover with cloth and ferment 3-5 days',
                'Strain and refrigerate, drink 4 oz daily'
            ],
            benefits: [
                'Supports beneficial gut bacteria',
                'Powerful anti-inflammatory effects',
                'Enhances nutrient absorption',
                'Supports immune function'
            ],
            researchLinks: [
                {
                    title: 'Fermented Turmeric Benefits',
                    summary: 'Fermented curcumin shows enhanced bioavailability and anti-inflammatory effects',
                    source: 'Journal of Functional Foods, 2021'
                }
            ],
            nutritionFacts: {
                calories: '25',
                protein: '0g',
                carbs: '6g',
                fiber: '0g',
                fat: '0g'
            }
        },
        {
            id: 'func_007',
            name: 'Chlorella Protein Power Bars',
            description: 'Nutrient-dense energy bars with chlorella, nuts, and seeds',
            tradition: 'Modern Functional Nutrition',
            region: 'Global',
            origin: 'Modern superfood nutrition (50+ years)',
            purpose: 'Cellular detoxification, sustained energy, protein support',
            prepTime: '20 min',
            servings: '12',
            image: './recipe-background.jpg',
            ingredients: [
                '1 cup almonds',
                '1/2 cup walnuts',
                '1/4 cup sunflower seeds',
                '2 tbsp chlorella powder',
                '1/4 cup protein powder (plant-based)',
                '1/2 cup pitted dates',
                '2 tbsp almond butter',
                '1 tbsp coconut oil'
            ],
            instructions: [
                'Process nuts and seeds until roughly chopped',
                'Add chlorella and protein powder',
                'Process dates until paste-like',
                'Add almond butter and coconut oil',
                'Process until mixture holds together',
                'Press into lined 8x8 pan',
                'Refrigerate 2 hours, cut into bars'
            ],
            benefits: [
                'Supports cellular detoxification',
                'High in plant-based protein',
                'Rich in essential fatty acids',
                'Sustained energy release'
            ],
            researchLinks: [
                {
                    title: 'Chlorella in Detoxification',
                    summary: 'Chlorella vulgaris shows significant heavy metal detoxification and immune support',
                    source: 'Nutrients Journal, 2021'
                }
            ],
            nutritionFacts: {
                calories: '165',
                protein: '7g',
                carbs: '12g',
                fiber: '4g',
                fat: '11g'
            }
        },
        {
            id: 'func_008',
            name: 'Adaptogenic Golden Latte',
            description: 'Anti-inflammatory golden milk with multiple adaptogens and healthy fats',
            tradition: 'Modern Functional Nutrition',
            region: 'Global',
            origin: 'Ancient Ayurveda + Modern Adaptation (3000+ years)',
            purpose: 'Stress adaptation, inflammation reduction, immune support',
            prepTime: '8 min',
            servings: '1',
            image: './recipe-background.jpg',
            ingredients: [
                '1 cup coconut milk',
                '1 tsp turmeric powder',
                '1/2 tsp ashwagandha powder',
                '1/4 tsp rhodiola powder',
                '1/4 tsp cinnamon',
                'Pinch of black pepper',
                '1 tsp ghee or coconut oil',
                '1 tsp raw honey'
            ],
            instructions: [
                'Heat coconut milk gently in saucepan',
                'Whisk in turmeric, ashwagandha, rhodiola',
                'Add cinnamon and black pepper',
                'Stir in ghee or coconut oil',
                'Heat until steaming but not boiling',
                'Remove from heat, add honey',
                'Froth with immersion blender if desired'
            ],
            benefits: [
                'Supports stress adaptation',
                'Powerful anti-inflammatory effects',
                'Enhances immune function',
                'Promotes restful sleep'
            ],
            researchLinks: [
                {
                    title: 'Adaptogenic Herbs in Wellness',
                    summary: 'Multiple adaptogens show synergistic effects in stress management and immune support',
                    source: 'Phytotherapy Research, 2021'
                }
            ],
            nutritionFacts: {
                calories: '195',
                protein: '2g',
                carbs: '8g',
                fiber: '1g',
                fat: '18g'
            }
        }
    ],
    'mind-body-energy': [
        {
            id: 'mind_001',
            name: 'Meditation Moon Milk',
            description: 'Calming bedtime drink with adaptogenic herbs and warm spices',
            tradition: 'Mind-Body Medicine',
            region: 'Global',
            origin: 'Ancient Ayurveda + Modern Adaptation',
            purpose: 'Stress reduction, sleep support, nervous system calming',
            prepTime: '8 min',
            servings: '1',
            image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop',
            ingredients: [
                '1 cup coconut or oat milk',
                '½ tsp ashwagandha powder',
                '¼ tsp turmeric powder',
                '⅛ tsp ground cardamom',
                'Pinch of black pepper',
                '1 tsp coconut oil',
                '1 tsp raw honey',
                'Rose petals for garnish (optional)'
            ],
            instructions: [
                'Gently warm milk in a small saucepan',
                'Whisk in ashwagandha, turmeric, cardamom, and pepper',
                'Simmer for 3-4 minutes, stirring constantly',
                'Remove from heat, add coconut oil and honey',
                'Pour into mug, garnish with rose petals'
            ],
            benefits: [
                'Reduces stress and anxiety',
                'Supports restful sleep',
                'Adaptogenic properties',
                'Anti-inflammatory effects'
            ],
            researchLinks: [
                {
                    title: 'Ashwagandha in Cancer Care',
                    summary: 'Ashwagandha shows promise in reducing treatment-related fatigue and stress',
                    source: 'Journal of Ayurveda Research, 2020'
                }
            ],
            nutritionFacts: {
                calories: '95',
                protein: '2g',
                carbs: '8g',
                fiber: '1g',
                fat: '6g'
            }
        },
        {
            id: 'mind_002',
            name: 'Mindful Energy Balls',
            description: 'No-bake energy bites with adaptogenic herbs and mindful eating focus',
            tradition: 'Mind-Body Nutrition',
            origin: 'Modern mindful eating practices',
            purpose: 'Sustained energy, stress adaptation, mindful nourishment',
            prepTime: '15 min',
            servings: '12 balls',
            image: 'https://images.unsplash.com/photo-1606787620819-8bdf0c44c293?w=400&h=300&fit=crop',
            ingredients: [
                '1 cup pitted dates',
                '½ cup raw almonds',
                '2 tbsp cacao powder',
                '1 tsp maca powder',
                '½ tsp rhodiola powder',
                '2 tbsp coconut oil',
                '1 tsp vanilla extract',
                'Pinch of sea salt',
                'Unsweetened coconut flakes for rolling'
            ],
            instructions: [
                'Soak dates in warm water for 10 minutes if hard',
                'Process almonds in food processor until fine',
                'Add dates, cacao, maca, and rhodiola',
                'Pulse in coconut oil, vanilla, and salt',
                'Form into 12 small balls with mindful attention',
                'Roll in coconut flakes, chill for 30 minutes'
            ],
            benefits: [
                'Natural sustained energy',
                'Adaptogenic stress support',
                'Mindful eating practice',
                'Balanced blood sugar'
            ],
            researchLinks: [
                {
                    title: 'Mindful Eating in Cancer Recovery',
                    summary: 'Mindful eating practices may improve treatment outcomes and quality of life',
                    source: 'Psycho-Oncology Journal, 2022'
                }
            ],
            nutritionFacts: {
                calories: '85',
                protein: '3g',
                carbs: '12g',
                fiber: '2g',
                fat: '4g'
            }
        },
        {
            id: 'mind_003',
            name: 'Chakra-Balancing Rainbow Bowl',
            description: 'Colorful nourishing bowl designed for energy balance and mindful eating',
            tradition: 'Energy Medicine Nutrition',
            origin: 'Chakra-based color therapy + Nutrition',
            purpose: 'Energy center balance, mindful nourishment, visual meditation',
            prepTime: '25 min',
            servings: '2',
            image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop',
            ingredients: [
                '1 cup cooked brown rice (root chakra)',
                '½ cup roasted sweet potato cubes (sacral)',
                '½ cup steamed broccoli (heart)',
                '¼ cup shredded purple cabbage (crown)',
                '¼ cup blueberries (third eye)',
                '2 tbsp pumpkin seeds (solar plexus)',
                '1 tbsp tahini (throat)',
                '1 tsp turmeric (solar plexus)',
                'Fresh herbs for garnish'
            ],
            instructions: [
                'Arrange each colored food mindfully in sections',
                'Begin eating with intention and gratitude',
                'Chew slowly, focusing on each color\'s energy',
                'Mix tahini with turmeric for golden dressing',
                'Eat in a peaceful environment without distractions',
                'Notice how each color makes you feel'
            ],
            benefits: [
                'Complete nutritional spectrum',
                'Mindful eating practice',
                'Energy balance support',
                'Meditation through food'
            ],
            researchLinks: [
                {
                    title: 'Color Psychology in Nutrition',
                    summary: 'Colorful foods provide diverse phytonutrients with complementary healing properties',
                    source: 'Nutrition Reviews, 2021'
                }
            ],
            nutritionFacts: {
                calories: '320',
                protein: '12g',
                carbs: '48g',
                fiber: '8g',
                fat: '11g'
            }
        },
        {
            id: 'mind_004',
            name: 'Stress-Relief Lavender Lemonade',
            description: 'Calming beverage with lavender, lemon balm, and natural electrolytes',
            tradition: 'Aromatherapy Nutrition',
            origin: 'European herbalism + Modern aromatherapy',
            purpose: 'Anxiety reduction, nervous system calming, hydration support',
            prepTime: '20 min + chilling',
            servings: '4',
            image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&h=300&fit=crop',
            ingredients: [
                '4 cups filtered water',
                '2 tbsp dried lavender buds',
                '2 tbsp fresh lemon balm leaves',
                '½ cup fresh lemon juice',
                '¼ cup raw honey',
                '1 tbsp apple cider vinegar',
                'Pinch of sea salt',
                'Fresh lavender sprigs for garnish'
            ],
            instructions: [
                'Boil water, pour over lavender and lemon balm',
                'Steep for 15 minutes, strain herbs',
                'Stir in honey while tea is warm',
                'Add lemon juice, vinegar, and salt',
                'Chill completely before serving',
                'Serve over ice with lavender garnish'
            ],
            benefits: [
                'Natural anxiety relief',
                'Nervous system support',
                'Hydration with electrolytes',
                'Aromatherapeutic effects'
            ],
            researchLinks: [
                {
                    title: 'Lavender for Anxiety in Cancer Patients',
                    summary: 'Lavender aromatherapy shows significant anxiety-reducing effects in oncology settings',
                    source: 'European Journal of Oncology Nursing, 2021'
                }
            ],
            nutritionFacts: {
                calories: '35',
                protein: '0g',
                carbs: '9g',
                fiber: '0g',
                fat: '0g'
            }
        },
        {
            id: 'mind_005',
            name: 'Grounding Earth Bowl',
            description: 'Root vegetable bowl designed for grounding energy and stability',
            tradition: 'Earth-Based Nutrition',
            origin: 'Traditional grounding practices + Nutrition',
            purpose: 'Energy grounding, emotional stability, root chakra nourishment',
            prepTime: '45 min',
            servings: '2',
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
            ingredients: [
                '2 medium beets, roasted and cubed',
                '2 large carrots, roasted',
                '1 large sweet potato, cubed and roasted',
                '½ cup cooked red lentils',
                '2 tbsp tahini',
                '1 tbsp balsamic vinegar',
                '1 tsp ground ginger',
                '2 tbsp pumpkin seeds',
                'Fresh microgreens for garnish'
            ],
            instructions: [
                'Preheat oven to 400°F',
                'Toss vegetables with olive oil and roast 35 minutes',
                'Cook lentils until tender, about 20 minutes',
                'Whisk tahini, vinegar, and ginger for dressing',
                'Arrange roasted vegetables and lentils in bowls',
                'Drizzle with dressing, top with seeds and greens'
            ],
            benefits: [
                'Grounding and stabilizing energy',
                'Rich in root vegetables\' nutrients',
                'Complete protein from lentils',
                'Supports emotional balance'
            ],
            researchLinks: [
                {
                    title: 'Root Vegetables in Cancer Nutrition',
                    summary: 'Root vegetables provide stable energy and essential nutrients for recovery',
                    source: 'Journal of Nutritional Science, 2022'
                }
            ],
            nutritionFacts: {
                calories: '285',
                protein: '11g',
                carbs: '45g',
                fiber: '9g',
                fat: '8g'
            }
        },
        {
            id: 'mind_002',
            name: 'Chakra-Balancing Rainbow Bowl',
            description: 'Colorful nutrient bowl designed to balance energy centers and promote vitality',
            tradition: 'Mind-Body Medicine',
            region: 'Global',
            origin: 'Ancient Ayurveda + Modern Adaptation (3000+ years)',
            purpose: 'Energy center alignment, full-spectrum nutrition, emotional balance',
            prepTime: '30 min',
            servings: '2',
            image: './recipe-background.jpg',
            ingredients: [
                '1 cup red bell pepper (root chakra)',
                '1 cup orange carrots (sacral chakra)',
                '1 cup yellow corn (solar plexus)',
                '1 cup green spinach (heart chakra)',
                '1/2 cup blueberries (throat chakra)',
                '1/4 cup purple cabbage (third eye)',
                '1 tbsp violet edible flowers (crown)',
                '2 cups cooked quinoa',
                '2 tbsp tahini dressing'
            ],
            instructions: [
                'Arrange quinoa as base in bowl',
                'Steam or lightly sauté each colored vegetable',
                'Arrange vegetables in rainbow pattern',
                'Top with blueberries and purple cabbage',
                'Garnish with violet flowers',
                'Drizzle with tahini dressing',
                'Eat mindfully, focusing on each color\'s energy'
            ],
            benefits: [
                'Provides full spectrum of phytonutrients',
                'Promotes mindful eating practices',
                'Supports emotional and energetic balance',
                'Rich in antioxidants and vitamins'
            ],
            researchLinks: [
                {
                    title: 'Color Psychology and Nutrition',
                    summary: 'Diverse colored foods provide varied phytonutrients with complementary health benefits',
                    source: 'Journal of Nutritional Science, 2021'
                }
            ],
            nutritionFacts: {
                calories: '385',
                protein: '14g',
                carbs: '68g',
                fiber: '12g',
                fat: '8g'
            }
        },
        {
            id: 'mind_003',
            name: 'Pranayama Breathing Tea',
            description: 'Respiratory-supporting herbal blend to enhance breathwork and lung function',
            tradition: 'Mind-Body Medicine',
            region: 'Global',
            origin: 'Ancient yogic traditions (3000+ years)',
            purpose: 'Respiratory support, breath awareness, oxygenation enhancement',
            prepTime: '12 min',
            servings: '2',
            image: './recipe-background.jpg',
            ingredients: [
                '1 tsp dried eucalyptus leaves',
                '1 tsp dried peppermint',
                '1/2 tsp dried thyme',
                '1/2 tsp dried mullein',
                '2 cups hot water',
                '1 tsp raw honey',
                '1/4 lemon, juiced'
            ],
            instructions: [
                'Combine all dried herbs in teapot',
                'Pour hot water over herbs',
                'Cover and steep for 8 minutes',
                'Strain herbs from liquid',
                'Add honey and lemon juice',
                'Drink slowly while practicing deep breathing',
                'Inhale steam mindfully before drinking'
            ],
            benefits: [
                'Supports respiratory health',
                'Enhances oxygen utilization',
                'Promotes mindful breathing',
                'Clears respiratory pathways'
            ],
            researchLinks: [
                {
                    title: 'Herbal Support for Respiratory Health',
                    summary: 'Traditional respiratory herbs show bronchodilatory and expectorant effects',
                    source: 'Respiratory Medicine Research, 2021'
                }
            ],
            nutritionFacts: {
                calories: '15',
                protein: '0g',
                carbs: '4g',
                fiber: '0g',
                fat: '0g'
            }
        },
        {
            id: 'mind_004',
            name: 'Grounding Earth Element Stew',
            description: 'Root vegetable stew designed to promote stability and connection to earth energy',
            tradition: 'Mind-Body Medicine',
            region: 'Global',
            origin: 'Earth-based wisdom traditions (1000+ years)',
            purpose: 'Grounding energy, emotional stability, earth connection',
            prepTime: '45 min',
            servings: '4',
            image: './recipe-background.jpg',
            ingredients: [
                '2 cups sweet potatoes, cubed',
                '1 cup carrots, sliced',
                '1 cup parsnips, chopped',
                '1 cup beets, cubed',
                '1 onion, diced',
                '3 cloves garlic, minced',
                '4 cups vegetable broth',
                '1 tsp dried rosemary',
                '1 tsp dried sage',
                '2 tbsp olive oil'
            ],
            instructions: [
                'Heat olive oil in large pot',
                'Sauté onion and garlic until fragrant',
                'Add all root vegetables',
                'Pour in broth and add herbs',
                'Simmer 30 minutes until tender',
                'Mash partially for texture',
                'Serve warm while focusing on grounding'
            ],
            benefits: [
                'Rich in grounding nutrients',
                'Supports stable blood sugar',
                'Promotes feeling of security',
                'High in fiber and beta-carotene'
            ],
            researchLinks: [
                {
                    title: 'Root Vegetables in Metabolic Health',
                    summary: 'Complex carbohydrates from root vegetables support stable energy and mood',
                    source: 'Nutrition and Metabolism, 2021'
                }
            ],
            nutritionFacts: {
                calories: '185',
                protein: '4g',
                carbs: '38g',
                fiber: '8g',
                fat: '4g'
            }
        },
        {
            id: 'mind_005',
            name: 'Heart-Opening Rose Petal Elixir',
            description: 'Gentle floral tonic to support emotional healing and heart chakra opening',
            tradition: 'Mind-Body Medicine',
            region: 'Middle East/South Asia',
            origin: 'Persian and Ayurvedic traditions (2000+ years)',
            purpose: 'Emotional healing, heart chakra support, self-compassion',
            prepTime: '15 min',
            servings: '1',
            image: './recipe-background.jpg',
            ingredients: [
                '2 tbsp dried rose petals (food grade)',
                '1 cup hot water',
                '1 tsp rose water',
                '1 tsp raw honey',
                '1/4 tsp cardamom powder',
                'Pinch of pink Himalayan salt',
                'Fresh rose petals for garnish'
            ],
            instructions: [
                'Place dried rose petals in teacup',
                'Pour hot water over petals',
                'Steep for 10 minutes',
                'Strain petals from liquid',
                'Stir in rose water and honey',
                'Add cardamom and salt',
                'Garnish with fresh petals and drink mindfully'
            ],
            benefits: [
                'Supports emotional healing',
                'Promotes self-love and compassion',
                'Calms nervous system',
                'Rich in vitamin C and antioxidants'
            ],
            researchLinks: [
                {
                    title: 'Rose Aromatherapy in Emotional Wellness',
                    summary: 'Rose extracts show anxiolytic and mood-enhancing properties',
                    source: 'Evidence-Based Complementary Medicine, 2021'
                }
            ],
            nutritionFacts: {
                calories: '20',
                protein: '0g',
                carbs: '5g',
                fiber: '0g',
                fat: '0g'
            }
        },
        {
            id: 'mind_006',
            name: 'Solar Plexus Power Smoothie',
            description: 'Yellow-colored smoothie to energize the solar plexus chakra and personal power',
            tradition: 'Mind-Body Medicine',
            region: 'Global',
            origin: 'Modern chakra nutrition + Ancient wisdom (3000+ years)',
            purpose: 'Personal empowerment, digestive support, confidence building',
            prepTime: '8 min',
            servings: '1',
            image: './recipe-background.jpg',
            ingredients: [
                '1 frozen banana',
                '1/2 cup frozen mango',
                '1/4 cup pineapple',
                '1 tbsp turmeric powder',
                '1 tsp fresh ginger',
                '1 cup coconut water',
                '1 tbsp coconut butter',
                '1/2 tsp bee pollen'
            ],
            instructions: [
                'Combine all frozen fruits in blender',
                'Add turmeric and fresh ginger',
                'Pour in coconut water',
                'Add coconut butter',
                'Blend until smooth and creamy',
                'Top with bee pollen',
                'Drink while visualizing golden energy'
            ],
            benefits: [
                'Supports digestive fire',
                'Anti-inflammatory properties',
                'Boosts confidence and personal power',
                'Rich in digestive enzymes'
            ],
            researchLinks: [
                {
                    title: 'Turmeric in Digestive Health',
                    summary: 'Curcumin supports digestive function and reduces inflammation',
                    source: 'Journal of Medicinal Food, 2021'
                }
            ],
            nutritionFacts: {
                calories: '245',
                protein: '3g',
                carbs: '48g',
                fiber: '6g',
                fat: '7g'
            }
        },
        {
            id: 'mind_007',
            name: 'Third Eye Blueberry Lavender Tart',
            description: 'Intuition-enhancing dessert with purple foods to support third eye chakra',
            tradition: 'Mind-Body Medicine',
            region: 'Global',
            origin: 'Modern intuitive nutrition (50+ years)',
            purpose: 'Intuition enhancement, mental clarity, spiritual connection',
            prepTime: '40 min',
            servings: '8',
            image: './recipe-background.jpg',
            ingredients: [
                '1 1/2 cups almond flour',
                '1/4 cup coconut oil, melted',
                '2 tbsp maple syrup',
                '2 cups fresh blueberries',
                '1 tbsp dried lavender buds',
                '1/4 cup coconut cream',
                '2 tbsp agar powder',
                '1/4 cup raw honey'
            ],
            instructions: [
                'Mix almond flour, coconut oil, and maple syrup',
                'Press into tart pan and bake 15 minutes',
                'Simmer blueberries with lavender 10 minutes',
                'Strain and mix with coconut cream',
                'Dissolve agar in warm mixture',
                'Add honey and pour into crust',
                'Refrigerate 2 hours until set'
            ],
            benefits: [
                'Rich in anthocyanins for brain health',
                'Supports cognitive function',
                'Promotes mental clarity',
                'Calming lavender aromatherapy'
            ],
            researchLinks: [
                {
                    title: 'Blueberries in Cognitive Health',
                    summary: 'Blueberry anthocyanins show neuroprotective and memory-enhancing effects',
                    source: 'Nutritional Neuroscience, 2021'
                }
            ],
            nutritionFacts: {
                calories: '195',
                protein: '5g',
                carbs: '22g',
                fiber: '4g',
                fat: '11g'
            }
        },
        {
            id: 'mind_008',
            name: 'Crown Chakra Violet Chia Pudding',
            description: 'Spiritual connection pudding with purple foods and high-vibration ingredients',
            tradition: 'Mind-Body Medicine',
            region: 'Global',
            origin: 'Modern spiritual nutrition (50+ years)',
            purpose: 'Spiritual connection, crown chakra activation, divine consciousness',
            prepTime: '10 min (plus 4 hours setting)',
            servings: '2',
            image: './recipe-background.jpg',
            ingredients: [
                '1/4 cup chia seeds',
                '1 cup coconut milk',
                '2 tbsp purple cabbage juice (for color)',
                '1 tbsp maple syrup',
                '1/2 tsp vanilla extract',
                '1/4 cup purple grapes',
                '1 tbsp edible violet flowers',
                '1 tsp coconut flakes'
            ],
            instructions: [
                'Whisk chia seeds with coconut milk',
                'Add cabbage juice for purple color',
                'Stir in maple syrup and vanilla',
                'Refrigerate 4 hours, stirring once',
                'Top with grapes and violet flowers',
                'Garnish with coconut flakes',
                'Eat mindfully for spiritual connection'
            ],
            benefits: [
                'Supports spiritual awareness',
                'Rich in omega-3 fatty acids',
                'Promotes mindful eating',
                'High in antioxidants'
            ],
            researchLinks: [
                {
                    title: 'Mindful Eating and Wellbeing',
                    summary: 'Mindful eating practices show benefits for overall health and spiritual wellness',
                    source: 'Mindfulness Journal, 2021'
                }
            ],
            nutritionFacts: {
                calories: '165',
                protein: '5g',
                carbs: '18g',
                fiber: '10g',
                fat: '8g'
            }
        }
    ]
};

// Educational Resources
const educationalResources = {
    // National Cancer Institute (NCI)
    'nci-nutrition-cancer': {
        title: 'Nutrition in Cancer Care (PDQÂ®) - 2024 Update',
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
            'medicationsSection': 'medications',
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
        } else if (sectionId === 'medicationsSection') {
            initializeMedications();
        } else if (sectionId === 'resourcesSection') {
            loadResources();
        }
    }
}

// Recipe functions
function loadRecipes(skipDefaultFilter = false) {
    // Update filter buttons with counts first
    updateFilterButtonsWithCounts(currentRecipeMode);
    
    // Initialize filter button event listeners
    initializeFilterButtons();
    
    // Load all recipes by default unless skipDefaultFilter is true
    if (!skipDefaultFilter) {
        filterRecipes('all');
    }
}

// Allergy and restriction filtering functions
function getAllergenList() {
    const allergiesField = document.getElementById('allergies');
    if (!allergiesField || !allergiesField.value.trim()) {
        console.log('No allergies specified');
        return [];
    }
    
    // Split by common delimiters and clean up
    const allergies = allergiesField.value
        .split(/[,;|\n]/)
        .map(item => item.trim().toLowerCase())
        .filter(item => item.length > 0);
    
    console.log('User allergies detected:', allergies);
    return allergies;
}

function isRecipeSafeForUser(recipe) {
    const userAllergies = getAllergenList();
    
    // If no allergies specified, recipe is safe
    if (userAllergies.length === 0) {
        return true;
    }
    
    // Check recipe ingredients and name for allergens
    const textToCheck = [
        recipe.name || '',
        recipe.description || '',
        ...(recipe.ingredients || [])
    ].join(' ').toLowerCase();
    
    // Check for any allergen matches
    for (const allergen of userAllergies) {
        if (textToCheck.includes(allergen)) {
            console.log(`Recipe "${recipe.name}" contains allergen: "${allergen}"`);
            return false;
        }
    }
    
    return true;
}

function filterRecipesForAllergies(recipes) {
    const safeRecipes = recipes.filter(recipe => isRecipeSafeForUser(recipe));
    
    // Log filtering results for user awareness
    if (recipes.length !== safeRecipes.length) {
        const filtered = recipes.length - safeRecipes.length;
        console.log(`Filtered out ${filtered} recipes due to allergy/restriction constraints`);
    }
    
    return safeRecipes;
}

function filterRecipes(category, skipHighlight = false, showCategoryHeader = false) {
    console.log(`Filtering recipes for category: ${category}, showHeader: ${showCategoryHeader}`);
    
    // Get current recipe data based on mode
    const currentRecipeData = currentRecipeMode === 'conventional' ? conventionalRecipeData : camRecipeData;
    let recipesToShow = [];
    
    if (category === 'all') {
        // Show all recipes from all categories
        for (const cat in currentRecipeData) {
            recipesToShow = recipesToShow.concat(currentRecipeData[cat]);
        }
        // Apply allergy filtering
        recipesToShow = filterRecipesForAllergies(recipesToShow);
        renderRecipes(recipesToShow);
        showCategoryHeader = false; // Never show header for "all"
    } else if (category === 'recommended') {
        // Handle the "Recommended Recipes" filter - show all recommended recipes in grid layout
        showRecommendedRecipesGrid();
        return; // Early return as showRecommendedRecipesGrid handles everything
    } else if (currentRecipeData[category]) {
        recipesToShow = currentRecipeData[category];
        // Apply allergy filtering
        recipesToShow = filterRecipesForAllergies(recipesToShow);
        
        // If showing category header for specific filter, use single category rendering
        if (showCategoryHeader && recipesToShow.length > 0) {
            renderSingleCategoryWithHeader(category, recipesToShow);
        } else {
            // Use regular rendering without headers
            renderRecipes(recipesToShow);
        }
    }
    
    // Highlight the corresponding filter button unless explicitly skipped
    if (!skipHighlight) {
        highlightFilterButton(category);
    }
}

function showRecommendedRecipes() {
    console.log('=== Showing Recommended Recipes (Mixed View) ===');
    
    // Get user profile to determine nutrition approach
    const userData = getUserProfile();
    if (!userData) {
        console.error('No user profile found');
        alert('Please complete your personal assessment first.');
        showSection('profileSection');
        return;
    }

    // Make sure we're in the recipes section but don't load default recipes
    const targetSection = document.getElementById('recipesSection');
    if (targetSection) {
        // Hide all sections
        document.querySelectorAll('.content-section, .welcome-section').forEach(section => {
            section.classList.add('hidden');
        });
        
        // Show recipes section
        targetSection.classList.remove('hidden');
        currentSection = 'recipesSection';
        
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.classList.remove('active');
        });
        const activeNavItem = document.querySelector(`[data-section="recipes"]`);
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }
        
        // Initialize filter buttons but don't load default recipes
        initializeFilterButtons();
    }
    
    // Determine the correct recipe mode based on nutrition approach
    let targetMode = 'conventional'; // default
    if (userData.nutritionApproach && userData.nutritionApproach !== 'conventional') {
        targetMode = 'cam';
    }
    
    console.log(`Target recipe mode: ${targetMode}, Current mode: ${currentRecipeMode}`);
    
    // Switch to appropriate recipe mode if needed
    if (currentRecipeMode !== targetMode) {
        console.log(`Switching to ${targetMode} mode`);
        switchRecipeMode(targetMode);
        
        // Update dropdown to reflect the change
        const dropdown = document.getElementById('recipeMode');
        if (dropdown) {
            dropdown.value = targetMode;
        }
    }
    
    // Get recommended categories for current nutrition approach
    const recommendedFilters = getRecommendedCategoriesArray(userData).map(cat => cat.filter);
    console.log('Recommended filters:', recommendedFilters);
    
    // Get current recipe data
    const currentRecipeData = currentRecipeMode === 'conventional' ? conventionalRecipeData : camRecipeData;
    
    // Collect all recommended recipes into a single array
    let allRecommendedRecipes = [];
    recommendedFilters.forEach(filterName => {
        const categoryRecipes = currentRecipeData[filterName] || [];
        console.log(`Adding ${categoryRecipes.length} recipes from ${filterName}`);
        allRecommendedRecipes = allRecommendedRecipes.concat(categoryRecipes);
    });
    
    console.log(`Total recommended recipes: ${allRecommendedRecipes.length}`);
    
    // Apply allergy filtering to recommended recipes
    const safeRecommendedRecipes = filterRecipesForAllergies(allRecommendedRecipes);
    
    // Update filter buttons with counts and show recommended button as active
    updateFilterButtonsWithCounts(targetMode, true, safeRecommendedRecipes.length, recommendedFilters);
    
    // Sort recipes by region for consistency
    const sortedRecipes = [...safeRecommendedRecipes].sort((a, b) => {
        const regionA = a.region || 'ZZZ';
        const regionB = b.region || 'ZZZ';
        return regionA.localeCompare(regionB);
    });
    
    // Render all safe recommended recipes together (mixed view)
    renderRecipes(sortedRecipes);
    
    // Show notification about personalized recommendations
    const recipesGrid = document.getElementById('recipesGrid');
    if (recipesGrid) {
        const existingNotice = document.querySelector('.recommendation-notice');
        if (!existingNotice) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'recommendation-notice';
            messageDiv.innerHTML = `
                <i class="fas fa-star"></i>
                <span>Showing ${safeRecommendedRecipes.length} recipes personalized for your profile</span>
                <div class="recommendation-actions">
                    <button onclick="restoreAllRecipes()" class="btn-link">View all recipes</button>
                    <button onclick="dismissRecommendationNotice()" class="btn-link close-notice" title="Dismiss notification">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
            recipesGrid.parentNode.insertBefore(messageDiv, recipesGrid);
        }
    }
    
    // Scroll to top of recipes section
    const recipesSection = document.getElementById('recipesSection');
    if (recipesSection) {
        recipesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function showRecommendedRecipesGrouped() {
    console.log('=== Showing Recommended Recipes (Grouped Horizontal Layout) ===');
    
    // Get user profile to determine nutrition approach
    const userData = getUserProfile();
    if (!userData) {
        console.error('No user profile found');
        alert('Please complete your personal assessment first.');
        showSection('profileSection');
        return;
    }

    // Determine the correct recipe mode based on nutrition approach
    let targetMode = 'conventional'; // default
    if (userData.nutritionApproach && userData.nutritionApproach !== 'conventional') {
        targetMode = 'cam';
    }
    
    console.log(`Target recipe mode: ${targetMode}, Current mode: ${currentRecipeMode}`);
    
    // Switch to appropriate recipe mode if needed
    if (currentRecipeMode !== targetMode) {
        console.log(`Switching to ${targetMode} mode`);
        switchRecipeMode(targetMode);
        
        // Update dropdown to reflect the change
        const dropdown = document.getElementById('recipeMode');
        if (dropdown) {
            dropdown.value = targetMode;
        }
    }
    
    // Get recommended categories for current nutrition approach
    const recommendedCategories = getRecommendedCategoriesArray(userData);
    console.log('Recommended categories:', recommendedCategories);
    
    // Get current recipe data
    const currentRecipeData = currentRecipeMode === 'conventional' ? conventionalRecipeData : camRecipeData;
    
    // Calculate total recommended recipes count and update filter buttons
    const recommendedFilters = recommendedCategories.map(cat => cat.filter);
    let totalRecommendedCount = 0;
    recommendedFilters.forEach(filterName => {
        const categoryRecipes = currentRecipeData[filterName] || [];
        // Apply allergy filtering before counting
        const safeRecipes = filterRecipesForAllergies(categoryRecipes);
        totalRecommendedCount += safeRecipes.length;
    });
    
    // Update filter buttons with counts and show recommended button as active
    updateFilterButtonsWithCounts(targetMode, true, totalRecommendedCount, recommendedFilters);
    
    // Render grouped recipes with horizontal layout
    renderRecommendedRecipesGroupedHorizontal(recommendedCategories, currentRecipeData);
    
    // Show notification about personalized recommendations
    const recipesGrid = document.getElementById('recipesGrid');
    if (recipesGrid) {
        const existingNotice = document.querySelector('.recommendation-notice');
        if (!existingNotice) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'recommendation-notice';
            messageDiv.innerHTML = `
                <i class="fas fa-star"></i>
                <span>Showing recipes organized by your personalized recommendations</span>
                <div class="recommendation-actions">
                    <button onclick="restoreAllRecipes()" class="btn-link">View all recipes</button>
                    <button onclick="dismissRecommendationNotice()" class="btn-link close-notice" title="Dismiss notification">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
            recipesGrid.parentNode.insertBefore(messageDiv, recipesGrid);
        }
    }
    
    // Scroll to top of recipes section
    const recipesSection = document.getElementById('recipesSection');
    if (recipesSection) {
        recipesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

function dismissRecommendationNotice() {
    // Remove the recommendation notice
    const existingNotice = document.querySelector('.recommendation-notice');
    if (existingNotice && existingNotice.parentNode) {
        existingNotice.parentNode.removeChild(existingNotice);
    }
}

function renderRecipes(recipes) {
    const container = document.getElementById('recipesGrid');
    if (!container) {
        console.error('recipesGrid container not found');
        return;
    }
    
    console.log('Rendering recipes:', recipes.length, 'recipes in mode:', currentRecipeMode);
    
    // Check for existing recommendation notice to preserve it
    const existingNotice = container.querySelector('.recommendation-notice');
    let noticeHTML = '';
    if (existingNotice) {
        noticeHTML = existingNotice.outerHTML;
    }
    
    // Reset container classes to ensure clean grid layout
    container.className = 'recipes-grid cam-recipes-grid';
    
    if (recipes.length === 0) {
        container.innerHTML = noticeHTML + '<p class="no-recipes">No recipes found for this filter.</p>';
        return;
    }

    // Sort recipes by region field alphabetically
    const sortedRecipes = [...recipes].sort((a, b) => {
        const regionA = a.region || 'ZZZ'; // Put recipes without region at the end
        const regionB = b.region || 'ZZZ';
        return regionA.localeCompare(regionB);
    });

    const html = sortedRecipes.map(recipe => {
        // Handle different recipe structures (conventional vs CAM)
        const isCAMRecipe = recipe.tradition && recipe.origin && recipe.purpose;
        
        if (isCAMRecipe) {
            // CAM recipe structure
            return `
                <div class="recipe-card" onclick="openRecipeModal('${recipe.id}')" data-recipe-id="${recipe.id}">
                    <div class="recipe-image recipe-icon-header" style="background: none !important; background-image: url('recipe-background-food.png') !important; background-size: cover !important; background-position: center !important; background-repeat: no-repeat !important; background-color: transparent !important; background-attachment: scroll !important;">
                        <i class="fas fa-utensils"></i>
                    </div>
                    <div class="recipe-name-header">
                        <h3>${recipe.name}</h3>
                    </div>
                    <div class="recipe-content">
                        <div class="recipe-meta">
                            <span class="recipe-tradition-badge">${recipe.tradition}</span>
                        </div>
                        <p class="recipe-description">${recipe.description}</p>
                        <div class="recipe-origin-info">
                            <strong>Origin:</strong> ${recipe.origin}
                        </div>
                        <div class="recipe-purpose">
                            <strong>Purpose:</strong> ${recipe.purpose}
                        </div>
                        <div class="recipe-stats">
                            <span><i class="fas fa-clock"></i> ${recipe.prepTime}</span>
                            <span><i class="fas fa-users"></i> ${recipe.servings} servings</span>
                            <span><i class="fas fa-fire"></i> ${recipe.nutritionFacts.calories} cal</span>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Conventional recipe structure - enhanced to match CAM design
            return `
                <div class="recipe-card" onclick="openRecipeModal('${recipe.id}')" data-recipe-id="${recipe.id}">
                    <div class="recipe-image-override recipe-icon-header" style="background: none !important; background-image: url('recipe-background-food.png') !important; background-size: cover !important; background-position: center !important; background-repeat: no-repeat !important; background-color: transparent !important; background-attachment: scroll !important;">
                        <i class="fas fa-utensils"></i>
                    </div>
                    <div class="recipe-name-header">
                        <h3>${recipe.name}</h3>
                    </div>
                    <div class="recipe-content">
                        <div class="recipe-meta">
                            <span class="recipe-tradition-badge">${recipe.region || 'Nutritional Therapy'}</span>
                        </div>
                        <p class="recipe-description">${recipe.description}</p>
                        <div class="recipe-origin-info">
                            <strong>Category:</strong> ${recipe.tags ? recipe.tags.join(', ') : 'Therapeutic'}
                        </div>
                        <div class="recipe-purpose">
                            <strong>Benefits:</strong> ${recipe.cancerBenefits || recipe.nutritionTips || 'Supports overall health and nutrition'}
                        </div>
                        <div class="recipe-stats">
                            <span><i class="fas fa-clock"></i> ${recipe.prepTime}</span>
                            <span><i class="fas fa-fire"></i> ${recipe.protein}</span>
                            <span><i class="fas fa-burn"></i> ${recipe.calories} cal</span>
                        </div>
                    </div>
                </div>
            `;
        }
    }).join('');
    
    container.innerHTML = noticeHTML + html;
}

function renderSingleCategoryWithHeader(category, recipes) {
    console.log(`Rendering single category with header: ${category}, ${recipes.length} recipes`);
    
    const recipesGrid = document.getElementById('recipesGrid');
    if (!recipesGrid) return;
    
    // Get category information
    const categoryInfo = getCategoryInfo(category);
    
    // Create header HTML
    const headerHTML = `
        <div class="single-category-header" style="
            background: linear-gradient(135deg, var(--primary-color) 0%, var(--health-green) 100%);
            color: white;
            padding: var(--space-6);
            border-radius: var(--radius-lg);
            margin-bottom: var(--space-6);
            text-align: center;
            box-shadow: 0 4px 15px rgba(0, 102, 204, 0.2);
        ">
            <div style="display: flex; align-items: center; justify-content: center; gap: var(--space-3); margin-bottom: var(--space-2);">
                <i class="${categoryInfo.icon}" style="font-size: 2rem;"></i>
                <h2 style="margin: 0; font-size: 1.8rem; font-weight: 600;">${categoryInfo.title}</h2>
                <span style="
                    background: rgba(255, 255, 255, 0.2);
                    padding: var(--space-1) var(--space-3);
                    border-radius: var(--radius-full);
                    font-weight: 500;
                    font-size: 0.9rem;
                ">(${recipes.length} recipes)</span>
            </div>
            <p style="margin: 0; opacity: 0.9; font-size: 1rem; max-width: 600px; margin: 0 auto;">
                ${categoryInfo.description}
            </p>
        </div>
    `;
    
    // Sort recipes by region
    const sortedRecipes = [...recipes].sort((a, b) => {
        const regionA = a.region || 'ZZZ';
        const regionB = b.region || 'ZZZ';
        return regionA.localeCompare(regionB);
    });
    
    // Create recipe cards
    const recipesHTML = sortedRecipes.map(recipe => {
        const isCAMRecipe = recipe.tradition && recipe.origin && recipe.purpose;
        
        if (isCAMRecipe) {
            return `
                <div class="recipe-card" onclick="openRecipeModal('${recipe.id}')" data-recipe-id="${recipe.id}">
                    <div class="recipe-image recipe-icon-header">
                        <i class="fas fa-utensils"></i>
                    </div>
                    <div class="recipe-name-header">
                        <h3>${recipe.name}</h3>
                    </div>
                    <div class="recipe-content">
                        <div class="recipe-meta">
                            <span class="recipe-tradition-badge">${recipe.tradition}</span>
                        </div>
                        <p class="recipe-description">${recipe.description}</p>
                        <div class="recipe-origin-info">
                            <strong>Origin:</strong> ${recipe.origin}
                        </div>
                        <div class="recipe-purpose">
                            <strong>Purpose:</strong> ${recipe.purpose}
                        </div>
                        <div class="recipe-stats">
                            <span><i class="fas fa-clock"></i> ${recipe.prepTime}</span>
                            <span><i class="fas fa-users"></i> ${recipe.servings} servings</span>
                            <span><i class="fas fa-fire"></i> ${recipe.nutritionFacts.calories} cal</span>
                        </div>
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="recipe-card" onclick="openRecipeModal('${recipe.id}')" data-recipe-id="${recipe.id}">
                    <div class="recipe-image recipe-icon-header">
                        <i class="fas fa-utensils"></i>
                    </div>
                    <div class="recipe-name-header">
                        <h3>${recipe.name}</h3>
                    </div>
                    <div class="recipe-content">
                        <div class="recipe-meta">
                            <span class="recipe-region-badge">${recipe.region || 'Global'}</span>
                        </div>
                        <p class="recipe-description">${recipe.description}</p>
                        <div class="recipe-stats">
                            <span><i class="fas fa-clock"></i> ${recipe.prepTime}</span>
                            <span><i class="fas fa-dumbbell"></i> ${recipe.protein}</span>
                            <span><i class="fas fa-fire"></i> ${recipe.calories} cal</span>
                        </div>
                        <div class="recipe-benefits">
                            <i class="fas fa-info-circle"></i>
                            <span>${recipe.cancerBenefits}</span>
                        </div>
                    </div>
                </div>
            `;
        }
    }).join('');
    
    // Check for existing recommendation notice to preserve it
    const existingNotice = recipesGrid.querySelector('.recommendation-notice');
    let noticeHTML = '';
    if (existingNotice) {
        noticeHTML = existingNotice.outerHTML;
    }
    
    // Render header + recipes
    recipesGrid.innerHTML = noticeHTML + headerHTML + `
        <div class="recipes-grid" style="
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: var(--space-6);
            padding: var(--space-4) 0;
        ">
            ${recipesHTML}
        </div>
    `;
}

function getCategoryInfo(category) {
    const categoryMap = {
        // Conventional Nutrition Categories
        'healthy': {
            icon: 'fas fa-leaf',
            title: 'Healthy Recipes',
            description: 'Nutritious, well-balanced recipes to support overall health and wellness during your cancer journey.'
        },
        'symptom-management': {
            icon: 'fas fa-heart-pulse',
            title: 'Symptom Management',
            description: 'Recipes designed to help manage treatment side effects like nausea, appetite loss, and digestive issues.'
        },
        'high-protein-high-calorie': {
            icon: 'fas fa-dumbbell',
            title: 'High Protein/Calorie',
            description: 'Nutrient-dense recipes to support energy, recovery, and maintaining healthy weight during treatment.'
        },
        'texture-modified': {
            icon: 'fas fa-blender',
            title: 'Texture Modified',
            description: 'Soft, easy-to-swallow recipes perfect for managing mouth sores, swallowing difficulties, or dental issues.'
        },
        'therapeutic-medical': {
            icon: 'fas fa-pills',
            title: 'Therapeutic/Medical',
            description: 'Evidence-based recipes with specific therapeutic benefits and medical nutrition principles for cancer patients.'
        },
        
        // CAM Categories
        'ayurveda': {
            icon: 'fas fa-leaf',
            title: 'Ayurvedic Nutrition',
            description: 'Traditional Ayurvedic recipes that balance your constitution and support healing through ancient wisdom.'
        },
        'tcm': {
            icon: 'fas fa-mountain',
            title: 'Traditional Chinese Medicine',
            description: 'Traditional Chinese Medicine recipes focused on energy balancing and organ support for optimal health.'
        },
        'herbal-remedies': {
            icon: 'fas fa-seedling',
            title: 'Herbal Remedies',
            description: 'Global herbal traditions adapted for cancer support, combining traditional wisdom with modern safety.'
        },
        'functional-foods': {
            icon: 'fas fa-microscope',
            title: 'Functional Foods',
            description: 'Modern functional nutrition recipes featuring superfoods and bioactive compounds for optimal health.'
        },
        'mind-body-energy': {
            icon: 'fas fa-brain',
            title: 'Mind-Body & Energy',
            description: 'Recipes that support mental clarity, emotional balance, and energy healing during your wellness journey.'
        }
    };
    
    return categoryMap[category] || {
        icon: 'fas fa-utensils',
        title: category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' '),
        description: `Specialized recipes in the ${category.replace(/-/g, ' ')} category.`
    };
}

function renderRecipesWithDynamicHeaders(recipesData, options = {}) {
    const container = document.getElementById('recipesGrid');
    if (!container) {
        console.error('recipesGrid container not found');
        return;
    }
    
    const { showGroupHeaders = false, groupByCategory = false, singleCategoryFilter = null } = options;
    
    if (groupByCategory && showGroupHeaders) {
        // Render grouped recipes with headers (for recommendations)
        renderGroupedRecommendedRecipes(recipesData.userData, recipesData.filters, recipesData.data);
        return;
    }
    
    if (singleCategoryFilter && singleCategoryFilter !== 'all') {
        // Render single category with header
        const categoryRecipes = recipesData;
        
        // Add single category container class
        container.className = container.className.replace(/recipe-categories-container\s+categories-\d+/g, '').trim();
        container.classList.add('recipe-categories-container', 'categories-1');
        
        // Create single category header
        const html = `
            <div class="recipe-category-section">
                <div class="category-header">
                    <div class="category-title-wrapper">
                        <div class="category-title-content">
                            <i class="${getCategoryIcon(singleCategoryFilter)}"></i>
                            <h3 class="category-title">${getCategoryDisplayName(singleCategoryFilter)}</h3>
                        </div>
                        <span class="recipe-count">(${categoryRecipes.length} recipes)</span>
                    </div>
                    <p class="category-description">${getCategoryDescription(singleCategoryFilter, {})}</p>
                </div>
                <div class="category-recipes-grid">
                    ${renderRecipeCards(categoryRecipes)}
                </div>
            </div>
        `;
        container.innerHTML = html;
    } else {
        // Render regular recipes without category headers
        // Remove dynamic category classes for regular rendering
        container.className = container.className.replace(/recipe-categories-container\s+categories-\d+/g, '').trim();
        renderRecipes(recipesData);
    }
}

function renderRecipeCards(recipes) {
    // Sort recipes by region field alphabetically
    const sortedRecipes = [...recipes].sort((a, b) => {
        const regionA = a.region || 'ZZZ'; // Put recipes without region at the end
        const regionB = b.region || 'ZZZ';
        return regionA.localeCompare(regionB);
    });

    return sortedRecipes.map(recipe => {
        // Handle different recipe structures (conventional vs CAM)
        const isCAMRecipe = recipe.tradition && recipe.origin && recipe.purpose;
        
        if (isCAMRecipe) {
            // CAM recipe structure
            return `
                <div class="recipe-card" onclick="openRecipeModal('${recipe.id}')" data-recipe-id="${recipe.id}">
                    <div class="recipe-image-override" style="background: none !important; background-image: url('recipe-background-food.png') !important; background-size: cover !important; background-position: center !important; background-repeat: no-repeat !important; background-color: transparent !important; background-attachment: scroll !important;">
                        <i class="fas fa-utensils" style="color: white; font-size: 3rem; z-index: 10; position: relative; text-shadow: 0 2px 4px rgba(0,0,0,0.8);"></i>
                    </div>
                    <div class="recipe-name-header">
                        <h3>${recipe.name}</h3>
                    </div>
                    <div class="recipe-content">
                        <div class="recipe-meta">
                            <span class="recipe-tradition-badge">${recipe.tradition}</span>
                        </div>
                        <p class="recipe-description">${recipe.description}</p>
                        <div class="recipe-origin-info">
                            <strong>Origin:</strong> ${recipe.origin}
                        </div>
                        <div class="recipe-purpose">
                            <strong>Purpose:</strong> ${recipe.purpose}
                        </div>
                        <div class="recipe-stats">
                            <span><i class="fas fa-clock"></i> ${recipe.prepTime}</span>
                            <span><i class="fas fa-users"></i> ${recipe.servings} servings</span>
                            <span><i class="fas fa-fire"></i> ${recipe.nutritionFacts.calories} cal</span>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Conventional recipe structure
            return `
                <div class="recipe-card" onclick="openRecipeModal('${recipe.id}')" data-recipe-id="${recipe.id}">
                    <div class="recipe-image-override" style="background: none !important; background-image: url('recipe-background-food.png') !important; background-size: cover !important; background-position: center !important; background-repeat: no-repeat !important; background-color: transparent !important; background-attachment: scroll !important;">
                        <i class="fas fa-utensils" style="color: white; font-size: 3rem; z-index: 10; position: relative; text-shadow: 0 2px 4px rgba(0,0,0,0.8);"></i>
                    </div>
                    <div class="recipe-name-header">
                        <h3>${recipe.name}</h3>
                    </div>
                    <div class="recipe-content">
                        <div class="recipe-meta">
                            <span class="recipe-region-badge">${recipe.region || 'Global'}</span>
                        </div>
                        <p class="recipe-description">${recipe.description}</p>
                        <div class="recipe-stats">
                            <span><i class="fas fa-clock"></i> ${recipe.prepTime}</span>
                            <span><i class="fas fa-dumbbell"></i> ${recipe.protein}</span>
                            <span><i class="fas fa-fire"></i> ${recipe.calories} cal</span>
                        </div>
                        <div class="recipe-benefits">
                            <i class="fas fa-info-circle"></i>
                            <span>${recipe.cancerBenefits}</span>
                        </div>
                    </div>
                </div>
            `;
        }
    }).join('');
}

function renderGroupedRecommendedRecipes(userData, recommendedFilters, currentRecipeData) {
    const container = document.getElementById('recipesGrid');
    if (!container) {
        console.error('recipesGrid container not found');
        return;
    }
    
    // Add dynamic container class based on number of categories
    const numCategories = recommendedFilters.length;
    
    container.className = container.className.replace(/recipe-categories-container\s+categories-\d+/g, '').trim();
    if (numCategories >= 3) {
        container.classList.add('recipe-categories-container', `categories-${numCategories}`);
    }
    console.log('Container after class change:', container.className);
    console.log('Filters being processed:', recommendedFilters);
    
    // Force a style recalculation
    setTimeout(() => {
        const computedStyle = window.getComputedStyle(document.querySelector('.recipe-categories-container .category-recipes-grid'));
        console.log('Applied grid-template-columns:', computedStyle.gridTemplateColumns);
        console.log('Applied gap:', computedStyle.gap);
    }, 100);
    
    if (recommendedFilters.length === 0) {
        console.log('No recommended filters, showing all recipes');
        // Fallback to all recipes
        let allRecipes = [];
        for (const cat in currentRecipeData) {
            allRecipes = allRecipes.concat(currentRecipeData[cat]);
        }
        
        // Apply allergy filtering to all recipes
        const safeAllRecipes = filterRecipesForAllergies(allRecipes);
        renderRecipes(safeAllRecipes);
        return;
    }
    
    // Helper function to get category display name
    const getCategoryDisplayName = (filterKey) => {
        const categoryNames = {
            'symptom-management': 'Symptom Management',
            'high-protein-high-calorie': 'High Protein/Calorie', 
            'therapeutic-medical': 'Therapeutic/Medical',
            'texture-modified': 'Texture Modified',
            'healthy': 'General Healthy',
            'ayurveda': 'Ayurvedic Nutrition',
            'tcm': 'Traditional Chinese Medicine',
            'herbal-remedies': 'Herbal Remedies',
            'functional-foods': 'Functional Foods',
            'mind-body-energy': 'Mind-Body Energy'
        };
        return categoryNames[filterKey] || filterKey.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    };
    
    // Helper function to get category icon
    const getCategoryIcon = (filterKey) => {
        const categoryIcons = {
            'symptom-management': 'fas fa-heart-pulse',
            'high-protein-high-calorie': 'fas fa-dumbbell',
            'therapeutic-medical': 'fas fa-pills',
            'texture-modified': 'fas fa-blender',
            'healthy': 'fas fa-leaf',
            'ayurveda': 'fas fa-leaf',
            'tcm': 'fas fa-mountain',
            'herbal-remedies': 'fas fa-seedling',
            'functional-foods': 'fas fa-microscope',
            'mind-body-energy': 'fas fa-brain'
        };
        return categoryIcons[filterKey] || 'fas fa-utensils';
    };
    
    let totalRecipes = 0;
    let html = '';
    
    // Generate grouped sections for each recommended category
    recommendedFilters.forEach(filter => {
        console.log(`Processing filter: ${filter}`);
        console.log(`Checking if currentRecipeData[${filter}] exists:`, !!currentRecipeData[filter]);
        if (currentRecipeData[filter]) {
            console.log(`Found ${currentRecipeData[filter].length} recipes for ${filter}`);
        }
        
        if (currentRecipeData[filter] && currentRecipeData[filter].length > 0) {
            const categoryRecipes = currentRecipeData[filter];
            
            // Apply allergy filtering to category recipes
            const safeCategoryRecipes = filterRecipesForAllergies(categoryRecipes);
            
            // Skip category if no safe recipes remain after filtering
            if (safeCategoryRecipes.length === 0) {
                console.log(`No safe recipes found for category: ${filter}, skipping`);
                return;
            }
            
            totalRecipes += safeCategoryRecipes.length;
            
            console.log(`Adding ${safeCategoryRecipes.length} safe recipes for category: ${filter}`);
            
            // Sort recipes by region within each category
            const sortedCategoryRecipes = [...safeCategoryRecipes].sort((a, b) => {
                const regionA = a.region || 'ZZZ';
                const regionB = b.region || 'ZZZ';
                return regionA.localeCompare(regionB);
            });
            
            // Create category section header
            console.log(`Creating header for category: ${getCategoryDisplayName(filter)}`);
            html += `
                <div class="recipe-category-section">
                    <div class="category-header">
                        <div class="category-title-wrapper">
                            <div class="category-title-content">
                                <i class="${getCategoryIcon(filter)}"></i>
                                <h3 class="category-title">${getCategoryDisplayName(filter)}</h3>
                            </div>
                            <span class="recipe-count">(${safeCategoryRecipes.length} recipes)</span>
                        </div>
                        <p class="category-description">${getCategoryDescription(filter, userData)}</p>
                    </div>
                    <div class="category-recipes-grid">
            `;
            
            // Add recipes for this category
            sortedCategoryRecipes.forEach(recipe => {
                const isCAMRecipe = recipe.tradition && recipe.origin && recipe.purpose;
                
                if (isCAMRecipe) {
                    html += `
                        <div class="recipe-card" onclick="openRecipeModal('${recipe.id}')" data-recipe-id="${recipe.id}">
                            <div class="recipe-image recipe-icon-header">
                                <i class="fas fa-utensils"></i>
                            </div>
                            <div class="recipe-name-header">
                                <h3>${recipe.name}</h3>
                            </div>
                            <div class="recipe-content">
                                <div class="recipe-meta">
                                    <span class="recipe-tradition-badge">${recipe.tradition}</span>
                                </div>
                                <p class="recipe-description">${recipe.description}</p>
                                <div class="recipe-origin-info">
                                    <strong>Origin:</strong> ${recipe.origin}
                                </div>
                                <div class="recipe-purpose">
                                    <strong>Purpose:</strong> ${recipe.purpose}
                                </div>
                                <div class="recipe-stats">
                                    <span><i class="fas fa-clock"></i> ${recipe.prepTime}</span>
                                    <span><i class="fas fa-users"></i> ${recipe.servings} servings</span>
                                    <span><i class="fas fa-fire"></i> ${recipe.nutritionFacts.calories} cal</span>
                                </div>
                            </div>
                        </div>
                    `;
                } else {
                    html += `
                        <div class="recipe-card" onclick="openRecipeModal('${recipe.id}')" data-recipe-id="${recipe.id}">
                            <div class="recipe-image recipe-icon-header" style="background: none !important; background-image: url('recipe-background-food.png') !important; background-size: cover !important; background-position: center !important; background-repeat: no-repeat !important; background-color: transparent !important; background-attachment: scroll !important;">
                                <i class="fas fa-utensils"></i>
                            </div>
                            <div class="recipe-name-header">
                                <h3>${recipe.name}</h3>
                            </div>
                            <div class="recipe-content">
                                <div class="recipe-meta">
                                    <span class="recipe-region-badge">${recipe.region || 'Global'}</span>
                                </div>
                                <p class="recipe-description">${recipe.description}</p>
                                <div class="recipe-stats">
                                    <span><i class="fas fa-clock"></i> ${recipe.prepTime}</span>
                                    <span><i class="fas fa-dumbbell"></i> ${recipe.protein}</span>
                                    <span><i class="fas fa-fire"></i> ${recipe.calories} cal</span>
                                </div>
                                <div class="recipe-benefits">
                                    <i class="fas fa-info-circle"></i>
                                    <span>${recipe.cancerBenefits}</span>
                                </div>
                            </div>
                        </div>
                    `;
                }
            });
            
            html += `
                    </div>
                </div>
            `;
        }
    });
    
    if (totalRecipes === 0) {
        html = '<p class="no-recipes">No recipes found for your recommendations. Please check your assessment or try viewing all recipes.</p>';
    }
    
    console.log('Final HTML length:', html.length);
    console.log('HTML preview (first 500 chars):', html.substring(0, 500));
    
    container.innerHTML = html;
    console.log(`Rendered ${totalRecipes} recipes in ${recommendedFilters.length} categories`);
    
    // Force grid layout application for 4+ categories
    if (recommendedFilters.length >= 4) {
        setTimeout(() => {
            const grids = document.querySelectorAll('.category-recipes-grid');
            grids.forEach(grid => {
                if (recommendedFilters.length === 4) {
                    grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(250px, 1fr))';
                    grid.style.gap = 'var(--space-4)';
                } else if (recommendedFilters.length >= 5) {
                    grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(220px, 1fr))';
                    grid.style.gap = 'var(--space-3)';
                }
            });
            console.log('Force-applied grid styles for', recommendedFilters.length, 'categories');
        }, 50);
    }
}

function getCategoryDescription(filter, userData) {
    const descriptions = {
        'symptom-management': 'Recipes designed to help manage treatment side effects like nausea and appetite loss.',
        'high-protein-high-calorie': 'Nutrient-dense recipes to support energy and recovery during treatment.',
        'therapeutic-medical': 'Evidence-based recipes with specific therapeutic benefits for cancer patients.',
        'texture-modified': 'Soft, easy-to-swallow recipes perfect for managing mouth sores or swallowing difficulties.',
        'healthy': 'General wellness recipes focusing on immune support and overall health.',
        'ayurveda': 'Traditional Ayurvedic recipes aligned with your constitutional needs and healing principles.',
        'tcm': 'Traditional Chinese Medicine recipes based on energy balancing and organ support.',
        'herbal-remedies': 'Recipes incorporating therapeutic herbs and natural healing ingredients.',
        'functional-foods': 'Science-backed functional foods with proven health benefits and bioactive compounds.',
        'mind-body-energy': 'Recipes supporting mental clarity, stress reduction, and energy balance.'
    };
    return descriptions[filter] || 'Specialized recipes recommended for your health profile.';
}

function renderRecommendedRecipesGroupedHorizontal(recommendedCategories, currentRecipeData) {
    console.log('=== Rendering Recommended Recipes with Horizontal Layout ===');
    
    const recipesGrid = document.getElementById('recipesGrid');
    if (!recipesGrid) {
        console.error('Recipe grid element not found');
        return;
    }
    
    // Create the main container with horizontal layout class
    let html = '<div class="recipe-categories-container horizontal-layout">';
    
    // Process each recommended category
    recommendedCategories.forEach(categoryInfo => {
        const filter = categoryInfo.filter;
        const categoryRecipes = currentRecipeData[filter] || [];
        
        if (categoryRecipes.length === 0) {
            console.log(`No recipes found for category: ${filter}`);
            return;
        }
        
        // Sort recipes by region for consistency
        const sortedRecipes = [...categoryRecipes].sort((a, b) => {
            const regionA = a.region || 'ZZZ';
            const regionB = b.region || 'ZZZ';
            return regionA.localeCompare(regionB);
        });
        
        // Add category section with horizontal layout
        html += `
            <div class="recipe-category-section">
                <div class="category-header">
                    <h3>
                        <i class="${categoryInfo.icon}"></i>
                        ${categoryInfo.name || categoryInfo.title}
                        <span style="
                            background: rgba(255, 255, 255, 0.2);
                            padding: var(--space-1) var(--space-3);
                            border-radius: var(--radius-full);
                            font-weight: 500;
                            font-size: 0.9rem;
                            margin-left: var(--space-2);
                        ">(${sortedRecipes.length} recipes)</span>
                    </h3>
                </div>
                <div class="category-recipes-grid">
        `;
        
        // Add recipe cards for this category
        sortedRecipes.forEach(recipe => {
            const isCAMRecipe = recipe.tradition && recipe.origin && recipe.purpose;
            
            if (isCAMRecipe) {
                html += `
                    <div class="recipe-card" onclick="openRecipeModal('${recipe.id}')" data-recipe-id="${recipe.id}">
                        <div class="recipe-image recipe-icon-header">
                            <i class="fas fa-utensils"></i>
                        </div>
                        <div class="recipe-name-header">
                            <h3>${recipe.name}</h3>
                        </div>
                        <div class="recipe-content">
                            <div class="recipe-meta">
                                <span class="recipe-tradition-badge">${recipe.tradition}</span>
                            </div>
                            <p class="recipe-description">${recipe.description}</p>
                            <div class="recipe-origin-info">
                                <strong>Origin:</strong> ${recipe.origin}
                            </div>
                            <div class="recipe-purpose">
                                <strong>Purpose:</strong> ${recipe.purpose}
                            </div>
                            <div class="recipe-stats">
                                <span><i class="fas fa-clock"></i> ${recipe.prepTime}</span>
                                <span><i class="fas fa-users"></i> ${recipe.servings} servings</span>
                                <span><i class="fas fa-fire"></i> ${recipe.nutritionFacts.calories} cal</span>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                html += `
                    <div class="recipe-card" onclick="openRecipeModal('${recipe.id}')" data-recipe-id="${recipe.id}">
                        <div class="recipe-image recipe-icon-header">
                            <i class="fas fa-utensils"></i>
                        </div>
                        <div class="recipe-name-header">
                            <h3>${recipe.name}</h3>
                        </div>
                        <div class="recipe-content">
                            <div class="recipe-meta">
                                <span class="recipe-region-badge">${recipe.region || 'Global'}</span>
                            </div>
                            <p class="recipe-description">${recipe.description}</p>
                            <div class="recipe-stats">
                                <span><i class="fas fa-clock"></i> ${recipe.prepTime}</span>
                                <span><i class="fas fa-dumbbell"></i> ${recipe.protein}</span>
                                <span><i class="fas fa-fire"></i> ${recipe.calories}</span>
                            </div>
                        </div>
                    </div>
                `;
            }
        });
        
        html += `
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    
    // Check for existing recommendation notice to preserve it
    const existingNotice = recipesGrid.querySelector('.recommendation-notice');
    let noticeHTML = '';
    if (existingNotice) {
        noticeHTML = existingNotice.outerHTML;
    }
    
    // Update the recipes grid
    recipesGrid.innerHTML = noticeHTML + html;
    
    console.log(`Rendered ${recommendedCategories.length} categories with horizontal layout`);
}

function showRecommendedRecipesGrid() {
    console.log('=== Showing Recommended Recipes (Simple Grid Layout) ===');
    
    // Get user profile to determine nutrition approach
    const userData = getUserProfile();
    if (!userData) {
        console.error('No user profile found');
        alert('Please complete your personal assessment first.');
        showSection('profileSection');
        return;
    }

    // Determine the correct recipe mode based on nutrition approach
    let targetMode = 'conventional'; // default
    if (userData.nutritionApproach && userData.nutritionApproach !== 'conventional') {
        targetMode = 'cam';
    }
    
    console.log(`Target recipe mode: ${targetMode}, Current mode: ${currentRecipeMode}`);
    
    // Switch to appropriate recipe mode if needed
    if (currentRecipeMode !== targetMode) {
        console.log(`Switching to ${targetMode} mode`);
        switchRecipeMode(targetMode);
        
        // Update dropdown to reflect the change
        const dropdown = document.getElementById('recipeMode');
        if (dropdown) {
            dropdown.value = targetMode;
        }
    }
    
    // Get recommended categories for current nutrition approach
    const recommendedCategories = getRecommendedCategoriesArray(userData);
    const recommendedFilters = recommendedCategories.map(cat => cat.filter);
    console.log('Recommended filters:', recommendedFilters);
    
    // Get current recipe data
    const currentRecipeData = currentRecipeMode === 'conventional' ? conventionalRecipeData : camRecipeData;
    
    // Collect all recommended recipes into a single array
    let allRecommendedRecipes = [];
    recommendedFilters.forEach(filterName => {
        const categoryRecipes = currentRecipeData[filterName] || [];
        console.log(`Adding ${categoryRecipes.length} recipes from ${filterName}`);
        allRecommendedRecipes = allRecommendedRecipes.concat(categoryRecipes);
    });
    
    console.log(`Total recommended recipes: ${allRecommendedRecipes.length}`);
    
    // Sort recipes by region for consistency
    const sortedRecipes = [...allRecommendedRecipes].sort((a, b) => {
        const regionA = a.region || 'ZZZ';
        const regionB = b.region || 'ZZZ';
        return regionA.localeCompare(regionB);
    });
    
    // Apply allergy filtering to recommended recipes
    const safeRecommendedRecipes = filterRecipesForAllergies(sortedRecipes);
    
    // Update filter buttons with counts and show recommended button as active
    updateFilterButtonsWithCounts(targetMode, true, safeRecommendedRecipes.length, recommendedFilters);
    
    // Render all safe recommended recipes in a simple grid (no category headers)
    renderRecipes(safeRecommendedRecipes);
    
    // Show notification about personalized recommendations
    const recipesGrid = document.getElementById('recipesGrid');
    if (recipesGrid) {
        const existingNotice = document.querySelector('.recommendation-notice');
        if (!existingNotice) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'recommendation-notice';
            messageDiv.innerHTML = `
                <i class="fas fa-star"></i>
                <span>Showing ${safeRecommendedRecipes.length} recipes personalized for your profile</span>
                <div class="recommendation-actions">
                    <button onclick="restoreAllRecipes()" class="btn-link">View all recipes</button>
                    <button onclick="dismissRecommendationNotice()" class="btn-link close-notice" title="Dismiss notification">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
            recipesGrid.parentNode.insertBefore(messageDiv, recipesGrid);
        }
    }
    
    // Scroll to top of recipes section
    const recipesSection = document.getElementById('recipesSection');
    if (recipesSection) {
        recipesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function showRecommendedButton(show = true) {
    const recommendedButton = document.querySelector('.filter-btn[data-filter="recommended"]');
    if (recommendedButton) {
        recommendedButton.style.display = show ? 'inline-flex' : 'none';
        console.log(`Recommended button ${show ? 'shown' : 'hidden'}`);
    }
}

function updateRecommendedButtonCount(count) {
    const recommendedButton = document.querySelector('.filter-btn[data-filter="recommended"]');
    if (recommendedButton) {
        // Update button text with count
        recommendedButton.innerHTML = `
            <i class="fas fa-star"></i> Recommended Recipes (${count})
        `;
        console.log(`Updated recommended button count to ${count}`);
    }
}

function updateFilterButtonsWithCounts(mode, showRecommendedAsActive = false, recommendedCount = 0, recommendedFilters = []) {
    const filterContainer = document.querySelector('.recipe-filters');
    if (!filterContainer) return;
    
    // Get current recipe data
    const currentRecipeData = mode === 'conventional' ? conventionalRecipeData : camRecipeData;
    
    // Calculate counts based on whether we're showing recommended recipes or all recipes
    let counts;
    let totalRecipes = 0;
    
    // Always calculate total recipes for "All Recipes" button
    for (const category in currentRecipeData) {
        // Apply allergy filtering before counting total recipes
        const safeRecipes = filterRecipesForAllergies(currentRecipeData[category]);
        totalRecipes += safeRecipes.length;
    }
    
    if (showRecommendedAsActive && recommendedFilters.length > 0) {
        // Calculate counts only for recommended categories
        counts = {};
        let recommendedRecipesTotal = 0;
        
        for (const category in currentRecipeData) {
            if (recommendedFilters.includes(category)) {
                // Apply allergy filtering before counting recommended recipes
                const safeRecipes = filterRecipesForAllergies(currentRecipeData[category]);
                counts[category] = safeRecipes.length;
                recommendedRecipesTotal += safeRecipes.length;
            } else {
                counts[category] = 0; // Show 0 for non-recommended categories
            }
        }
        counts.all = totalRecipes; // Show total recipes for "All Recipes" button
        counts.recommended = recommendedRecipesTotal; // Show recommended count for "Recommended Recipes" button
    } else {
        // Calculate counts for all categories
        counts = getRecipeCounts(currentRecipeData);
    }
    
    if (mode === 'conventional') {
        filterContainer.innerHTML = `
            <button class="filter-btn ${!showRecommendedAsActive ? 'active' : ''}" data-filter="all">
                <i class="fas fa-list"></i> All Recipes (${counts.all})
            </button>
            <button class="filter-btn ${showRecommendedAsActive ? 'active' : ''}" data-filter="recommended" style="display: ${showRecommendedAsActive ? 'inline-flex' : 'none'};">
                <i class="fas fa-star"></i> Recommended Recipes (${counts.recommended || 0})
            </button>
            <button class="filter-btn" data-filter="healthy">
                <i class="fas fa-leaf"></i> Healthy (${counts.healthy || 0})
            </button>
            <button class="filter-btn" data-filter="symptom-management">
                <i class="fas fa-first-aid"></i> Symptom Management (${counts['symptom-management'] || 0})
            </button>
            <button class="filter-btn" data-filter="high-protein-high-calorie">
                <i class="fas fa-dumbbell"></i> High Protein/Calorie (${counts['high-protein-high-calorie'] || 0})
            </button>
            <button class="filter-btn" data-filter="texture-modified">
                <i class="fas fa-baby"></i> Texture Modified (${counts['texture-modified'] || 0})
            </button>
            <button class="filter-btn" data-filter="therapeutic-medical">
                <i class="fas fa-pills"></i> Therapeutic (${counts['therapeutic-medical'] || 0})
            </button>
        `;
    } else {
        filterContainer.innerHTML = `
            <button class="filter-btn ${!showRecommendedAsActive ? 'active' : ''}" data-filter="all">
                <i class="fas fa-list"></i> All CAM Recipes (${counts.all})
            </button>
            <button class="filter-btn ${showRecommendedAsActive ? 'active' : ''}" data-filter="recommended" style="display: ${showRecommendedAsActive ? 'inline-flex' : 'none'};">
                <i class="fas fa-star"></i> Recommended Recipes (${counts.recommended || 0})
            </button>
            <button class="filter-btn" data-filter="ayurveda">
                <i class="fas fa-leaf"></i> Ayurveda (${counts.ayurveda || 0})
            </button>
            <button class="filter-btn" data-filter="tcm">
                <i class="fas fa-yin-yang"></i> Traditional Chinese Medicine (${counts.tcm || 0})
            </button>
            <button class="filter-btn" data-filter="herbal-remedies">
                <i class="fas fa-seedling"></i> Herbal Remedies (${counts['herbal-remedies'] || 0})
            </button>
            <button class="filter-btn" data-filter="functional-foods">
                <i class="fas fa-microscope"></i> Functional Foods (${counts['functional-foods'] || 0})
            </button>
            <button class="filter-btn" data-filter="mind-body-energy">
                <i class="fas fa-spa"></i> Mind-Body & Energy (${counts['mind-body-energy'] || 0})
            </button>
        `;
    }
    
    // Re-initialize filter button event listeners
    initializeFilterButtons();
}

// Recipe Modal Functions
function openRecipeModal(recipeId) {
    console.log('Opening recipe modal for ID:', recipeId);
    
    // Get current recipe data based on mode
    const currentRecipeData = currentRecipeMode === 'conventional' ? conventionalRecipeData : camRecipeData;
    
    // Find the recipe across all categories - convert IDs to strings for comparison
    let recipe = null;
    for (const category in currentRecipeData) {
        recipe = currentRecipeData[category].find(r => String(r.id) === String(recipeId));
        if (recipe) break;
    }
    
    if (!recipe) {
        console.error('Recipe not found:', recipeId, 'in mode:', currentRecipeMode);
        return;
    }
    
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
    const modalRecipeName = document.getElementById('modalRecipeName');
    
    // Set icon with background image
    modalImage.innerHTML = '<i class="fas fa-utensils"></i>';
    modalImage.classList.add('modal-icon-header');
    
    // Apply the same background image as recipe cards
    if (modalImage) {
        modalImage.style.background = 'none';
        modalImage.style.backgroundImage = 'url("recipe-background-food.png")';
        modalImage.style.backgroundSize = 'cover';
        modalImage.style.backgroundPosition = 'center';
        modalImage.style.backgroundRepeat = 'no-repeat';
        modalImage.style.backgroundAttachment = 'scroll';
        modalImage.style.backgroundColor = 'transparent';
        modalImage.style.setProperty('background-image', 'url("recipe-background-food.png")', 'important');
        modalImage.style.setProperty('background-size', 'cover', 'important');
        modalImage.style.setProperty('background-position', 'center', 'important');
        modalImage.style.setProperty('background-repeat', 'no-repeat', 'important');
        modalImage.style.setProperty('background-color', 'transparent', 'important');
    }
    
    // Check if it's a CAM recipe or conventional recipe
    const isCAMRecipe = recipe.tradition && recipe.origin && recipe.purpose;
    
    // Use white spoon and fork icon for all recipes
    if (modalImage) {
        modalImage.innerHTML = '<i class="fas fa-utensils"></i>';
    }
    
    // Populate content based on recipe type with null checks
    if (modalTitle) {
        modalTitle.textContent = recipe.name;
    }
    
    // Populate the recipe name section above ingredients
    if (modalRecipeName) {
        modalRecipeName.innerHTML = `<i class="fas fa-utensils"></i> ${recipe.name}`;
    }
    
    // Add console log to verify recipe name consistency
    console.log('Recipe card title:', recipe.name);
    console.log('Modal title set to:', recipe.name);
    if (modalRegion) {
        modalRegion.textContent = recipe.region || 'Global';
    }
    if (modalPrepTime) {
        modalPrepTime.textContent = recipe.prepTime;
    }
    
    if (isCAMRecipe) {
        // CAM recipe structure
        if (modalProtein) {
            modalProtein.textContent = recipe.nutritionFacts?.protein || 'N/A';
        }
        if (modalCalories) {
            modalCalories.textContent = recipe.nutritionFacts?.calories || 'N/A';
        }
    } else {
        // Conventional recipe structure  
        if (modalProtein) {
            modalProtein.textContent = recipe.protein || 'N/A';
        }
        if (modalCalories) {
            modalCalories.textContent = recipe.calories || 'N/A';
        }
    }
    
    // Populate ingredients
    if (modalIngredients) {
        modalIngredients.innerHTML = recipe.ingredients 
            ? recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')
            : '<li>Ingredients not available</li>';
    }
    
    // Populate instructions
    if (modalInstructions) {
        if (recipe.instructions && recipe.instructions.length > 0) {
            const instructionsHTML = recipe.instructions.map(instruction => `<li>${instruction}</li>`).join('');
            modalInstructions.innerHTML = instructionsHTML;
        } else {
            modalInstructions.innerHTML = '<li>Instructions not available</li>';
        }
    }
    
    // Populate benefits based on recipe type
    if (isCAMRecipe) {
        // CAM recipe structure with purpose and benefits
        const nutritionText = `${recipe.purpose || ''}\n\nBenefits:\n${recipe.benefits ? recipe.benefits.join('\n• ') : 'Benefits not available.'}`;
        if (modalNutritionTips) {
            modalNutritionTips.textContent = nutritionText;
        }
        if (modalCancerBenefits) {
            modalCancerBenefits.textContent = recipe.evidence?.summary || 'Evidence summary not available.';
        }
    } else {
        // Conventional recipe structure
        if (modalNutritionTips) {
            modalNutritionTips.textContent = recipe.nutritionTips || 'Nutrition tips not available.';
        }
        if (modalCancerBenefits) {
            modalCancerBenefits.textContent = recipe.cancerBenefits || 'Cancer benefits not available.';
        }
    }
    
    // Show research links if available
    if (modalCancerBenefits) {
        const researchInfo = recipe.researchLinks && recipe.researchLinks.length > 0 
            ? `Research Support:\n${recipe.researchLinks.map(link => `• ${link.title}: ${link.summary} (${link.source})`).join('\n')}`
            : 'Research information not available.';
        modalCancerBenefits.textContent = researchInfo;
    }
    
    // Show modal
    if (modal) {
        modal.classList.remove('hidden');
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }
    
    console.log('Modal opened successfully');
}

function closeRecipeModal() {
    console.log('Closing recipe modal');
    const modal = document.getElementById('recipeModal');
    if (modal) {
        modal.classList.add('hidden');
    }
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Force re-enable clicks by clearing any potential interference
    setTimeout(() => {
        const allRecipeCards = document.querySelectorAll('.recipe-card');
        allRecipeCards.forEach(card => {
            card.style.pointerEvents = 'auto';
            card.style.cursor = 'pointer';
        });
    }, 100);
}

// Make functions globally accessible
window.openRecipeModal = openRecipeModal;
window.closeRecipeModal = closeRecipeModal;

// Debug function to test clicks
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
    
    // Generate holistic recommendations
    const holisticRecommendations = getHolisticRecommendations(userData);

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
            ${holisticRecommendations}
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
                    <button class="btn btn-primary" onclick="showRecommendedRecipes(); setTimeout(() => { window.scrollTo({top: 0, behavior: 'smooth'}); }, 100);">
                        <i class="fas fa-utensils"></i> Explore Recommended Recipes
                    </button>
                    <button class="btn btn-secondary" onclick="showSection('trackingSection')">
                        <i class="fas fa-chart-pie"></i> Start Tracking Nutrition
                    </button>
                    <button class="btn btn-secondary" onclick="openGuidelinesModal()">
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
        // Gastrointestinal Symptoms
        'nausea': 'Try ginger tea, bland foods, and small frequent meals',
        'appetite-loss': 'Focus on nutrient-dense, high-calorie foods and protein smoothies',
        'taste-changes': 'Experiment with herbs, spices, and temperature variations',
        'mouth-sores': 'Choose soft, smooth foods and avoid acidic or spicy items',
        'dry-mouth': 'Increase fluid intake, try ice chips, and choose moist foods',
        'digestive': 'Consider low-fiber options and probiotic foods',
        'diarrhea': 'Choose low-fiber, BRAT diet foods (bananas, rice, applesauce, toast)',
        'constipation': 'Increase fiber gradually, drink more fluids, and include prunes',
        'swallowing-difficulty': 'Use soft, pureed textures and thickened liquids as needed',
        'acid-reflux': 'Avoid acidic foods, eat smaller meals, and stay upright after eating',
        'bloating': 'Limit gas-producing foods, eat slowly, and consider digestive enzymes',
        
        // Physical Symptoms
        'fatigue': 'Prioritize easy-to-prepare, energy-dense meals and balanced nutrition',
        'weight-loss': 'Focus on calorie-dense foods, add healthy fats, and eat frequently',
        'weight-gain': 'Control portions, choose nutrient-dense foods, and limit processed foods',
        'muscle-wasting': 'Increase protein intake (1.2-2g/kg body weight) and resistance exercise',
        'weakness': 'Focus on iron-rich foods, B-vitamins, and adequate protein',
        'pain': 'Consider anti-inflammatory foods like omega-3s and antioxidant-rich foods',
        'shortness-breath': 'Eat smaller, frequent meals and avoid gas-producing foods',
        'skin-changes': 'Stay hydrated, eat antioxidant-rich foods, and include healthy fats',
        'hair-loss': 'Focus on protein, iron, biotin, and zinc-rich foods',
        
        // Neurological Symptoms
        'neuropathy': 'Include B-vitamins, especially B12, and omega-3 fatty acids',
        'brain-fog': 'Focus on omega-3s, antioxidants, and maintain stable blood sugar',
        'memory-problems': 'Include choline-rich foods, antioxidants, and stay hydrated',
        'concentration-difficulty': 'Maintain steady blood sugar and include brain-healthy foods',
        'dizziness': 'Stay hydrated, avoid sudden position changes, and eat regularly',
        'headaches': 'Stay hydrated, avoid trigger foods, and maintain regular meal times',
        
        // Blood & Immune
        'low-blood-counts': 'Include iron, folate, and B12-rich foods',
        'anemia': 'Focus on iron-rich foods with vitamin C for better absorption',
        'infection-risk': 'Boost immune system with zinc, vitamin C, and probiotics',
        'bruising': 'Include vitamin K-rich foods and foods high in vitamin C',
        
        // Emotional & Sleep
        'anxiety': 'Limit caffeine, include magnesium-rich foods, and maintain regular meals',
        'depression': 'Include omega-3s, folate, and maintain stable blood sugar',
        'sleep-problems': 'Avoid caffeine late in day, include tryptophan-rich foods',
        'mood-changes': 'Focus on stable blood sugar and omega-3 fatty acids',
        'stress': 'Include magnesium, B-vitamins, and adaptogenic foods',
        
        // Other Symptoms
        'lymphedema': 'Limit sodium, stay hydrated, and include anti-inflammatory foods',
        'hot-flashes': 'Include phytoestrogen-rich foods and avoid triggers like spicy foods',
        'cold-sensitivity': 'Include warming foods like ginger and adequate calorie intake',
        'fever': 'Stay hydrated, include electrolytes, and focus on easy-to-digest foods',
        'urinary-issues': 'Stay hydrated, limit bladder irritants like caffeine',
        'sexual-dysfunction': 'Include zinc, vitamin E, and foods that support circulation',
        'hearing-changes': 'Include antioxidants and foods rich in folate and potassium',
        'vision-changes': 'Focus on vitamin A, lutein, and antioxidant-rich foods'
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

function getHolisticRecommendations(userData) {
    // Return early if user prefers conventional approach only
    if (userData.nutritionApproach === 'conventional') {
        return '';
    }
    
    const traditions = userData.traditionalMedicine || [];
    const mindBodyPractices = userData.mindBodyPractices || [];
    const constitution = userData.constitutionalType;
    
    let holisticContent = '';
    
    // Build holistic recommendations based on selected traditions
    if (traditions.length > 0 || mindBodyPractices.length > 0 || constitution) {
        holisticContent += `
            <div class="recommendation-card holistic-recommendations">
                <h3><i class="fas fa-yin-yang"></i> Holistic & Integrative Approaches</h3>
                <div class="holistic-content">
        `;
        
        // Traditional Medicine Recommendations
        if (traditions.includes('ayurveda')) {
            holisticContent += `
                <div class="tradition-section">
                    <h4><i class="fas fa-leaf"></i> Ayurvedic Approach</h4>
                    <p>Focus on balancing your doshas through warming spices, proper food combining, and mindful eating practices.</p>
                    <div class="tradition-foods">
                        <strong>Recommended:</strong> Turmeric, ginger, cumin, cooked vegetables, warm foods
                    </div>
                </div>
            `;
        }
        
        if (traditions.includes('tcm')) {
            holisticContent += `
                <div class="tradition-section">
                    <h4><i class="fas fa-mountain"></i> Traditional Chinese Medicine</h4>
                    <p>Balance Qi through foods that nourish blood and strengthen the immune system according to TCM principles.</p>
                    <div class="tradition-foods">
                        <strong>Recommended:</strong> Congee, bone broth, goji berries, green vegetables, moderate portions
                    </div>
                </div>
            `;
        }
        
        if (traditions.includes('mediterranean')) {
            holisticContent += `
                <div class="tradition-section">
                    <h4><i class="fas fa-olive-branch"></i> Mediterranean Wisdom</h4>
                    <p>Emphasize whole foods, healthy fats, and the social aspects of eating for overall well-being.</p>
                    <div class="tradition-foods">
                        <strong>Recommended:</strong> Olive oil, fish, vegetables, herbs, communal meals
                    </div>
                </div>
            `;
        }
        
        // Mind-Body Practice Recommendations
        if (mindBodyPractices.length > 0) {
            holisticContent += `
                <div class="tradition-section">
                    <h4><i class="fas fa-brain"></i> Mind-Body Nutrition</h4>
                    <p>Your selected practices complement nutritional healing:</p>
                    <ul class="mind-body-list">
            `;
            
            if (mindBodyPractices.includes('meditation')) {
                holisticContent += `<li><strong>Meditation:</strong> Practice mindful eating, chew slowly, appreciate food</li>`;
            }
            if (mindBodyPractices.includes('yoga')) {
                holisticContent += `<li><strong>Yoga:</strong> Gentle movement aids digestion, practice before/after meals</li>`;
            }
            if (mindBodyPractices.includes('breathwork')) {
                holisticContent += `<li><strong>Breathwork:</strong> Deep breathing before meals activates parasympathetic nervous system</li>`;
            }
            if (mindBodyPractices.includes('tai-chi')) {
                holisticContent += `<li><strong>Tai Chi:</strong> Gentle movement supports Qi flow and digestive health</li>`;
            }
            if (mindBodyPractices.includes('energy-healing')) {
                holisticContent += `<li><strong>Energy Healing:</strong> Balance energy centers, consider foods that support chakras</li>`;
            }
            
            holisticContent += `</ul></div>`;
        }
        
        // Constitutional Recommendations
        if (constitution) {
            holisticContent += `
                <div class="tradition-section">
                    <h4><i class="fas fa-user-circle"></i> Constitutional Guidance</h4>
            `;
            
            switch(constitution) {
                case 'vata':
                    holisticContent += `<p><strong>Vata Constitution:</strong> Favor warm, moist, grounding foods. Regular meal times, avoid cold/raw foods during treatment.</p>`;
                    break;
                case 'pitta':
                    holisticContent += `<p><strong>Pitta Constitution:</strong> Cooling, calming foods. Avoid spicy, acidic foods. Favor sweet, bitter, astringent tastes.</p>`;
                    break;
                case 'kapha':
                    holisticContent += `<p><strong>Kapha Constitution:</strong> Light, warming, spicy foods. Avoid heavy, oily foods. Favor pungent, bitter, astringent tastes.</p>`;
                    break;
                case 'yang-deficiency':
                    holisticContent += `<p><strong>Yang Deficiency:</strong> Warming foods, cooked vegetables, avoid cold/raw foods. Gentle warming spices.</p>`;
                    break;
                case 'yin-deficiency':
                    holisticContent += `<p><strong>Yin Deficiency:</strong> Nourishing, moistening foods. Avoid excessive spicy/heating foods. Focus on building fluids.</p>`;
                    break;
                case 'qi-stagnation':
                    holisticContent += `<p><strong>Qi Stagnation:</strong> Moving foods like citrus peel, light movement after meals. Avoid heavy, greasy foods.</p>`;
                    break;
            }
            
            holisticContent += `</div>`;
        }
        
        holisticContent += `
                </div>
                <div class="holistic-note">
                    <i class="fas fa-info-circle"></i>
                    <small>Holistic approaches complement conventional treatment. Always discuss with your healthcare team before making significant dietary changes.</small>
                </div>
            </div>
        `;
    }
    
    return holisticContent;
}

function getRecommendedCategoriesArray(userData) {
    console.log('=== getRecommendedCategoriesArray called ===');
    console.log('userData:', userData);
    
    let categories = [];
    
    // Check if user prefers conventional approach
    if (userData.nutritionApproach === 'conventional') {
        // Based on symptoms
        if (userData.symptoms.includes('nausea') || userData.symptoms.includes('appetite-loss')) {
            categories.push({name: 'Symptom Management', filter: 'symptom-management', icon: 'fas fa-heart-pulse'});
            console.log('Added: Symptom Management');
        }
        
        if (userData.symptoms.includes('mouth-sores') || userData.symptoms.includes('digestive')) {
            categories.push({name: 'Texture Modified', filter: 'texture-modified', icon: 'fas fa-blender'});
            console.log('Added: Texture Modified');
        }
        
        // Based on treatment stage
        if (userData.treatmentStage === 'active-treatment' || userData.treatmentStage === 'post-treatment') {
            categories.push({name: 'High Protein/Calorie', filter: 'high-protein-high-calorie', icon: 'fas fa-dumbbell'});
            categories.push({name: 'Therapeutic/Medical', filter: 'therapeutic-medical', icon: 'fas fa-pills'});
            console.log('Added: High Protein/Calorie and Therapeutic/Medical');
        }
        
        // Always include general healthy for conventional
        categories.push({name: 'General Healthy', filter: 'healthy', icon: 'fas fa-leaf'});
        console.log('Added: General Healthy (healthy)');
    } else {
        // For Alternative and Integrated approaches, use CAM categories
        console.log('Using CAM categories for nutrition approach:', userData.nutritionApproach);
        
        // Add holistic categories based on user preferences
        if (userData.traditionalMedicine) {
            if (userData.traditionalMedicine.includes('ayurveda')) {
                categories.push({name: 'Ayurvedic', filter: 'ayurveda', icon: 'fas fa-leaf'});
                console.log('Added: Ayurveda');
            }
            if (userData.traditionalMedicine.includes('tcm')) {
                categories.push({name: 'Traditional Chinese Medicine', filter: 'tcm', icon: 'fas fa-mountain'});
                console.log('Added: TCM');
            }
            if (userData.traditionalMedicine.includes('mediterranean') || userData.traditionalMedicine.includes('ayurveda') || userData.traditionalMedicine.includes('tcm')) {
                categories.push({name: 'Herbal Remedies', filter: 'herbal-remedies', icon: 'fas fa-seedling'});
                console.log('Added: Herbal Remedies');
            }
        }
        
        // Add functional medicine and mind-body categories for alternative/integrated approaches
        categories.push({name: 'Functional Foods', filter: 'functional-foods', icon: 'fas fa-microscope'});
        console.log('Added: Functional Foods');
        
        // Add herbal remedies for all CAM approaches if not already added
        if (!categories.some(cat => cat.filter === 'herbal-remedies')) {
            categories.push({name: 'Herbal Remedies', filter: 'herbal-remedies', icon: 'fas fa-seedling'});
            console.log('Added: Herbal Remedies (default for CAM)');
        }
        
        if (userData.mindBodyPractices && userData.mindBodyPractices.length > 0) {
            categories.push({name: 'Mind-Body Energy', filter: 'mind-body-energy', icon: 'fas fa-brain'});
            console.log('Added: Mind-Body Energy');
        }
        
    // Always add core CAM categories for alternative/integrated approaches
    if (!categories.some(cat => cat.filter === 'ayurveda')) {
        categories.push({name: 'Ayurvedic', filter: 'ayurveda', icon: 'fas fa-leaf'});
        console.log('Added: Ayurveda (default for CAM)');
    }
    if (!categories.some(cat => cat.filter === 'tcm')) {
        categories.push({name: 'Traditional Chinese Medicine', filter: 'tcm', icon: 'fas fa-mountain'});
        console.log('Added: TCM (default for CAM)');
    }
}

// Global variable to track current week
let currentWeekStart = new Date();
currentWeekStart.setDate(currentWeekStart.getDate() - currentWeekStart.getDay()); // Set to start of week (Sunday)

function getWeekRange(startDate) {
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    return {
        start: startDate,
        end: endDate
    };
}

function formatWeekRange(weekRange) {
    const options = { month: 'short', day: 'numeric' };
    return `${weekRange.start.toLocaleDateString('en-US', options)} - ${weekRange.end.toLocaleDateString('en-US', options)}`;
}

function navigateWeek(direction) {
    // direction is either 'previous' or 'next'
    const days = direction === 'previous' ? -7 : 7;
    currentWeekStart.setDate(currentWeekStart.getDate() + days);
    loadWeeklyHistory();
}

function loadWeeklyNutritionData() {
    try {
        const weekRange = getWeekRange(currentWeekStart);
        const weeklyLogs = JSON.parse(localStorage.getItem('weeklyNutritionLogs') || '{}');
        
        // Update week range display
        const weekRangeElement = document.querySelector('#weeklyHistorySection .date-range');
        if (weekRangeElement) {
            weekRangeElement.textContent = formatWeekRange(weekRange);
        }
        
        let weekData = {
            days: [],
            averages: {
                calories: 0,
                protein: 0,
                fluids: 0
            }
        };
        
        let validDaysCount = 0;
        
        // Collect data for each day in the week
        for (let d = new Date(weekRange.start); d <= weekRange.end; d.setDate(d.getDate() + 1)) {
            const dateKey = d.toISOString().split('T')[0];
            const dayData = weeklyLogs[dateKey] || null;
            
            if (dayData) {
                weekData.days.push({
                    date: dateKey,
                    ...dayData
                });
                weekData.averages.calories += parseFloat(dayData.calories || 0);
                weekData.averages.protein += parseFloat(dayData.protein || 0);
                weekData.averages.fluids += parseFloat(dayData.fluids || 0);
                validDaysCount++;
            }
        }
        
        // Calculate averages
        if (validDaysCount > 0) {
            weekData.averages.calories = Math.round(weekData.averages.calories / validDaysCount);
            weekData.averages.protein = Math.round(weekData.averages.protein / validDaysCount);
            weekData.averages.fluids = Math.round(weekData.averages.fluids / validDaysCount);
        }
                // ...legacy weekly nutrition loader removed (now using loadWeeklyHistory)
        
        // Update the UI
        const contentDiv = document.getElementById('weeklyHistoryContent');
        if (contentDiv) {
            contentDiv.innerHTML = `
                <div class="weekly-averages">
                    <div class="average-item">
                        <h4>${weekData.averages.calories}</h4>
                        <p>Avg Calories/day</p>
                    </div>
                    <div class="average-item">
                        <h4>${weekData.averages.protein}g</h4>
                        <p>Avg Protein/day</p>
                    </div>
                    <div class="average-item">
                        <h4>${weekData.averages.fluids}ml</h4>
                        <p>Avg Fluids/day</p>
                    </div>
                </div>
                <div class="daily-logs">
                    ${weekData.days.map(day => `
                        <div class="day-log">
                            <h5>${new Date(day.date).toLocaleDateString('en-US', {weekday: 'long', month: 'short', day: 'numeric'})}</h5>
                            <div class="log-details">
                                <p>Calories: ${day.calories}</p>
                                <p>Protein: ${day.protein}g</p>
                                <p>Fluids: ${day.fluids}ml</p>
                                <p>Items: ${day.foods ? day.foods.length : 0}</p>
                                ${day.foods ? `
                                    <div class="food-list">
                                        <strong>Foods logged:</strong>
                                        <p>${day.foods.join(', ')}</p>
                                    </div>
                                ` : ''}
                                ${day.fluidsLog ? `
                                    <div class="fluids-list">
                                        <strong>Fluids logged:</strong>
                                        <p>${day.fluidsLog.join(', ')}</p>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
    } catch (error) {
        console.error('Error loading weekly nutrition data:', error);
        alert('Error loading weekly nutrition data. Please try again.');
    }
}    console.log('Final categories array:', categories);
    return categories;
}

function getRecommendedRecipeCategories(userData) {
    const categories = getRecommendedCategoriesArray(userData);
    
    // Store the recommended filters globally for use by "Explore Recommended Recipes" button
    currentUserRecommendedFilters = categories.map(cat => cat.filter);
    console.log('Updated currentUserRecommendedFilters:', currentUserRecommendedFilters);
    
    return `
        <ul>
            ${categories.map(cat => `<li><i class="${cat.icon}"></i> ${cat.name}</li>`).join('')}
        </ul>
    `;
}

function initializeTracking() {
    // Initialize current date
    const today = new Date();
    // Set time to noon to avoid timezone issues
    today.setHours(12, 0, 0, 0);
    let currentTrackingDate = new Date(today);
    updateDateDisplay();
    
    // Store the current tracking date globally
    window.currentTrackingDate = currentTrackingDate;
    
    // Load today's nutrition data
    loadNutritionData(formatDateForStorage(currentTrackingDate));
    
    // Sync existing daily nutrition data to weekly history
    syncExistingDataToWeeklyHistory();
    
    // Add event listeners for date navigation
    const prevDayBtn = document.getElementById('prevDay');
    const nextDayBtn = document.getElementById('nextDay');
    
    if (prevDayBtn) {
        prevDayBtn.addEventListener('click', () => {
            const newDate = new Date(currentTrackingDate);
            newDate.setDate(newDate.getDate() - 1);
            newDate.setHours(12, 0, 0, 0); // Set to noon to avoid timezone issues
            currentTrackingDate = newDate;
            window.currentTrackingDate = currentTrackingDate;
            updateDateDisplay();
            loadNutritionData(formatDateForStorage(currentTrackingDate));
        });
    }
    
    if (nextDayBtn) {
        nextDayBtn.addEventListener('click', () => {
            const newDate = new Date(currentTrackingDate);
            newDate.setDate(newDate.getDate() + 1);
            newDate.setHours(12, 0, 0, 0); // Set to noon to avoid timezone issues
            currentTrackingDate = newDate;
            window.currentTrackingDate = currentTrackingDate;
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
                                <div class="food-actions">
                                    <button class="remove-food-btn" onclick="removeFoodItem('${food.id}')" aria-label="Remove ${food.name}" title="Remove this food item">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
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
                            <div class="food-actions">

                                <button class="remove-food-btn" onclick="removeFoodItem('${fluid.id}')" aria-label="Remove ${fluid.name}" title="Remove this fluid item">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
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
    
    // Determine storage date from currently selected tracking date (fallback to today)
    const storageDateObj = window.currentTrackingDate ? new Date(window.currentTrackingDate) : new Date();
    storageDateObj.setHours(12,0,0,0); // normalize to noon
    const dateString = storageDateObj.toISOString().split('T')[0];
    
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
    
    // Automatically save to weekly history
    autoSaveToWeeklyHistory(dateString, nutritionData);
    
    // Refresh displays
    updateNutritionSummary(nutritionData.totals);
    updateFoodLog(nutritionData.foods);
    
    // Clear form fields
    document.getElementById('foodName').value = '';
    document.getElementById('portion').value = '';
    document.getElementById('mealType').value = 'breakfast';
    
    // Close modal
    closeFoodModal();
    
    // Show success message with option to view weekly history
    const successMsg = `✅ ${foodName} added successfully!\n\n📊 Your nutrition data has been automatically saved to weekly history.\n\nWould you like to view your weekly history now?`;
    
    if (confirm(successMsg)) {
        // Small delay to ensure data is saved
        setTimeout(() => {
            viewWeeklyHistory();
        }, 100);
    }
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
    
    // Determine storage date from currently selected tracking date (fallback to today)
    const storageDateObj = window.currentTrackingDate ? new Date(window.currentTrackingDate) : new Date();
    storageDateObj.setHours(12,0,0,0);
    const dateString = storageDateObj.toISOString().split('T')[0];
    
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
    
    // Automatically save to weekly history
    autoSaveToWeeklyHistory(dateString, nutritionData);
    
    // Refresh displays
    updateNutritionSummary(nutritionData.totals);
    updateFoodLog(nutritionData.foods);
    
    // Clear form fields
    document.getElementById('fluidType').value = 'water';
    document.getElementById('customFluid').value = '';
    document.getElementById('fluidAmount').value = '';
    document.getElementById('fluidTime').value = '';
    document.getElementById('customFluidGroup').style.display = 'none';
    
    // Close modal
    closeFluidModal();
    
    console.log(`✅ ${fluidItem.name} (${fluidAmount}ml) added and saved to weekly history`);
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
    // Determine storage date from currently selected tracking date (fallback to today)
    const storageDateObj = window.currentTrackingDate ? new Date(window.currentTrackingDate) : new Date();
    storageDateObj.setHours(12,0,0,0);
    const dateString = storageDateObj.toISOString().split('T')[0];
    
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
    
    // Automatically save to weekly history
    autoSaveToWeeklyHistory(dateString, nutritionData);
    
    // Refresh displays
    updateNutritionSummary(nutritionData.totals);
    updateFoodLog(nutritionData.foods);
}

// Edit food item
function editFoodItem(foodId) {
    // Determine storage date from currently selected tracking date (fallback to today)
    const storageDateObj = window.currentTrackingDate ? new Date(window.currentTrackingDate) : new Date();
    storageDateObj.setHours(12,0,0,0);
    const dateString = storageDateObj.toISOString().split('T')[0];
    
    // Get existing nutrition data
    const nutritionData = JSON.parse(localStorage.getItem(`nutrition_${dateString}`) || '{"foods": [], "totals": {"calories": 0, "protein": 0, "fluids": 0}}');
    
    // Find the food item to edit
    const foodToEdit = nutritionData.foods.find(food => food.id.toString() === foodId.toString());
    if (!foodToEdit) {
        console.warn('Food item not found for editing:', foodId);
        alert('Error: Could not find food item to edit.');
        return;
    }
    
    console.log('Editing food item:', foodToEdit);
    
    // Set global variable to track editing mode
    window.editingFoodId = foodId;
    
    // Check if it's a fluid item or food item and pre-fill appropriate form
    if (foodToEdit.type === 'fluid') {
        // Pre-fill fluid form
        document.getElementById('fluidName').value = foodToEdit.name || '';
        document.getElementById('fluidAmount').value = foodToEdit.amount.replace(/ml$/, '') || '';
        document.getElementById('fluidType').value = foodToEdit.fluidType || 'water';
        document.getElementById('fluidTime').value = foodToEdit.time || '';
        
        // Update fluid modal title and button
        const fluidModal = document.getElementById('fluidModal');
        const fluidModalTitle = fluidModal.querySelector('h3');
        const fluidSubmitBtn = fluidModal.querySelector('button[onclick="addFluidIntake()"]');
        
        if (fluidModalTitle) fluidModalTitle.textContent = 'Edit Fluid Entry';
        if (fluidSubmitBtn) {
            fluidSubmitBtn.textContent = 'Update Fluid';
            fluidSubmitBtn.setAttribute('onclick', 'updateFluidIntake()');
        }
        
        // Show fluid modal
        fluidModal.classList.remove('hidden');
        
    } else {
        // Pre-fill food form
        document.getElementById('foodName').value = foodToEdit.name || '';
        document.getElementById('foodPortion').value = foodToEdit.portion || foodToEdit.amount || '';
        document.getElementById('foodMeal').value = foodToEdit.meal || 'breakfast';
        
        // Update add food section title and button
        const addFoodSection = document.querySelector('#tracking .add-food');
        const addFoodTitle = addFoodSection.querySelector('h4');
        const foodSubmitBtn = addFoodSection.querySelector('button[onclick="addFoodItem()"]');
        
        if (addFoodTitle) addFoodTitle.textContent = 'Edit Food Entry';
        if (foodSubmitBtn) {
            foodSubmitBtn.textContent = 'Update Food';
            foodSubmitBtn.setAttribute('onclick', 'updateFoodItem()');
        }
        
        // Scroll to food form
        addFoodSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Update food item (called when editing)
function updateFoodItem() {
    try {
        if (!window.editingFoodId) {
            console.error('No food ID found for editing');
            alert('Error: No food item selected for editing.');
            return;
        }
        
        const nameField = document.getElementById('foodName');
        const portionField = document.getElementById('foodPortion');
        const mealField = document.getElementById('foodMeal');
        
        if (!nameField || !portionField || !mealField) {
            console.error('Required food form fields not found');
            alert('Error: Form fields not found. Please refresh the page.');
            return;
        }
        
        const name = nameField.value.trim();
        const portion = portionField.value.trim();
        const meal = mealField.value;
        
        if (!name) {
            alert('Please enter a food name');
            nameField.focus();
            return;
        }
        
        if (!portion) {
            alert('Please enter a portion size');
            portionField.focus();
            return;
        }
        
    // Determine storage date from currently selected tracking date (fallback to today)
    const storageDateObj = window.currentTrackingDate ? new Date(window.currentTrackingDate) : new Date();
    storageDateObj.setHours(12,0,0,0);
    const dateString = storageDateObj.toISOString().split('T')[0];
        
        // Get existing nutrition data
        const nutritionData = JSON.parse(localStorage.getItem(`nutrition_${dateString}`) || '{"foods": [], "totals": {"calories": 0, "protein": 0, "fluids": 0}}');
        
        // Find the food item to update
        const foodIndex = nutritionData.foods.findIndex(food => food.id.toString() === window.editingFoodId.toString());
        if (foodIndex === -1) {
            console.error('Food item not found for update');
            alert('Error: Could not find food item to update.');
            return;
        }
        
        const oldFood = nutritionData.foods[foodIndex];
        
        // Calculate new nutrition values
        const calories = estimateCalories(name, portion);
        const protein = estimateProtein(name, portion);
        
        // Update the food item
        const updatedFood = {
            ...oldFood,
            name: name,
            portion: portion,
            meal: meal,
            calories: calories,
            protein: protein,
            lastUpdated: new Date().toISOString()
        };
        
        // Update totals by removing old values and adding new ones
        nutritionData.totals.calories = nutritionData.totals.calories - oldFood.calories + calories;
        nutritionData.totals.protein = nutritionData.totals.protein - oldFood.protein + protein;
        
        // Ensure totals don't go below 0
        nutritionData.totals.calories = Math.max(0, nutritionData.totals.calories);
        nutritionData.totals.protein = Math.max(0, nutritionData.totals.protein);
        
        // Replace the food item
        nutritionData.foods[foodIndex] = updatedFood;
        
        console.log('Food item updated successfully:', updatedFood);
        
        // Save updated data
        localStorage.setItem(`nutrition_${dateString}`, JSON.stringify(nutritionData));
        
        // Automatically save to weekly history
        autoSaveToWeeklyHistory(dateString, nutritionData);
        
        // Reset form
        nameField.value = '';
        portionField.value = '';
        mealField.value = 'breakfast';
        
        // Reset form title and button
        const addFoodSection = document.querySelector('#tracking .add-food');
        const addFoodTitle = addFoodSection.querySelector('h4');
        const foodSubmitBtn = addFoodSection.querySelector('button[onclick="updateFoodItem()"]');
        
        if (addFoodTitle) addFoodTitle.textContent = 'Add Food';
        if (foodSubmitBtn) {
            foodSubmitBtn.textContent = 'Add Food';
            foodSubmitBtn.setAttribute('onclick', 'addFoodItem()');
        }
        
        // Clear editing state
        window.editingFoodId = null;
        
        // Refresh displays
        updateNutritionSummary(nutritionData.totals);
        updateFoodLog(nutritionData.foods);
        
        console.log('Food item update completed successfully');
        
    } catch (error) {
        console.error('Error updating food item:', error);
        alert('Error updating food item. Please try again.');
    }
}

// Update fluid intake (called when editing)
function updateFluidIntake() {
    try {
        if (!window.editingFoodId) {
            console.error('No fluid ID found for editing');
            alert('Error: No fluid item selected for editing.');
            return;
        }
        
        const nameField = document.getElementById('fluidName');
        const amountField = document.getElementById('fluidAmount');
        const typeField = document.getElementById('fluidType');
        const timeField = document.getElementById('fluidTime');
        
        if (!nameField || !amountField || !typeField || !timeField) {
            console.error('Required fluid form fields not found');
            alert('Error: Form fields not found. Please refresh the page.');
            return;
        }
        
        const name = nameField.value.trim();
        const amount = parseFloat(amountField.value);
        const fluidType = typeField.value;
        const time = timeField.value;
        
        if (!name) {
            alert('Please enter a fluid name');
            nameField.focus();
            return;
        }
        
        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount in ml');
            amountField.focus();
            return;
        }
        
        if (!time) {
            alert('Please select a time');
            timeField.focus();
            return;
        }
        
    // Determine storage date from currently selected tracking date (fallback to today)
    const storageDateObj = window.currentTrackingDate ? new Date(window.currentTrackingDate) : new Date();
    storageDateObj.setHours(12,0,0,0);
    const dateString = storageDateObj.toISOString().split('T')[0];
        
        // Get existing nutrition data
        const nutritionData = JSON.parse(localStorage.getItem(`nutrition_${dateString}`) || '{"foods": [], "totals": {"calories": 0, "protein": 0, "fluids": 0}}');
        
        // Find the fluid item to update
        const fluidIndex = nutritionData.foods.findIndex(food => food.id.toString() === window.editingFoodId.toString());
        if (fluidIndex === -1) {
            console.error('Fluid item not found for update');
            alert('Error: Could not find fluid item to update.');
            return;
        }
        
        const oldFluid = nutritionData.foods[fluidIndex];
        
        // Calculate new nutrition values
        const calories = calculateFluidCalories(amount, fluidType);
        
        // Update the fluid item
        const updatedFluid = {
            ...oldFluid,
            name: name,
            amount: `${amount}ml`,
            fluidType: fluidType,
            time: time,
            calories: calories,
            fluids: amount,
            type: 'fluid',
            lastUpdated: new Date().toISOString()
        };
        
        // Update totals by removing old values and adding new ones
        nutritionData.totals.calories = nutritionData.totals.calories - oldFluid.calories + calories;
        nutritionData.totals.fluids = nutritionData.totals.fluids - oldFluid.fluids + amount;
        
        // Ensure totals don't go below 0
        nutritionData.totals.calories = Math.max(0, nutritionData.totals.calories);
        nutritionData.totals.fluids = Math.max(0, nutritionData.totals.fluids);
        
        // Replace the fluid item
        nutritionData.foods[fluidIndex] = updatedFluid;
        
        console.log('Fluid item updated successfully:', updatedFluid);
        
        // Save updated data
        localStorage.setItem(`nutrition_${dateString}`, JSON.stringify(nutritionData));
        
        // Automatically save to weekly history
        autoSaveToWeeklyHistory(dateString, nutritionData);
        
        // Reset form
        nameField.value = '';
        amountField.value = '';
        typeField.value = 'water';
        timeField.value = '';
        
        // Reset fluid modal title and button
        const fluidModal = document.getElementById('fluidModal');
        const fluidModalTitle = fluidModal.querySelector('h3');
        const fluidSubmitBtn = fluidModal.querySelector('button[onclick="updateFluidIntake()"]');
        
        if (fluidModalTitle) fluidModalTitle.textContent = 'Add Fluid Intake';
        if (fluidSubmitBtn) {
            fluidSubmitBtn.textContent = 'Add Fluid';
            fluidSubmitBtn.setAttribute('onclick', 'addFluidIntake()');
        }
        
        // Clear editing state
        window.editingFoodId = null;
        
        // Close modal
        fluidModal.classList.add('hidden');
        
        // Refresh displays
        updateNutritionSummary(nutritionData.totals);
        updateFoodLog(nutritionData.foods);
        
        console.log('Fluid item update completed successfully');
        
    } catch (error) {
        console.error('Error updating fluid item:', error);
        alert('Error updating fluid item. Please try again.');
    }
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
    
    // Remove existing event listeners to prevent duplicates
    learningTabs.forEach(tab => {
        // Clone node to remove all event listeners
        const newTab = tab.cloneNode(true);
        tab.parentNode.replaceChild(newTab, tab);
    });
    
    // Re-query the tabs after cloning
    const newLearningTabs = document.querySelectorAll('.learning-tab');
    
    newLearningTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const tabName = this.getAttribute('data-tab');
            
            console.log('Learning tab clicked:', tabName); // Debug log
            
            // Remove active class from all tabs and panels
            newLearningTabs.forEach(t => t.classList.remove('active'));
            learningPanels.forEach(p => {
                p.classList.remove('active');
                p.style.display = 'none';
            });
            
            // Add active class to clicked tab and corresponding panel
            this.classList.add('active');
            const targetPanel = document.getElementById(`${tabName}-panel`);
            if (targetPanel) {
                targetPanel.classList.add('active');
                targetPanel.style.display = 'block';
                console.log('Activated panel:', `${tabName}-panel`); // Debug log
            } else {
                console.error('Panel not found:', `${tabName}-panel`); // Debug log
            }
        });
    });
    
    // Ensure the first tab is active by default
    const firstTab = newLearningTabs[0];
    const firstPanel = document.getElementById('basics-panel');
    if (firstTab && firstPanel) {
        firstTab.classList.add('active');
        firstPanel.classList.add('active');
        firstPanel.style.display = 'block';
        
        // Hide other panels
        learningPanels.forEach(panel => {
            if (panel.id !== 'basics-panel') {
                panel.style.display = 'none';
            }
        });
    }
    
    // Initialize clickable evidence notes
    initializeEvidenceNotes();
}

// Debug function to test learning tabs
window.testLearningTabs = function() {
    const tabs = document.querySelectorAll('.learning-tab');
    const panels = document.querySelectorAll('.learning-panel');
    console.log('Learning tabs found:', tabs.length);
    console.log('Learning panels found:', panels.length);
    
    tabs.forEach((tab, index) => {
        console.log(`Tab ${index}:`, tab.getAttribute('data-tab'), 'Active:', tab.classList.contains('active'));
    });
    
    panels.forEach((panel, index) => {
        console.log(`Panel ${index}:`, panel.id, 'Active:', panel.classList.contains('active'), 'Display:', panel.style.display);
    });
};

// Debug function to test evidence notes
window.testEvidenceNotes = function() {
    const evidenceNotes = document.querySelectorAll('.evidence-note');
    console.log('Evidence notes found:', evidenceNotes.length);
    
    evidenceNotes.forEach((note, index) => {
        const noteText = note.textContent.trim();
        let sourceName = noteText.replace(/^.*?Based on\s+/, '').trim();
        if (sourceName === noteText) {
            sourceName = noteText.replace(/^\s*.*?\s+/, '').trim();
        }
        console.log(`Evidence Note ${index}:`, noteText, '-> Extracted:', sourceName);
        
        // Check if we have a URL for this source
        for (const [key, url] of Object.entries(evidenceSourceUrls)) {
            if (sourceName.includes(key) || key.includes(sourceName.replace(/\s+/g, ' '))) {
                console.log(`  -> Matches:`, key, url);
                break;
            }
        }
    });
};

// Debug function to test recommended recipes functionality
window.testRecommendedRecipes = function() {
    console.log('=== Recommended Recipes Debug ===');
    console.log('Current user recommended filters:', currentUserRecommendedFilters);
    console.log('Current recipe mode:', currentRecipeMode);
    
    const userData = getUserProfile();
    console.log('User profile data:', userData);
    
    if (userData) {
        console.log('User nutrition approach:', userData.nutritionApproach);
        console.log('Appropriate recipe mode:', userData.nutritionApproach === 'conventional' ? 'conventional' : 'cam');
        
        console.log('Generating recommended categories...');
        const categories = getRecommendedRecipeCategories(userData);
        console.log('Recommended categories HTML:', categories);
        console.log('Updated currentUserRecommendedFilters:', currentUserRecommendedFilters);
    } else {
        console.log('No user profile found');
    }
    
    // Test the showRecommendedRecipes function
    console.log('Testing showRecommendedRecipes...');
    const currentRecipeData = currentRecipeMode === 'conventional' ? conventionalRecipeData : camRecipeData;
    console.log('Available recipe categories in current mode:', Object.keys(currentRecipeData));
    
    let recommendedRecipes = [];
    if (currentUserRecommendedFilters.length === 0) {
        console.log('No recommended filters, would show all recipes');
    } else {
        currentUserRecommendedFilters.forEach(filter => {
            if (currentRecipeData[filter]) {
                const recipesInCategory = currentRecipeData[filter];
                console.log(`Filter '${filter}' has ${recipesInCategory.length} recipes`);
                recommendedRecipes = recommendedRecipes.concat(recipesInCategory);
            } else {
                console.log(`Filter '${filter}' not found in recipe data`);
            }
        });
    }
    console.log('Total recommended recipes:', recommendedRecipes.length);
    
    // Test conventional vs CAM data structures
    console.log('=== Recipe Data Structure Check ===');
    console.log('Conventional categories:', Object.keys(conventionalRecipeData));
    console.log('CAM categories:', Object.keys(camRecipeData));
};

// Source URL mappings for evidence notes
const evidenceSourceUrls = {
    'NCI Protein Requirements Guidelines 2024': 'https://www.cancer.gov/about-cancer/treatment/side-effects/appetite-loss/nutrition-pdq',
    'ACS Nutrition Guidelines for Cancer Survivors': 'https://www.cancer.org/treatment/survivorship-during-and-after-treatment/staying-active/nutrition.html',
    'WHO Hydration Guidelines for Cancer Patients': 'https://www.who.int/news-room/fact-sheets/detail/cancer',
    'WHO Micronutrient Requirements for Cancer Care': 'https://www.who.int/nutrition/topics/micronutrients/en/',
    'Journal of Clinical Oncology 2024': 'https://ascopubs.org/journal/jco',
    'Nutrition and Cancer Journal 2024': 'https://www.tandfonline.com/journals/hnuc20',
    'NCI Managing Nausea Clinical Guidelines': 'https://www.cancer.gov/about-cancer/treatment/side-effects/nausea',
    'Supportive Care in Cancer Journal': 'https://link.springer.com/journal/520',
    'Oncology Nutrition Connection': 'https://www.oncologynutrition.org/',
    'NCI Eating Hints Guidelines': 'https://www.cancer.gov/publications/patient-education/eating-hints',
    'WHO Food Safety Guidelines': 'https://www.who.int/news-room/fact-sheets/detail/food-safety',
    'American Institute for Cancer Research': 'https://www.aicr.org/cancer-prevention/',
    'Harvard T.H. Chan School of Public Health': 'https://www.hsph.harvard.edu/nutritionsource/',
    'Mayo Clinic Cancer Prevention Guidelines': 'https://www.mayoclinic.org/healthy-lifestyle/adult-health/in-depth/cancer-prevention/art-20044816',
    'World Cancer Research Fund': 'https://www.wcrf.org/diet-activity-and-cancer/',
    'Academy of Nutrition and Dietetics': 'https://www.eatright.org/health/diseases-and-conditions/cancer',
    'Cancer Treatment Centers of America': 'https://www.cancercenter.com/cancer-types',
    'National Comprehensive Cancer Network': 'https://www.nccn.org/patients',
    'Livestrong Foundation': 'https://www.livestrong.org/what-we-do/program/nutrition',
    'Susan G. Komen Foundation': 'https://www.komen.org/breast-cancer/treatment/managing-side-effects/nutrition/',
    'International Agency for Research on Cancer': 'https://www.iarc.who.int/'
};

// Initialize clickable evidence notes
function initializeEvidenceNotes() {
    const evidenceNotes = document.querySelectorAll('.evidence-note');
    
    evidenceNotes.forEach(note => {
        // Make the evidence note clickable
        note.style.cursor = 'pointer';
        note.setAttribute('title', 'Click to view source');
        
        // Add click event listener
        note.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Extract the source name from the text content
            const noteText = this.textContent.trim();
            // Remove "Based on " prefix and any leading/trailing whitespace
            let sourceName = noteText.replace(/^.*?Based on\s+/, '').trim();
            
            // If no "Based on" found, use the whole text (removing icon)
            if (sourceName === noteText) {
                sourceName = noteText.replace(/^\s*.*?\s+/, '').trim(); // Remove first word (likely icon)
            }
            
            console.log('Extracted source name:', sourceName); // Debug log
            
            // Find matching URL
            let sourceUrl = null;
            for (const [key, url] of Object.entries(evidenceSourceUrls)) {
                if (sourceName.includes(key) || key.includes(sourceName.replace(/\s+/g, ' '))) {
                    sourceUrl = url;
                    console.log('Matched source:', key, 'URL:', url); // Debug log
                    break;
                }
            }
            
            if (sourceUrl) {
                // Open the source URL in a new tab
                window.open(sourceUrl, '_blank', 'noopener,noreferrer');
            } else {
                // Fallback: show an alert with the source name and available sources
                console.log('Available sources:', Object.keys(evidenceSourceUrls));
                alert(`Source: ${sourceName}\n\nThis would typically link to the official publication or guideline. Click OK to search for this source online.`);
                
                // Optional: Search for the source on Google
                const searchQuery = encodeURIComponent(sourceName + ' cancer nutrition guidelines');
                window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank', 'noopener,noreferrer');
            }
        });
        
        // Add hover effect - these are now handled by CSS, but we can add additional JS effects
        note.addEventListener('mouseenter', function() {
            // Additional hover effects can be added here if needed
        });
        
        note.addEventListener('mouseleave', function() {
            // Additional hover cleanup can be added here if needed
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

// Guidelines Modal Functions
function openGuidelinesModal() {
    const modal = document.getElementById('guidelinesModal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Focus management for accessibility
        const closeButton = modal.querySelector('.close-btn');
        if (closeButton) {
            closeButton.focus();
        }
        
        // Add escape key listener
        document.addEventListener('keydown', handleGuidelinesModalEscape);
        
        // Add click outside to close
        modal.addEventListener('click', handleGuidelinesModalClickOutside);
    }
}

function closeGuidelinesModal() {
    const modal = document.getElementById('guidelinesModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
        
        // Remove event listeners
        document.removeEventListener('keydown', handleGuidelinesModalEscape);
        modal.removeEventListener('click', handleGuidelinesModalClickOutside);
    }
}

function handleGuidelinesModalEscape(event) {
    if (event.key === 'Escape') {
        closeGuidelinesModal();
    }
}

function handleGuidelinesModalClickOutside(event) {
    const modalContent = event.target.closest('.guidelines-modal-content');
    if (!modalContent) {
        closeGuidelinesModal();
    }
}

// Recipe Mode Management
function initializeRecipeModeSelector() {
    const modeSelector = document.getElementById('recipeMode');
    if (modeSelector) {
        // Remove any existing listeners
        modeSelector.removeEventListener('change', handleModeChange);
        // Add new listener
        modeSelector.addEventListener('change', handleModeChange);
    }
}

function handleModeChange(event) {
    const newMode = event.target.value;
    switchRecipeMode(newMode);
}

function switchRecipeMode(mode) {
    currentRecipeMode = mode;
    
    // Update the section header and filters based on mode
    updateRecipeSectionForMode(mode);
    
    // Re-render recipes with current filter
    const activeFilter = document.querySelector('.filter-btn.active');
    const currentFilter = activeFilter ? activeFilter.dataset.filter : 'all';
    filterRecipes(currentFilter);
}

function updateRecipeSectionForMode(mode) {
    const sectionHeader = document.querySelector('#recipesSection .section-header');
    const camOverview = document.querySelector('.cam-overview');
    const filterContainer = document.querySelector('.recipe-filters');
    
    if (mode === 'conventional') {
        // Update header for conventional recipes
        sectionHeader.innerHTML = `
            <div class="healthcare-image" style="width: 80px; height: 80px; margin: 0 auto var(--space-4); background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);">
                <i class="fas fa-apple-alt"></i>
            </div>
            <h2><i class="fas fa-apple-alt"></i> Nutritional Recipes</h2>
            <p>Evidence-based recipes designed for cancer patients' nutritional needs</p>
            
            <!-- Recipe Mode Selector -->
            <div class="recipe-mode-selector">
                <label for="recipeMode" class="mode-label">
                    <i class="fas fa-exchange-alt"></i> Recipe Collection:
                </label>
                <select id="recipeMode" class="mode-dropdown">
                    <option value="cam">Holistic & CAM</option>
                    <option value="conventional" selected>Conventional Nutrition</option>
                </select>
            </div>
        `;
        
        // Hide CAM overview
        if (camOverview) {
            camOverview.style.display = 'none';
        }
        
        // Add or update conventional overview
        let conventionalOverview = document.querySelector('.conventional-overview');
        if (!conventionalOverview) {
            conventionalOverview = document.createElement('div');
            conventionalOverview.className = 'conventional-overview';
            camOverview.parentNode.insertBefore(conventionalOverview, camOverview.nextSibling);
        }
        
        conventionalOverview.innerHTML = `
            <div class="conventional-intro">
                <h3>Evidence-Based Nutritional Medicine Approaches</h3>
                <p>These recipes are developed using clinical research and established nutritional science to provide optimal support for cancer patients during treatment and recovery.</p>
            </div>
        `;
        conventionalOverview.style.display = 'block';
        
        // Update filters for conventional recipes
        if (filterContainer) {
            // Use the centralized filter update function instead of duplicating logic
            updateFilterButtonsWithCounts('conventional');
        }
    } else {
        // Update header for CAM recipes
        sectionHeader.innerHTML = `
            <div class="healthcare-image cam-icon" style="width: 80px; height: 80px; margin: 0 auto var(--space-4);">
                <i class="fas fa-seedling"></i>
            </div>
            <h2><i class="fas fa-seedling"></i> Holistic & CAM Nutrition</h2>
            <p>Integrative recipes combining traditional wisdom with modern nutritional science</p>
            
            <!-- Recipe Mode Selector -->
            <div class="recipe-mode-selector">
                <label for="recipeMode" class="mode-label">
                    <i class="fas fa-exchange-alt"></i> Recipe Collection:
                </label>
                <select id="recipeMode" class="mode-dropdown">
                    <option value="cam" selected>Holistic & CAM</option>
                    <option value="conventional">Conventional Nutrition</option>
                </select>
            </div>
            
            <div class="cam-subtitle">
                <span class="global-note">
                    <i class="fas fa-globe"></i> 
                    Global traditions adapted for cancer support
                </span>
            </div>
        `;
        
        // Show CAM overview
        if (camOverview) {
            camOverview.style.display = 'block';
        }
        
        // Hide conventional overview
        const conventionalOverview = document.querySelector('.conventional-overview');
        if (conventionalOverview) {
            conventionalOverview.style.display = 'none';
        }
        
        // Update filters for CAM recipes
        if (filterContainer) {
            // Use the centralized filter update function instead of duplicating logic
            updateFilterButtonsWithCounts('cam');
        }
    }
    
    // Re-initialize the mode selector event listener
    initializeRecipeModeSelector();
    
    // Re-initialize filter button event listeners
    initializeFilterButtons();
}

function initializeFilterButtons() {
    // Add event listeners to filter buttons
    document.querySelectorAll('.filter-btn').forEach(button => {
        // Remove any existing listeners to avoid duplicates
        button.removeEventListener('click', handleFilterClick);
        // Add new listener
        button.addEventListener('click', handleFilterClick);
    });
}

function handleFilterClick(event) {
    const button = event.target.closest('.filter-btn');
    if (!button) return;
    
    // Remove active class from all buttons
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    button.classList.add('active');
    
    const filter = button.getAttribute('data-filter');
    
    // Always use simple grid layout for filter buttons (no category headers)
    filterRecipes(filter, true, false);
}

function highlightFilterButton(filterCategory) {
    // Remove active class from all filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    
    // Find and highlight the button with the matching data-filter attribute
    const targetButton = document.querySelector(`.filter-btn[data-filter="${filterCategory}"]`);
    if (targetButton) {
        targetButton.classList.add('active');
        console.log(`Highlighted filter button: ${filterCategory}`);
    } else {
        console.warn(`Filter button not found for category: ${filterCategory}`);
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
    
    // Initialize recipe mode selector
    initializeRecipeModeSelector();
    
    // Initialize filter buttons for recipes
    initializeFilterButtons();
    
    // Initialize learning section tabs
    initializeLearnSection();
    
    // Initialize nutrition tracking system
    initializeTracking();
    
    // Check if form is empty and clear My Plan if needed
    checkFormAndClearPlan();
    
    // Add form change listeners to monitor form state
    addFormChangeListeners();
    
    // Add form submission handler
    const assessmentForm = document.getElementById('assessmentForm');
    if (assessmentForm) {
        assessmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get symptoms from multi-select dropdowns
            const symptoms = [];
            document.querySelectorAll('select[name="symptoms"]').forEach(select => {
                Array.from(select.selectedOptions).forEach(option => {
                    symptoms.push(option.value);
                });
            });
            
            // Get holistic preferences
            const traditionMedicine = [];
            document.querySelectorAll('input[name="traditions"]:checked').forEach(checkbox => {
                traditionMedicine.push(checkbox.value);
            });
            
            const mindBodyPractices = [];
            document.querySelectorAll('input[name="mindBody"]:checked').forEach(checkbox => {
                mindBodyPractices.push(checkbox.value);
            });
            
            const profileData = {
                cancerType: document.getElementById('cancerType').value,
                treatmentStage: document.getElementById('treatmentStage').value,
                location: document.getElementById('location').value,
                symptoms: symptoms,
                allergies: document.getElementById('allergies').value,
                nutritionApproach: document.getElementById('nutritionApproach').value,
                traditionalMedicine: traditionMedicine,
                mindBodyPractices: mindBodyPractices,
                constitutionalType: document.getElementById('constitution').value,
                timestamp: new Date().toISOString()
            };
            
            // Update global holistic preferences
            userHolisticPreferences = {
                approach: profileData.nutritionApproach,
                traditions: profileData.traditionalMedicine,
                mindBody: profileData.mindBodyPractices,
                constitution: profileData.constitutionalType
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
    
    // Close modal on backdrop click only
    document.addEventListener('click', (e) => {
        // Check for modal backdrop clicks only
        const recipeModal = document.getElementById('recipeModal');
        const resourceModal = document.getElementById('resourceModal');
        const foodModal = document.getElementById('foodModal');
        const fluidModal = document.getElementById('fluidModal');
        const medicationModal = document.getElementById('medicationModal');
        
        if (e.target === recipeModal) {
            closeRecipeModal();
        } else if (e.target === resourceModal) {
            closeResourceModal();
        } else if (e.target === foodModal) {
            closeFoodModal();
        } else if (e.target === fluidModal) {
            closeFluidModal();
        } else if (e.target === medicationModal) {
            closeMedicationModal();
        }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeRecipeModal();
            closeResourceModal();
            closeFoodModal();
            closeFluidModal();
            closeMedicationModal();
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
        document.getElementById('allergies').value = '';
        document.getElementById('nutritionApproach').value = '';
        document.getElementById('constitution').value = '';
        
        // Clear symptoms multi-select dropdowns
        const symptomSelects = document.querySelectorAll('select[name="symptoms"]');
        symptomSelects.forEach(select => {
            select.selectedIndex = -1; // Clear all selections
            Array.from(select.options).forEach(option => {
                option.selected = false;
            });
        });
        
        const traditionalMedicineCheckboxes = document.querySelectorAll('input[name="traditions"]');
        traditionalMedicineCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        const mindBodyCheckboxes = document.querySelectorAll('input[name="mindBody"]');
        mindBodyCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Clear global holistic preferences
        userHolisticPreferences = {
            approach: '',
            traditions: [],
            mindBody: [],
            constitution: ''
        };
        
        // Clear any saved profile data from localStorage
        localStorage.removeItem('userProfile');
        localStorage.removeItem('userProfile');
        
        // Clear the My Plan section (personalizedContent)
        const personalizedContent = document.getElementById('personalizedContent');
        if (personalizedContent) {
            personalizedContent.innerHTML = `
                <div class="alert alert-warning">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Please complete your personal assessment first to get customized recommendations.</p>
                    <button class="btn btn-primary" onclick="showSection('profileSection')">
                        <i class="fas fa-user-circle"></i> Complete Assessment
                    </button>
                </div>
            `;
        }
        
        // Clear any stored recommendations
        localStorage.removeItem('userRecommendations');
        
        // Show success message
        alert('Profile form cleared successfully!');
    }
}

// Clear Today's Tracking Data Function
function clearTodayTracking() {
    if (confirm('Are you sure you want to clear all food and fluid entries for today? This action cannot be undone.')) {
        const dateString = getSelectedStorageDateString();
        
        // Clear selected day's nutrition data from localStorage
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

// Check if form is empty and clear My Plan accordingly
function checkFormAndClearPlan() {
    const formElements = [
        'cancerType',
        'treatmentStage', 
        'location'
    ];
    
    // Check if required form fields are empty
    let formIsEmpty = true;
    for (const elementId of formElements) {
        const element = document.getElementById(elementId);
        if (element && element.value.trim() !== '') {
            formIsEmpty = false;
            break;
        }
    }
    
    // If form is empty, clear localStorage and My Plan
    if (formIsEmpty) {
        // Clear profile and recommendations from localStorage
        localStorage.removeItem('userProfile');
        localStorage.removeItem('userRecommendations');
        
        // Clear the My Plan section
        const personalizedContent = document.getElementById('personalizedContent');
        if (personalizedContent) {
            personalizedContent.innerHTML = `
                <div class="alert alert-warning">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Please complete your personal assessment first to get customized recommendations.</p>
                    <button class="btn btn-primary" onclick="showSection('profileSection')">
                        <i class="fas fa-user-circle"></i> Complete Assessment
                    </button>
                </div>
            `;
        }
    }
}

// Add form change listeners to monitor form state
function addFormChangeListeners() {
    const formElements = [
        'cancerType',
        'treatmentStage',
        'location',
        'allergies',
        'nutritionApproach',
        'constitution'
    ];
    
    // Add change listeners to form elements
    formElements.forEach(elementId => {
        const element = document.getElementById(elementId);
        if (element) {
            element.addEventListener('change', checkFormAndClearPlan);
            element.addEventListener('input', checkFormAndClearPlan);
        }
    });
    
    // Add change listeners to checkboxes
    const checkboxGroups = ['symptoms', 'traditions', 'mindBody'];
    checkboxGroups.forEach(groupName => {
        const checkboxes = document.querySelectorAll(`input[name="${groupName}"]`);
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', checkFormAndClearPlan);
        });
    });
}

// Test function to debug recommended recipes filtering
function debugRecommendedFiltering() {
    console.log('=== Debug Recommended Filtering ===');
    
    const userData = getUserProfile();
    if (!userData) {
        console.log('No user profile found');
        return;
    }
    
    console.log('User data:', userData);
    
    // Generate categories for the user
    const categories = getRecommendedRecipeCategories(userData);
    console.log('Generated recommended categories HTML:', categories);
    console.log('Current recommended filters:', currentUserRecommendedFilters);
    
    // Check current recipe mode
    console.log('Current recipe mode:', currentRecipeMode);
    const currentRecipeData = currentRecipeMode === 'conventional' ? conventionalRecipeData : camRecipeData;
    console.log('Available recipe categories:', Object.keys(currentRecipeData));
    
    // Test filtering
    console.log('Testing filter mapping:');
    currentUserRecommendedFilters.forEach(filter => {
        if (currentRecipeData[filter]) {
            console.log(`✓ Filter '${filter}' maps to ${currentRecipeData[filter].length} recipes`);
        } else {
            console.log(`✗ Filter '${filter}' NOT FOUND in recipe data`);
        }
    });
}

// Make debug function available globally for browser console testing
window.debugRecommendedFiltering = debugRecommendedFiltering;

// Test function to add sample nutrition data for testing weekly tracking
function addSampleNutritionData() {
    console.log('Adding sample nutrition data for testing...');
    
    // Add data for the last few days
    for (let i = 0; i < 5; i++) {
        const testDate = new Date();
        testDate.setDate(testDate.getDate() - i);
        const dateString = getStorageDateStringFrom(testDate);
        
        const sampleData = {
            foods: [
                {
                    id: `test_${i}_1`,
                    name: `Sample Food ${i + 1}`,
                    portion: "1 cup",
                    meal: "breakfast",
                    calories: 200 + (i * 50),
                    protein: 15 + (i * 3),
                    fluids: 100 + (i * 25),
                    timestamp: testDate.toISOString()
                },
                {
                    id: `test_${i}_2`,
                    name: `Sample Meal ${i + 1}`,
                    portion: "1 serving",
                    meal: "lunch",
                    calories: 350 + (i * 40),
                    protein: 25 + (i * 5),
                    fluids: 200 + (i * 30),
                    timestamp: testDate.toISOString()
                }
            ],
            totals: {
                calories: 550 + (i * 90),
                protein: 40 + (i * 8),
                fluids: 300 + (i * 55)
            }
        };
        
        localStorage.setItem(`nutrition_${dateString}`, JSON.stringify(sampleData));
    }
    
    console.log('Sample nutrition data added for testing');
    alert('Sample nutrition data added! You can now test the Save Daily Log and Weekly History features.');
}

// Make test function available globally
window.addSampleNutritionData = addSampleNutritionData;

// Debug function to check localStorage data
function debugNutritionStorage() {
    console.log('=== Debugging Nutrition Storage ===');
    
    // Check daily nutrition data
    const dateString = getSelectedStorageDateString();
    const todayData = localStorage.getItem(`nutrition_${dateString}`);
    console.log(`Today's data (${dateString}):`, todayData ? JSON.parse(todayData) : 'No data');
    
    // Check weekly logs
    const weeklyLogs = localStorage.getItem('weeklyNutritionLogs');
    console.log('Weekly logs:', weeklyLogs ? JSON.parse(weeklyLogs) : 'No weekly logs');
    
    // Check all nutrition keys in localStorage
    const nutritionKeys = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('nutrition_')) {
            nutritionKeys.push(key);
        }
    }
    console.log('All nutrition keys:', nutritionKeys);
    
    // Show detailed data for each key
    nutritionKeys.forEach(key => {
        const data = localStorage.getItem(key);
        console.log(`${key}:`, data ? JSON.parse(data) : 'Empty');
    });
    
    console.log('=== End Debug ===');
}

// Make debug function available globally
window.debugNutritionStorage = debugNutritionStorage;

// Test function to check if weekly history is updating
function testWeeklyHistoryUpdate() {
    console.log('=== Testing Weekly History Update ===');
    
    const dateString = getSelectedStorageDateString();
    
    // Check today's nutrition data
    const todayData = localStorage.getItem(`nutrition_${dateString}`);
    console.log(`Today's nutrition data (${dateString}):`, todayData ? JSON.parse(todayData) : 'No data found');
    
    // Check weekly logs
    const weeklyLogs = localStorage.getItem('weeklyNutritionLogs');
    console.log('Weekly nutrition logs:', weeklyLogs ? JSON.parse(weeklyLogs) : 'No weekly logs found');
    
    // If today has data but weekly doesn't, manually sync
    if (todayData && (!weeklyLogs || JSON.parse(weeklyLogs).length === 0)) {
        console.log('Found daily data but no weekly logs. Manually syncing...');
        const nutritionData = JSON.parse(todayData);
        autoSaveToWeeklyHistory(dateString, nutritionData);
        
        console.log('After manual sync:');
        const updatedWeeklyLogs = localStorage.getItem('weeklyNutritionLogs');
        console.log('Updated weekly logs:', updatedWeeklyLogs ? JSON.parse(updatedWeeklyLogs) : 'Still no weekly logs');
    }
    
    console.log('=== End Test ===');
}

// Make test function available globally
window.testWeeklyHistoryUpdate = testWeeklyHistoryUpdate;

// Complete test function for the entire nutrition tracking flow
function testCompletNutritionFlow() {
    console.log('=== Testing Complete Nutrition Flow ===');
    
    const dateString = getSelectedStorageDateString();
    
    console.log('Step 1: Adding test food item...');
    
    // Simulate adding a food item
    const testFoodItem = {
        id: Date.now().toString(),
        name: 'Test Apple',
        portion: '1 medium',
        meal: 'breakfast',
        calories: 80,
        protein: 0,
        fluids: 50,
        timestamp: new Date().toISOString()
    };
    
    // Get existing nutrition data
    const nutritionData = JSON.parse(localStorage.getItem(`nutrition_${dateString}`) || '{"foods": [], "totals": {"calories": 0, "protein": 0, "fluids": 0}}');
    
    // Add test food item
    nutritionData.foods.push(testFoodItem);
    nutritionData.totals.calories += testFoodItem.calories;
    nutritionData.totals.protein += testFoodItem.protein;
    nutritionData.totals.fluids += testFoodItem.fluids;
    
    // Save to daily log
    localStorage.setItem(`nutrition_${dateString}`, JSON.stringify(nutritionData));
    console.log('Step 2: Food item saved to daily log');
    
    // Auto-save to weekly history
    autoSaveToWeeklyHistory(dateString, nutritionData);
    console.log('Step 3: Auto-saved to weekly history');
    
    // Check weekly history
    const weeklyLogs = JSON.parse(localStorage.getItem('weeklyNutritionLogs') || '[]');
    const todayLog = weeklyLogs.find(log => log.date === dateString);
    
    if (todayLog) {
        console.log('✅ SUCCESS: Today\'s data found in weekly history:', todayLog);
        console.log('   - Foods count:', todayLog.foods.length);
        console.log('   - Total calories:', todayLog.totals.calories);
        console.log('   - Auto-saved flag:', todayLog.autoSaved);
    } else {
        console.log('❌ ERROR: Today\'s data NOT found in weekly history');
    }
    
    console.log('Step 4: Testing Save Daily Log function...');
    saveDailyLog();
    
    console.log('Step 5: Testing Weekly History View...');
    setTimeout(() => {
        viewWeeklyHistory();
        console.log('=== Test Complete ===');
    }, 1000);
}

// Make complete test function available globally
window.testCompletNutritionFlow = testCompletNutritionFlow;

// Function to manually force sync of today's data to weekly history
function forceSyncTodayToWeeklyHistory() {
    console.log('=== Forcing sync of today\'s data to weekly history ===');
    
    const dateString = getSelectedStorageDateString();
    
    // Get today's nutrition data
    const todayData = localStorage.getItem(`nutrition_${dateString}`);
    console.log('Today\'s raw data:', todayData);
    
    if (todayData) {
        const nutritionData = JSON.parse(todayData);
        console.log('Today\'s parsed data:', nutritionData);
        
        if (nutritionData.foods && nutritionData.foods.length > 0) {
            console.log('Found', nutritionData.foods.length, 'food items. Forcing sync...');
            autoSaveToWeeklyHistory(dateString, nutritionData);
            
            // Check if it was saved
            const weeklyLogs = JSON.parse(localStorage.getItem('weeklyNutritionLogs') || '[]');
            const todayLog = weeklyLogs.find(log => log.date === dateString);
            
            if (todayLog) {
                console.log('✅ SUCCESS: Data synced to weekly history!');
                console.log('Today\'s log in weekly history:', todayLog);
                
                // Refresh weekly history view if it's open
                const historySection = document.getElementById('weeklyHistorySection');
                if (historySection && !historySection.classList.contains('hidden')) {
                    loadWeeklyHistory();
                }
                
                alert('✅ Today\'s nutrition data has been successfully synced to weekly history!');
            } else {
                console.log('❌ ERROR: Data was not saved to weekly history');
                alert('❌ Error: Could not sync data to weekly history');
            }
        } else {
            console.log('No food data found for today');
            alert('No food data found for today. Please add some food items first.');
        }
    } else {
        console.log('No nutrition data found for today');
        alert('No nutrition data found for today. Please add some food items first.');
    }
}

// Make force sync function available globally
window.forceSyncTodayToWeeklyHistory = forceSyncTodayToWeeklyHistory;

// Debug function to check weekly history filtering
function debugWeeklyHistoryFiltering() {
    console.log('=== Debug Weekly History Filtering ===');
    
    const weeklyLogs = JSON.parse(localStorage.getItem('weeklyNutritionLogs') || '[]');
    console.log('Total weekly logs:', weeklyLogs.length);
    
    weeklyLogs.forEach((log, index) => {
        console.log(`Log ${index}:`, {
            date: log.date,
            displayDate: log.displayDate,
            foods: log.foods.length,
            calories: log.totals.calories
        });
    });
    
    // Check current week calculation (updated logic)
    const today = new Date();
    
    // Create start of week (Sunday) in local time
    const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const dayOffset = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    startOfWeek.setDate(today.getDate() - dayOffset + (currentWeekOffset * 7));
    startOfWeek.setHours(0, 0, 0, 0);
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);
    
    console.log('Current week range:');
    console.log('  Start:', startOfWeek.toISOString(), '(' + startOfWeek.toLocaleDateString() + ')');
    console.log('  End:', endOfWeek.toISOString(), '(' + endOfWeek.toLocaleDateString() + ')');
    console.log('  Today:', today.toISOString(), '(' + today.toLocaleDateString() + ')');
    console.log('  Week offset:', currentWeekOffset);
    console.log('  Day offset:', dayOffset);
    
    // Test filtering with new logic
    const weekLogs = weeklyLogs.filter(log => {
        // Parse log date as local date (YYYY-MM-DD format)
        const logDateParts = log.date.split('-');
        const logDate = new Date(parseInt(logDateParts[0]), parseInt(logDateParts[1]) - 1, parseInt(logDateParts[2]));
        logDate.setHours(12, 0, 0, 0); // Set to noon to avoid timezone issues
        
        const isInRange = (logDate >= startOfWeek && logDate <= endOfWeek);
        console.log(`Log ${log.date}: ${logDate.toLocaleDateString()} -> In range: ${isInRange}`);
        return isInRange;
    });
    
    console.log('Filtered logs for current week:', weekLogs.length);
    console.log('=== End Debug ===');
}

// Make debug function available globally
window.debugWeeklyHistoryFiltering = debugWeeklyHistoryFiltering;

// Debug function to test fluid inclusion in weekly history
function debugFluidInclusion() {
    console.log('=== DEBUGGING FLUID INCLUSION IN WEEKLY HISTORY ===');
    
    // Get today's nutrition data
    const dateString = getSelectedStorageDateString();
    const nutritionData = JSON.parse(localStorage.getItem(`nutrition_${dateString}`) || '{"foods": [], "totals": {"calories": 0, "protein": 0, "fluids": 0}}');
    
    console.log('Today\'s nutrition data:', nutritionData);
    
    // Separate foods and fluids
    const foods = nutritionData.foods.filter(item => item.type !== 'fluid');
    const fluids = nutritionData.foods.filter(item => item.type === 'fluid');
    
    console.log('Foods found:', foods.length, foods.map(f => f.name));
    console.log('Fluids found:', fluids.length, fluids.map(f => `${f.name} (${f.amount})`));
    
    // Check weekly history
    const weeklyLogs = JSON.parse(localStorage.getItem('weeklyNutritionLogs') || '[]');
    const todayLog = weeklyLogs.find(log => log.date === dateString);
    
    if (todayLog) {
        console.log('Today\'s weekly log:', todayLog);
        const weeklyFoods = todayLog.foods.filter(item => item.type !== 'fluid');
        const weeklyFluids = todayLog.foods.filter(item => item.type === 'fluid');
        console.log('Weekly history - Foods:', weeklyFoods.length, weeklyFoods.map(f => f.name));
        console.log('Weekly history - Fluids:', weeklyFluids.length, weeklyFluids.map(f => `${f.name} (${f.amount})`));
    } else {
        console.log('No weekly log found for today');
    }
    
    console.log('=== END DEBUG ===');
}

// Expose debug function globally
window.debugFluidInclusion = debugFluidInclusion;

// Weekly Nutrition Tracking Functions
let currentWeekOffset = 0; // 0 = current week, -1 = previous week, +1 = next week

// Auto-save function to update weekly history whenever food is added/removed
function autoSaveToWeeklyHistory(dateString, nutritionData) {
    console.log('Auto-saving to weekly history for date:', dateString); // Debug log
    try {
        // Only save if there's actual food data
        if (!nutritionData || !nutritionData.foods || nutritionData.foods.length === 0) {
            console.log('No food data to save');
            removeFromWeeklyHistory(dateString);
            return;
        }
        
        // Parse and validate the date
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            console.error('Invalid date string:', dateString);
            return;
        }
        
        // Create daily summary
        const dailySummary = {
            date: dateString, // Original ISO date string
            timestamp: date.getTime(), // Unix timestamp for consistent date handling
            displayDate: date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            }),
            foods: nutritionData.foods,
            totals: nutritionData.totals,
            savedAt: new Date().toISOString(),
            autoSaved: true // Flag to indicate this was auto-saved
        };
        
        // Get existing weekly logs
        const weeklyLogs = JSON.parse(localStorage.getItem('weeklyNutritionLogs') || '[]');
        
        // Check if this date already exists
        const existingIndex = weeklyLogs.findIndex(log => log.date === dateString);
        
        if (existingIndex !== -1) {
            // Update existing log
            weeklyLogs[existingIndex] = dailySummary;
        } else {
            // Add new log
            weeklyLogs.push(dailySummary);
        }
        
        // Sort logs by timestamp (newest first)
        weeklyLogs.sort((a, b) => b.timestamp - a.timestamp);
        
        // Keep only last 30 days to manage storage
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const thirtyDaysAgoTime = thirtyDaysAgo.getTime();
        const filteredLogs = weeklyLogs.filter(log => log.timestamp >= thirtyDaysAgoTime);
        
        // Save back to localStorage
        localStorage.setItem('weeklyNutritionLogs', JSON.stringify(filteredLogs));
        console.log('Auto-saved to weekly history, total logs:', filteredLogs.length); // Debug log
        
        // If weekly history is currently visible, refresh it
        const historySection = document.getElementById('weeklyHistorySection');
        if (historySection && !historySection.classList.contains('hidden')) {
            console.log('Refreshing weekly history view...'); // Debug log
            loadWeeklyHistory();
        }
        
    } catch (error) {
        console.error('Error auto-saving to weekly history:', error);
    }
}

// Function to remove a date from weekly history when no food data exists
function removeFromWeeklyHistory(dateString) {
    try {
        const weeklyLogs = JSON.parse(localStorage.getItem('weeklyNutritionLogs') || '[]');
        const filteredLogs = weeklyLogs.filter(log => log.date !== dateString);
        
        if (filteredLogs.length !== weeklyLogs.length) {
            localStorage.setItem('weeklyNutritionLogs', JSON.stringify(filteredLogs));
            console.log('Removed empty day from weekly history:', dateString);
            
            // Refresh weekly history if visible
            const historySection = document.getElementById('weeklyHistorySection');
            if (historySection && !historySection.classList.contains('hidden')) {
                loadWeeklyHistory();
            }
        }
    } catch (error) {
        console.error('Error removing from weekly history:', error);
    }
}

// Function to sync existing daily nutrition data to weekly history
function syncExistingDataToWeeklyHistory() {
    console.log('Syncing existing daily nutrition data to weekly history...');
    try {
        // Find all nutrition keys in localStorage
        const nutritionKeys = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('nutrition_')) {
                nutritionKeys.push(key);
            }
        }
        
        console.log('Found existing nutrition keys:', nutritionKeys);
        
        // Process each daily nutrition entry
        nutritionKeys.forEach(key => {
            const dateString = key.replace('nutrition_', '');
            const nutritionData = JSON.parse(localStorage.getItem(key) || '{"foods": [], "totals": {"calories": 0, "protein": 0, "fluids": 0}}');
            
            // Only sync if there's actual food data
            if (nutritionData.foods && nutritionData.foods.length > 0) {
                console.log(`Syncing data for ${dateString}:`, nutritionData);
                autoSaveToWeeklyHistory(dateString, nutritionData);
            }
        });
        
        console.log('Sync completed');
    } catch (error) {
        console.error('Error syncing existing data to weekly history:', error);
    }
}

function saveDailyLog() {
    console.log('saveDailyLog function called'); // Debug log
    try {
        // Get the currently selected date from the UI
        const selectedDateStr = document.getElementById('currentDate').textContent;
        console.log('Selected date string:', selectedDateStr);
        
        // Parse the date string (e.g., "Sunday, September 7, 2025")
        const selectedDate = new Date(selectedDateStr);
        // Set the time to noon to avoid timezone issues
        selectedDate.setHours(12, 0, 0, 0);
        
        const dateString = selectedDate.toISOString().split('T')[0];
        console.log('Saving log for date:', dateString); // Debug log
        
        // Get current nutrition data
        const nutritionData = JSON.parse(localStorage.getItem(`nutrition_${dateString}`) || '{"foods": [], "totals": {"calories": 0, "protein": 0, "fluids": 0}}');
        console.log('Nutrition data found:', nutritionData); // Debug log
        
        if (nutritionData.foods.length === 0) {
            alert('No food entries to save for today. Please add some foods first.');
            return;
        }
        
        // Force immediate save to weekly history using the autoSaveToWeeklyHistory function
        console.log('Forcing immediate save to weekly history...');
        autoSaveToWeeklyHistory(dateString, nutritionData);
        
        // Verify it was saved
        const weeklyLogs = JSON.parse(localStorage.getItem('weeklyNutritionLogs') || '[]');
        const todayLog = weeklyLogs.find(log => log.date === dateString);
        
        if (todayLog) {
            console.log('✅ Successfully saved to weekly history');
            alert(`✅ Daily log saved successfully!\n\nFood items: ${nutritionData.foods.length}\nTotal calories: ${nutritionData.totals.calories}\nTotal protein: ${nutritionData.totals.protein}g\nTotal fluids: ${nutritionData.totals.fluids}ml`);
        } else {
            console.log('❌ Failed to save to weekly history');
            alert('❌ Error saving to weekly history. Please try again.');
            return;
        }
        
        // Always refresh weekly history immediately after saving
        console.log('Refreshing weekly history view...'); // Debug log
        
        // If weekly history is currently visible, refresh it
        const historySection = document.getElementById('weeklyHistorySection');
        if (historySection && !historySection.classList.contains('hidden')) {
            loadWeeklyHistory();
        }
        
        // Also auto-open weekly history after saving to show the updated data
        setTimeout(() => {
            viewWeeklyHistory();
        }, 500);
        
    } catch (error) {
        console.error('Error saving daily log:', error);
        alert('Error saving daily log. Please try again.');
    }
}

function viewWeeklyHistory() {
    console.log('viewWeeklyHistory function called'); // Debug log
    try {
        const historySection = document.getElementById('weeklyHistorySection');
        const foodLogSection = document.querySelector('.food-log');
        
        console.log('History section found:', !!historySection); // Debug log
        console.log('Food log section found:', !!foodLogSection); // Debug log
        
        if (historySection && foodLogSection) {
            historySection.classList.remove('hidden');
            
            // Ensure navigation buttons are initialized (initializeWeeklyHistory binds by ID on DOMContentLoaded)
            // Reset to start of current week (Sunday)
            const now = new Date();
            const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            start.setDate(start.getDate() - start.getDay());
            start.setHours(12,0,0,0);
            currentWeekStart = start;
            
            // Load the weekly data
            loadWeeklyHistory();
            
            // Scroll to history section
            historySection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        } else {
            console.error('Required elements not found for weekly history');
            alert('Unable to load weekly history. Please try refreshing the page.');
        }
    } catch (error) {
        console.error('Error viewing weekly history:', error);
        alert('Error loading weekly history. Please try again.');
    }
}

function hideWeeklyHistory() {
    const historySection = document.getElementById('weeklyHistorySection');
    if (historySection) {
        historySection.classList.add('hidden');
    }
}

function initializeWeeklyHistory() {
    // Add event listeners for week navigation
    const historySection = document.getElementById('weeklyHistorySection');
    if (!historySection) return;
    const prevWeekBtn = document.getElementById('prevWeekBtn');
    const nextWeekBtn = document.getElementById('nextWeekBtn');

    if (prevWeekBtn) {
        prevWeekBtn.addEventListener('click', () => changeWeek(-1));
    }
    if (nextWeekBtn) {
        nextWeekBtn.addEventListener('click', () => changeWeek(1));
    }
}

// Call this when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeWeeklyHistory();
    
    // Initialize the current week display
    const weekDisplay = document.getElementById('currentWeekDisplay');
    if (weekDisplay) {
        const range = getWeekRange(currentWeekStart);
        weekDisplay.textContent = formatWeekRange(range);
    }
});

function clearWeeklyHistory() {
    console.log('clearWeeklyHistory function called'); // Debug log
    
    // Confirm with user before clearing
    const confirmClear = confirm(
        'Are you sure you want to clear all weekly nutrition history?\n\n' +
        'This action cannot be undone and will permanently delete all saved daily logs.\n\n' +
        'Click OK to proceed or Cancel to keep your data.'
    );
    
    if (!confirmClear) {
        return;
    }
    
    try {
        // Clear weekly logs from localStorage
        localStorage.removeItem('weeklyNutritionLogs');
        
        // Also clear any daily nutrition data that might exist
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('nutrition_')) {
                keysToRemove.push(key);
            }
        }
        
        keysToRemove.forEach(key => {
            localStorage.removeItem(key);
        });
        
        console.log('Cleared weekly history and daily nutrition data'); // Debug log
        
        // Refresh the weekly history view to show empty state
        if (document.getElementById('weeklyHistorySection') && !document.getElementById('weeklyHistorySection').classList.contains('hidden')) {
            loadWeeklyHistory();
        }
        
        // Also refresh today's tracking display
        const today = new Date();
        const dateString = today.toISOString().split('T')[0];
        loadNutritionData(dateString);
        
        alert('Weekly nutrition history cleared successfully!');
        
    } catch (error) {
        console.error('Error clearing weekly history:', error);
        alert('Error clearing history. Please try again.');
    }
}

function navigateWeek(direction) {
    const days = direction === 'previous' ? -7 : 7;
    currentWeekStart.setDate(currentWeekStart.getDate() + days);
    loadWeeklyHistory();
}

// Week navigation handler for the UI buttons
function changeWeek(offset) {
    console.log('Changing week by offset:', offset);
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + (offset * 7));
    // Set to noon to avoid timezone issues
    newDate.setHours(12, 0, 0, 0);
    currentWeekStart = newDate;
    loadWeeklyHistory();
}

function loadWeeklyHistory() {
    console.log('loadWeeklyHistory function called'); // Debug log
    try {
        // Initialize weekly logs if not exists or if it's not an array
        const storedLogs = localStorage.getItem('weeklyNutritionLogs');
        let weeklyLogs = [];
        
        try {
            const parsedLogs = JSON.parse(storedLogs);
            weeklyLogs = Array.isArray(parsedLogs) ? parsedLogs : [];
        } catch (e) {
            console.error('Error parsing weekly logs, resetting to empty array:', e);
            localStorage.setItem('weeklyNutritionLogs', '[]');
        }
        
    const historyContent = document.getElementById('weeklyHistoryContent');
    const weekDisplay = document.getElementById('currentWeekDisplay');
        
        if (!historyContent) {
            console.error('History content element not found');
            return;
        }
        
        // Get week range first and display it
        const weekRange = getWeekRange(currentWeekStart);
        if (weekDisplay) {
            weekDisplay.textContent = formatWeekRange(weekRange);
        }

        // Week data initialization
        let weekData = {
            days: [],
            averages: {
                calories: 0,
                protein: 0,
                fluids: 0
            }
        };
        
    // Calculate week range using the currentWeekStart as the week's starting date
    let startOfWeek = new Date(currentWeekStart);
    startOfWeek.setHours(0, 0, 0, 0);
    let endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);
        
        console.log('Week range:', startOfWeek.toISOString(), 'to', endOfWeek.toISOString()); // Debug log
        // Ensure 'today' is defined locally to avoid ReferenceError when called from other scopes
        const today = new Date();
        console.log('Today info:', {
            date: today.toLocaleDateString(),
            dayOfWeek: today.getDay(),
            weekOffset: currentWeekOffset,
            weekStartDate: startOfWeek.toLocaleDateString(),
            weekEndDate: endOfWeek.toLocaleDateString(),
            isCurrentWeekMode: currentWeekOffset === 0
        }); // Debug log
        
    // weekDisplay already set above to the formatted range
        
        // Filter logs for this week
        const weekLogs = weeklyLogs.filter(log => {
            try {
                // Handle both timestamp and date string formats
                const logDate = log.timestamp ? new Date(log.timestamp) : new Date(log.date);
                
                // Reset hours to avoid timezone issues
                logDate.setHours(0, 0, 0, 0);
                
                console.log('Checking log:', {
                    date: log.date,
                    parsed: logDate.toISOString(),
                    start: startOfWeek.toISOString(),
                    end: endOfWeek.toISOString()
                });
                
                return logDate >= startOfWeek && logDate <= endOfWeek;
            } catch (e) {
                console.error('Error processing log:', log, e);
                return false;
            }
        });
        
        console.log('Logs for current week:', weekLogs.length); // Debug log
        
        if (weekLogs.length === 0) {
            historyContent.innerHTML = `
                <div class="empty-log">
                    <i class="fas fa-calendar-times" style="font-size: 2rem; margin-bottom: 1rem; color: var(--gray-400);"></i>
                    <p>No saved nutrition logs for this week.</p>
                    <p style="font-size: 0.9rem; margin-top: 0.5rem; color: var(--gray-500);">Start tracking your daily nutrition and save logs to build your weekly history!</p>
                </div>
            `;
            return;
        }
        
        // Calculate weekly averages
        const weeklyTotals = {
            calories: 0,
            protein: 0,
            fluids: 0,
            days: weekLogs.length
        };
        
        weekLogs.forEach(log => {
            weeklyTotals.calories += log.totals.calories;
            weeklyTotals.protein += log.totals.protein;
            weeklyTotals.fluids += log.totals.fluids;
        });
        
        const weeklyAverages = {
            calories: Math.round(weeklyTotals.calories / weeklyTotals.days),
            protein: Math.round(weeklyTotals.protein / weeklyTotals.days),
            fluids: Math.round(weeklyTotals.fluids / weeklyTotals.days)
        };
        
        // Generate HTML
        let historyHTML = `
            <div class="weekly-summary">
                <h4><i class="fas fa-chart-line"></i> Weekly Averages (${weeklyTotals.days} days logged)</h4>
                <div class="weekly-averages">
                    <div class="weekly-average">
                        <div class="weekly-average-value">${weeklyAverages.calories}</div>
                        <div class="weekly-average-label">Avg Calories/day</div>
                    </div>
                    <div class="weekly-average">
                        <div class="weekly-average-value">${weeklyAverages.protein}g</div>
                        <div class="weekly-average-label">Avg Protein/day</div>
                    </div>
                    <div class="weekly-average">
                        <div class="weekly-average-value">${weeklyAverages.fluids}ml</div>
                        <div class="weekly-average-label">Avg Fluids/day</div>
                    </div>
                </div>
            </div>
        `;
        
        // Sort logs by date (newest first)
        weekLogs.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Generate daily summaries
        weekLogs.forEach(log => {
            historyHTML += `
                <div class="daily-summary">
                    <div class="daily-summary-header">
                        <div class="daily-summary-date">
                            <i class="fas fa-calendar-day"></i> ${log.displayDate}
                        </div>
                        <div class="daily-summary-stats">
                            <div class="daily-stat">
                                <div class="daily-stat-value">${log.totals.calories}</div>
                                <div class="daily-stat-label">Calories</div>
                            </div>
                            <div class="daily-stat">
                                <div class="daily-stat-value">${log.totals.protein}g</div>
                                <div class="daily-stat-label">Protein</div>
                            </div>
                            <div class="daily-stat">
                                <div class="daily-stat-value">${log.totals.fluids}ml</div>
                                <div class="daily-stat-label">Fluids</div>
                            </div>
                            <div class="daily-stat">
                                <div class="daily-stat-value">${log.foods.length}</div>
                                <div class="daily-stat-label">Items</div>
                            </div>
                        </div>
                    </div>
                    <div class="daily-items-summary">
                        ${(() => {
                            const foods = log.foods.filter(item => item.type !== 'fluid');
                            const fluids = log.foods.filter(item => item.type === 'fluid' || (item.fluids && item.fluids > 0));
                            let itemsHTML = '';
                            
                            if (foods.length > 0) {
                                itemsHTML += `<div class="daily-foods-summary">
                                    <strong><i class="fas fa-utensils"></i> Foods logged:</strong> ${foods.map(food => food.name).join(', ')}
                                </div>`;
                            }
                            
                            if (fluids.length > 0) {
                                itemsHTML += `<div class="daily-fluids-summary">
                                    <strong><i class="fas fa-tint"></i> Fluids logged:</strong> ${fluids.map(fluid => `${fluid.name} (${fluid.amount})`).join(', ')}
                                </div>`;
                            }
                            
                            return itemsHTML;
                        })()}
                    </div>
                </div>
            `;
        });
        
        historyContent.innerHTML = historyHTML;
        console.log('Weekly history loaded successfully'); // Debug log
        
    } catch (error) {
        console.error('Error loading weekly history:', error);
        alert('Error loading weekly history. Please try again.');
    }
}

function exportWeeklyData() {
    const weeklyLogs = JSON.parse(localStorage.getItem('weeklyNutritionLogs') || '[]');
    
    if (weeklyLogs.length === 0) {
        alert('No nutrition logs to export. Please save some daily logs first.');
        return;
    }
    
    // Calculate week range
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + (currentWeekOffset * 7));
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    // Filter logs for current displayed week
    const weekLogs = weeklyLogs.filter(log => {
        const logDate = new Date(log.date);
        return logDate >= startOfWeek && logDate <= endOfWeek;
    });
    
    if (weekLogs.length === 0) {
        alert('No nutrition logs for this week to export.');
        return;
    }
    
    // Generate CSV content
    let csvContent = 'Date,Day,Calories,Protein(g),Fluids(ml),Food Items,Foods\n';
    
    weekLogs.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    weekLogs.forEach(log => {
        const foodsList = log.foods.map(food => `"${food.name} (${food.portion})"`).join('; ');
        csvContent += `"${log.date}","${log.displayDate}",${log.totals.calories},${log.totals.protein},${log.totals.fluids},${log.foods.length},"${foodsList}"\n`;
    });
    
    // Calculate and add weekly summary
    const weeklyTotals = {
        calories: weekLogs.reduce((sum, log) => sum + log.totals.calories, 0),
        protein: weekLogs.reduce((sum, log) => sum + log.totals.protein, 0),
        fluids: weekLogs.reduce((sum, log) => sum + log.totals.fluids, 0)
    };
    
    const weeklyAverages = {
        calories: Math.round(weeklyTotals.calories / weekLogs.length),
        protein: Math.round(weeklyTotals.protein / weekLogs.length),
        fluids: Math.round(weeklyTotals.fluids / weekLogs.length)
    };
    
    csvContent += '\n"WEEKLY SUMMARY",,,,,,\n';
    csvContent += `"Average per day","",${weeklyAverages.calories},${weeklyAverages.protein},${weeklyAverages.fluids},${Math.round(weekLogs.reduce((sum, log) => sum + log.foods.length, 0) / weekLogs.length)},""\n`;
    csvContent += `"Total for week","",${weeklyTotals.calories},${weeklyTotals.protein},${weeklyTotals.fluids},${weekLogs.reduce((sum, log) => sum + log.foods.length, 0)},""\n`;
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `nutrition-summary-week-${startOfWeek.toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert('Weekly nutrition summary exported successfully!');
}

// Fallback: Force recipe card background images at runtime
document.addEventListener('DOMContentLoaded', () => {
    const imageUrl = 'recipe-background-food.png';
    
    function applyRecipeBackgrounds() {
        const recipeImages = document.querySelectorAll('.recipe-image, .recipe-image-override, .recipe-icon-header');
        console.log(`Found ${recipeImages.length} recipe image elements`);
        
        recipeImages.forEach(el => {
            if (el && el.tagName && el.tagName.toLowerCase() !== 'img') {
                // Reset all background properties first
                el.style.background = 'none';
                el.style.backgroundImage = `url("${imageUrl}")`;
                el.style.backgroundSize = 'cover';
                el.style.backgroundPosition = 'center';
                el.style.backgroundRepeat = 'no-repeat';
                el.style.backgroundAttachment = 'scroll';
                el.style.backgroundColor = 'transparent';
                el.style.opacity = '1';
                el.style.display = 'flex';
                el.style.alignItems = 'center';
                el.style.justifyContent = 'center';
                el.style.height = '180px';
                el.style.width = '100%';
                el.style.borderRadius = '10px 10px 0 0';
                
                // Force override with setProperty
                el.style.setProperty('background-image', `url("${imageUrl}")`, 'important');
                el.style.setProperty('background-size', 'cover', 'important');
                el.style.setProperty('background-position', 'center', 'important');
                el.style.setProperty('background-repeat', 'no-repeat', 'important');
                el.style.setProperty('background-color', 'transparent', 'important');
                
                console.log('Applied background to recipe image element:', el.className);
            }
        });
    }
    
    // Apply immediately and after any DOM changes
    applyRecipeBackgrounds();
    
    // Watch for recipe cards being added dynamically
    const observer = new MutationObserver(() => {
        applyRecipeBackgrounds();
    });
    
    observer.observe(document.body, { 
        childList: true, 
        subtree: true 
    });
});

// ================================
// MEDICATION & FOOD INTERACTIONS
// ================================

// Medication data storage
let medicationData = [];
let isSubmittingMedication = false; // Flag to prevent duplicate submissions

// Wait for DOM and resources to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Checking drug interactions availability...');
    // Initialize drug interactions if not already done
    if (typeof window.drugInteractions === 'undefined') {
        console.warn('Drug interactions database not found, creating empty database');
        window.drugInteractions = {};
    } else {
        console.log('Drug interactions database loaded successfully');
    }
    
    // Initialize medications
    initializeMedications();
});

// Known drug-food interactions database
const drugFoodInteractions = {
    // Chemotherapy drugs
    'methotrexate': {
        avoid: ['alcohol', 'grapefruit', 'folate supplements'],
        nutrients: ['folate depletion'],
        description: 'May interact with folate metabolism. Avoid alcohol and grapefruit.',
        risk: 'high'
    },
    'doxorubicin': {
        avoid: ['grapefruit', 'high-fat meals'],
        nutrients: ['coenzyme Q10 depletion'],
        description: 'High-fat meals may affect absorption. Grapefruit can interfere.',
        risk: 'medium'
    },
    'cisplatin': {
        avoid: ['high-sodium foods'],
        nutrients: ['magnesium depletion', 'potassium depletion'],
        description: 'Can cause kidney damage. Monitor sodium and electrolyte intake.',
        risk: 'high'
    },
    'tamoxifen': {
        avoid: ['grapefruit', 'soy supplements'],
        nutrients: ['vitamin D support'],
        description: 'Grapefruit may interfere with metabolism. Soy supplements may conflict.',
        risk: 'medium'
    },
    'cyclophosphamide': {
        avoid: ['grapefruit', 'alcohol'],
        nutrients: ['antioxidant support'],
        description: 'Avoid grapefruit and alcohol. Increase antioxidant-rich foods.',
        risk: 'medium'
    },
    'xeloda': {
        avoid: ['antacids', 'warfarin interactions', 'alcohol'],
        nutrients: ['folate depletion', 'vitamin B12 support'],
        description: 'Take without antacids. Monitor for drug interactions. Avoid alcohol.',
        risk: 'medium'
    },
    'capecitabine': {
        avoid: ['antacids', 'warfarin interactions', 'alcohol'],
        nutrients: ['folate depletion', 'vitamin B12 support'],
        description: 'Take without antacids. Monitor for drug interactions. Avoid alcohol.',
        risk: 'medium'
    },
    'gleevec': {
        avoid: ['grapefruit', 'st john\'s wort', 'high-fat meals'],
        nutrients: ['iron absorption', 'calcium support'],
        description: 'Grapefruit affects metabolism. Take with food but avoid high-fat meals.',
        risk: 'medium'
    },
    'imatinib': {
        avoid: ['grapefruit', 'st john\'s wort', 'high-fat meals'],
        nutrients: ['iron absorption', 'calcium support'],
        description: 'Grapefruit affects metabolism. Take with food but avoid high-fat meals.',
        risk: 'medium'
    },
    
    // Anti-nausea medications
    'ondansetron': {
        avoid: ['high-fiber foods during treatment'],
        nutrients: [],
        description: 'High-fiber foods may affect absorption timing.',
        risk: 'low'
    },
    'prochlorperazine': {
        avoid: ['alcohol', 'caffeine'],
        nutrients: [],
        description: 'Alcohol and caffeine may worsen side effects.',
        risk: 'medium'
    },
    
    // Pain medications
    'morphine': {
        avoid: ['alcohol', 'grapefruit'],
        nutrients: [],
        description: 'Alcohol increases sedation risk. Grapefruit may affect metabolism.',
        risk: 'high'
    },
    'tramadol': {
        avoid: ['alcohol'],
        nutrients: [],
        description: 'Alcohol increases risk of seizures and breathing problems.',
        risk: 'high'
    },
    
    // Steroids
    'prednisone': {
        avoid: ['high-sodium foods', 'simple sugars'],
        nutrients: ['calcium depletion', 'vitamin D depletion', 'potassium depletion'],
        description: 'Can cause bone loss and blood sugar changes. Limit sodium and sugar.',
        risk: 'medium'
    },
    'dexamethasone': {
        avoid: ['high-sodium foods', 'simple sugars'],
        nutrients: ['calcium support', 'vitamin D support'],
        description: 'Monitor blood sugar and bone health. Limit sodium intake.',
        risk: 'medium'
    }
};

// Nutrient depletion recommendations
const nutrientSupport = {
    'folate depletion': {
        foods: ['leafy greens', 'legumes', 'fortified cereals', 'asparagus'],
        description: 'Methotrexate can deplete folate. Include folate-rich foods.'
    },
    'coenzyme Q10 depletion': {
        foods: ['fatty fish', 'organ meats', 'whole grains', 'nuts'],
        description: 'Some chemotherapy drugs may deplete CoQ10. Consider food sources.'
    },
    'magnesium depletion': {
        foods: ['dark chocolate', 'nuts', 'seeds', 'whole grains', 'leafy greens'],
        description: 'Certain drugs can cause magnesium loss. Include magnesium-rich foods.'
    },
    'potassium depletion': {
        foods: ['bananas', 'potatoes', 'tomatoes', 'oranges', 'spinach'],
        description: 'Some medications can lower potassium. Include potassium-rich foods.'
    },
    'calcium depletion': {
        foods: ['dairy products', 'fortified plant milks', 'sardines', 'kale'],
        description: 'Steroids can affect bone health. Include calcium-rich foods.'
    },
    'vitamin D depletion': {
        foods: ['fatty fish', 'fortified foods', 'egg yolks'],
        description: 'Some medications affect vitamin D. Include food sources and consider sunlight.'
    },
    'antioxidant support': {
        foods: ['berries', 'colorful vegetables', 'green tea', 'dark chocolate'],
        description: 'Chemotherapy may increase oxidative stress. Include antioxidant-rich foods.'
    },
    'vitamin D support': {
        foods: ['salmon', 'mackerel', 'fortified milk', 'mushrooms'],
        description: 'Support bone health with vitamin D-rich foods.'
    },
    'vitamin B12 support': {
        foods: ['fish', 'meat', 'eggs', 'dairy products', 'fortified cereals'],
        description: 'Some medications may affect B12 absorption. Include B12-rich foods.'
    },
    'iron absorption': {
        foods: ['lean meats', 'spinach', 'lentils', 'fortified cereals'],
        description: 'Support iron levels with iron-rich foods and vitamin C for absorption.'
    },
    'calcium support': {
        foods: ['dairy products', 'leafy greens', 'almonds', 'fortified plant milks'],
        description: 'Maintain bone health with calcium-rich foods.'
    }
};

// Initialize medications from localStorage
function initializeMedications() {
    try {
        const savedMedications = localStorage.getItem('medications');
        if (savedMedications) {
            medicationData = JSON.parse(savedMedications);
            
            // Fix any medications with old numeric IDs
            let needsUpdate = false;
            medicationData.forEach(med => {
                if (typeof med.id !== 'string' || !med.id.startsWith('med_')) {
                    med.id = 'med_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
                    needsUpdate = true;
                }

                // Auto-detect medication type from the drugInteractions database when missing
                // or correct it if the database marks it as a cancer drug.
                try {
                    const medKey = med.name ? med.name.toLowerCase().trim() : null;
                    const known = medKey && typeof drugInteractions !== 'undefined' && drugInteractions[medKey];

                    if (!med.type) {
                        if (known && drugInteractions[medKey].type === 'cancer') {
                            med.type = 'cancer';
                        } else {
                            med.type = 'non-cancer';
                        }
                        needsUpdate = true;
                    } else if (med.type !== 'cancer' && known && drugInteractions[medKey].type === 'cancer') {
                        // If stored type is non-cancer but the DB shows it's a cancer drug, correct it
                        med.type = 'cancer';
                        needsUpdate = true;
                    }
                } catch (e) {
                    // If anything goes wrong (e.g., drugInteractions not loaded), default to non-cancer
                    if (!med.type) {
                        med.type = 'non-cancer';
                        needsUpdate = true;
                    }
                }
            });
            
            if (needsUpdate) {
                console.log('Updated medication IDs to string format');
                saveMedications();
            }
            
            console.log('Loaded medications from storage:', medicationData);
        } else {
            medicationData = [];
            console.log('No saved medications found, starting with empty array');
        }
        
        displayMedications();
        updateInteractionAlerts();
        updateNutrientRecommendations();
    } catch (error) {
        console.error('Error initializing medications:', error);
        medicationData = [];
        displayMedications();
        updateInteractionAlerts();
        updateNutrientRecommendations();
    }
}

// Save medications to localStorage
function saveMedications() {
    localStorage.setItem('medications', JSON.stringify(medicationData));
}

// Open add medication modal
function openAddMedicationModal() {
    const modal = document.getElementById('medicationModal');
    
    // Clear form first
    const form = modal.querySelector('.modal-body');
    const nameField = document.getElementById('medicationName');
    const dosageField = document.getElementById('medicationDosage');
    const frequencyField = document.getElementById('medicationFrequency');
    const timeField = document.getElementById('medicationTime');
    const notesField = document.getElementById('medicationNotes');
    
    if (nameField) nameField.value = '';
    if (dosageField) dosageField.value = '';
    if (frequencyField) frequencyField.value = 'once-daily';
    if (timeField) timeField.value = 'with-food';
    if (notesField) notesField.value = '';
    
    // Log current medications for user reference
    if (medicationData.length > 0) {
        console.log('Current medications (to avoid duplicates):', medicationData.map(med => med.name).join(', '));
    }
    
    // Show modal
    modal.classList.remove('hidden');
    
    // Focus on name field after a brief delay
    setTimeout(() => {
        if (nameField) {
            nameField.focus();
        }
    }, 150);
}

// Close medication modal
function closeMedicationModal() {
    const modal = document.getElementById('medicationModal');
    modal.classList.add('hidden');
}

// Medication name auto-detection helpers
function normalizeKey(str) {
    return String(str || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

// Simple fuzzy contains match (case-insensitive) for partial matches
function fuzzyMatchName(input, candidate) {
    if (!input || !candidate) return false;
    const inorm = input.toLowerCase().trim();
    const cnorm = candidate.toLowerCase().trim();
    return cnorm.includes(inorm) || inorm.includes(cnorm);
}

let medDetectTimer = null;
function detectMedicationTypeForInput() {
    const nameField = document.getElementById('medicationName');
    const hintEl = document.getElementById('medTypeHint');
    const hiddenField = document.getElementById('medicationTypeHidden');
    if (!nameField || !hintEl || !hiddenField) return;

    const name = nameField.value.trim();
    if (!name) {
        hintEl.textContent = '';
        hiddenField.value = '';
        return;
    }

    // Debounce while typing
    if (medDetectTimer) clearTimeout(medDetectTimer);
    medDetectTimer = setTimeout(() => {
        try {
            if (typeof drugInteractions === 'undefined') {
                hintEl.textContent = 'Type: Unknown (drug DB not loaded)';
                hiddenField.value = '';
                return;
            }

            const normalizedInput = normalizeKey(name);
            let detected = null;

            // 1) exact normalized key match
            if (drugInteractions[normalizedInput]) {
                detected = drugInteractions[normalizedInput].type;
            }

            // 2) exact match on stored data.name
            if (!detected) {
                for (const data of Object.values(drugInteractions)) {
                    if (normalizeKey(data.name) === normalizedInput) {
                        detected = data.type;
                        break;
                    }
                }
            }

            // 3) fuzzy/partial match
            if (!detected) {
                for (const data of Object.values(drugInteractions)) {
                    if (fuzzyMatchName(name, data.name)) {
                        detected = data.type;
                        break;
                    }
                }
            }

            // Update UI
            if (detected === 'cancer') {
                hintEl.textContent = 'Detected: Cancer medication';
                hiddenField.value = 'cancer';
            } else if (detected === 'non-cancer') {
                hintEl.textContent = 'Detected: Non-cancer medication';
                hiddenField.value = 'non-cancer';
            } else {
                hintEl.textContent = 'Detected: Unknown; defaulting to Non-cancer when saved';
                hiddenField.value = '';
            }
        } catch (e) {
            console.error('Medication detection failed:', e);
            hintEl.textContent = '';
            hiddenField.value = '';
        }
    }, 350);
}

// Bind auto-detection on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    const nameField = document.getElementById('medicationName');
    if (nameField) {
        nameField.addEventListener('input', detectMedicationTypeForInput);
        nameField.addEventListener('blur', detectMedicationTypeForInput);
    }
});

// Add medication
function addMedication() {
    // Prevent duplicate submissions
    if (isSubmittingMedication) {
        console.log('Already submitting medication, preventing duplicate');
        return;
    }
    
    isSubmittingMedication = true;
    
    try {
        console.log('Starting medication addition...');
        
        // Verify drug interactions database is available
        if (typeof window.drugInteractions === 'undefined') {
            console.warn('Drug interactions database not available, will proceed without it');
        }

        const nameField = document.getElementById('medicationName');
        const dosageField = document.getElementById('medicationDosage');
        const frequencyField = document.getElementById('medicationFrequency');
        const timeField = document.getElementById('medicationTime');
        const notesField = document.getElementById('medicationNotes');
        
        if (!nameField) {
            console.error('Medication name field not found');
            alert('Error: Could not find form fields. Please try again.');
            isSubmittingMedication = false;
            return;
        }
        
        const name = nameField.value.trim();
        const dosage = dosageField ? dosageField.value.trim() : '';
        const frequency = frequencyField ? frequencyField.value : 'once-daily';
        const time = timeField ? timeField.value : 'with-food';
        const notes = notesField ? notesField.value.trim() : '';
        
        if (!name) {
            alert('Please enter a medication name.');
            nameField.focus();
            isSubmittingMedication = false;
            return;
        }
        
        // Check for duplicate medication names
        const existingMedication = medicationData.find(med => 
            med.name.toLowerCase() === name.toLowerCase()
        );
        
        if (existingMedication) {
            const message = `A medication named "${name}" already exists.\n\n` +
                          `Current entry: ${existingMedication.dosage || 'No dosage'}, ${formatFrequency(existingMedication.frequency)}\n\n` +
                          `Do you want to add another entry for the same medication?\n\n` +
                          `• Click OK to add anyway (e.g., different dosage)\n` +
                          `• Click Cancel to change the medication name`;
            
            const userChoice = confirm(message);
            if (!userChoice) {
                console.log('User cancelled adding duplicate medication');
                isSubmittingMedication = false; // Reset flag immediately
                // Clear the medication name field so user can enter a different name
                if (nameField) {
                    nameField.value = '';
                    nameField.focus();
                }
                return; // Exit early if user cancels
            }
        }
        
    // get medication type from hidden detected field, then form (cancer / non-cancer), then drug interactions DB
    let medType = document.getElementById('medicationTypeHidden')?.value || document.querySelector('input[name="medicationType"]:checked')?.value;
        
        // Try to get type from drug interactions database by normalizing the name
        const normalizedName = name.toLowerCase().trim().replace(/\s+/g, '');
        try {
            // First check exact key match
            if (!medType && drugInteractions[normalizedName]) {
                medType = drugInteractions[normalizedName].type;
                console.log(`Found medication type by exact key match: ${medType}`);
            }
            
            // If no match, try case-insensitive name matching
            if (!medType) {
                for (const [key, data] of Object.entries(drugInteractions)) {
                    const keyNormalized = key.toLowerCase().replace(/\s+/g, '');
                    const nameNormalized = data.name.toLowerCase().replace(/\s+/g, '');
                    if (normalizedName === keyNormalized || normalizedName === nameNormalized) {
                        medType = data.type;
                        console.log(`Found medication type by normalized name match: ${medType}`);
                        break;
                    }
                }
            }
        } catch (e) {
            console.error('Error checking drug type:', e);
        }
        
        // Default to non-cancer if no type found
        if (!medType) medType = 'non-cancer';

        const medication = {
            id: 'med_' + Date.now() + '_' + Math.floor(Math.random() * 1000), // String ID to avoid parsing issues
            type: medType,
            name: name,
            dosage: dosage,
            frequency: frequency,
            time: time,
            notes: notes,
            dateAdded: new Date().toISOString()
        };
        
        console.log('Adding medication:', medication);
        
        medicationData.push(medication);
        saveMedications();
        
        // Update display without changing sections
        displayMedications();
        updateInteractionAlerts();
        updateNutrientRecommendations();
        closeMedicationModal();
        
        console.log('Total medications after adding:', medicationData.length);
        console.log('Medication added successfully and display updated');
        
    } catch (error) {
        console.error('Error adding medication:', error);
        alert('Error adding medication: ' + (error.message || 'Please try again.'));
    } finally {
        // Reset submission flag
        isSubmittingMedication = false;
    }
    
    // For debugging
    console.log('Current medication data:', medicationData);
    console.log('Drug interactions database available:', typeof drugInteractions !== 'undefined');
}

// Remove medication
function removeMedication(medicationId) {
    try {
        console.log('Removing medication with ID:', medicationId);
        
        // Find the medication first
        const foundMedication = medicationData.find(med => 
            med.id === medicationId || 
            med.id.toString() === medicationId.toString() || 
            String(med.id) === String(medicationId)
        );
        
        if (!foundMedication) {
            console.error('No medication found with ID:', medicationId);
            alert('Error: Could not find medication to remove.');
            return;
        }
        
        console.log('Found medication to remove:', foundMedication.name);
        
        if (confirm('Are you sure you want to remove this medication?')) {
            const originalLength = medicationData.length;
            
            // Remove the medication
            medicationData = medicationData.filter(med => {
                const keep = !(med.id === medicationId || 
                              med.id.toString() === medicationId.toString() || 
                              String(med.id) === String(medicationId));
                return keep;
            });
            
            if (medicationData.length === originalLength) {
                console.warn('Filter failed to remove medication');
                alert('Error: Could not remove medication. Please try again.');
                return;
            }
            
            console.log('Medication removed successfully. New count:', medicationData.length);
            
            saveMedications();
            
            // Update display without changing sections
            displayMedications();
            updateInteractionAlerts();
            updateNutrientRecommendations();
            
            console.log('Medication removal completed and display updated');
        } else {
            console.log('User cancelled removal');
        }
    } catch (error) {
        console.error('Error removing medication:', error);
        alert('Error removing medication. Please try again.');
    }
}

// Edit medication
function editMedication(medicationId) {
    try {
        console.log('Editing medication with ID:', medicationId);
        
        // Find the medication to edit
        const medicationToEdit = medicationData.find(med => 
            med.id === medicationId || 
            med.id.toString() === medicationId.toString() || 
            String(med.id) === String(medicationId)
        );
        
        if (!medicationToEdit) {
            console.error('No medication found with ID:', medicationId);
            alert('Error: Could not find medication to edit.');
            return;
        }
        
        console.log('Found medication to edit:', medicationToEdit.name);
        
        // Set global variable to track editing mode
        window.editingMedicationId = medicationId;
        
        // Pre-fill the modal with existing data
        document.getElementById('medicationName').value = medicationToEdit.name || '';
        document.getElementById('medicationDosage').value = medicationToEdit.dosage || '';
        document.getElementById('medicationFrequency').value = medicationToEdit.frequency || '';
        document.getElementById('medicationTime').value = medicationToEdit.time || '';
        document.getElementById('medicationNotes').value = medicationToEdit.notes || '';
        
        // Update modal title and button text to indicate editing
        const modal = document.getElementById('medicationModal');
        const modalTitle = modal.querySelector('h3');
        const submitBtn = modal.querySelector('button[onclick="addMedication()"]');
        
        if (modalTitle) modalTitle.textContent = 'Edit Medication';
        if (submitBtn) {
            submitBtn.textContent = 'Update Medication';
            submitBtn.setAttribute('onclick', 'updateMedication()');
        }
        
        // Show the modal
        modal.classList.remove('hidden');
        
    } catch (error) {
        console.error('Error editing medication:', error);
        alert('Error editing medication. Please try again.');
    }
}

// Update medication (called when editing)
function updateMedication() {
    try {
        if (!window.editingMedicationId) {
            console.error('No medication ID found for editing');
            alert('Error: No medication selected for editing.');
            return;
        }
        
        // Prevent duplicate submissions
        if (isSubmittingMedication) {
            console.log('Already submitting medication, preventing duplicate');
            return;
        }
        
        isSubmittingMedication = true;
        
        const nameField = document.getElementById('medicationName');
        const dosageField = document.getElementById('medicationDosage');
        const frequencyField = document.getElementById('medicationFrequency');
        const timeField = document.getElementById('medicationTime');
        const notesField = document.getElementById('medicationNotes');
        
        if (!nameField || !dosageField || !frequencyField || !timeField) {
            console.error('Required medication form fields not found');
            alert('Error: Form fields not found. Please refresh the page.');
            return;
        }
        
        const name = nameField.value.trim();
        const dosage = dosageField.value.trim();
        const frequency = frequencyField.value;
        const time = timeField.value;
        const notes = notesField ? notesField.value.trim() : '';
        
        if (!name) {
            alert('Please enter a medication name');
            nameField.focus();
            return;
        }
        
        if (!frequency) {
            alert('Please select a frequency');
            frequencyField.focus();
            return;
        }
        
        if (!time) {
            alert('Please select a timing');
            timeField.focus();
            return;
        }
        
        // Find and update the medication
        const medicationIndex = medicationData.findIndex(med => 
            med.id === window.editingMedicationId || 
            med.id.toString() === window.editingMedicationId.toString() || 
            String(med.id) === String(window.editingMedicationId)
        );
        
        if (medicationIndex === -1) {
            console.error('Medication not found for update');
            alert('Error: Could not find medication to update.');
            return;
        }
        
        // Update the medication
        medicationData[medicationIndex] = {
            ...medicationData[medicationIndex],
            name: name,
            dosage: dosage,
            frequency: frequency,
            time: time,
            notes: notes,
            lastUpdated: new Date().toISOString()
        };
        
        console.log('Medication updated successfully:', medicationData[medicationIndex]);
        
        // Save to localStorage
        saveMedications();
        
        // Reset form and close modal
        nameField.value = '';
        dosageField.value = '';
        frequencyField.value = '';
        timeField.value = '';
        if (notesField) notesField.value = '';
        
        // Reset modal to add mode
        const modal = document.getElementById('medicationModal');
        const modalTitle = modal.querySelector('h3');
        const submitBtn = modal.querySelector('button[onclick="updateMedication()"]');
        
        if (modalTitle) modalTitle.textContent = 'Add New Medication';
        if (submitBtn) {
            submitBtn.textContent = 'Add Medication';
            submitBtn.setAttribute('onclick', 'addMedication()');
        }
        
        // Clear editing state
        window.editingMedicationId = null;
        
        // Close modal
        modal.classList.add('hidden');
        
        // Update display and interactions
        displayMedications();
        updateInteractionAlerts();
        updateNutrientRecommendations();
        
        console.log('Medication update completed successfully');
        
    } catch (error) {
        console.error('Error updating medication:', error);
        alert('Error updating medication. Please try again.');
    } finally {
        isSubmittingMedication = false;
    }
}

// Display medications
function displayMedications() {
    console.log('Displaying medications, count:', medicationData.length);
    
    const container = document.getElementById('medicationList');
    const emptyState = document.getElementById('emptyMedicationState');
    const clearAllBtn = document.getElementById('clearAllBtn');
    
    if (!container) {
        console.error('medicationList container not found!');
        return;
    }
    
    if (medicationData.length === 0) {
        console.log('No medications to display');
        if (emptyState) emptyState.style.display = 'block';
        container.innerHTML = '';
        if (clearAllBtn) clearAllBtn.style.display = 'none';
        return;
    }
    
    console.log('Rendering', medicationData.length, 'medications');
    if (emptyState) emptyState.style.display = 'none';
    if (clearAllBtn) clearAllBtn.style.display = 'inline-block';
    
    const medicationsHTML = medicationData.map(med => {
        // Check if medication is high-risk based on drug interactions database
        const medLowerCase = med.name ? med.name.toLowerCase().trim() : '';
        const interaction = drugFoodInteractions[medLowerCase];
        const isHighRisk = interaction && interaction.risk === 'high';

        // Determine medication type robustly: prefer stored type, else infer from drugInteractions DB
        let medType = med.type ? String(med.type).toLowerCase().trim() : null;
        try {
            if (!medType && typeof drugInteractions !== 'undefined') {
                // Normalize the medication name to match against drug interactions
                const normalizedName = med.name.toLowerCase().trim().replace(/\s+/g, '');
                for (const [key, data] of Object.entries(drugInteractions)) {
                    if (normalizedName === key.toLowerCase().replace(/\s+/g, '') ||
                        normalizedName === data.name.toLowerCase().replace(/\s+/g, '')) {
                        medType = data.type;
                        break;
                    }
                }
            }
        } catch (e) {
            console.warn('Error checking drug type:', e);
        }
        if (!medType) medType = 'non-cancer';

        // If we inferred a type different from stored value, persist it so future renders use correct badge
        if (med.type !== medType) {
            med.type = medType;
            try { saveMedications(); } catch (e) { /* ignore */ }
        }

        return `
        <div class="medication-item">
            <div class="medication-header ${isHighRisk ? 'high-risk' : ''} ${medType === 'cancer' ? 'cancer-med' : 'non-cancer-med'}">
                <div class="medication-header-content">
                    <h3 class="medication-name">${escapeHtml(med.name)}</h3>
                    ${medType ? `<span class="medication-type-badge ${medType}">${medType === 'cancer' ? 'Cancer Medication' : 'Non-Cancer Medication'}</span>` : ''}
                    ${isHighRisk ? '<span class="risk-indicator">High-Risk Medication</span>' : ''}
                </div>
                <div class="medication-actions">
                    <button class="medication-edit" onclick="editMedication('${med.id}')" 
                            aria-label="Edit ${escapeHtml(med.name)}" title="Edit medication">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="medication-remove" onclick="removeMedication('${med.id}')" 
                            aria-label="Remove ${escapeHtml(med.name)}" title="Remove medication">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
            <div class="medication-content">
                <div class="medication-details">
                    ${med.dosage ? `
                        <div class="medication-detail">
                            <div class="medication-detail-label">Dosage</div>
                            <div class="medication-detail-value">${escapeHtml(med.dosage)}</div>
                        </div>
                    ` : ''}
                    <div class="medication-detail">
                        <div class="medication-detail-label">Frequency</div>
                        <div class="medication-detail-value">${formatFrequency(med.frequency)}</div>
                    </div>
                    <div class="medication-detail">
                        <div class="medication-detail-label">Timing</div>
                        <div class="medication-detail-value">${formatTiming(med.time)}</div>
                    </div>
                </div>
                ${med.notes ? `
                    <div class="medication-notes">
                        ${escapeHtml(med.notes)}
                    </div>
                ` : ''}
            </div>
        </div>
    `;
    }).join('');
    
    container.innerHTML = medicationsHTML;
    console.log('Medications displayed successfully');
}

// Clear all medications
function clearAllMedications() {
    console.log('clearAllMedications function called');
    console.log('Current medication count:', medicationData.length);
    
    // Show confirmation
    if (confirm('Are you sure you want to clear all medications? This action cannot be undone.')) {
        console.log('User confirmed clearing all medications');
        
        // Clear the medications array
        medicationData = [];
        
        // Save to localStorage
        localStorage.setItem('medications', JSON.stringify(medicationData));
        
        // Update display without changing sections
        displayMedications();
        updateInteractionAlerts();
        updateNutrientRecommendations();
        
        console.log('All medications cleared successfully and display updated');
    } else {
        console.log('User cancelled clearing medications');
    }
}

// DEBUG: Function to reset medication storage (for troubleshooting)
function resetMedicationStorage() {
    console.log('Resetting medication storage...');
    localStorage.removeItem('medications');
    medicationData = [];
    displayMedications();
    updateInteractionAlerts();
    updateNutrientRecommendations();
    console.log('Medication storage reset complete');
}

// Make it available globally for debugging
window.resetMedicationStorage = resetMedicationStorage;

// DEBUG: Function to force refresh medication display
function refreshMedicationDisplay() {
    console.log('Force refreshing medication display...');
    displayMedications();
    updateInteractionAlerts();
    updateNutrientRecommendations();
    console.log('Medication display refresh complete');
}

// Make it available globally for debugging
window.refreshMedicationDisplay = refreshMedicationDisplay;

// Update interaction alerts
function updateInteractionAlerts() {
    const container = document.getElementById('interactionAlerts');
    const alertCount = document.getElementById('alertCount');
    
    const interactions = [];
    
    console.log('Checking interactions for medications:', medicationData.map(m => m.name));
    
    medicationData.forEach(med => {
        const drugName = med.name.toLowerCase();
        console.log('Looking for interactions for:', drugName);
        const interaction = drugFoodInteractions[drugName];
        
        if (interaction) {
            console.log('Found interaction for:', drugName, interaction);
            interactions.push({
                medication: med.name,
                ...interaction
            });
        } else {
            console.log('No interaction found for:', drugName);
        }
    });
    
    console.log('Total interactions found:', interactions.length);
    alertCount.textContent = `${interactions.length} alert${interactions.length !== 1 ? 's' : ''}`;
    
    if (interactions.length === 0) {
        container.innerHTML = `
            <div class="empty-medication-state">
                <i class="fas fa-shield-alt"></i>
                <h3>No Food Interactions</h3>
                <p>No food interactions detected. Add medications to see potential conflicts.</p>
            </div>
        `;
        return;
    }
    
    const interactionsHTML = interactions.map(interaction => `
        <div class="medication-item">
            <div class="medication-header ${interaction.risk === 'high' ? 'high-risk' : ''}">
                <div class="medication-header-content">
                    <h3 class="medication-name">${escapeHtml(interaction.medication)}</h3>
                    ${interaction.risk === 'high' ? '<span class="risk-indicator">High-Risk Medication</span>' : ''}
                </div>
                <div class="alert-badge">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
            </div>
            <div class="medication-content">
                <div class="medication-details">
                    <div class="medication-detail">
                        <div class="medication-detail-label">Warning</div>
                        <div class="medication-detail-value">${interaction.description}</div>
                    </div>
                </div>
                <div class="interaction-foods-box">
                    <div class="interaction-foods-title">Food/Drug Interactions to Avoid</div>
                    <div class="interaction-foods-list">
                        ${interaction.avoid.map((food, idx) => `<span class="food-tag">${escapeHtml(food)}</span>${idx < interaction.avoid.length - 1 ? ', ' : ''}`).join('')}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = interactionsHTML;
}

// Update nutrient recommendations
function updateNutrientRecommendations() {
    const container = document.getElementById('nutrientRecommendations');
    const nutrientCount = document.getElementById('nutrientCount');
    
    const nutrients = new Set();
    
    medicationData.forEach(med => {
        const drugName = med.name.toLowerCase();
        const interaction = drugFoodInteractions[drugName];
        
        if (interaction && interaction.nutrients) {
            interaction.nutrients.forEach(nutrient => nutrients.add(nutrient));
        }
    });
    
    const nutrientArray = Array.from(nutrients);
    nutrientCount.textContent = `${nutrientArray.length} recommendation${nutrientArray.length !== 1 ? 's' : ''}`;
    
    if (nutrientArray.length === 0) {
        container.innerHTML = `
            <div class="empty-medication-state">
                <i class="fas fa-apple-alt"></i>
                <h3>No Nutrient Recommendations</h3>
                <p>Add medications to see nutrient recommendations and dietary support.</p>
            </div>
        `;
        return;
    }
    
    const nutrientsHTML = nutrientArray.map(nutrient => {
        const support = nutrientSupport[nutrient];
        if (!support) return '';
        
        return `
            <div class="medication-item">
                <div class="medication-header">
                    <h3 class="medication-name">${formatNutrientName(nutrient)}</h3>
                    <div class="nutrient-badge">
                        <i class="fas fa-leaf"></i>
                    </div>
                </div>
                <div class="medication-content">
                    <div class="medication-details">
                        <div class="medication-detail">
                            <div class="medication-detail-label">Support</div>
                            <div class="medication-detail-value">${support.description}</div>
                        </div>
                    </div>
                    <div class="recommended-foods-box">
                        <div class="recommended-foods-title">Recommended Foods</div>
                        <div class="recommended-foods-list">
                            ${support.foods.map((food, index) => `<span class="food-recommendation">${escapeHtml(food)}</span>${index < support.foods.length - 1 ? ', ' : ''}`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = nutrientsHTML;
}

// Helper functions
function formatFrequency(frequency) {
    const frequencies = {
        'once-daily': 'Once daily',
        'twice-daily': 'Twice daily',
        'three-times-daily': 'Three times daily',
        'weekly': 'Weekly',
        'monthly': 'Monthly',
        'as-needed': 'As needed',
        'other': 'Other'
    };
    return frequencies[frequency] || frequency;
}

function formatTiming(timing) {
    const timings = {
        'with-food': 'With food',
        'before-food': 'Before food',
        'after-food': 'After food',
        'empty-stomach': 'Empty stomach',
        'anytime': 'Anytime'
    };
    return timings[timing] || timing;
}

function formatNutrientName(nutrient) {
    return nutrient.split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize medications when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeMedications();
    // Run migration to relabel medication types immediately (no reload required)
    migrateMedicationTypes();
});

// Migration: update medication.type using drugInteractions DB and re-render
function migrateMedicationTypes() {
    try {
        if (!Array.isArray(medicationData) || typeof drugInteractions === 'undefined') return;
        let changed = false;
        medicationData.forEach(med => {
            const key = med.name ? med.name.toLowerCase().trim() : null;
            if (!key) return;
            const known = drugInteractions[key];
            if (known && known.type === 'cancer' && med.type !== 'cancer') {
                med.type = 'cancer';
                changed = true;
            }
        });
        if (changed) {
            saveMedications();
            displayMedications();
            updateInteractionAlerts && updateInteractionAlerts();
            updateNutrientRecommendations && updateNutrientRecommendations();
            console.log('Medication types migrated and UI updated');
        }
    } catch (e) {
        console.warn('Migration failed:', e);
    }
}

