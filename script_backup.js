// Global Recipe Data - Organized by Cancer Patient Needs
const recipeData = {
    'general-healthy': [
        {
            id: 1,
            name: 'Greek Lentil and Feta Power Bowl',
            description: 'Mediterranean bowl with protein-rich lentils and creamy feta',
            tags: ['healthy', 'greek', 'Mediterranean', 'balanced'],
            prepTime: '25 min',
            protein: '22g',
            calories: '380',
            region: 'Mediterranean',
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
            ingredients: [
                '1 cup cooked green lentils',
                '1/2 cup crumbled feta cheese',
                '1/4 cup chopped cucumber',
                '1/4 cup cherry tomatoes, halved',
                '2 tbsp olive oil',
                '1 tbsp lemon juice',
                '1 tsp dried oregano',
                '1/4 cup red onion, diced',
                'Fresh parsley for garnish'
            ],
            instructions: [
                'Cook lentils according to package directions',
                'Drain and let cool slightly',
                'Mix olive oil, lemon juice, and oregano for dressing',
                'Combine lentils with cucumber, tomatoes, and red onion',
                'Drizzle with dressing and toss gently',
                'Top with crumbled feta and fresh parsley',
                'Serve at room temperature or chilled'
            ],
            nutritionTips: 'Lentils provide plant-based protein and fiber. Feta adds calcium and flavor.',
            cancerBenefits: 'Complete protein supports healing. Mediterranean diet linked to reduced inflammation.'
        },
        {
            id: 2,
            name: 'Korean Miyeok-guk (Seaweed Soup)',
            description: 'Nutritious, simple soup with mineral-rich seaweed',
            tags: ['healthy', 'korean', 'mineral-rich', 'light'],
            prepTime: '20 min',
            protein: '8g',
            calories: '150',
            region: 'East Asian',
            image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop',
            ingredients: [
                '1 oz dried miyeok (wakame seaweed)',
                '4 cups water',
                '1 tbsp sesame oil',
                '2 cloves garlic, minced',
                '1 tbsp soy sauce',
                '1 tsp salt',
                'Optional: tofu or beef'
            ],
            instructions: [
                'Soak seaweed in water for 30 minutes until expanded',
                'Drain and chop into bite-size pieces',
                'Heat sesame oil in pot, sauté garlic briefly',
                'Add seaweed, stir-fry for 2 minutes',
                'Add water, bring to boil',
                'Simmer 15 minutes, season with soy sauce and salt'
            ],
            nutritionTips: 'Seaweed is rich in iodine, calcium, and other minerals.',
            cancerBenefits: 'Light, easy to digest. Provides essential minerals that may be depleted during treatment.'
        },
        {
            id: 3,
            name: 'Italian Risotto in Bianco',
            description: 'Creamy, comforting rice dish without tomatoes',
            tags: ['healthy', 'italian', 'comfort', 'balanced'],
            prepTime: '25 min',
            protein: '8g',
            calories: '280',
            region: 'European',
            image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop',
            ingredients: [
                '1 cup Arborio rice',
                '4 cups warm chicken broth',
                '1/2 cup white wine',
                '1 shallot, diced',
                '2 tbsp butter',
                '1/2 cup Parmesan cheese',
                'Salt, white pepper'
            ],
            instructions: [
                'Heat broth in separate pan, keep warm',
                'Sauté shallot in butter until translucent',
                'Add rice, stir until coated, toast 2 minutes',
                'Add wine, stir until absorbed',
                'Add broth one ladle at a time, stirring constantly',
                'Continue until rice is creamy but still al dente (18-20 min)',
                'Stir in Parmesan and remaining butter',
                'Season and serve immediately'
            ],
            nutritionTips: 'Provides easily digestible carbohydrates and some protein from cheese.',
            cancerBenefits: 'Smooth, creamy texture is gentle on sore mouth. Comforting and filling.'
        }
    ],
    'symptom-management': [
        {
            id: 4,
            name: 'Moroccan Mint Tea Smoothie',
            description: 'Refreshing, digestive smoothie with mint and dates',
            tags: ['nausea-relief', 'moroccan', 'digestive', 'anti-nausea'],
            prepTime: '5 min',
            protein: '4g',
            calories: '160',
            region: 'North African',
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
            ingredients: [
                '1 cup cold green tea',
                '1/4 cup fresh mint leaves',
                '3 pitted dates',
                '1/2 cucumber, peeled',
                '1 tbsp honey',
                '1/2 cup ice',
                'Mint sprig for garnish'
            ],
            instructions: [
                'Brew green tea, let cool completely',
                'Blend all ingredients until smooth',
                'Taste and adjust sweetness',
                'Pour over ice',
                'Garnish with fresh mint sprig'
            ],
            nutritionTips: 'Green tea provides antioxidants. Mint aids digestion.',
            cancerBenefits: 'Refreshing and hydrating. Mint may help with nausea and digestive discomfort.'
        },
        {
            id: 5,
            name: 'Ginger Turmeric Golden Milk',
            description: 'Anti-inflammatory warming drink for nausea relief',
            tags: ['anti-inflammatory', 'nausea-relief', 'warming', 'indian'],
            prepTime: '10 min',
            protein: '4g',
            calories: '120',
            region: 'South Asian',
            image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop',
            ingredients: [
                '1 cup coconut milk',
                '1 tsp turmeric powder',
                '1/2 tsp fresh ginger, grated',
                '1/4 tsp cinnamon',
                'Pinch of black pepper',
                '1 tbsp honey',
                '1 tsp coconut oil'
            ],
            instructions: [
                'Warm coconut milk in a saucepan over medium heat',
                'Whisk in turmeric, ginger, cinnamon, and black pepper',
                'Simmer gently for 5 minutes',
                'Remove from heat, stir in honey and coconut oil',
                'Strain if desired for smoother texture',
                'Serve warm in a mug'
            ],
            nutritionTips: 'Turmeric has anti-inflammatory properties. Ginger helps reduce nausea.',
            cancerBenefits: 'Natural nausea relief from ginger. Anti-inflammatory compounds may support healing.'
        },
        {
            id: 6,
            name: 'Bland Rice Congee',
            description: 'Gentle, easily digestible rice porridge for upset stomachs',
            tags: ['bland', 'digestive', 'chinese', 'comfort'],
            prepTime: '45 min',
            protein: '6g',
            calories: '180',
            region: 'East Asian',
            image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop',
            ingredients: [
                '1/2 cup jasmine rice',
                '6 cups water or chicken broth',
                '1 tsp salt',
                '1 tbsp ginger, minced',
                'Optional toppings: scallions, sesame oil'
            ],
            instructions: [
                'Rinse rice until water runs clear',
                'Combine rice, water, and ginger in pot',
                'Bring to boil, then reduce to low simmer',
                'Cook 30-40 minutes, stirring occasionally',
                'Stir frequently in last 10 minutes until creamy',
                'Season with salt',
                'Serve hot with minimal toppings'
            ],
            nutritionTips: 'Easy to digest carbohydrates provide gentle energy.',
            cancerBenefits: 'Extremely gentle on sensitive stomachs. Provides hydration and calories when appetite is poor.'
        }
    ],
    'high-protein-high-calorie': [
        {
            id: 7,
            name: 'Indian Masala Chai Protein Smoothie',
            description: 'Warming spiced smoothie with protein powder and traditional chai spices',
            tags: ['high-protein', 'high-calorie', 'indian', 'smoothie'],
            prepTime: '5 min',
            protein: '25g',
            calories: '380',
            region: 'South Asian',
            image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop',
            ingredients: [
                '1 scoop vanilla protein powder',
                '1 cup whole milk',
                '1/2 banana',
                '2 tbsp almond butter',
                '1/2 tsp ground cardamom',
                '1/4 tsp ground cinnamon',
                '1/8 tsp ground ginger',
                'Pinch of black pepper',
                '1 tbsp honey',
                'Ice cubes as needed'
            ],
            instructions: [
                'Warm milk in a small saucepan with spices',
                'Let steep for 3-4 minutes, then strain',
                'Allow to cool slightly',
                'Blend with protein powder, banana, almond butter, and honey',
                'Add ice if you prefer it cold',
                'Serve in a tall glass with a sprinkle of cinnamon'
            ],
            nutritionTips: 'High in protein and healthy fats. Cardamom and ginger aid digestion.',
            cancerBenefits: 'Calorie-dense liquid nutrition. Warming spices may help with nausea and appetite.'
        },
        {
            id: 8,
            name: 'Japanese Miso-Glazed Salmon',
            description: 'Umami-rich salmon with healing miso marinade',
            tags: ['high-protein', 'high-calorie', 'japanese', 'omega-3'],
            prepTime: '20 min',
            protein: '28g',
            calories: '420',
            region: 'East Asian',
            image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=400&h=300&fit=crop',
            ingredients: [
                '4 salmon fillets (6 oz each)',
                '3 tbsp white miso paste',
                '2 tbsp rice vinegar',
                '1 tbsp honey',
                '1 tsp sesame oil',
                '1 clove garlic, minced',
                '1 tsp fresh ginger, grated',
                'Scallions and sesame seeds for garnish'
            ],
            instructions: [
                'Whisk together miso, vinegar, honey, sesame oil, garlic, and ginger',
                'Marinate salmon in mixture for 15 minutes',
                'Preheat oven to 400°F (200°C)',
                'Place salmon on lined baking sheet',
                'Bake 12-15 minutes until fish flakes easily',
                'Broil last 2 minutes for caramelization',
                'Garnish with scallions and sesame seeds'
            ],
            nutritionTips: 'Rich in omega-3 fatty acids and complete protein. Miso provides probiotics.',
            cancerBenefits: 'Anti-inflammatory omega-3s support immune function. High protein supports muscle maintenance.'
        },
        {
            id: 9,
            name: 'Brazilian Açaí Power Bowl',
            description: 'Antioxidant-rich superfood bowl with nuts and fruits',
            tags: ['high-calorie', 'high-protein', 'antioxidant', 'brazilian'],
            prepTime: '10 min',
            protein: '18g',
            calories: '520',
            region: 'South American',
            image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=400&h=300&fit=crop',
            ingredients: [
                '1 açaí packet, frozen',
                '1 banana',
                '1/2 cup granola',
                '3 tbsp almond butter',
                '1/4 cup mixed berries',
                '2 tbsp coconut flakes',
                '1 tbsp chia seeds',
                '2 tbsp protein powder',
                '1 tbsp honey'
            ],
            instructions: [
                'Blend frozen açaí packet with half banana until thick',
                'Pour into bowl',
                'Top with granola, generous almond butter drizzle',
                'Add fresh berries, sliced banana',
                'Sprinkle with coconut, chia seeds',
                'Drizzle with honey',
                'Serve immediately'
            ],
            nutritionTips: 'Açaí berries are rich in antioxidants and healthy fats.',
            cancerBenefits: 'High antioxidant content may support immune function. Very calorie-dense for energy needs.'
        }
    ],
    'texture-modified': [
        {
            id: 10,
            name: 'French Velouté Soup',
            description: 'Silky smooth vegetable soup perfect for sensitive mouths',
            tags: ['pureed', 'french', 'smooth', 'comfort'],
            prepTime: '35 min',
            protein: '6g',
            calories: '220',
            region: 'European',
            image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop',
            ingredients: [
                '2 cups mixed vegetables (carrots, leeks, celery)',
                '3 cups vegetable broth',
                '1/2 cup heavy cream',
                '2 tbsp butter',
                '1 bay leaf',
                '1/4 tsp nutmeg',
                'Salt, white pepper',
                'Fresh herbs for garnish'
            ],
            instructions: [
                'Chop vegetables into uniform pieces',
                'Sauté vegetables in butter until softened',
                'Add broth and bay leaf, simmer 20 minutes',
                'Remove bay leaf, blend soup until completely smooth',
                'Return to pot, stir in cream',
                'Season with nutmeg, salt, and white pepper',
                'Strain if desired for ultra-smooth texture',
                'Garnish with fresh herbs'
            ],
            nutritionTips: 'Vegetables provide vitamins and minerals. Cream adds calories and makes it filling.',
            cancerBenefits: 'Smooth texture is ideal for mouth sores. Nutrient-dense vegetables support recovery.'
        },
        {
            id: 11,
            name: 'Mexican Aguacate Smoothie Bowl',
            description: 'Creamy avocado breakfast bowl with tropical fruits',
            tags: ['smooth', 'healthy-fats', 'mexican', 'breakfast'],
            prepTime: '10 min',
            protein: '8g',
            calories: '380',
            region: 'Latin American',
            image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400&h=300&fit=crop',
            ingredients: [
                '1 ripe avocado',
                '1 banana, frozen',
                '1/2 cup coconut milk',
                '1 tbsp honey',
                '1 tsp lime juice',
                'Toppings: mango puree, coconut flakes, chia seeds'
            ],
            instructions: [
                'Blend avocado, banana, coconut milk until completely smooth',
                'Add honey and lime juice, blend again',
                'Pour into bowl',
                'Top with smooth mango puree, coconut flakes, and chia seeds',
                'Ensure all toppings are soft or finely ground',
                'Serve immediately for best texture'
            ],
            nutritionTips: 'Avocado provides healthy monounsaturated fats and potassium.',
            cancerBenefits: 'Smooth, cold texture soothes mouth sores. High in calories and healthy fats for weight maintenance.'
        },
        {
            id: 12,
            name: 'Scandinavian Creamy Fish Chowder',
            description: 'Rich, warming soup with salmon - can be pureed smooth',
            tags: ['smooth', 'high-protein', 'scandinavian', 'creamy'],
            prepTime: '40 min',
            protein: '22g',
            calories: '380',
            region: 'Northern European',
            image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop',
            ingredients: [
                '1 lb salmon fillet, cubed',
                '3 medium potatoes, diced',
                '1 leek, sliced',
                '2 cups fish stock',
                '1 cup heavy cream',
                '2 tbsp butter',
                '1 tbsp dill',
                'Salt, white pepper'
            ],
            instructions: [
                'Sauté leek in butter until soft',
                'Add potatoes and stock, simmer until very tender',
                'Add salmon, cook gently for 8 minutes until flaking',
                'For smooth texture: blend entire soup until completely smooth',
                'Return to pot, stir in cream',
                'Season with salt, pepper, and dill',
                'Strain if ultra-smooth texture needed'
            ],
            nutritionTips: 'High in omega-3 fatty acids and protein. Cream provides concentrated calories.',
            cancerBenefits: 'Can be made completely smooth for swallowing difficulties. Anti-inflammatory omega-3s support healing.'
        }
    ],
    'therapeutic-medical': [
        {
            id: 13,
            name: 'Middle Eastern Tahini Date Energy Balls',
            description: 'Nutrient-dense, calorie-concentrated therapeutic snacks',
            tags: ['therapeutic', 'no-cook', 'middle-eastern', 'energy-dense'],
            prepTime: '15 min',
            protein: '8g',
            calories: '220',
            region: 'Middle Eastern',
            image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop',
            ingredients: [
                '1 cup pitted dates, soaked',
                '1/2 cup tahini',
                '1/4 cup rolled oats',
                '2 tbsp honey',
                '1/4 cup chopped pistachios',
                '1 tsp vanilla extract',
                '1 tbsp protein powder',
                'Coconut flakes for rolling'
            ],
            instructions: [
                'Soak dates in warm water for 10 minutes',
                'Drain and blend dates until paste forms',
                'Mix in tahini, honey, vanilla, and protein powder',
                'Fold in oats and pistachios',
                'Chill mixture for 30 minutes',
                'Roll into 1-inch balls',
                'Roll in coconut flakes',
                'Store in refrigerator up to 1 week'
            ],
            nutritionTips: 'Tahini provides calcium and healthy fats. Dates offer natural sugars and fiber.',
            cancerBenefits: 'High calorie density helps with weight maintenance. No cooking required when energy is low. Easy portion control.'
        },
        {
            id: 14,
            name: 'Turkish Yogurt and Walnut Dip (Cevizli Yogurt)',
            description: 'Probiotic-rich therapeutic dip with anti-inflammatory properties',
            tags: ['therapeutic', 'turkish', 'no-cook', 'probiotic', 'anti-inflammatory'],
            prepTime: '10 min',
            protein: '15g',
            calories: '280',
            region: 'Middle Eastern',
            image: 'https://images.unsplash.com/photo-1563379091339-03246963d321?w=400&h=300&fit=crop',
            ingredients: [
                '1 cup Greek yogurt',
                '1/2 cup walnuts, finely chopped',
                '2 cloves garlic, minced',
                '2 tbsp olive oil',
                '1 tbsp lemon juice',
                '1 tsp dried mint',
                '1/2 tsp salt',
                '1 tbsp honey',
                'Paprika and fresh mint for garnish'
            ],
            instructions: [
                'Combine Greek yogurt with minced garlic and honey',
                'Stir in chopped walnuts and dried mint',
                'Add lemon juice and salt, mix well',
                'Drizzle with olive oil',
                'Chill for 30 minutes to meld flavors',
                'Garnish with paprika and fresh mint',
                'Serve with soft bread or vegetables'
            ],
            nutritionTips: 'Greek yogurt provides probiotics and protein. Walnuts add omega-3 fatty acids.',
            cancerBenefits: 'Probiotics support digestive health during treatment. High protein supports muscle maintenance. Anti-inflammatory properties.'
        },
        {
            id: 15,
            name: 'Medical Nutrition Bone Broth',
            description: 'Concentrated mineral and collagen-rich therapeutic broth',
            tags: ['therapeutic', 'medical-nutrition', 'bone-health', 'healing'],
            prepTime: '4-24 hours',
            protein: '12g',
            calories: '80',
            region: 'International',
            image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop',
            ingredients: [
                '2 lbs beef or chicken bones',
                '2 tbsp apple cider vinegar',
                '1 onion, quartered',
                '2 carrots, chopped',
                '2 celery stalks',
                '1 bunch parsley',
                '1 bay leaf',
                'Sea salt to taste'
            ],
            instructions: [
                'Place bones in slow cooker or pot',
                'Add vinegar, let sit 30 minutes to draw out minerals',
                'Add vegetables and herbs, cover with water',
                'Slow cook on low 12-24 hours (or simmer 4-6 hours)',
                'Skim foam occasionally',
                'Strain through fine mesh, discard solids',
                'Season with salt, store portions in freezer',
                'Reheat and sip warm as needed'
            ],
            nutritionTips: 'Rich in collagen, minerals, and amino acids that support healing.',
            cancerBenefits: 'Easy to digest liquid nutrition. Supports gut health and provides building blocks for tissue repair.'
        }
    ]
;

// Educational Resources
        {
            id: 1,
            name: 'Greek Chicken Avgolomono Soup',
            description: 'Traditional Mediterranean comfort soup with protein and probiotics',
            tags: ['high-protein', 'soft', 'mediterranean'],
            prepTime: '25 min',
            protein: '18g',
            calories: '280',
            region: 'Mediterranean',
            image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop',
            ingredients: [
                '1 lb boneless chicken breast, diced',
                '6 cups low-sodium chicken broth',
                '1/2 cup orzo or small pasta',
                '3 large eggs',
                '1/4 cup fresh lemon juice',
                '2 tbsp olive oil',
                '1 medium onion, diced',
                'Salt, pepper, fresh dill'
            ],
            instructions: [
                'Heat olive oil in large pot, sauté onion until softened',
                'Add chicken and cook until no longer pink',
                'Pour in broth, bring to boil, add orzo',
                'Simmer 10-12 minutes until pasta is tender',
                'In bowl, whisk eggs with lemon juice',
                'Slowly add 1 cup hot broth to egg mixture while whisking',
                'Return mixture to pot, stir gently, heat through without boiling',
                'Season and garnish with fresh dill'
            ],
            nutritionTips: 'Rich in complete proteins and B-vitamins. Lemon adds vitamin C for immune support.',
            cancerBenefits: 'Warm, soothing texture ideal for sore throat. High protein supports tissue repair and immune function.'
        },
        {
            id: 2,
            name: 'Japanese Miso Glazed Salmon',
            description: 'Omega-3 rich fish with umami flavors from fermented miso',
            tags: ['high-protein', 'anti-inflammatory', 'japanese'],
            prepTime: '20 min',
            protein: '35g',
            calories: '340',
            region: 'East Asian',
            image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
            ingredients: [
                '4 salmon fillets (6 oz each)',
                '3 tbsp white miso paste',
                '2 tbsp mirin',
                '1 tbsp sake (or white wine)',
                '1 tsp sesame oil',
                '1 tbsp honey',
                '2 green onions, sliced',
                'Sesame seeds for garnish'
            ],
            instructions: [
                'Preheat oven to 400°F',
                'Whisk miso, mirin, sake, sesame oil, and honey',
                'Marinate salmon in mixture for 15 minutes',
                'Place on lined baking sheet',
                'Bake 12-15 minutes until flakes easily',
                'Broil last 2 minutes for caramelization',
                'Garnish with green onions and sesame seeds'
            ],
            nutritionTips: 'Salmon provides omega-3 fatty acids and high-quality protein. Miso contains probiotics.',
            cancerBenefits: 'Anti-inflammatory omega-3s may help reduce treatment side effects. Easy to digest protein.'
        },
        {
            id: 3,
            name: 'Indian Masoor Dal (Red Lentil Curry)',
            description: 'Protein-packed Indian comfort food with warming spices',
            tags: ['high-protein', 'soft', 'indian', 'vegetarian'],
            prepTime: '30 min',
            protein: '16g',
            calories: '240',
            region: 'South Asian',
            image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop',
            ingredients: [
                '1 cup red lentils (masoor dal)',
                '3 cups water',
                '1 medium onion, diced',
                '3 garlic cloves, minced',
                '1 inch ginger, grated',
                '1 tsp turmeric',
                '1 tsp cumin seeds',
                '2 tbsp ghee or oil',
                'Salt, cilantro for garnish'
            ],
            instructions: [
                'Rinse lentils until water runs clear',
                'Boil lentils in water with turmeric for 15 minutes until soft',
                'Heat ghee, add cumin seeds until they splutter',
                'Add onion, cook until golden',
                'Add garlic, ginger, cook 1 minute',
                'Add cooked lentils, simmer 10 minutes',
                'Mash partially for creamy texture',
                'Garnish with fresh cilantro'
            ],
            nutritionTips: 'Lentils provide plant-based protein, folate, and fiber. Turmeric has anti-inflammatory properties.',
            cancerBenefits: 'Gentle, easily digestible protein. Turmeric and ginger may help reduce inflammation.'
        }
    ],
    'soft': [
        {
            id: 4,
            name: 'Chinese Congee with Ginger',
            description: 'Healing rice porridge, gentle on sensitive stomach',
            tags: ['soft', 'easy', 'chinese', 'digestive'],
            prepTime: '45 min',
            protein: '6g',
            calories: '180',
            region: 'East Asian',
            image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop',
            ingredients: [
                '1 cup jasmine rice',
                '8 cups water',
                '2 inches fresh ginger, sliced',
                '1 tsp salt',
                '2 green onions, chopped',
                '1 tbsp sesame oil',
                'Optional: cooked chicken, soft tofu'
            ],
            instructions: [
                'Rinse rice until water runs clear',
                'Bring water to boil in heavy-bottomed pot',
                'Add rice and ginger, reduce heat to low',
                'Simmer covered for 45-60 minutes, stirring occasionally',
                'Stir frequently in last 15 minutes to prevent sticking',
                'Remove ginger slices, add salt',
                'Top with green onions and drizzle with sesame oil'
            ],
            nutritionTips: 'Easy to digest carbohydrates provide gentle energy. Ginger aids digestion.',
            cancerBenefits: 'Extremely gentle on upset stomach. Ginger may help with nausea and improve appetite.'
        },
        {
            id: 5,
            name: 'French Velouté Soup',
            description: 'Silky smooth vegetable soup with cream base',
            tags: ['soft', 'vegetarian', 'french', 'comfort'],
            prepTime: '35 min',
            protein: '8g',
            calories: '220',
            region: 'European',
            image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=400&h=300&fit=crop',
            ingredients: [
                '2 cups mixed vegetables (carrot, potato, leek)',
                '3 cups vegetable broth',
                '1/2 cup heavy cream',
                '2 tbsp butter',
                '1 bay leaf',
                '1/4 tsp nutmeg',
                'Salt, white pepper',
                'Fresh herbs for garnish'
            ],
            instructions: [
                'Chop vegetables into uniform pieces',
                'Sauté vegetables in butter until softened',
                'Add broth and bay leaf, simmer 20 minutes',
                'Remove bay leaf, blend soup until completely smooth',
                'Return to pot, stir in cream',
                'Season with nutmeg, salt, and white pepper',
                'Strain if desired for ultra-smooth texture',
                'Garnish with fresh herbs'
            ],
            nutritionTips: 'Vegetables provide vitamins and minerals. Cream adds calories and makes it filling.',
            cancerBenefits: 'Smooth texture is ideal for mouth sores. Nutrient-dense vegetables support recovery.'
        },
        {
            id: 6,
            name: 'Mexican Aguacate Smoothie Bowl',
            description: 'Creamy avocado breakfast bowl with tropical fruits',
            tags: ['soft', 'healthy-fats', 'mexican', 'breakfast'],
            prepTime: '10 min',
            protein: '8g',
            calories: '320',
            region: 'Latin American',
            image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400&h=300&fit=crop',
            ingredients: [
                '1 ripe avocado',
                '1 banana, frozen',
                '1/2 cup coconut milk',
                '1 tbsp honey',
                '1 tsp lime juice',
                'Toppings: mango, coconut flakes, chia seeds'
            ],
            instructions: [
                'Blend avocado, banana, coconut milk until smooth',
                'Add honey and lime juice, blend again',
                'Pour into bowl',
                'Top with diced mango, coconut flakes, and chia seeds',
                'Serve immediately for best texture'
            ],
            nutritionTips: 'Avocado provides healthy monounsaturated fats and potassium.',
            cancerBenefits: 'Smooth, cold texture soothes mouth sores. High in calories and healthy fats for weight maintenance.'
        }
    ],
    'high-calorie': [
        {
            id: 7,
            name: 'Middle Eastern Tahini Date Energy Balls',
            description: 'Nutrient-dense balls with sesame tahini and dates',
            tags: ['high-calorie', 'no-cook', 'middle-eastern'],
            prepTime: '15 min',
            protein: '6g',
            calories: '180',
            region: 'Middle Eastern',
            image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop',
            ingredients: [
                '1 cup pitted dates, soaked',
                '1/2 cup tahini',
                '1/4 cup rolled oats',
                '2 tbsp honey',
                '1/4 cup chopped pistachios',
                '1 tsp vanilla extract',
                'Coconut flakes for rolling'
            ],
            instructions: [
                'Soak dates in warm water for 10 minutes',
                'Drain and blend dates until paste forms',
                'Mix in tahini, honey, and vanilla',
                'Fold in oats and pistachios',
                'Chill mixture for 30 minutes',
                'Roll into 1-inch balls',
                'Roll in coconut flakes',
                'Store in refrigerator up to 1 week'
            ],
            nutritionTips: 'Tahini provides calcium and healthy fats. Dates offer natural sugars and fiber.',
            cancerBenefits: 'High calorie density helps with weight maintenance. No cooking required when energy is low.'
        },
        {
            id: 8,
            name: 'Scandinavian Creamy Fish Chowder',
            description: 'Rich, warming soup with salmon and root vegetables',
            tags: ['high-calorie', 'high-protein', 'scandinavian'],
            prepTime: '40 min',
            protein: '25g',
            calories: '420',
            region: 'Northern European',
            image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop',
            ingredients: [
                '1 lb salmon fillet, cubed',
                '3 medium potatoes, diced',
                '1 leek, sliced',
                '2 cups fish stock',
                '1 cup heavy cream',
                '2 tbsp butter',
                '1 tbsp dill',
                'Salt, white pepper'
            ],
            instructions: [
                'Sauté leek in butter until soft',
                'Add potatoes and stock, simmer until tender',
                'Add salmon, cook gently for 5 minutes',
                'Stir in cream, heat through',
                'Season with salt, pepper, and dill',
                'Serve with crusty bread'
            ],
            nutritionTips: 'High in omega-3 fatty acids and protein. Cream provides concentrated calories.',
            cancerBenefits: 'Calorie-dense for weight gain. Anti-inflammatory omega-3s support healing.'
        },
        {
            id: 9,
            name: 'Brazilian Açaí Power Bowl',
            description: 'Antioxidant-rich superfood bowl with nuts and fruits',
            tags: ['high-calorie', 'antioxidant', 'brazilian'],
            prepTime: '10 min',
            protein: '12g',
            calories: '450',
            region: 'South American',
            image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=400&h=300&fit=crop',
            ingredients: [
                '1 açaí packet, frozen',
                '1 banana',
                '1/2 cup granola',
                '2 tbsp almond butter',
                '1/4 cup mixed berries',
                '1 tbsp coconut flakes',
                '1 tbsp chia seeds',
                '1 tbsp honey'
            ],
            instructions: [
                'Blend frozen açaí packet with half banana until thick',
                'Pour into bowl',
                'Top with granola, almond butter drizzle',
                'Add fresh berries, sliced banana',
                'Sprinkle with coconut, chia seeds',
                'Drizzle with honey',
                'Serve immediately'
            ],
            nutritionTips: 'Açaí berries are rich in antioxidants and healthy fats.',
            cancerBenefits: 'High antioxidant content may support immune function. Calorie-dense for energy needs.'
        }
    ],
    'easy': [
        {
            id: 10,
            name: 'Korean Miyeok-guk (Seaweed Soup)',
            description: 'Nutritious, simple soup with mineral-rich seaweed',
            tags: ['easy', 'korean', 'mineral-rich'],
            prepTime: '20 min',
            protein: '8g',
            calories: '150',
            region: 'East Asian',
            image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop',
            ingredients: [
                '1 oz dried miyeok (wakame seaweed)',
                '4 cups water',
                '1 tbsp sesame oil',
                '2 cloves garlic, minced',
                '1 tbsp soy sauce',
                '1 tsp salt',
                'Optional: tofu or beef'
            ],
            instructions: [
                'Soak seaweed in water for 30 minutes until expanded',
                'Drain and chop into bite-size pieces',
                'Heat sesame oil in pot, sauté garlic briefly',
                'Add seaweed, stir-fry for 2 minutes',
                'Add water, bring to boil',
                'Simmer 15 minutes, season with soy sauce and salt'
            ],
            nutritionTips: 'Seaweed is rich in iodine, calcium, and other minerals.',
            cancerBenefits: 'Light, easy to digest. Provides essential minerals that may be depleted during treatment.'
        },
        {
            id: 11,
            name: 'Italian Risotto in Bianco',
            description: 'Creamy, comforting rice dish without tomatoes',
            tags: ['easy', 'italian', 'comfort'],
            prepTime: '25 min',
            protein: '8g',
            calories: '280',
            region: 'European',
            image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop',
            ingredients: [
                '1 cup Arborio rice',
                '4 cups warm chicken broth',
                '1/2 cup white wine',
                '1 shallot, diced',
                '2 tbsp butter',
                '1/2 cup Parmesan cheese',
                'Salt, white pepper'
            ],
            instructions: [
                'Heat broth in separate pan, keep warm',
                'Sauté shallot in butter until translucent',
                'Add rice, stir until coated, toast 2 minutes',
                'Add wine, stir until absorbed',
                'Add broth one ladle at a time, stirring constantly',
                'Continue until rice is creamy but still al dente (18-20 min)',
                'Stir in Parmesan and remaining butter',
                'Season and serve immediately'
            ],
            nutritionTips: 'Provides easily digestible carbohydrates and some protein from cheese.',
            cancerBenefits: 'Smooth, creamy texture is gentle on sore mouth. Comforting and filling.'
        },
        {
            id: 12,
            name: 'Moroccan Mint Tea Smoothie',
            description: 'Refreshing, digestive smoothie with mint and dates',
            tags: ['easy', 'moroccan', 'digestive', 'no-cook'],
            prepTime: '5 min',
            protein: '4g',
            calories: '160',
            region: 'North African',
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
            ingredients: [
                '1 cup cold green tea',
                '1/4 cup fresh mint leaves',
                '3 pitted dates',
                '1/2 cucumber, peeled',
                '1 tbsp honey',
                '1/2 cup ice',
                'Mint sprig for garnish'
            ],
            instructions: [
                'Brew green tea, let cool completely',
                'Blend all ingredients until smooth',
                'Taste and adjust sweetness',
                'Pour over ice',
                'Garnish with fresh mint sprig'
            ],
            nutritionTips: 'Green tea provides antioxidants. Mint aids digestion.',
            cancerBenefits: 'Refreshing and hydrating. Mint may help with nausea and digestive discomfort.'
        }
    ]
};

// Educational Resources
const educationalResources = {
    'nci-nutrition-cancer': {
        title: 'Nutrition in Cancer Care (PDQ®) - 2024 Update',
        url: 'https://www.cancer.gov/about-cancer/treatment/side-effects/appetite-loss/nutrition-hp-pdq',
        description: 'Comprehensive evidence-based guidelines from NCI on nutrition during cancer treatment.',
        journalInfo: 'Updated quarterly by NCI expert panel. Referenced in over 500 peer-reviewed studies.'
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
        
        // Load section-specific content
        if (sectionId === 'recipesSection') {
            loadRecipes();
        } else if (sectionId === 'recommendationsSection') {
            loadRecommendations();
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
    // Placeholder for recommendations
}

function initializeTracking() {
    // Placeholder for tracking
}

function loadResources() {
    // Placeholder for resources
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    // Show welcome section by default
    showSection('welcomeSection');
    
    // Close modal on backdrop click
    document.addEventListener('click', (e) => {
        const modal = document.getElementById('recipeModal');
        if (e.target === modal) {
            closeRecipeModal();
        }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeRecipeModal();
        }
    });
});
