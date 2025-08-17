// Global CAM Recipe Data - Organized by Holistic & Complementary Medicine Approaches
// Global variables for user recommendations
let currentUserRecommendedFilters = [];

// Global object for user holistic preferences
let userHolisticPreferences = {
    approach: 'conventional',
    traditions: [],
    mindBody: [],
    constitution: ''
};

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

// Enhanced CAM Recipe Data Structure
const camRecipeData = {
    'ayurveda': [
        {
            id: 'ayur_001',
            name: 'Golden Turmeric Khichdi',
            description: 'Traditional Ayurvedic healing porridge with mung dal and basmati rice',
            tradition: 'Ayurveda',
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
        }
    ],
    'tcm': [
        {
            id: 'tcm_001',
            name: 'Healing Congee with Goji Berries',
            description: 'Traditional Chinese rice porridge for blood nourishment and energy restoration',
            tradition: 'Traditional Chinese Medicine',
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
        }
    ],
    'herbal-remedies': [
        {
            id: 'herb_001',
            name: 'Immune-Boosting Green Tea Blend',
            description: 'Adaptogenic herbal tea with green tea, astragalus, and ginger',
            tradition: 'Global Herbalism',
            origin: 'Traditional herbalism worldwide',
            purpose: 'Immune support, antioxidant protection, energy balance',
            prepTime: '10 min',
            servings: '2',
            image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop',
            ingredients: [
                '2 tsp high-quality green tea',
                '1 tsp dried astragalus root',
                'Â½ tsp fresh ginger, grated',
                '1 tsp raw honey (optional)',
                '2 cups filtered water',
                'Lemon slice for serving'
            ],
            instructions: [
                'Bring water to 175Â°F (just before boiling)',
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
        }
    ],
    'functional-foods': [
        {
            id: 'func_001',
            name: 'Omega-3 Rich Chia Seed Pudding',
            description: 'Nutrient-dense pudding with chia seeds, berries, and plant-based milk',
            tradition: 'Modern Functional Nutrition',
            origin: 'Contemporary nutritional science',
            purpose: 'Omega-3 delivery, antioxidant support, sustained energy',
            prepTime: '5 min + 4 hours chilling',
            servings: '2',
            image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400&h=300&fit=crop',
            ingredients: [
                'Â¼ cup black chia seeds',
                '1 cup unsweetened almond milk',
                '2 tbsp pure maple syrup',
                'Â½ tsp vanilla extract',
                'Â½ cup mixed berries',
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
        }
    ],
    'mind-body-energy': [
        {
            id: 'mind_001',
            name: 'Meditation Moon Milk',
            description: 'Calming bedtime drink with adaptogenic herbs and warm spices',
            tradition: 'Mind-Body Medicine',
            origin: 'Ancient Ayurveda + Modern Adaptation',
            purpose: 'Stress reduction, sleep support, nervous system calming',
            prepTime: '8 min',
            servings: '1',
            image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop',
            ingredients: [
                '1 cup coconut or oat milk',
                'Â½ tsp ashwagandha powder',
                'Â¼ tsp turmeric powder',
                'â…› tsp ground cardamom',
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
        }
    ]
};

// Educational Resources
const educationalResources = {
