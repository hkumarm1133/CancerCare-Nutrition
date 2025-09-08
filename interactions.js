// Medication Interactions Database
const medicationInteractions = {
    cancerDrugs: [
        {
            drug: "Imatinib (Gleevec)",
            foods: ["Grapefruit", "Grapefruit juice"],
            severity: "high",
            details: "Interacts with warfarin (increased bleeding risk) and grapefruit (increases drug concentration)",
            recommendations: "Avoid grapefruit products. If on warfarin, requires close monitoring.",
            timing: "Take with food and water at the same time each day",
            monitoring: "Regular blood tests if on blood thinners",
            drugInteractions: ["Warfarin", "CYP3A4 inhibitors"]
        },
        {
            drug: "Tamoxifen",
            foods: ["None specifically"],
            severity: "high",
            details: "Metabolized by CYP2D6; significant interactions with SSRIs like fluoxetine and paroxetine",
            recommendations: "Avoid certain antidepressants (SSRIs)",
            timing: "Consistent daily timing",
            monitoring: "Regular drug level monitoring",
            drugInteractions: ["Fluoxetine", "Paroxetine", "Other SSRIs"]
        },
        {
            drug: "Cisplatin",
            foods: ["Alcohol"],
            severity: "high",
            details: "Nephrotoxic; dangerous interactions with NSAIDs (ibuprofen, naproxen)",
            recommendations: "Avoid NSAIDs, maintain good hydration",
            timing: "According to chemotherapy schedule",
            monitoring: "Regular kidney function tests",
            drugInteractions: ["NSAIDs", "Nephrotoxic medications"]
        },
        {
            drug: "Methotrexate",
            foods: ["Alcohol"],
            severity: "high",
            details: "Interacts with NSAIDs (increased toxicity), sulfa drugs, and alcohol",
            recommendations: "Avoid alcohol and NSAIDs",
            timing: "Follow prescribed schedule exactly",
            monitoring: "Liver function and blood count monitoring",
            drugInteractions: ["NSAIDs", "Sulfa drugs", "Alcohol"]
        },
        {
            drug: "Cyclophosphamide",
            foods: ["Alcohol"],
            severity: "high",
            details: "Interacts with allopurinol (increased toxicity)",
            recommendations: "Avoid allopurinol unless specifically prescribed",
            timing: "According to chemotherapy schedule",
            monitoring: "Regular blood tests",
            drugInteractions: ["Allopurinol"]
        },
        {
            drug: "Nilotinib (Tasigna)",
            foods: ["Any food", "Grapefruit products"],
            severity: "high",
            details: "Food increases drug absorption significantly",
            recommendations: "Take on an empty stomach, at least 2 hours after eating and 1 hour before next meal",
            timing: "Twice daily, 12 hours apart"
        },
        {
            drug: "Venetoclax (Venclexta)",
            foods: ["High-fat meals"],
            severity: "moderate",
            details: "High-fat foods increase drug absorption",
            recommendations: "Take with a meal and water at the same time each day",
            timing: "Once daily with first meal"
        },
        {
            drug: "Palbociclib (Ibrance)",
            foods: ["Food in general"],
            severity: "low",
            details: "Should be taken with food",
            recommendations: "Take with food at approximately the same time each day",
            timing: "Once daily with food"
        },
        {
            drug: "Erlotinib (Tarceva)",
            foods: ["Food in general"],
            severity: "high",
            details: "Food significantly increases absorption",
            recommendations: "Take on an empty stomach",
            timing: "1 hour before or 2 hours after meals"
        }
    ],
    nonCancerDrugs: [
        {
            drug: "Warfarin (Coumadin)",
            foods: ["Vitamin K rich foods", "Green vegetables", "Cranberry juice"],
            severity: "high",
            details: "Interacts with Imatinib (increased bleeding risk), many antibiotics, vitamin K foods",
            recommendations: "Consistent vitamin K intake, avoid sudden dietary changes",
            monitoring: "Regular INR monitoring required",
            drugInteractions: ["Imatinib", "Antibiotics"],
            specialNote: "Report any unusual bleeding immediately"
        },
        {
            drug: "Atorvastatin (Lipitor)",
            foods: ["Grapefruit", "Grapefruit juice"],
            severity: "high",
            details: "Interacts with grapefruit and CYP3A4 inhibitors (some cancer medications)",
            recommendations: "Avoid grapefruit products",
            monitoring: "Regular liver function tests",
            drugInteractions: ["CYP3A4 inhibitors", "Imatinib"]
        },
        {
            drug: "Metformin",
            foods: ["Alcohol", "High-carb foods"],
            severity: "moderate",
            details: "May affect blood sugar levels and increase risk of lactic acidosis",
            recommendations: "Take with meals to reduce stomach upset",
            monitoring: "Regular blood sugar monitoring"
        },
        {
            drug: "Statins",
            foods: ["Grapefruit juice", "Alcohol"],
            severity: "high",
            details: "May increase risk of muscle damage and liver problems",
            recommendations: "Avoid grapefruit products, limit alcohol",
            monitoring: "Regular liver function tests"
        },
        {
            drug: "ACE Inhibitors",
            foods: ["High-potassium foods", "Salt substitutes"],
            severity: "moderate",
            details: "May cause potassium levels to rise too high",
            recommendations: "Monitor potassium intake",
            monitoring: "Regular potassium level checks"
        },
        {
            drug: "Levothyroxine",
            foods: ["Coffee", "High-fiber foods", "Soy products"],
            severity: "moderate",
            details: "May reduce medication absorption",
            recommendations: "Take on empty stomach",
            timing: "30-60 minutes before breakfast"
        }
    ],
    drugDrug: [
        {
            drugs: ["Imatinib", "Warfarin"],
            severity: "high",
            details: "Significantly increased bleeding risk",
            recommendations: "Close monitoring of INR, may need dose adjustment",
            monitoring: "Regular blood tests and bleeding checks",
            riskLevel: "Critical interaction"
        },
        {
            drugs: ["Tamoxifen", "Fluoxetine"],
            severity: "high",
            details: "Reduced tamoxifen effectiveness due to CYP2D6 inhibition",
            recommendations: "Consider alternative antidepressant",
            monitoring: "Monitor tamoxifen efficacy",
            riskLevel: "Major interaction"
        },
        {
            drugs: ["Cisplatin", "NSAIDs"],
            severity: "high",
            details: "Increased risk of kidney damage",
            recommendations: "Avoid NSAIDs during treatment",
            monitoring: "Regular kidney function tests",
            riskLevel: "Critical interaction"
        },
        {
            drugs: ["Methotrexate", "NSAIDs"],
            severity: "high",
            details: "Increased methotrexate toxicity",
            recommendations: "Avoid NSAIDs unless specifically prescribed",
            monitoring: "Blood tests for methotrexate levels",
            riskLevel: "Critical interaction"
        },
        {
            drugs: ["Prednisone", "NSAIDs"],
            severity: "high",
            details: "Increased risk of GI bleeding",
            recommendations: "Use alternative pain relievers",
            monitoring: "Watch for signs of GI bleeding",
            riskLevel: "Major interaction"
        },
        {
            drugs: ["Cyclophosphamide", "Allopurinol"],
            severity: "high",
            details: "Increased cyclophosphamide toxicity",
            recommendations: "Avoid combination if possible",
            monitoring: "Close monitoring if combination necessary",
            riskLevel: "Major interaction"
        },
        {
            drugs: ["Metformin", "Cisplatin"],
            severity: "high",
            details: "Increased risk of nephrotoxicity",
            recommendations: "Monitor kidney function closely",
            monitoring: "Regular kidney function tests",
            riskLevel: "Major interaction"
        },
        {
            drugs: ["Immunotherapy", "Steroids"],
            severity: "high",
            details: "May reduce immunotherapy effectiveness",
            recommendations: "Avoid unless prescribed by oncologist",
            monitoring: "Regular immune system monitoring"
        },
        {
            drugs: ["Chemotherapy", "NSAIDs"],
            severity: "high",
            details: "May increase risk of bleeding and kidney problems",
            recommendations: "Use alternative pain relievers",
            monitoring: "Regular kidney function tests"
        },
        {
            drugs: ["Targeted Therapy", "Acid Reducers"],
            severity: "moderate",
            details: "May reduce absorption of targeted therapy",
            recommendations: "Specific timing needed",
            spacing: "Take acid reducers at least 2 hours after targeted therapy"
        },
        {
            drugs: ["Chemotherapy", "St. John's Wort"],
            severity: "high",
            details: "May reduce chemotherapy effectiveness",
            recommendations: "Avoid this herbal supplement",
            monitoring: "Report all supplement use to healthcare team"
        }
    ],
    nutrients: [
        {
            drug: "Metformin",
            nutrient: "Vitamin B12",
            severity: "moderate",
            details: "Long-term use may lead to B12 deficiency",
            recommendations: "Regular B12 monitoring",
            supplements: "May need B12 supplementation",
            monitoring: "Annual B12 level checks"
        },
        {
            drug: "Proton Pump Inhibitors",
            nutrient: "Magnesium, Calcium, B12, Iron",
            severity: "moderate",
            details: "May reduce absorption of these nutrients",
            recommendations: "Monitor nutrient levels",
            supplements: "May need supplementation",
            monitoring: "Regular blood tests for deficiencies"
        },
        {
            drug: "Steroids (long-term)",
            nutrient: "Calcium, Vitamin D, Potassium",
            severity: "high",
            details: "May increase risk of bone loss and electrolyte imbalance",
            recommendations: "Calcium and Vitamin D supplementation often needed",
            monitoring: "Regular bone density scans"
        },
        {
            drug: "Loop Diuretics",
            nutrient: "Potassium, Magnesium, Calcium",
            severity: "high",
            details: "May deplete these minerals",
            recommendations: "May need supplementation",
            monitoring: "Regular electrolyte monitoring"
        },
        {
            drug: "Chemotherapy",
            nutrient: "Multiple nutrients",
            severity: "high",
            details: "May affect absorption and increase needs for various nutrients",
            recommendations: "Balanced diet and possible supplementation",
            monitoring: "Regular nutritional assessment",
            specialNote: "Work with oncology dietitian"
        }
    ]
};

