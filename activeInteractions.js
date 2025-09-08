// Initialize active interactions panel
document.addEventListener('DOMContentLoaded', () => {
    // Create container for active interactions
    const interactionsContainer = document.createElement('div');
    interactionsContainer.className = 'active-interactions-container';
    
    // Insert it after the My Medications section
    const medicationsSection = document.querySelector('div:has(> h2:contains("My Medications"))');
    if (medicationsSection) {
        medicationsSection.parentNode.insertBefore(interactionsContainer, medicationsSection.nextSibling);
    }

    // Initial check for interactions
    checkAndDisplayInteractions();

    // Set up observer to watch for medication changes
    const observer = new MutationObserver(() => {
        checkAndDisplayInteractions();
    });

    observer.observe(document.querySelector('.medication-list') || document.body, {
        childList: true,
        subtree: true
    });
});

function checkAndDisplayInteractions() {
    const interactionsContainer = document.querySelector('.active-interactions-container');
    if (!interactionsContainer) return;

    // Get all current medications
    const currentMeds = Array.from(document.querySelectorAll('.medication-card'))
        .map(card => card.querySelector('.medication-name')?.textContent.toLowerCase().trim())
        .filter(Boolean);

    // Check for known interactions
    const activeInteractions = findActiveInteractions(currentMeds);
    
    if (activeInteractions.length > 0) {
        renderInteractionsPanel(interactionsContainer, activeInteractions);
    } else {
        interactionsContainer.innerHTML = '';
    }
}

function findActiveInteractions(medications) {
    const interactions = [];
    
    // Define known critical interactions
    const knownInteractions = {
        'imatinib-warfarin': {
            drugs: ['imatinib', 'warfarin'],
            severity: 'high',
            effect: 'Significantly increased risk of bleeding',
            recommendations: [
                'Close monitoring of INR required',
                'May need warfarin dose adjustment',
                'Watch for signs of bleeding'
            ],
            monitoring: [
                'Regular INR checks',
                'Blood counts',
                'Signs of bleeding'
            ],
            urgency: 'immediate'
        }
    };

    // Check each known interaction
    Object.entries(knownInteractions).forEach(([key, interaction]) => {
        if (interaction.drugs.every(drug => medications.includes(drug))) {
            interactions.push(interaction);
        }
    });

    return interactions;
}

function renderInteractionsPanel(container, interactions) {
    container.innerHTML = `
        <div class="critical-interactions-panel">
            <div class="panel-header">
                <div class="warning-icon">⚠️</div>
                <h3>Critical Drug Interactions Detected</h3>
            </div>
            ${interactions.map(interaction => `
                <div class="interaction-warning severity-${interaction.severity}">
                    <div class="warning-content">
                        <div class="warning-header">
                            <span class="severity-badge">${interaction.severity.toUpperCase()}</span>
                            <span class="affected-drugs">${interaction.drugs.join(' + ')}</span>
                        </div>
                        <p class="effect">${interaction.effect}</p>
                        <div class="recommendations">
                            <h4>Required Actions:</h4>
                            <ul>
                                ${interaction.recommendations.map(rec => `
                                    <li>${rec}</li>
                                `).join('')}
                            </ul>
                        </div>
                        <div class="monitoring">
                            <h4>Monitoring Needed:</h4>
                            <ul>
                                ${interaction.monitoring.map(item => `
                                    <li>${item}</li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                    ${interaction.urgency === 'immediate' ? `
                        <div class="urgency-notice">
                            <i class="fas fa-exclamation-circle"></i>
                            Requires immediate attention from healthcare provider
                        </div>
                    ` : ''}
                </div>
            `).join('')}
            <div class="action-footer">
                <button class="contact-provider-btn">
                    <i class="fas fa-phone"></i>
                    Contact Healthcare Provider
                </button>
                <button class="print-interactions-btn">
                    <i class="fas fa-print"></i>
                    Print Interaction Report
                </button>
            </div>
        </div>
    `;

    // Add event listeners for buttons
    container.querySelector('.contact-provider-btn')?.addEventListener('click', () => {
        // Implement contact provider functionality
        alert('Please contact your healthcare provider immediately to discuss these interactions.');
    });

    container.querySelector('.print-interactions-btn')?.addEventListener('click', () => {
        printInteractionReport(interactions);
    });
}

function printInteractionReport(interactions) {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Drug Interaction Report</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    margin: 20px;
                }
                .header {
                    text-align: center;
                    margin-bottom: 30px;
                }
                .interaction {
                    border: 2px solid #dc3545;
                    border-radius: 8px;
                    padding: 15px;
                    margin-bottom: 20px;
                }
                .severity-high {
                    background-color: #fff3f3;
                }
                .recommendations, .monitoring {
                    margin: 15px 0;
                }
                .footer {
                    margin-top: 30px;
                    text-align: center;
                    font-size: 0.9em;
                }
                @media print {
                    body {
                        margin: 1cm;
                    }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Drug Interaction Report</h1>
                <p>Generated on: ${new Date().toLocaleDateString()}</p>
            </div>
            ${interactions.map(interaction => `
                <div class="interaction severity-${interaction.severity}">
                    <h2>Critical Drug Interaction</h2>
                    <p><strong>Medications:</strong> ${interaction.drugs.join(' + ')}</p>
                    <p><strong>Effect:</strong> ${interaction.effect}</p>
                    <div class="recommendations">
                        <h3>Required Actions:</h3>
                        <ul>
                            ${interaction.recommendations.map(rec => `
                                <li>${rec}</li>
                            `).join('')}
                        </ul>
                    </div>
                    <div class="monitoring">
                        <h3>Monitoring Needed:</h3>
                        <ul>
                            ${interaction.monitoring.map(item => `
                                <li>${item}</li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            `).join('')}
            <div class="footer">
                <p>Please discuss these interactions with your healthcare provider.</p>
                <p>Emergency Contact: [Healthcare Provider's Number]</p>
            </div>
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

// Export functions for use in other modules
export {
    checkAndDisplayInteractions,
    findActiveInteractions,
    renderInteractionsPanel,
    initializeMedicationManagement,
    addNewMedication,
    clearAllMedications,
    editMedication,
    deleteMedication
};
