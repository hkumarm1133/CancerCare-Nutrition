// Make sure drugInteractions is available globally
window.drugInteractions = {
    methotrexate: {
        name: "Methotrexate",
        type: 'cancer',
        category: "HIGH-RISK MEDICATION",
        interactions: {
            nsaids: {
                severity: "HIGH",
                effect: "Increased risk of methotrexate toxicity",
                recommendation: "Avoid NSAIDs while on methotrexate. Consult healthcare provider for pain management alternatives."
            },
            sulfa: {
                severity: "HIGH",
                effect: "Increased risk of bone marrow suppression",
                recommendation: "Avoid sulfa drugs. Regular blood count monitoring required."
            }
        },
        foodInteractions: ["alcohol", "grapefruit", "folate supplements"],
        monitoring: {
            tests: ["Complete Blood Count", "Liver Function", "Kidney Function"],
            frequency: "Every 1-3 months",
            warnings: "May interact with folate metabolism. Avoid alcohol and grapefruit."
        }
    },
    tamoxifen: {
        name: "Tamoxifen",
        type: 'cancer',
        category: "HIGH-RISK MEDICATION",
        interactions: {
            ssri: {
                severity: "HIGH",
                effect: "Reduced tamoxifen effectiveness",
                recommendation: "Avoid certain antidepressants (especially fluoxetine and paroxetine). Consult oncologist for alternatives."
            }
        },
        foodInteractions: ["grapefruit"],
        monitoring: {
            tests: ["Liver Function", "Gynecological Exam"],
            frequency: "Every 6 months",
            warnings: "Report any unusual bleeding or gynecological symptoms."
        }
    },
    cisplatin: {
        name: "Cisplatin",
        type: 'cancer',
        category: "HIGH-RISK MEDICATION",
        interactions: {
            nsaids: {
                severity: "HIGH",
                effect: "Increased risk of kidney damage",
                recommendation: "Avoid NSAIDs. Use prescribed pain medications only."
            },
            aminoglycosides: {
                severity: "HIGH",
                effect: "Increased risk of kidney and hearing damage",
                recommendation: "Avoid concurrent use if possible. Requires close monitoring."
            }
        },
        foodInteractions: ["alcohol"],
        monitoring: {
            tests: ["Kidney Function", "Hearing Tests", "Electrolytes"],
            frequency: "Before each treatment cycle",
            warnings: "Maintain good hydration. Report any hearing changes."
        }
    },
    imatinib: {
        name: "Imatinib",
        type: 'cancer',
        category: "HIGH-RISK MEDICATION",
        interactions: {
            ppi: {
                severity: "MODERATE",
                effect: "May reduce absorption",
                recommendation: "Take with food and water. Discuss timing with healthcare provider."
            }
        },
        foodInteractions: ["grapefruit", "st_johns_wort"],
        monitoring: {
            tests: ["Complete Blood Count", "Liver Function"],
            frequency: "Monthly initially, then every 3 months",
            warnings: "Take with food and large glass of water."
        }
    },
    rituximab: {
        name: "Rituximab",
        type: 'cancer',
        category: "HIGH-RISK MEDICATION",
        interactions: {
            antihypertensives: {
                severity: "MODERATE",
                effect: "May enhance hypotensive effect",
                recommendation: "Monitor blood pressure closely during infusion."
            }
        },
        foodInteractions: [],
        monitoring: {
            tests: ["Complete Blood Count", "Hepatitis B Testing"],
            frequency: "Regular monitoring during treatment",
            warnings: "Report any infusion reactions or infections."
        }
    },
    paclitaxel: {
        name: "Paclitaxel",
        type: 'cancer',
        category: "HIGH-RISK MEDICATION",
        interactions: {
            anticoagulants: {
                severity: "MODERATE",
                effect: "Increased bleeding risk",
                recommendation: "Monitor blood tests closely."
            }
        },
        foodInteractions: ["grapefruit"],
        monitoring: {
            tests: ["Complete Blood Count", "Liver Function"],
            frequency: "Before each treatment cycle",
            warnings: "Avoid grapefruit products."
        }
    },
    doxorubicin: {
        name: "Doxorubicin",
        type: 'cancer',
        category: "HIGH-RISK MEDICATION",
        interactions: {
            cardiotoxic_drugs: {
                severity: "HIGH",
                effect: "Increased risk of heart problems",
                recommendation: "Regular heart monitoring required."
            }
        },
        foodInteractions: ["alcohol"],
        monitoring: {
            tests: ["Heart Function", "Complete Blood Count"],
            frequency: "Regular monitoring during treatment",
            warnings: "Report any chest pain or breathing difficulties."
        }
    },
    erlotinib: {
        name: "Erlotinib",
        type: 'cancer',
        category: "HIGH-RISK MEDICATION",
        interactions: {
            ppi: {
                severity: "HIGH",
                effect: "Significantly reduced absorption",
                recommendation: "Avoid proton pump inhibitors. Discuss alternatives."
            }
        },
        foodInteractions: ["grapefruit", "high_fat_meals"],
        monitoring: {
            tests: ["Liver Function", "Kidney Function"],
            frequency: "Monthly",
            warnings: "Take on empty stomach. Avoid smoking."
        }
    },
    lenalidomide: {
        name: "Lenalidomide",
        type: 'cancer',
        category: "HIGH-RISK MEDICATION",
        interactions: {
            hormonal_contraceptives: {
                severity: "MODERATE",
                effect: "May increase hormone-related side effects",
                recommendation: "Use additional contraception methods."
            }
        },
        foodInteractions: [],
        monitoring: {
            tests: ["Complete Blood Count", "Pregnancy Test"],
            frequency: "Weekly initially, then monthly",
            warnings: "Pregnancy prevention required. Regular monitoring essential."
        }
    },
    bortezomib: {
        name: "Bortezomib",
        type: 'cancer',
        category: "HIGH-RISK MEDICATION",
        interactions: {
            antifungals: {
                severity: "MODERATE",
                effect: "May increase side effects",
                recommendation: "Monitor closely if used together."
            }
        },
        foodInteractions: ["green_tea"],
        monitoring: {
            tests: ["Complete Blood Count", "Nerve Function"],
            frequency: "Before each dose",
            warnings: "Report any numbness or tingling."
        }
    },
    bevacizumab: {
        name: "Bevacizumab",
        type: 'cancer',
        category: "HIGH-RISK MEDICATION",
        interactions: {
            nsaids: {
                severity: "MODERATE",
                effect: "Increased bleeding risk",
                recommendation: "Use with caution. Monitor for bleeding."
            }
        },
        foodInteractions: [],
        monitoring: {
            tests: ["Blood Pressure", "Urine Protein"],
            frequency: "Every 2-3 weeks",
            warnings: "Monitor blood pressure regularly."
        }
    },
    gemcitabine: {
        name: "Gemcitabine",
        type: 'cancer',
        category: "HIGH-RISK MEDICATION",
        interactions: {
            live_vaccines: {
                severity: "HIGH",
                effect: "Increased risk of infection",
                recommendation: "Avoid live vaccines during treatment."
            }
        },
        foodInteractions: [],
        monitoring: {
            tests: ["Complete Blood Count", "Kidney Function"],
            frequency: "Before each treatment cycle",
            warnings: "Report flu-like symptoms or fever."
        }
    },
    carboplatin: {
        name: "Carboplatin",
        type: 'cancer',
        category: "HIGH-RISK MEDICATION",
        interactions: {
            nephrotoxic_drugs: {
                severity: "HIGH",
                effect: "Increased risk of kidney damage",
                recommendation: "Avoid other kidney-toxic medications if possible."
            }
        },
        foodInteractions: ["alcohol"],
        monitoring: {
            tests: ["Complete Blood Count", "Kidney Function", "Electrolytes"],
            frequency: "Before each treatment cycle",
            warnings: "Stay well hydrated. Report unusual bleeding."
        }
    },
    vincristine: {
        name: "Vincristine",
        type: 'cancer',
        category: "HIGH-RISK MEDICATION",
        interactions: {
            antifungals: {
                severity: "HIGH",
                effect: "Increased risk of neurotoxicity",
                recommendation: "Avoid certain antifungal medications."
            }
        },
        foodInteractions: [],
        monitoring: {
            tests: ["Complete Blood Count", "Neurological Function"],
            frequency: "Regular monitoring during treatment",
            warnings: "Report any numbness, tingling, or weakness."
        }
    },
    cyclophosphamide: {
        name: "Cyclophosphamide",
        type: 'cancer',
        category: "HIGH-RISK MEDICATION",
        interactions: {
            allopurinol: {
                severity: "MODERATE",
                effect: "May increase bone marrow suppression",
                recommendation: "Monitor blood counts more frequently."
            }
        },
        foodInteractions: ["alcohol"],
        monitoring: {
            tests: ["Complete Blood Count", "Urinalysis"],
            frequency: "Weekly during treatment",
            warnings: "Stay well hydrated. Report dark urine or blood in urine."
        }
    }
};

