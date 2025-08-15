# CancerCare Nutrition - Dietary Monitoring App for Cancer Patients

A comprehensive, accessible web application designed to provide personalized dietary guidance and nutrition tracking for cancer patients throughout their treatment journey.

## 🌟 Features

### Core Functionality

#### 1. **User Profile & Assessment**
- Cancer type selection (breast, lung, colon, prostate, lymphoma, leukemia)
- Treatment stage tracking (pre-treatment, active treatment, post-treatment, survivorship)
- Symptom monitoring (nausea, appetite loss, mouth sores, fatigue, taste changes, digestive issues)
- Dietary restrictions and allergy management
- Persistent profile storage using localStorage

#### 2. **General Dietary Guidance**
- Evidence-based nutrition principles for cancer patients
- Food safety recommendations for immunocompromised patients
- Hydration guidelines and monitoring
- Protein intake optimization
- Interactive guidance cards with visual icons

#### 3. **Cancer-Specific Recommendations**
- Tailored dietary advice based on cancer type
- Treatment-specific nutritional modifications
- Dynamic recommendation generation
- Side effect management through targeted nutrition
- Integration with user profile for personalized content

#### 4. **Recipe Suggestions**
- **High-Protein Recipes**: For muscle maintenance and recovery
- **Anti-Nausea Options**: Gentle foods to manage treatment side effects
- **Soft Food Recipes**: For patients with mouth sores or swallowing difficulties
- **High-Calorie Meals**: For weight maintenance during treatment
- **Easy-Preparation Foods**: For patients experiencing fatigue
- Advanced filtering system with multiple categories
- Nutritional information display (prep time, protein content, calories)

#### 5. **Food Tracking System**
- Daily nutrition monitoring and logging
- Calorie, protein, and fluid intake tracking
- Visual progress indicators
- Date navigation for historical data review
- Meal categorization (breakfast, lunch, dinner, snacks)
- Smart alerts for recommended/restricted foods based on profile
- Data persistence using localStorage

#### 6. **Personalized Suggestions**
- Dynamic recommendations based on user assessment
- Symptom-specific dietary advice
- Treatment stage-appropriate guidance
- Real-time food alerts and suggestions
- Adaptive content that evolves with user input

#### 7. **Educational Resources**
- Curated links to WHO cancer nutrition guidelines
- NIH research articles and studies
- Peer-reviewed journal references
- Evidence-based nutritional information
- Trusted source verification and categorization

#### 8. **Accessibility Features**
- High contrast mode toggle for visual accessibility
- Large, clear fonts optimized for readability
- Keyboard navigation support with Alt+number shortcuts
- Screen reader compatible markup
- Touch-friendly interface with minimum 48px touch targets
- Skip links for efficient navigation
- Focus management and visual indicators
- Support for users with cognitive challenges through simplified design

## 🎨 Design Philosophy

### User-Centered Design
- Clean, uncluttered interface reduces cognitive load
- Consistent color scheme with medical/health theming
- Progressive disclosure to prevent information overwhelm
- Mobile-first responsive design

### Accessibility First
- WCAG 2.1 AA compliance considerations
- Support for assistive technologies
- Reduced motion options for users with vestibular disorders
- High contrast mode for users with visual impairments

### Medical Context Awareness
- Color-coded alerts for different types of information
- Clear distinction between recommendations and restrictions
- Gentle, supportive tone in all messaging
- Recognition of the emotional context of cancer care

## 🛠️ Technical Implementation

### Frontend Technologies
- **HTML5**: Semantic markup with accessibility attributes
- **CSS3**: Modern responsive design with CSS Grid and Flexbox
- **JavaScript (ES6+)**: Modular, accessible interactivity
- **Font Awesome**: Consistent iconography
- **Local Storage**: Client-side data persistence

### Code Organization
```
📁 Project Structure
├── index.html          # Main application structure
├── styles.css          # Complete styling and responsive design
├── script.js           # Application logic and interactivity
└── README.md           # This documentation
```

### Key Technical Features
- **Responsive Grid System**: Adapts to all screen sizes
- **Progressive Enhancement**: Works without JavaScript for basic functionality
- **Modular CSS**: Organized with CSS custom properties (variables)
- **Accessible Forms**: Proper labeling, focus management, and validation
- **Keyboard Navigation**: Full keyboard accessibility
- **Local Data Persistence**: User data saved across sessions

## 🚀 Setup Instructions

### Prerequisites
- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- No server setup required - runs entirely in the browser

### Installation
1. **Download the project files** to a local directory
2. **Open `index.html`** in your web browser
3. **Start using the application** immediately - no additional setup required

### Alternative Setup Methods

#### Method 1: Direct File Access
```bash
# Navigate to the project directory
cd "Cancer Patients Diet Guidance"

# Open in your default browser (Windows)
start index.html

# Open in your default browser (macOS)
open index.html

# Open in your default browser (Linux)
xdg-open index.html
```

#### Method 2: Local Server (Optional)
For development or testing purposes, you can serve the files using a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if http-server is installed)
npx http-server