// Enhanced Search and Filter Functionality
class InteractionManager {
    constructor() {
        this.searchInput = null;
        this.categoryFilter = null;
        this.severityFilter = null;
        this.activeFilters = new Set();
        this.errorHandlers = new Set();
    }

    init() {
        try {
            this.setupSearch();
            this.setupEventListeners();
            this.renderInteractions();
            this.setupErrorHandling();
        } catch (error) {
            this.handleError('Initialization failed', error);
        }
    }

    setupSearch() {
        const searchInput = document.createElement('div');
        searchInput.className = 'medication-search enhanced';
        searchInput.innerHTML = `
            <div class="search-container">
                <div class="search-box">
                    <input type="text" id="medSearch" placeholder="Search medications...">
                    <button class="clear-search" aria-label="Clear search">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="filter-controls">
                    <div class="filter-group">
                        <label for="categoryFilter">Category:</label>
                        <select id="categoryFilter">
                            <option value="all">All Categories</option>
                            <option value="cancer">Cancer Medications</option>
                            <option value="nonCancer">Other Medications</option>
                            <option value="interaction">Drug Interactions</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label for="severityFilter">Risk Level:</label>
                        <select id="severityFilter">
                            <option value="all">All Severities</option>
                            <option value="high">High Risk</option>
                            <option value="moderate">Moderate Risk</option>
                            <option value="low">Low Risk</option>
                        </select>
                    </div>
                </div>
                <div class="active-filters"></div>
            </div>
        `;
        
        const container = document.querySelector('.interactions-container');
        if (!container) {
            throw new Error('Interactions container not found');
        }
        container.prepend(searchInput);
        
        this.searchInput = document.getElementById('medSearch');
        this.categoryFilter = document.getElementById('categoryFilter');
        this.severityFilter = document.getElementById('severityFilter');
    }

