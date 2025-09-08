// Medication display and interaction handling
const medicationDisplay = {
    addMedication(medication) {
        const medicationsContainer = document.querySelector('.medications-list');
        const medicationCard = document.createElement('div');
        medicationCard.className = `medication-card ${medication.type}-medication`;
        
        medicationCard.innerHTML = `
            <div class="medication-header">
                <h3>${medication.name}</h3>
                <span class="medication-type-badge ${medication.type}">
                    ${medication.type === 'cancer' ? 'Cancer Medication' : 'Non-Cancer Medication'}
                </span>
            </div>
            <div class="medication-details">
                <p><strong>Dosage:</strong> ${medication.dosage}</p>
                <p><strong>Frequency:</strong> ${this.formatFrequency(medication.frequency)}</p>
                <p><strong>Best Time:</strong> ${this.formatBestTime(medication.bestTimeToTake)}</p>
                ${medication.notes ? `<p><strong>Notes:</strong> ${medication.notes}</p>` : ''}
            </div>
            <div class="interaction-warnings">
                ${this.generateInteractionWarnings(medication)}
            </div>
            <div class="medication-actions">
                <button class="btn btn-icon edit-medication" data-id="${medication.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-icon delete-medication" data-id="${medication.id}">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;

        medicationsContainer.appendChild(medicationCard);
        this.checkInteractions();
    },

    generateInteractionWarnings(medication) {
        const interactions = this.findInteractions(medication);
        if (!interactions.length) return '';

        return `
            <div class="interactions-panel">
                <h4><i class="fas fa-exclamation-triangle"></i> Drug Interactions</h4>
                ${interactions.map(interaction => `
                    <div class="interaction-warning severity-${interaction.severity.toLowerCase()}">
                        <div class="interaction-header">
                            <span class="severity-badge">${interaction.severity}</span>
                            <p>With: ${interaction.withMedication}</p>
                        </div>
                        <p class="effect">${interaction.effect}</p>
                        <p class="recommendation">${interaction.recommendation}</p>
                    </div>
                `).join('')}
            </div>
        `;
    },

    findInteractions(medication) {
        const interactions = [];
        const allMedications = this.getAllMedications();
        
        allMedications.forEach(existingMed => {
            if (existingMed.id !== medication.id) {
                const interaction = drugInteractions[medication.name.toLowerCase()]?.interactions?.[existingMed.name.toLowerCase()] ||
                                 drugInteractions[existingMed.name.toLowerCase()]?.interactions?.[medication.name.toLowerCase()];
                
                if (interaction) {
                    interactions.push({
                        ...interaction,
                        withMedication: existingMed.name
                    });
                }
            }
        });

        return interactions;
    },

    checkInteractions() {
        const medications = this.getAllMedications();
        const interactionsContainer = document.querySelector('.drug-interactions');
        
        // Group interactions by type (cancer-cancer, cancer-noncancer, noncancer-noncancer)
        const groupedInteractions = {
            cancerCancer: [],
            cancerNonCancer: [],
            nonCancerNonCancer: []
        };

        medications.forEach((med1, i) => {
            medications.slice(i + 1).forEach(med2 => {
                const interaction = this.findInteractionBetween(med1, med2);
                if (interaction) {
                    if (med1.type === 'cancer' && med2.type === 'cancer') {
                        groupedInteractions.cancerCancer.push(interaction);
                    } else if (med1.type === 'cancer' || med2.type === 'cancer') {
                        groupedInteractions.cancerNonCancer.push(interaction);
                    } else {
                        groupedInteractions.nonCancerNonCancer.push(interaction);
                    }
                }
            });
        });

        // Render grouped interactions
        interactionsContainer.innerHTML = this.renderGroupedInteractions(groupedInteractions);
    },

    renderGroupedInteractions(groups) {
        return `
            ${this.renderInteractionGroup('Cancer Medication Interactions', groups.cancerCancer, 'high-priority')}
            ${this.renderInteractionGroup('Cancer & Non-Cancer Medication Interactions', groups.cancerNonCancer, 'medium-priority')}
            ${this.renderInteractionGroup('Non-Cancer Medication Interactions', groups.nonCancerNonCancer, 'normal-priority')}
        `;
    },

    renderInteractionGroup(title, interactions, priority) {
        if (!interactions.length) return '';
        
        return `
            <div class="interaction-group ${priority}">
                <h3>${title}</h3>
                ${interactions.map(int => `
                    <div class="interaction-card severity-${int.severity.toLowerCase()}">
                        <div class="interaction-header">
                            <span class="severity-badge">${int.severity}</span>
                            <h4>${int.medications.join(' + ')}</h4>
                        </div>
                        <p class="effect">${int.effect}</p>
                        <div class="recommendation">
                            <i class="fas fa-info-circle"></i>
                            <p>${int.recommendation}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    },

    formatFrequency(frequency) {
        const formats = {
            once_daily: 'Once daily',
            twice_daily: 'Twice daily',
            three_times: 'Three times a day',
            four_times: 'Four times a day',
            weekly: 'Weekly',
            as_needed: 'As needed'
        };
        return formats[frequency] || frequency;
    },

    formatBestTime(time) {
        const formats = {
            with_food: 'With food',
            before_food: 'Before food',
            after_food: 'After food',
            empty_stomach: 'On empty stomach',
            bedtime: 'At bedtime'
        };
        return formats[time] || time;
    },

    getAllMedications() {
        // Implementation to get all medications from storage
        return JSON.parse(localStorage.getItem('medications') || '[]');
    }
};

export default medicationDisplay;