function renderDrugInteractions(interactions) {
    let html = '<div class="interactions-list">';
    for (const [drug, data] of Object.entries(interactions)) {
        html += `
            <div class="interaction-item severity-${data.severity.toLowerCase()}">
                <div class="interaction-header">
                    <span class="interaction-severity">${data.severity}</span>
                    <h5>${drug.toUpperCase()}</h5>
                </div>
                <div class="interaction-content">
                    <p class="interaction-effect">${data.effect}</p>
                    <div class="recommendation-box">
                        <i class="fas fa-info-circle"></i>
                        <p>${data.recommendation}</p>
                    </div>
                </div>
            </div>
        `;
    }
    html += '</div>';
    return html;
}

function createMedicationCard(medicationKey) {
    const medication = drugInteractions[medicationKey];
    if (!medication) return '';

    return `
        <div class="medication-card">
            <div class="medication-header">
                <h3>${medication.name}</h3>
                <span class="risk-badge ${medication.category.toLowerCase()}">${medication.category}</span>
            </div>
            
            <div class="interactions-panel">
                <h4><i class="fas fa-exclamation-triangle"></i> Drug Interactions</h4>
                ${renderDrugInteractions(medication.interactions)}
            </div>

            <div class="monitoring-panel">
                <h4><i class="fas fa-clipboard-check"></i> Required Monitoring</h4>
                <ul class="monitoring-list">
                    ${medication.monitoring.tests.map(test => `<li>${test}</li>`).join('')}
                </ul>
                <p class="monitoring-frequency">
                    <i class="fas fa-clock"></i> Frequency: ${medication.monitoring.frequency}
                </p>
                <div class="warning-note">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>${medication.monitoring.warnings}</p>
                </div>
            </div>

            <div class="food-interactions">
                <h4><i class="fas fa-utensils"></i> Food Interactions</h4>
                <div class="food-interactions-list">
                    ${medication.foodInteractions.map(food => `
                        <span class="food-item">${food}</span>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// Make functions available globally
window.renderDrugInteractions = renderDrugInteractions;
window.createMedicationCard = createMedicationCard;
