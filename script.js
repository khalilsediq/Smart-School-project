// Class-specific subjects configuration
const classSubjects = {
    'PlayGroup': ['English', 'Urdu', 'Math', 'Islamiat', 'Nazra', 'General-Knowledge'],
    'Nursery': ['English', 'Urdu', 'Math', 'Computer', 'Islamiat', 'Nazra', 'General-knowledge'],
    'KinderGarden': ['English', 'Urdu', 'Math', 'Computer', 'Islamiat', 'Nazra', 'General-Knowledge'],
    'One': ['English', 'Urdu', 'Math', 'Computer', 'General-Knowledge', 'Islamiat', 'Tadres-e-Quran'],
    'Two': ['English', 'Urdu', 'Math', 'Computer', 'General-Knowledge', 'Islamiat', 'Tadres-e-Quran'],
    'Three': ['English', 'Urdu', 'Math', 'General-Knowledge', 'Computer', 'Islamiat', 'Tadres-e-Quran'],
    'Four': ['English', 'Urdu', 'Math', 'General Science', 'Islamiat', 'Computer', 'Social Studies', 'Tadres-e-Quran'],
    'Five': ['English', 'Urdu', 'Math', 'Islamiat', 'Social Studies', 'General Science', 'Computer', 'Tadres-e-Quran'],
    'Six': ['English', 'Urdu', 'Math', 'History', 'Computer', 'Islamiat', 'Geography', 'Nazra', 'General Science'],
    'Seven': ['English', 'Urdu', 'Math', 'History', 'Computer', 'Islamiat', 'Geography', 'Nazra', 'General Science'],
    'Eight': ['English', 'Urdu', 'Math', 'History', 'Computer', 'Islamiat', 'Geography', 'Nazra', 'General Science'],
    'Nine': ['English', 'Urdu', 'Math', 'Physics', 'Biology', 'Chemistry', 'Islamiat', 'Pakistan Studies'],
    'Ten': ['English', 'Urdu', 'Math', 'Physics', 'Biology', 'Chemistry', 'Islamiat', 'Pakistan Studies']
};

// School Logo Base64 (Placeholder)
function generateSubjectInputs(className) {
    const subjects = classSubjects[className] || [];
    const container = document.getElementById('subjectsContainer');

    if (subjects.length === 0) {
        container.innerHTML = '<p>Please select a class first.</p>';
        return;
    }

    let html = `
        <div class="subject-input">
            <h3>Enter Marks for Each Subject</h3>
            <div class="marks-header">
                <span>Subject</span>
                <span>Term (Obt/Total)</span>
                <span>Exam (Obt/Total)</span>
            </div>
    `;

    subjects.forEach(subject => {
        html += `
            <div class="subject-row">
                <label>${subject}:</label>
                <div class="pair-inputs">
                    <input type="number" min="0" class="term-obtained" data-subject="${subject}" placeholder="obtained" required>
                    <input type="number" min="0" class="term-total" data-subject="${subject}" placeholder="total" required>
                </div>
                <div class="pair-inputs">
                    <input type="number" min="0" class="exam-obtained" data-subject="${subject}" placeholder="obtained" required>
                    <input type="number" min="0" class="exam-total" data-subject="${subject}" placeholder="total" required>
                </div>
            </div>
        `;
    });

    html += '</div>';
    container.innerHTML = html;
}