    setupEventListeners() {
        if (!this.searchInput || !this.categoryFilter || !this.severityFilter) {
            throw new Error('Search elements not initialized');
        }

        // Debounced search
        let searchTimeout;
        this.searchInput.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => this.filterMedications(), 300);
        });

        this.categoryFilter.addEventListener('change', () => this.filterMedications());
        this.severityFilter.addEventListener('change', () => this.filterMedications());

        // Clear search
        document.querySelector('.clear-search').addEventListener('click', () => {
            this.searchInput.value = '';
            this.filterMedications();
        });
    }

    filterMedications() {
        try {
            const searchTerm = this.searchInput.value.toLowerCase();
            const category = this.categoryFilter.value;
            const severity = this.severityFilter.value;

            // Update active filters display
            this.updateActiveFilters(searchTerm, category, severity);

            const cards = document.querySelectorAll('.interaction-card');
            let visibleCount = 0;

            cards.forEach(card => {
                const cardText = card.textContent.toLowerCase();
                const cardSeverity = card.querySelector('.interaction-severity')?.textContent;
                const cardCategory = this.getCardCategory(card);

                const matchesSearch = !searchTerm || cardText.includes(searchTerm);
                const matchesCategory = category === 'all' || cardCategory === category;
                const matchesSeverity = severity === 'all' || 
                                      (cardSeverity && cardSeverity.toLowerCase() === severity);

                const isVisible = matchesSearch && matchesCategory && matchesSeverity;
                card.style.display = isVisible ? 'block' : 'none';
                if (isVisible) visibleCount++;
            });

            // Update results count
            this.updateResultsCount(visibleCount);

        } catch (error) {
            this.handleError('Filtering failed', error);
        }
    }

    updateActiveFilters(searchTerm, category, severity) {
        const activeFilters = document.querySelector('.active-filters');
        if (!activeFilters) return;

        this.activeFilters.clear();
        let filterHTML = '';

        if (searchTerm) {
            this.activeFilters.add(`Search: ${searchTerm}`);
        }
        if (category !== 'all') {
            this.activeFilters.add(`Category: ${category}`);
        }
        if (severity !== 'all') {
            this.activeFilters.add(`Risk Level: ${severity}`);
        }

        if (this.activeFilters.size > 0) {
            filterHTML = Array.from(this.activeFilters).map(filter => `
                <span class="filter-tag">
                    ${filter}
                    <button class="remove-filter" data-filter="${filter}">×</button>
                </span>
            `).join('');
        }

        activeFilters.innerHTML = filterHTML;

        // Add click handlers for removing filters
        document.querySelectorAll('.remove-filter').forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                if (filter.startsWith('Search:')) {
                    this.searchInput.value = '';
                } else if (filter.startsWith('Category:')) {
                    this.categoryFilter.value = 'all';
                } else if (filter.startsWith('Risk Level:')) {
                    this.severityFilter.value = 'all';
                }
                this.filterMedications();
            });
        });
    }

    updateResultsCount(count) {
        let resultsDiv = document.querySelector('.results-count');
        if (!resultsDiv) {
            resultsDiv = document.createElement('div');
            resultsDiv.className = 'results-count';
            document.querySelector('.search-container').appendChild(resultsDiv);
        }
        
        resultsDiv.textContent = `Found ${count} result${count !== 1 ? 's' : ''}`;
        resultsDiv.style.display = this.activeFilters.size > 0 ? 'block' : 'none';
    }

    getCardCategory(card) {
        const parentSection = card.closest('.interaction-category');
        if (!parentSection) return 'unknown';
        
        if (parentSection.id.includes('cancer')) return 'cancer';
        if (parentSection.id.includes('nonCancer')) return 'nonCancer';
        return 'interaction';
    }

    renderInteractions() {
        try {
            // Render cancer drug interactions
            this.renderSection('cancerDrugInteractions', medicationInteractions.cancerDrugs, 
                             this.createInteractionCard.bind(this));

            // Render non-cancer drug interactions
            this.renderSection('nonCancerDrugInteractions', medicationInteractions.nonCancerDrugs, 
                             this.createInteractionCard.bind(this));

            // Render drug-drug interactions
            this.renderSection('drugDrugInteractions', medicationInteractions.drugDrug, 
                             this.createDrugDrugCard.bind(this));

            // Render nutrient considerations
            this.renderSection('nutrientConsiderations', medicationInteractions.nutrients, 
                             this.createNutrientCard.bind(this));

        } catch (error) {
            this.handleError('Rendering interactions failed', error);
        }
    }

    renderSection(containerId, data, createCardFn) {
        const container = document.getElementById(containerId);
        if (!container) {
            throw new Error(`Container '${containerId}' not found`);
        }

        // Clear existing content
        container.innerHTML = '';

        // Add section summary
        const summary = this.createSectionSummary(data);
        container.appendChild(summary);

        // Render cards
        data.forEach(item => {
            try {
                const card = createCardFn(item);
                container.appendChild(card);
            } catch (error) {
                this.handleError(`Failed to create card for ${item.drug || 'unknown drug'}`, error);
            }
        });
    }

    createSectionSummary(data) {
        const summary = document.createElement('div');
        summary.className = 'section-summary';
        const highRiskCount = data.filter(item => item.severity === 'high').length;
        
        summary.innerHTML = `
            <div class="summary-stats">
                <span class="total-count">Total: ${data.length}</span>
                ${highRiskCount > 0 ? 
                    `<span class="high-risk-count">High Risk: ${highRiskCount}</span>` : 
                    ''}
            </div>
        `;
        return summary;
    }

    setupErrorHandling() {
        this.errorHandlers.add((message, error) => {
            console.error(message, error);
            // You can add more error handlers here, like showing a user-friendly message
        });
    }

    handleError(message, error) {
        this.errorHandlers.forEach(handler => handler(message, error));
    }
}

