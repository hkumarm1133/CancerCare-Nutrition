// Medication Schedule Generator
function generateMedicationSchedule() {
    const scheduleContainer = document.createElement('div');
    scheduleContainer.className = 'medication-schedule';
    scheduleContainer.innerHTML = `
        <div class="schedule-header">
            <h3>Medication Schedule</h3>
            <div class="schedule-actions">
                <button onclick="searchMedications()" class="search-btn">
                    <i class="fas fa-search"></i> Search
                </button>
                <button onclick="filterByCategory()" class="filter-btn">
                    <i class="fas fa-filter"></i> Filter
                </button>
                <button onclick="printSchedule()" class="print-btn">
                    <i class="fas fa-print"></i> Print Schedule
                </button>
            </div>
        </div>
        <div class="schedule-grid">
            <div class="time-slots">
                <div class="schedule-row header">
                    <div class="time-column">Time</div>
                    <div class="med-column">Medication</div>
                    <div class="instructions-column">Instructions</div>
                    <div class="notes-column">Special Notes</div>
                    <div class="precautions-column">Precautions</div>
                </div>
                ${generateTimeSlots()}
            </div>
        </div>
    `;
    return scheduleContainer;
}

function generateTimeSlots() {
    const timeSlots = [
        "Morning (Before Breakfast)",
        "Morning (With Breakfast)",
        "Morning (After Breakfast)",
        "Midday (Before Lunch)",
        "Midday (With Lunch)",
        "Midday (After Lunch)",
        "Evening (Before Dinner)",
        "Evening (With Dinner)",
        "Evening (After Dinner)",
        "Bedtime"
    ];

    return timeSlots.map(slot => `
        <div class="schedule-row" data-time-slot="${slot.toLowerCase().replace(/[() ]/g, '-')}">
            <div class="time-column">${slot}</div>
            <div class="med-column">
                ${getMedicationsForTimeSlot(slot)}
            </div>
            <div class="instructions-column">
                ${getInstructionsForTimeSlot(slot)}
            </div>
            <div class="notes-column">
                ${getNotesForTimeSlot(slot)}
            </div>
            <div class="precautions-column">
                ${getPrecautionsForTimeSlot(slot)}
            </div>
        </div>
    `).join('');
}

function getMedicationsForTimeSlot(slot) {
    const meds = medicationInteractions.cancerDrugs.concat(medicationInteractions.nonCancerDrugs)
        .filter(med => shouldMedicationBeInSlot(med, slot))
        .map(med => createMedicationEntry(med, slot));
    return meds.length ? meds.join('') : 'No medications scheduled';
}

function createMedicationEntry(med, slot) {
    const isHighRisk = med.severity === 'high' || 
                      med.monitoring?.length > 0 || 
                      med.drugInteractions?.length > 0;
    
    return `
        <div class="scheduled-med ${med.severity}-priority ${isHighRisk ? 'high-risk' : ''}">
            <div class="med-header">
                <span class="med-name">${med.drug}</span>
                ${isHighRisk ? '<span class="high-risk-badge">⚠️ High Risk</span>' : ''}
            </div>
            <div class="med-timing">${med.timing || ''}</div>
            ${med.recommendations ? `
                <div class="med-recommendations">
                    <i class="fas fa-info-circle"></i>
                    <span>${med.recommendations}</span>
                </div>
            ` : ''}
        </div>
    `;
}

function getInstructionsForTimeSlot(slot) {
    const instructions = medicationInteractions.cancerDrugs.concat(medicationInteractions.nonCancerDrugs)
        .filter(med => shouldMedicationBeInSlot(med, slot))
        .map(med => ({
            text: med.recommendations || '',
            severity: med.severity
        }));
    
    if (!instructions.length) return 'No special instructions';
    
    return instructions.map(instr => `
        <div class="instruction-item severity-${instr.severity}">
            ${instr.text}
        </div>
    `).join('');
}

function getNotesForTimeSlot(slot) {
    const notes = medicationInteractions.cancerDrugs.concat(medicationInteractions.nonCancerDrugs)
        .filter(med => shouldMedicationBeInSlot(med, slot))
        .map(med => ({
            text: med.monitoring || '',
            severity: med.severity,
            specialNote: med.specialNote
        }));
    
    if (!notes.length) return 'No special notes';
    
    return notes.map(note => `
        <div class="note-item severity-${note.severity}">
            ${note.text}
            ${note.specialNote ? `
                <div class="special-note-alert">
                    <i class="fas fa-exclamation-triangle"></i>
                    ${note.specialNote}
                </div>
            ` : ''}
        </div>
    `).join('');
}

function getPrecautionsForTimeSlot(slot) {
    const precautions = medicationInteractions.cancerDrugs.concat(medicationInteractions.nonCancerDrugs)
        .filter(med => shouldMedicationBeInSlot(med, slot))
        .flatMap(med => {
            const foodWarnings = med.foods?.map(food => ({
                type: 'food',
                text: `Avoid ${food}`,
                severity: med.severity
            })) || [];
            
            const drugWarnings = med.drugInteractions?.map(drug => ({
                type: 'drug',
                text: `Check with doctor before taking with ${drug}`,
                severity: 'high'
            })) || [];
            
            return [...foodWarnings, ...drugWarnings];
        });
    
    if (!precautions.length) return 'No special precautions';
    
    return precautions.map(prec => `
        <div class="precaution-item severity-${prec.severity}">
            <i class="fas fa-${prec.type === 'food' ? 'utensils' : 'pills'}"></i>
            ${prec.text}
        </div>
    `).join('');
}