# Then navigate to http://localhost:8000
```

## 📱 Browser Support

### Fully Supported
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Partially Supported
- Internet Explorer 11 (basic functionality only)
- Older mobile browsers (may lack some CSS Grid features)

### Accessibility Testing
Tested with:
- NVDA Screen Reader
- JAWS Screen Reader
- VoiceOver (macOS/iOS)
- High Contrast Mode (Windows)
- Keyboard-only navigation

## 💾 Data Storage

### Local Storage Usage
The application uses browser localStorage to persist:
- User profile information (cancer type, treatment stage, symptoms)
- Food log entries and nutritional tracking data
- Accessibility preferences (high contrast mode)
- Application preferences

### Data Privacy
- **No server communication**: All data stays on the user's device
- **No analytics tracking**: Complete privacy protection
- **User-controlled data**: Users can clear data through browser settings
- **No personal health information transmitted**: Fully offline operation

## 🎯 User Guide

### Getting Started
1. **Complete the Assessment**: Click "Start Assessment" to create your profile
2. **Explore Guidance**: Review general dietary recommendations
3. **View Personalized Content**: Access recommendations based on your profile
4. **Browse Recipes**: Filter recipes by your specific needs
5. **Track Your Nutrition**: Log daily food intake and monitor progress
6. **Access Resources**: Explore educational materials from trusted sources

### Navigation Tips
- **Bottom Navigation**: Quick access to all main sections
- **Keyboard Shortcuts**: Alt+1 through Alt+5 for rapid navigation
- **High Contrast**: Click the eye icon for improved visibility
- **Back Button**: Use browser back button to return to previous sections

### Food Tracking Workflow
1. Navigate to the "Track" section
2. Select the date you want to log food for
3. Click "Add Food" to open the food entry modal
4. Enter food name, portion size, and meal type
5. Review the automatically calculated nutrition information
6. Monitor your daily progress against recommended goals

### Personalized Recommendations
1. Complete your profile assessment first
2. Navigate to "Your Personalized Recommendations"
3. Review cancer-specific dietary advice
4. Check symptom-management suggestions
5. Follow treatment stage-appropriate guidance

## 🔧 Customization Options

### For Healthcare Providers
- Easily customizable recommendation data in `script.js`
- Modifiable nutritional goals and calculations
- Extensible cancer type and symptom categories
- Customizable educational resource links

### For Developers
- Modular CSS architecture with custom properties
- Well-commented JavaScript with clear function separation
- Extensible data structures for additional features
- Accessible markup patterns for new components

## 🌐 Future Enhancements

### Planned Features
- **Voice Input**: Speech-to-text for easier food logging
- **Barcode Scanning**: Quick food item identification
- **Meal Planning**: Weekly meal preparation assistance
- **Healthcare Provider Integration**: Shareable reports and data
- **Multilingual Support**: Localization for global accessibility
- **Offline PWA**: Progressive Web App capabilities
- **Print Functionality**: Printable meal plans and recommendations

### Integration Possibilities
- **Nutrition APIs**: Real-time nutritional data
- **Electronic Health Records**: Healthcare provider integration
- **Fitness Tracking**: Activity and nutrition correlation
- **Telehealth Platforms**: Remote monitoring capabilities

## 📞 Support & Accessibility

### Accessibility Features
- High contrast mode for visual impairments
- Keyboard navigation for motor limitations
- Large touch targets for dexterity challenges
- Clear, simple language for cognitive accessibility
- Screen reader optimization

### Browser Accessibility Tools
- Enable browser zoom (Ctrl/Cmd + Plus)
- Use browser high contrast mode
- Enable voice control (where available)
- Utilize browser reading tools

## 🤝 Contributing Guidelines

### Code Standards
- Follow semantic HTML practices
- Maintain WCAG 2.1 AA accessibility standards
- Use consistent coding style and naming conventions
- Include comprehensive comments for complex logic
- Test with multiple browsers and assistive technologies

### Content Guidelines
- Medical information should be evidence-based
- Use supportive, non-alarming language
- Provide clear, actionable guidance
- Include proper source attribution for medical claims
- Regular review for medical accuracy

## 📄 License & Medical Disclaimer

### Educational Purpose
This application is designed for educational and informational purposes only. It is not intended to replace professional medical advice, diagnosis, or treatment.

### Medical Disclaimer
Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition or dietary changes during cancer treatment.

### Data Disclaimer
Nutritional information and calculations are approximations. Consult with a registered dietitian for precise nutritional planning.

---

## 🏥 For Healthcare Providers

This tool can be used as a supplementary resource for patient education and engagement. The modular design allows for easy customization to align with institutional dietary guidelines and protocols.

### Integration Possibilities
- **Patient Education**: Use as a teaching tool during consultations
- **Home Care Support**: Provide patients with structured dietary guidance
- **Treatment Planning**: Supplement nutrition consultations with personalized recommendations
- **Progress Monitoring**: Track patient dietary adherence and challenges

---

**Version**: 1.0.0  
**Last Updated**: August 14, 2025  
**Compatibility**: Modern browsers with JavaScript enabled  
**Target Users**: Cancer patients, caregivers, healthcare providers
