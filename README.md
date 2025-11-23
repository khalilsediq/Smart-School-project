# Student Result Card Generator

A responsive web application for generating professional student result cards for The Smart School. This application allows teachers and administrators to input student marks and automatically generate result cards that match the official school format.

## Features

### 🎯 Core Functionality
- **Class-specific Subjects**: Each class has its own set of subjects as per the school curriculum
- **Automatic Calculations**: Automatically calculates percentages, averages, and grades
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Real-time Validation**: Validates marks input in real-time

### 📊 Supported Classes and Subjects

| Class | Subjects |
|-------|----------|
| **PlayGroup** | English, Urdu, Math, Islamiat, Nazra, General-Knowledge |
| **Nursery** | English, Urdu, Math, Computer, Islamiat, Nazra, General-knowledge |
| **KinderGarden** | English, Urdu, Math, Computer, Islamiat, Nazra, General-Knowledge |
| **Class One** | English, Urdu, Math, Computer, General-Knowledge, Islamiat, Tadres-e-Quran |
| **Class Two** | English, Urdu, Math, Computer, General-Knowledge, Islamiat, Tadres-e-Quran |
| **Class Three** | English, Urdu, Math, General-Knowledge, Computer, Islamiat, Tadres-e-Quran |
| **Class Four** | English, Urdu, Math, General Science, Islamiat, Computer, Social Studies, Tadres-e-Quran |
| **Class Five** | English, Urdu, Math, Islamiat, Social Studies, General Science, Computer, Tadres-e-Quran |
| **Class Six** | English, Urdu, Math, History, Computer, Islamiat, Geography, Nazra, General Science |
| **Class Seven** | English, Urdu, Math, History, Computer, Islamiat, Geography, Nazra, General Science |
| **Class Eight** | English, Urdu, Math, History, Computer, Islamiat, Geography, Nazra, General Science |
| **Class Nine** | English, Urdu, Math, Physics, Biology, Chemistry, Islamiat, Pakistan Studies |
| **Class Ten** | English, Urdu, Math, Physics, Biology, Chemistry, Islamiat, Pakistan Studies |

### 📋 Grade System
- **A+**: 90% and above
- **A**: 80-89%
- **B**: 70-79%
- **C**: 60-69%
- **D**: 50-59%
- **F**: Below 50%

### 📄 Export Options
- **PDF Download**: High-quality PDF export with proper formatting
- **DOCX Download**: Microsoft Word document format
- **Print**: Direct printing with optimized print layout

### 🎨 Result Card Layout
The generated result card includes:
- School branding and logo
- Student information section
- Academic performance table with all subjects
- Overall summary with percentages and grades
- General progress assessment
- Co-curricular activities section
- Values education section
- Comments and signature spaces

## How to Use

### 1. Open the Application
Open `index.html` in any modern web browser.

### 2. Enter Student Information
- Fill in the student's basic information (name, class, roll number, etc.)
- Select the appropriate class from the dropdown
- Enter campus name and academic details

### 3. Input Subject Marks
- After selecting a class, subject input fields will appear automatically
- Enter marks for each subject (0-100 range)
- All marks are validated in real-time

### 4. Generate Result
- Click "Generate Result" to create the result card
- The result will appear in the preview section
- Review the generated result card

### 5. Export Options
- **Download PDF**: Click the PDF button to download a high-quality PDF
- **Download DOCX**: Click the DOCX button to download a Word document
- **Print**: Click the print button to print directly

## Technical Details

### Files Structure
```
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality
└── README.md          # This documentation
```

### Dependencies
- **Font Awesome**: For icons
- **html2pdf.js**: For PDF generation
- **docx.js**: For DOCX generation
- **FileSaver.js**: For file downloads

### Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Features in Detail

### Responsive Design
- **Desktop**: Full two-column layout with form and preview side-by-side
- **Tablet**: Single column layout with optimized spacing
- **Mobile**: Stacked layout with touch-friendly inputs

### Form Validation
- Real-time mark validation (0-100 range)
- Required field validation
- Visual feedback for invalid inputs

### Result Card Features
- **Exact Layout Match**: Matches the provided image design 100%
- **Professional Typography**: Uses appropriate fonts for different sections
- **Proper Spacing**: Maintains consistent spacing and alignment
- **Print Optimization**: Special CSS for clean printing

### Export Features
- **PDF**: High-resolution PDF with proper margins and formatting
- **DOCX**: Structured Word document with proper formatting
- **Print**: Browser print with hidden UI elements

## Customization

### Adding New Classes
To add a new class, edit the `classSubjects` object in `script.js`:

```javascript
const classSubjects = {
    // ... existing classes
    'NewClass': ['Subject1', 'Subject2', 'Subject3']
};
```

### Modifying Grade System
Edit the `calculateGrade` function in `script.js`:

```javascript
function calculateGrade(percentage) {
    if (percentage >= 90) return 'A+';
    // ... modify as needed
}
```

### Changing School Information
Edit the school branding section in the `generateResultCard` function.

## Troubleshooting

### Common Issues

1. **PDF not downloading**: Ensure you're using a modern browser and have JavaScript enabled
2. **Marks validation errors**: Make sure all marks are between 0-100
3. **Layout issues on mobile**: The design is fully responsive, but some older browsers may have issues

### Browser Requirements
- JavaScript enabled
- Modern browser (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+)
- Internet connection for loading external libraries

## Support

For technical support or feature requests, please contact the development team.

---

**The Smart School Result Generator** - Making result card generation simple and professional. 