function shouldMedicationBeInSlot(med, slot) {
    if (!med.timing) return false;
    const timing = med.timing.toLowerCase();
    const slotLower = slot.toLowerCase();
    
    // Enhanced timing logic
    const timingMap = {
        'before breakfast': ['morning (before breakfast)'],
        'with breakfast': ['morning (with breakfast)'],
        'after breakfast': ['morning (after breakfast)'],
        'before lunch': ['midday (before lunch)'],
        'with lunch': ['midday (with lunch)'],
        'after lunch': ['midday (after lunch)'],
        'before dinner': ['evening (before dinner)'],
        'with dinner': ['evening (with dinner)'],
        'after dinner': ['evening (after dinner)'],
        'bedtime': ['bedtime'],
        'daily': ['morning (with breakfast)'],
        'twice daily': ['morning (with breakfast)', 'evening (with dinner)'],
        'three times daily': ['morning (with breakfast)', 'midday (with lunch)', 'evening (with dinner)'],
        'every morning': ['morning (with breakfast)'],
        'every evening': ['evening (with dinner)']
    };
    
    // Check specific timing matches
    for (const [timeKey, slots] of Object.entries(timingMap)) {
        if (timing.includes(timeKey) && slots.includes(slotLower)) {
            return true;
        }
    }
    
    return false;
}

function searchMedications() {
    const searchTerm = prompt('Enter medication name or timing:');
    if (!searchTerm) return;
    
    const term = searchTerm.toLowerCase();
    document.querySelectorAll('.scheduled-med').forEach(med => {
        const text = med.textContent.toLowerCase();
        med.style.display = text.includes(term) ? '' : 'none';
    });
}

function filterByCategory() {
    const categories = ['all', 'high-risk', 'cancer', 'non-cancer'];
    const category = prompt(`Select category (${categories.join(', ')}):`, 'all');
    if (!category || !categories.includes(category.toLowerCase())) return;
    
    document.querySelectorAll('.scheduled-med').forEach(med => {
        const isCancer = medicationInteractions.cancerDrugs.some(
            drug => drug.drug === med.querySelector('.med-name').textContent
        );
        const isHighRisk = med.classList.contains('high-risk');
        
        let show = true;
        switch (category.toLowerCase()) {
            case 'cancer':
                show = isCancer;
                break;
            case 'non-cancer':
                show = !isCancer;
                break;
            case 'high-risk':
                show = isHighRisk;
                break;
        }
        
        med.style.display = show ? '' : 'none';
    });
}

function printSchedule() {
    const scheduleWindow = window.open('', '_blank');
    scheduleWindow.document.write(`
        <html>
            <head>
                <title>Medication Schedule</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                        max-width: 1000px;
                        margin: 0 auto;
                    }
                    .schedule-grid {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 20px;
                    }
                    .schedule-row {
                        border: 1px solid #ccc;
                        page-break-inside: avoid;
                    }
                    .time-column, .med-column, .instructions-column,
                    .notes-column, .precautions-column {
                        padding: 10px;
                        border: 1px solid #ccc;
                        vertical-align: top;
                    }
                    .header {
                        background-color: #f0f0f0;
                        font-weight: bold;
                    }
                    .scheduled-med {
                        margin: 5px 0;
                        padding: 5px;
                        border-radius: 4px;
                    }
                    .high-risk {
                        background-color: #fff3f3;
                        border-left: 3px solid #dc3545;
                    }
                    .high-priority { color: #dc3545; }
                    .moderate-priority { color: #ffc107; }
                    .low-priority { color: #28a745; }
                    .high-risk-badge {
                        color: #dc3545;
                        font-weight: bold;
                        margin-left: 5px;
                    }
                    .special-note-alert {
                        background-color: #fff3cd;
                        padding: 5px;
                        margin-top: 5px;
                        border-radius: 4px;
                    }
                    @media print {
                        .no-print { display: none; }
                        body { padding: 0; }
                        @page { margin: 2cm; }
                    }
                </style>
            </head>
            <body>
                <h1>Medication Schedule</h1>
                <p>Generated on: ${new Date().toLocaleDateString()}</p>
                <p>Patient Instructions:</p>
                <ul>
                    <li>Take medications exactly as prescribed</li>
                    <li>Do not skip doses or adjust timing without consulting your healthcare provider</li>
                    <li>Report any side effects or concerns promptly</li>
                    <li>Keep this schedule updated with any changes from your healthcare team</li>
                </ul>
                ${document.querySelector('.schedule-grid').outerHTML}
                <footer style="margin-top: 20px; text-align: center; font-size: 12px;">
                    <p>Contact your healthcare provider with any questions about your medications.</p>
                    <p>Emergency Contact: [Insert Healthcare Provider's Number]</p>
                </footer>
            </body>
        </html>
    `);
    scheduleWindow.document.close();
    scheduleWindow.print();
}

// Initialize schedule when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.medication-schedule-container');
    if (container) {
        container.appendChild(generateMedicationSchedule());
    }
});

// Export functions for use in other files
export {
    generateMedicationSchedule,
    searchMedications,
    filterByCategory,
    printSchedule
};