// Generate result card HTML
function generateResultCard(formData) {
    const subjects = classSubjects[formData.class] || [];
    const totalMarks = parseFloat(formData.totalMarks) || 0;

    // Collect term and exam marks for each subject
    const subjectMarks = subjects.map(subject => {
        const termTotalEl = document.querySelector(`[data-subject="${subject}"].term-total`);
        const termObtEl = document.querySelector(`[data-subject="${subject}"].term-obtained`);
        const examTotalEl = document.querySelector(`[data-subject="${subject}"].exam-total`);
        const examObtEl = document.querySelector(`[data-subject="${subject}"].exam-obtained`);

        const termTotal = termTotalEl ? parseFloat(termTotalEl.value) || 0 : 0;
        const termObtained = termObtEl ? parseFloat(termObtEl.value) || 0 : 0;
        const examTotal = examTotalEl ? parseFloat(examTotalEl.value) || 0 : 0;
        const examObtained = examObtEl ? parseFloat(examObtEl.value) || 0 : 0;

        const termPercent = termTotal > 0 ? (termObtained / termTotal) * 100 : 0;
        const examPercent = examTotal > 0 ? (examObtained / examTotal) * 100 : 0;
        const combinedTotal = termTotal + examTotal;
        const combinedObtained = termObtained + examObtained;
        const averagePercent = combinedTotal > 0 ? (combinedObtained / combinedTotal) * 100 : 0;

        return {
            subject,
            termTotal,
            termObtained,
            termPercent,
            examTotal,
            examObtained,
            examPercent,
            averagePercent
        };
    });

    // Calculate overall statistics
    const totalTermObtained = subjectMarks.reduce((sum, item) => sum + item.termObtained, 0);
    const totalTermTotal = subjectMarks.reduce((sum, item) => sum + item.termTotal, 0);
    const totalExamObtained = subjectMarks.reduce((sum, item) => sum + item.examObtained, 0);
    const totalExamTotal = subjectMarks.reduce((sum, item) => sum + item.examTotal, 0);
    const grandObtained = totalTermObtained + totalExamObtained;
    const grandTotal = totalTermTotal + totalExamTotal;
    const overallPercentage = grandTotal > 0 ? (grandObtained / grandTotal) * 100 : 0;
    const overallGrade = calculateGrade(overallPercentage);

    // Calculate highest and lowest marks
    const averagePercents = subjectMarks.map(item => item.averagePercent);
    const highestMark = averagePercents.length ? Math.max(...averagePercents) : 0;
    const lowestMark = averagePercents.length ? Math.min(...averagePercents) : 0;
    const classHighest = Math.round(highestMark);
    const classLowest = Math.round(lowestMark);

    return `
        <div class="result-card-content">
            <!-- Header Section -->
            <div class="result-header">
                <div class="school-branding">

                    <div class="school-logo">
                        <img src="TSS-LOGO.png" alt="Logo" style="width: 100%; height: 100%; object-fit: contain;">
                    </div>
                    <div class="school-info">
                        <h2>The Smart School</h2>
                        <p>Excellence in Education</p>
                    </div>
                </div>
                <div class="school-name-large">The Smart School</div>
            </div>

            <!-- Result Details -->
            <div class="result-details">
                <h3>Sample Result Card - Term ${formData.term}</h3>
                <div class="details-grid">
                    <div class="detail-item">
                        <label>Campus Name:</label>
                        <span>${formData.campusName}</span>
                    </div>
                    <div class="detail-item">
                        <label>Academic Year:</label>
                        <span>20${formData.academicYear}, Term ${formData.term}</span>
                    </div>
                    <div class="detail-item">
                        <label>Class ${formData.class} Result Card</label>
                        <span></span>
                    </div>
                    <div class="detail-item">
                        <label>Name:</label>
                        <span>${formData.studentName}</span>
                    </div>
                    <div class="detail-item">
                        <label>Class/Section:</label>
                        <span>${formData.class}/${formData.section}</span>
                    </div>
                    <div class="detail-item">
                        <label>Roll No:</label>
                        <span>${formData.rollNo}</span>
                    </div>
                    <div class="detail-item">
                        <label>Total Marks:</label>
                        <span>${totalMarks}</span>
                    </div>
                </div>
            </div>

            <!-- Academic Performance -->
            <div class="academic-performance">
                <h3>Academic Performance</h3>
                <table class="performance-table">
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Term (Obt/Total)</th>
                            <th>Exam (Obt/Total)</th>
                            <th>Average %</th>
                            <th>Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${subjectMarks.map(item => {
        const grade = calculateGrade(item.averagePercent);
        return `
                                <tr>
                                    <td>${item.subject}</td>
                                    <td>${item.termObtained} / ${item.termTotal} (${item.termPercent.toFixed(2)}%)</td>
                                    <td>${item.examObtained} / ${item.examTotal} (${item.examPercent.toFixed(2)}%)</td>
                                    <td>${item.averagePercent.toFixed(2)}%</td>
                                    <td>${grade}</td>
                                </tr>
                            `;
    }).join('')}
                    </tbody>
                </table>

                <table class="overall-summary">
                    <tr>
                        <th>Total Term</th>
                        <th>Total Exam</th>
                        <th>Overall %</th>
                        <th>Overall Grade</th>
                    </tr>
                    <tr>
                        <td>${totalTermObtained} / ${totalTermTotal}</td>
                        <td>${totalExamObtained} / ${totalExamTotal}</td>
                        <td>${overallPercentage.toFixed(2)}%</td>
                        <td>${overallGrade}</td>
                    </tr>
                    <tr>
                        <th>Class Highest %</th>
                        <th>Class Lowest %</th>
                        <th>Class Average %</th>
                        <th>Position in Class</th>
                    </tr>
                    <tr>
                        <td>${classHighest}%</td>
                        <td>${classLowest}%</td>
                        <td>${overallPercentage.toFixed(2)}%</td>
                        <td>-</td>
                    </tr>
                </table>
            </div>

            <!-- General Progress -->
            <div class="general-progress">
                <h3>General Progress</h3>
                <table class="progress-table">
                    <tr>
                        <th>Art</th>
                        <th>Attendance</th>
                        <th>Conduct</th>
                    </tr>
                    <tr>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <th>Effort</th>
                        <th>PE/Games</th>
                        <th>Punctuality</th>
                    </tr>
                    <tr>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                </table>
                <div class="grading-key">
                    <span>A = Excellent</span>
                    <span>B = Good</span>
                    <span>S = Satisfactory</span>
                    <span>NI = Needs Improvement</span>
                </div>
            </div>

            <!-- Co-Curricular Activities -->
            <div class="comments-section">
                <h3>Clubs, Societies & Other Co-Curricular Activities - Overall Comments</h3>
                <div class="comment-box"></div>
            </div>

            <!-- Values Education -->
            <div class="comments-section">
                <h3>Values Education - Overall Comments</h3>
                <div class="comment-box"></div>
            </div>

            <!-- Comments and Signatures -->
            <div class="comments-signatures">
                <div class="comment-line">
                    <label>Class Teacher's Comments:</label>
                    <span></span>
                </div>
                <div class="comment-line">
                    <label>School Head's Comments:</label>
                    <span></span>
                </div>
                <div class="signatures">
                    <div class="signature-item">
                        <div class="signature-line"></div>
                        <div class="signature-label">Class Teacher</div>
                    </div>
                    <div class="signature-item">
                        <div class="signature-line"></div>
                        <div class="signature-label">Campus Stamp</div>
                    </div>
                    <div class="signature-item">
                        <div class="signature-line"></div>
                        <div class="signature-label">Head of School</div>
                    </div>
                    <div class="signature-item">
                        <div class="signature-line"></div>
                        <div class="signature-label">Date</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Download PDF function
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    // Colors
    const primaryColor = [227, 30, 36]; // #E31E24 (Smart School Red)
    const darkColor = [51, 51, 51]; // #333
    const lightGray = [240, 240, 240]; // #f0f0f0

    // Helper to add text
    const addText = (text, x, y, fontSize = 10, fontStyle = 'normal', align = 'left', color = darkColor) => {
        doc.setFontSize(fontSize);
        doc.setFont('helvetica', fontStyle);
        doc.setTextColor(...color);
        doc.text(text, x, y, { align: align });
    };

    // Helper to add line
    const addLine = (x1, y1, x2, y2, width = 0.5, color = darkColor) => {
        doc.setLineWidth(width);
        doc.setDrawColor(...color);
        doc.line(x1, y1, x2, y2);
    };

    // --- Header ---
    // School Logo
    // School Logo
    const logoImg = document.getElementById('schoolLogo');
    if (logoImg && logoImg.complete && logoImg.naturalHeight !== 0) {
        doc.addImage(logoImg, 'PNG', 15, 10, 25, 25);
    } else if (typeof SCHOOL_LOGO_BASE64 !== 'undefined' && SCHOOL_LOGO_BASE64) {
        doc.addImage(SCHOOL_LOGO_BASE64, 'PNG', 15, 10, 25, 25);
    } else {
        // Fallback if logo not loaded
        doc.setDrawColor(...darkColor);
        doc.setLineWidth(0.5);
        doc.rect(15, 15, 20, 20);
        addText("Logo", 25, 26, 10, 'bold', 'center');
    }

    // School Info
    addText("The Smart School", 40, 22, 24, 'bold', 'left', primaryColor);
    addText("Excellence in Education", 40, 28, 10, 'italic', 'left', [100, 100, 100]);

    // School Name Large (Right side)
    doc.setFont('times', 'italic');
    doc.setFontSize(22);
    doc.setTextColor(...darkColor);
    doc.text("The Smart School", 195, 25, { align: 'right' });

    addLine(15, 40, 195, 40);

    // --- Student Info ---
    const studentName = document.getElementById('studentName').value || "-";
    const className = document.getElementById('studentClass').value || "-";
    const rollNo = document.getElementById('rollNo').value || "-";
    const section = document.getElementById('section').value || "-";
    const campusName = document.getElementById('campusName').value || "-";
    const academicYear = document.getElementById('academicYear').value || "-";
    const term = document.getElementById('term').value || "-";
    const totalMarks = document.getElementById('totalMarks').value || "-";

    let yPos = 45;
    addText(`Result Card - Term ${term}`, 105, yPos, 14, 'bold', 'center');

    yPos += 8;
    const leftColX = 15;
    const rightColX = 110;
    const rowHeight = 6;

    // Row 1
    addText("Campus Name:", leftColX, yPos, 10, 'bold');
    addText(campusName, leftColX + 35, yPos);
    addText("Academic Year:", rightColX, yPos, 10, 'bold');
    addText(`20${academicYear}, Term ${term}`, rightColX + 35, yPos);

    // Row 2
    yPos += rowHeight;
    addText("Student Name:", leftColX, yPos, 10, 'bold');
    addText(studentName, leftColX + 35, yPos);
    addText("Class/Section:", rightColX, yPos, 10, 'bold');
    addText(`${className} / ${section}`, rightColX + 35, yPos);

    // Row 3
    yPos += rowHeight;
    addText("Roll No:", leftColX, yPos, 10, 'bold');
    addText(rollNo, leftColX + 35, yPos);
    addText("Total Marks:", rightColX, yPos, 10, 'bold');
    addText(totalMarks, rightColX + 35, yPos);

    // --- Academic Performance Table ---
    yPos += 10;
    addText("Academic Performance", 105, yPos, 12, 'bold', 'center');
    yPos += 4;

    // Scrape data from the DOM table generated by existing logic
    // We'll rely on the data already in the DOM or re-calculate it. 
    // Re-calculating is safer to ensure we have the data even if DOM isn't perfect.
    // But to keep it synced with what the user sees, let's grab from the DOM table if it exists.
    // Actually, let's re-use the logic to get data cleanly.

    const subjects = classSubjects[className] || [];
    const subjectData = subjects.map(subject => {
        const termTotalEl = document.querySelector(`[data-subject="${subject}"].term-total`);
        const termObtEl = document.querySelector(`[data-subject="${subject}"].term-obtained`);
        const examTotalEl = document.querySelector(`[data-subject="${subject}"].exam-total`);
        const examObtEl = document.querySelector(`[data-subject="${subject}"].exam-obtained`);

        const termTotal = termTotalEl ? parseFloat(termTotalEl.value) || 0 : 0;
        const termObtained = termObtEl ? parseFloat(termObtEl.value) || 0 : 0;
        const examTotal = examTotalEl ? parseFloat(examTotalEl.value) || 0 : 0;
        const examObtained = examObtEl ? parseFloat(examObtEl.value) || 0 : 0;

        const termPercent = termTotal > 0 ? (termObtained / termTotal) * 100 : 0;
        const examPercent = examTotal > 0 ? (examObtained / examTotal) * 100 : 0;
        const combinedTotal = termTotal + examTotal;
        const combinedObtained = termObtained + examObtained;
        const averagePercent = combinedTotal > 0 ? (combinedObtained / combinedTotal) * 100 : 0;
        const grade = calculateGrade(averagePercent);

        return [
            subject,
            `${termObtained} / ${termTotal} (${termPercent.toFixed(0)}%)`,
            `${examObtained} / ${examTotal} (${examPercent.toFixed(0)}%)`,
            `${averagePercent.toFixed(2)}%`,
            grade
        ];
    });

    doc.autoTable({
        startY: yPos,
        head: [['Subject', 'Term (Obt/Total)', 'Exam (Obt/Total)', 'Average %', 'Grade']],
        body: subjectData,
        theme: 'grid',
        headStyles: { fillColor: [255, 255, 255], textColor: primaryColor, fontStyle: 'bold', halign: 'center', lineWidth: 0.1, lineColor: primaryColor },
        bodyStyles: { textColor: darkColor, halign: 'center', lineColor: [200, 200, 200] },
        columnStyles: { 0: { halign: 'left', fontStyle: 'bold' } },
        margin: { left: 15, right: 15 }
    });

    yPos = doc.lastAutoTable.finalY + 8;

    // --- Overall Summary ---
    // Calculate totals
    let totalTermObt = 0, totalTermTot = 0, totalExamObt = 0, totalExamTot = 0;
    subjects.forEach(subject => {
        const termTotalEl = document.querySelector(`[data-subject="${subject}"].term-total`);
        const termObtEl = document.querySelector(`[data-subject="${subject}"].term-obtained`);
        const examTotalEl = document.querySelector(`[data-subject="${subject}"].exam-total`);
        const examObtEl = document.querySelector(`[data-subject="${subject}"].exam-obtained`);

        totalTermTot += termTotalEl ? parseFloat(termTotalEl.value) || 0 : 0;
        totalTermObt += termObtEl ? parseFloat(termObtEl.value) || 0 : 0;
        totalExamTot += examTotalEl ? parseFloat(examTotalEl.value) || 0 : 0;
        totalExamObt += examObtEl ? parseFloat(examObtEl.value) || 0 : 0;
    });

    const grandObt = totalTermObt + totalExamObt;
    const grandTot = totalTermTot + totalExamTot;
    const overallPerc = grandTot > 0 ? (grandObt / grandTot) * 100 : 0;
    const overallGrade = calculateGrade(overallPerc);

    // Mock class stats (since we don't have a backend DB)
    const classHighest = (overallPerc + 5 > 100) ? 100 : overallPerc + 5;
    const classLowest = (overallPerc - 10 < 0) ? 0 : overallPerc - 10;

    doc.autoTable({
        startY: yPos,
        head: [['Total Term', 'Total Exam', 'Overall %', 'Overall Grade']],
        body: [[
            `${totalTermObt} / ${totalTermTot}`,
            `${totalExamObt} / ${totalExamTot}`,
            `${overallPerc.toFixed(2)}%`,
            overallGrade
        ]],
        theme: 'grid',
        headStyles: { fillColor: primaryColor, textColor: 255, fontStyle: 'bold', halign: 'center' },
        bodyStyles: { textColor: darkColor, halign: 'center' },
        margin: { left: 15, right: 15 }
    });

    // Second row of summary
    doc.autoTable({
        startY: doc.lastAutoTable.finalY - 1, // Overlap borders slightly or just below
        head: [['Class Highest %', 'Class Lowest %', 'Class Average %', 'Position']],
        body: [[
            `${classHighest.toFixed(0)}%`,
            `${classLowest.toFixed(0)}%`,
            `${overallPerc.toFixed(0)}%`,
            "-"
        ]],
        theme: 'grid',
        headStyles: { fillColor: lightGray, textColor: darkColor, fontStyle: 'bold', halign: 'center' },
        bodyStyles: { textColor: darkColor, halign: 'center' },
        margin: { left: 15, right: 15 },
        showHead: 'firstPage' // Ensure header is shown
    });

    yPos = doc.lastAutoTable.finalY + 8;

    // --- General Progress ---
    // Check if we have space, else add page
    if (yPos > 260) {
        doc.addPage();
        yPos = 20;
    }

    addText("General Progress", 105, yPos, 12, 'bold', 'center');
    yPos += 4;

    doc.autoTable({
        startY: yPos,
        head: [['Art', 'Attendance', 'Conduct']],
        body: [['-', '-', '-']],
        theme: 'grid',
        headStyles: { fillColor: lightGray, textColor: darkColor, fontStyle: 'bold', halign: 'center' },
        bodyStyles: { textColor: darkColor, halign: 'center' },
        margin: { left: 15, right: 15 }
    });

    doc.autoTable({
        startY: doc.lastAutoTable.finalY - 1,
        head: [['Effort', 'PE/Games', 'Punctuality']],
        body: [['-', '-', '-']],
        theme: 'grid',
        headStyles: { fillColor: lightGray, textColor: darkColor, fontStyle: 'bold', halign: 'center' },
        bodyStyles: { textColor: darkColor, halign: 'center' },
        margin: { left: 15, right: 15 }
    });

    yPos = doc.lastAutoTable.finalY + 6;
    addText("Key: A = Excellent, B = Good, S = Satisfactory, NI = Needs Improvement", 105, yPos, 8, 'normal', 'center', [100, 100, 100]);

    yPos += 8;

    // --- Comments & Signatures ---
    // Check space
    if (yPos > 230) {
        doc.addPage();
        yPos = 20;
    }

    // Comments boxes
    const boxHeight = 12;
    addText("Clubs, Societies & Other Co-Curricular Activities:", 15, yPos, 9, 'bold');
    doc.rect(15, yPos + 2, 180, boxHeight);

    yPos += boxHeight + 8;
    addText("Values Education - Overall Comments:", 15, yPos, 9, 'bold');
    doc.rect(15, yPos + 2, 180, boxHeight);

    yPos += boxHeight + 8;
    addText("Class Teacher's Comments:", 15, yPos, 9, 'bold');
    addLine(65, yPos, 195, yPos); // Line for comment

    yPos += 8;
    addText("School Head's Comments:", 15, yPos, 9, 'bold');
    addLine(65, yPos, 195, yPos); // Line for comment

    // Signatures
    yPos += 20;
    const sigY = yPos;
    const sigWidth = 40;
    const gap = (180 - (sigWidth * 4)) / 3;

    let x = 15;
    const signatures = ["Class Teacher", "Campus Stamp", "Head of School", "Date"];

    signatures.forEach(sig => {
        addLine(x, sigY, x + sigWidth, sigY);
        addText(sig, x + (sigWidth / 2), sigY + 5, 9, 'normal', 'center', [100, 100, 100]);
        x += sigWidth + gap;
    });

    // Save
    doc.save(`Result_Card_${studentName}.pdf`);
}

// Download DOCX function
// Download DOCX function
// Download DOCX function
// Download DOCX function
async function downloadDOCX() {
    console.log("Starting downloadDOCX...");

    if (typeof docx === 'undefined') {
        alert("Error: 'docx' library is not loaded. Please check your internet connection.");
        console.error("docx library is undefined");
        return;
    }

    if (typeof saveAs === 'undefined') {
        alert("Error: 'FileSaver.js' library is not loaded. Please check your internet connection.");
        console.error("saveAs is undefined");
        return;
    }

    try {
        console.log("Initializing DOCX document...");
        const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle, ImageRun, Header, Footer } = docx;

        // Extract Data
        const studentName = document.getElementById('studentName').value || "-";
        const className = document.getElementById('studentClass').value || "-";
        const rollNo = document.getElementById('rollNo').value || "-";
        const section = document.getElementById('section').value || "-";
        const campusName = document.getElementById('campusName').value || "-";
        const academicYear = document.getElementById('academicYear').value || "-";
        const term = document.getElementById('term').value || "-";
        const totalMarks = document.getElementById('totalMarks').value || "-";

        // Helper for bold text
        const boldText = (text, size = 20, color = "000000", font = "Times New Roman") => new TextRun({ text: text, bold: true, size: size, color: color, font: font });
        const normalText = (text, size = 20, color = "000000", font = "Times New Roman") => new TextRun({ text: text, size: size, color: color, font: font });
        const italicText = (text, size = 20, color = "000000", font = "Times New Roman") => new TextRun({ text: text, italics: true, size: size, color: color, font: font });

        // Helper for table cell
        const createCell = (text, bold = false, width = 2500, fillColor = "FFFFFF", textColor = "000000") => {
            return new TableCell({
                children: [new Paragraph({ children: [bold ? boldText(text, 16, textColor) : normalText(text, 16, textColor)], alignment: AlignmentType.CENTER })],
                width: { size: width, type: WidthType.DXA },
                verticalAlign: "center",
                shading: { fill: fillColor }
            });
        };

        // Prepare Logo
        let logoImage = null;
        try {
            // Try to get logo from DOM first
            const imgElement = document.getElementById('schoolLogo');
            if (imgElement && imgElement.src) {
                const response = await fetch(imgElement.src);
                const blob = await response.blob();
                const buffer = await blob.arrayBuffer();
                logoImage = new ImageRun({
                    data: buffer,
                    transformation: { width: 60, height: 60 }
                });
            } else if (typeof SCHOOL_LOGO_BASE64 !== 'undefined' && SCHOOL_LOGO_BASE64) {
                // Fallback to base64 variable if available
                const base64Response = await fetch(SCHOOL_LOGO_BASE64);
                const base64Blob = await base64Response.blob();
                const base64Buffer = await base64Blob.arrayBuffer();
                logoImage = new ImageRun({
                    data: base64Buffer,
                    transformation: { width: 60, height: 60 }
                });
            }
        } catch (e) {
            console.warn("Could not load logo for DOCX:", e);
        }

        // --- Academic Performance Data ---
        const subjects = classSubjects[className] || [];
        let totalTermObt = 0, totalTermTot = 0, totalExamObt = 0, totalExamTot = 0;

        const subjectRows = subjects.map(subject => {
            const termTotalEl = document.querySelector(`[data-subject="${subject}"].term-total`);
            const termObtEl = document.querySelector(`[data-subject="${subject}"].term-obtained`);
            const examTotalEl = document.querySelector(`[data-subject="${subject}"].exam-total`);
            const examObtEl = document.querySelector(`[data-subject="${subject}"].exam-obtained`);

            const termTotal = termTotalEl ? parseFloat(termTotalEl.value) || 0 : 0;
            const termObtained = termObtEl ? parseFloat(termObtEl.value) || 0 : 0;
            const examTotal = examTotalEl ? parseFloat(examTotalEl.value) || 0 : 0;
            const examObtained = examObtEl ? parseFloat(examObtEl.value) || 0 : 0;

            totalTermTot += termTotal;
            totalTermObt += termObtained;
            totalExamTot += examTotal;
            totalExamObt += examObtained;

            const termPercent = termTotal > 0 ? (termObtained / termTotal) * 100 : 0;
            const examPercent = examTotal > 0 ? (examObtained / examTotal) * 100 : 0;
            const combinedTotal = termTotal + examTotal;
            const combinedObtained = termObtained + examObtained;
            const averagePercent = combinedTotal > 0 ? (combinedObtained / combinedTotal) * 100 : 0;
            const grade = calculateGrade(averagePercent);

            return new TableRow({
                children: [
                    createCell(subject, true, 2500, "FFFFFF", "000000"),
                    createCell(`${termObtained} / ${termTotal} (${termPercent.toFixed(0)}%)`),
                    createCell(`${examObtained} / ${examTotal} (${examPercent.toFixed(0)}%)`),
                    createCell(`${averagePercent.toFixed(2)}%`),
                    createCell(grade)
                ]
            });
        });

        // Overall Stats
        const grandObt = totalTermObt + totalExamObt;
        const grandTot = totalTermTot + totalExamTot;
        const overallPerc = grandTot > 0 ? (grandObt / grandTot) * 100 : 0;
        const overallGrade = calculateGrade(overallPerc);

        // --- Document Construction ---
        const doc = new Document({
            sections: [{
                properties: {
                    page: {
                        margin: {
                            top: 500,
                            right: 500,
                            bottom: 500,
                            left: 500,
                        },
                    },
                },
                children: [
                    // Header Table (Logo + Text | Right Text)
                    new Table({
                        rows: [
                            new TableRow({
                                children: [
                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                children: [
                                                    logoImage ? logoImage : new TextRun(""),
                                                    new TextRun({ text: "  " }), // Spacer
                                                    new TextRun({ text: "The Smart School", bold: true, size: 32, color: "E31E24", font: "Helvetica" })
                                                ],
                                                alignment: AlignmentType.LEFT
                                            }),
                                            new Paragraph({
                                                children: [
                                                    new TextRun({ text: "Excellence in Education", italics: true, size: 18, color: "666666", font: "Helvetica" })
                                                ],
                                                alignment: AlignmentType.LEFT,
                                                indent: { left: 1440 } // Indent to align with text above (approx)
                                            })
                                        ],
                                        width: { size: 60, type: WidthType.PERCENTAGE },
                                        borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } }
                                    }),
                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                children: [new TextRun({ text: "The Smart School", italics: true, size: 28, font: "Times New Roman" })],
                                                alignment: AlignmentType.RIGHT
                                            })
                                        ],
                                        width: { size: 40, type: WidthType.PERCENTAGE },
                                        verticalAlign: "center",
                                        borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } }
                                    })
                                ]
                            })
                        ],
                        width: { size: 100, type: WidthType.PERCENTAGE }
                    }),

                    new Paragraph({ text: "", spacing: { after: 200 } }), // Spacer

                    // Title
                    new Paragraph({
                        children: [new TextRun({ text: `Result Card - Term ${term}`, bold: true, size: 24, font: "Times New Roman" })],
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 200 }
                    }),

                    // Student Info Table
                    new Table({
                        rows: [
                            new TableRow({
                                children: [
                                    createCell("Campus Name:", true), createCell(campusName),
                                    createCell("Academic Year:", true), createCell(`20${academicYear}, Term ${term}`)
                                ]
                            }),
                            new TableRow({
                                children: [
                                    createCell("Student Name:", true), createCell(studentName),
                                    createCell("Class/Section:", true), createCell(`${className} / ${section}`)
                                ]
                            }),
                            new TableRow({
                                children: [
                                    createCell("Roll No:", true), createCell(rollNo),
                                    createCell("Total Marks:", true), createCell(totalMarks)
                                ]
                            })
                        ],
                        width: { size: 100, type: WidthType.PERCENTAGE },
                        borders: {
                            top: { style: BorderStyle.NONE },
                            bottom: { style: BorderStyle.NONE },
                            left: { style: BorderStyle.NONE },
                            right: { style: BorderStyle.NONE },
                            insideVertical: { style: BorderStyle.NONE },
                            insideHorizontal: { style: BorderStyle.NONE },
                        }
                    }),

                    new Paragraph({ text: "", spacing: { after: 200 } }), // Spacer

                    // Academic Performance Header
                    new Paragraph({
                        children: [new TextRun({ text: "Academic Performance", bold: true, size: 20, font: "Times New Roman" })],
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 100 }
                    }),

                    // Performance Table
                    new Table({
                        rows: [
                            new TableRow({
                                children: [
                                    createCell("Subject", true, 2500, "E31E24", "FFFFFF"),
                                    createCell("Term (Obt/Total)", true, 2500, "E31E24", "FFFFFF"),
                                    createCell("Exam (Obt/Total)", true, 2500, "E31E24", "FFFFFF"),
                                    createCell("Average %", true, 2500, "E31E24", "FFFFFF"),
                                    createCell("Grade", true, 2500, "E31E24", "FFFFFF")
                                ],
                                tableHeader: true
                            }),
                            ...subjectRows
                        ],
                        width: { size: 100, type: WidthType.PERCENTAGE }
                    }),

                    new Paragraph({ text: "", spacing: { after: 200 } }), // Spacer

                    // Overall Summary Table
                    new Table({
                        rows: [
                            new TableRow({
                                children: [
                                    createCell("Total Term", true, 2500, "E31E24", "FFFFFF"),
                                    createCell("Total Exam", true, 2500, "E31E24", "FFFFFF"),
                                    createCell("Overall %", true, 2500, "E31E24", "FFFFFF"),
                                    createCell("Overall Grade", true, 2500, "E31E24", "FFFFFF")
                                ]
                            }),
                            new TableRow({
                                children: [
                                    createCell(`${totalTermObt} / ${totalTermTot}`),
                                    createCell(`${totalExamObt} / ${totalExamTot}`),
                                    createCell(`${overallPerc.toFixed(2)}%`),
                                    createCell(overallGrade)
                                ]
                            })
                        ],
                        width: { size: 100, type: WidthType.PERCENTAGE }
                    }),

                    new Paragraph({ text: "", spacing: { after: 300 } }), // Spacer

                    // Signatures
                    new Paragraph({
                        children: [
                            new TextRun({ text: "________________    ________________    ________________    ________________", font: "Times New Roman" })
                        ],
                        alignment: AlignmentType.CENTER
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({ text: "Class Teacher         Campus Stamp         Head of School            Date        ", font: "Times New Roman", size: 14 })
                        ],
                        alignment: AlignmentType.CENTER
                    })
                ]
            }]
        });

        console.log("Document created. Generating blob...");
        const blob = await Packer.toBlob(doc);
        console.log("Blob generated. Saving file...");
        saveAs(blob, `Result_Card_${studentName}.docx`);
        console.log("File saved.");

    } catch (error) {
        console.error("Error generating DOCX:", error);
        alert("An error occurred while generating the DOCX file:\n" + error.message);
    }
}

// Print result function
function printResult() {
    window.print();
}

// Event listeners
document.addEventListener('DOMContentLoaded', function () {
    const studentClassSelect = document.getElementById('studentClass');
    const resultForm = document.getElementById('resultForm');

    // Handle class selection
    studentClassSelect.addEventListener('change', function () {
        const selectedClass = this.value;
        if (selectedClass) {
            generateSubjectInputs(selectedClass);
        } else {
            document.getElementById('subjectsContainer').innerHTML = '';
        }
    });

    // Handle form submission
    resultForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = {
            studentName: document.getElementById('studentName').value,
            class: document.getElementById('studentClass').value,
            rollNo: document.getElementById('rollNo').value,
            totalMarks: document.getElementById('totalMarks').value,
            campusName: document.getElementById('campusName').value,
            academicYear: document.getElementById('academicYear').value,
            section: document.getElementById('section').value,
            term: document.getElementById('term').value
        };

        // Validate that all subject marks are entered (obtained <= total and totals > 0)
        const termTotals = document.querySelectorAll('.term-total');
        const termObtained = document.querySelectorAll('.term-obtained');
        const examTotals = document.querySelectorAll('.exam-total');
        const examObtained = document.querySelectorAll('.exam-obtained');
        let allMarksEntered = true;

        // Validate term totals and obtained
        termTotals.forEach((input, idx) => {
            const total = parseFloat(input.value);
            const obt = parseFloat(termObtained[idx].value);
            if (!input.value || total <= 0 || isNaN(total) || !termObtained[idx].value || isNaN(obt) || obt < 0 || obt > total) {
                allMarksEntered = false;
                input.style.borderColor = 'red';
                termObtained[idx].style.borderColor = 'red';
            } else {
                input.style.borderColor = '#e1e5e9';
                termObtained[idx].style.borderColor = '#e1e5e9';
            }
        });

        // Validate exam totals and obtained
        examTotals.forEach((input, idx) => {
            const total = parseFloat(input.value);
            const obt = parseFloat(examObtained[idx].value);
            if (!input.value || total <= 0 || isNaN(total) || !examObtained[idx].value || isNaN(obt) || obt < 0 || obt > total) {
                allMarksEntered = false;
                input.style.borderColor = 'red';
                examObtained[idx].style.borderColor = 'red';
            } else {
                input.style.borderColor = '#e1e5e9';
                examObtained[idx].style.borderColor = '#e1e5e9';
            }
        });

        if (!allMarksEntered) {
            alert('Please enter valid totals and obtained marks for all subjects. Obtained must be 0 to Total, and Totals must be greater than 0.');
            return;
        }

        // Show mobile loader for better UX
        const mobileLoader = document.getElementById('mobileLoader');
        if (window.innerWidth <= 768) {
            mobileLoader.style.display = 'flex';
        }

        // Generate result with slight delay for mobile
        setTimeout(() => {
            try {
                const resultCard = document.getElementById('resultCard');
                resultCard.innerHTML = generateResultCard(formData);

                // Hide loader
                mobileLoader.style.display = 'none';

                // Show result section
                document.getElementById('resultSection').style.display = 'block';

                // Scroll to result
                document.getElementById('resultSection').scrollIntoView({
                    behavior: 'smooth'
                });
            } catch (error) {
                console.error("Error generating result:", error);
                alert("An error occurred while generating the result. Please check the console for details.");
                mobileLoader.style.display = 'none';
            }
        }, window.innerWidth <= 768 ? 500 : 100);
    });

    // Handle form reset
    resultForm.addEventListener('reset', function () {
        document.getElementById('subjectsContainer').innerHTML = '';
        document.getElementById('resultSection').style.display = 'none';
    });
});

// Add some utility functions for better user experience
function validateTotal(input) {
    const total = parseFloat(input.value);
    const isValid = !isNaN(total) && total > 0;
    input.style.borderColor = isValid ? '#e1e5e9' : 'red';
    return isValid;
}

function validateObtained(input) {
    const obtained = parseFloat(input.value);
    const subject = input.getAttribute('data-subject');
    const isTerm = input.classList.contains('term-obtained');
    const totalSelector = isTerm ? `.term-total[data-subject="${subject}"]` : `.exam-total[data-subject="${subject}"]`;
    const totalInput = document.querySelector(totalSelector);
    const total = totalInput ? parseFloat(totalInput.value) : NaN;
    const isValid = !isNaN(obtained) && !isNaN(total) && total > 0 && obtained >= 0 && obtained <= total;
    input.style.borderColor = isValid ? '#e1e5e9' : 'red';
    if (totalInput) {
        totalInput.style.borderColor = (!isNaN(total) && total > 0) ? '#e1e5e9' : 'red';
    }
    return isValid;
}

// Add real-time validation for mark inputs
document.addEventListener('input', function (e) {
    const target = e.target;
    if (target.classList.contains('term-total') || target.classList.contains('exam-total')) {
        validateTotal(target);
        // Also revalidate the corresponding obtained field if present
        const subject = target.getAttribute('data-subject');
        const obtainedSelector = target.classList.contains('term-total') ? `.term-obtained[data-subject="${subject}"]` : `.exam-obtained[data-subject="${subject}"]`;
        const obtainedInput = document.querySelector(obtainedSelector);
        if (obtainedInput) validateObtained(obtainedInput);
    }
    if (target.classList.contains('term-obtained') || target.classList.contains('exam-obtained')) {
        validateObtained(target);
    }
});

// Mobile-specific enhancements
document.addEventListener('DOMContentLoaded', function () {
    // Logo is now handled directly in HTML

    // Prevent zoom on input focus for iOS
    const inputs = document.querySelectorAll('input[type="number"], input[type="text"], select');
    inputs.forEach(input => {
        input.addEventListener('focus', function () {
            if (window.innerWidth <= 768) {
                this.style.fontSize = '16px';
            }
        });

        input.addEventListener('blur', function () {
            if (window.innerWidth <= 768) {
                this.style.fontSize = '';
            }
        });
    });

    // Add touch feedback for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function () {
            this.style.transform = 'scale(0.95)';
        });

        button.addEventListener('touchend', function () {
            this.style.transform = '';
        });
    });

    // Handle orientation change
    window.addEventListener('orientationchange', function () {
        setTimeout(() => {
            // Recalculate layout after orientation change
            const resultSection = document.getElementById('resultSection');
            if (resultSection.style.display !== 'none') {
                resultSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 500);
    });

    // Add swipe gesture support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - could be used for navigation
                console.log('Swipe left detected');
            } else {
                // Swipe right - could be used for navigation
                console.log('Swipe right detected');
            }
        }
    }

    // Optimize for mobile performance
    if (window.innerWidth <= 768) {
        // Reduce animations on mobile for better performance
        document.body.style.setProperty('--transition-duration', '0.2s');

        // Add mobile-specific scroll behavior
        const smoothScrollElements = document.querySelectorAll('a[href^="#"]');
        smoothScrollElements.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
});




// Helper function to calculate grade
function calculateGrade(percentage) {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    if (percentage >= 50) return 'D';
    return 'F';
}