// Create interaction card
function createInteractionCard(interaction) {
    const card = document.createElement('div');
    card.className = 'interaction-card';
    card.innerHTML = `
        <div class="interaction-header">
            <span class="interaction-severity severity-${interaction.severity}">${interaction.severity}</span>
            <h4>${interaction.drug}</h4>
        </div>
        <div class="interaction-details">
            <p><strong>Foods to Watch:</strong> ${interaction.foods.join(', ')}</p>
            <p>${interaction.details}</p>
            ${interaction.recommendations ? `
                <p><strong>Recommendations:</strong> ${interaction.recommendations}</p>
            ` : ''}
            ${interaction.timing ? `
                <p><strong>Timing:</strong> ${interaction.timing}</p>
            ` : ''}
            ${interaction.monitoring ? `
                <div class="monitoring-alert">
                    <i class="fas fa-clipboard-check"></i>
                    <span>${interaction.monitoring}</span>
                </div>
            ` : ''}
        </div>
    `;
    return card;
}

// Create drug-drug interaction card
function createDrugDrugCard(interaction) {
    const card = document.createElement('div');
    card.className = 'interaction-card';
    card.innerHTML = `
        <div class="interaction-header">
            <span class="interaction-severity severity-${interaction.severity}">${interaction.severity}</span>
            <h4>${interaction.drugs.join(' + ')}</h4>
            ${interaction.riskLevel ? `
                <span class="risk-level ${interaction.riskLevel.toLowerCase().replace(' ', '-')}">
                    ${interaction.riskLevel}
                </span>
            ` : ''}
        </div>
        <div class="interaction-details">
            <p><strong>Interaction:</strong> ${interaction.details}</p>
            ${interaction.recommendations ? `
                <p><strong>Recommendations:</strong> ${interaction.recommendations}</p>
            ` : ''}
            ${interaction.monitoring ? `
                <div class="monitoring-alert">
                    <i class="fas fa-clipboard-check"></i>
                    <span>${interaction.monitoring}</span>
                </div>
            ` : ''}
        </div>
    `;
    return card;
}

