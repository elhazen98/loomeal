export const RandomFunFact = () => {
    const funFacts = [
        "Carrots were originally purple, not orange!",
        "Eating slowly can help you feel fuller.",
        "Broccoli contains more vitamin C than oranges.",
        "Eating dinner too late can disrupt your sleep.",
        "Turmeric has natural anti-inflammatory properties.",
        "Eggs are a complete source of protein.",
        "Staying hydrated helps with focus and energy.",
        "Fiber helps lower cholesterol and supports digestion.",
        "Avocados contain healthy fats that are good for the brain.",
        "Too much sugar can temporarily weaken the immune system.",
        "Chewing gum can help reduce stress.",
        "Mushrooms contain natural vitamin D from sunlight.",
        "Ginger can help relieve nausea.",
        "Breakfast is important for a healthy metabolism.",
        "Getting enough sleep is just as important as eating healthy.",
        "Apples give you more energy than coffee in the morning.",
        "Drinking water before meals can aid in weight loss.",
        "Chili peppers can boost your metabolism.",
        "Bananas can help improve your mood, they contain tryptophan!",
        "Yogurt contains probiotics that support gut health.",
        "Green tea is rich in antioxidants and boosts brain function.",
        "Oranges are not the only fruit high in vitamin C, kiwis have more!",
        "Chewing your food thoroughly improves digestion.",
        "Cucumbers are 95% water, great for hydration.",
        "A handful of berries a day supports heart health.",
        "Eating too fast can lead to overeating.",
        "Cinnamon can help regulate blood sugar levels.",
        "Sweet potatoes are rich in vitamin A and fiber.",
        "Garlic strengthens the immune system naturally.",
        "Staying active improves not just physical but mental health too.",
        "Skipping meals can slow down your metabolism.",
        "Omega-3 fatty acids in fish support brain health.",
        "Leafy greens like spinach help strengthen bones.",
    ];

    const randomIndex = Math.floor(Math.random() * funFacts.length);
    return funFacts[randomIndex];
};