// Create nutrient consideration card
function createNutrientCard(interaction) {
    const card = document.createElement('div');
    card.className = 'interaction-card';
    card.innerHTML = `
        <div class="interaction-header">
            <span class="interaction-severity severity-${interaction.severity}">${interaction.severity}</span>
            <h4>${interaction.drug}</h4>
        </div>
        <div class="interaction-details">
            <p>${interaction.details}</p>
            ${interaction.recommendations ? `
                <p><strong>Recommendations:</strong> ${interaction.recommendations}</p>
            ` : ''}
            ${interaction.supplements ? `
                <p><strong>Supplements:</strong> ${interaction.supplements}</p>
            ` : ''}
        </div>
        <div class="nutrient-alert">
            <strong>Nutrients Affected:</strong> ${interaction.nutrient}
        </div>
        ${interaction.monitoring ? `
            <div class="monitoring-alert">
                <i class="fas fa-clipboard-check"></i>
                <span>${interaction.monitoring}</span>
            </div>
        ` : ''}
        ${interaction.specialNote ? `
            <div class="special-note">
                <i class="fas fa-exclamation-circle"></i>
                <span>${interaction.specialNote}</span>
            </div>
        ` : ''}
    `;
    return card;
}

// Initialize interactions when the page loads
document.addEventListener('DOMContentLoaded', renderInteractions);

// Export for use in other files
export { medicationInteractions, renderInteractions };
