import { Download } from 'lucide-react'
import Link from 'next/link'

export default function SampleResumePage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
        Cloud ETL Developer Resume Template
      </h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Download Resume Templates</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ResumeDownloadCard 
            title="BASHA - Cloud ETL Developer"
            description="7+ years experience in IICS, PowerCenter, Data Warehousing"
            fileName="BASHA_Cloud_ETL_Developer.docx"
          />
          <ResumeDownloadCard 
            title="Deepa - Cloud ETL Developer"
            description="Pharma & Healthcare domain expertise"
            fileName="Deepa_Cloud_ETL_Developer.docx"
          />
          <ResumeDownloadCard 
            title="Srinuvasan - Cloud ETL Developer"
            description="Banking & Financial services specialization"
            fileName="Srinuvasan_Cloud_ETL_Developer.docx"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">How to Customize Your Resume</h2>
        
        <div className="space-y-6">
          <Section 
            title="1. Personal Information"
            content={
              <>
                <p>Replace the placeholder information with your details:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li><strong>Name:</strong> Your full name</li>
                  <li><strong>Mobile:</strong> Your contact number</li>
                  <li><strong>Email:</strong> Your professional email address</li>
                </ul>
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <pre className="text-sm text-gray-700">
{`**Your Name**  
Mobile: +91-XXXXXXXXXX  
[your.email@domain.com](mailto:your.email@domain.com)`}
                  </pre>
                </div>
              </>
            }
          />

          <Section 
            title="2. Professional Summary"
            content={
              <>
                <p>Tailor this section to highlight your specific experience:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Update years of experience</li>
                  <li>Mention specific domains you've worked in (Healthcare, Banking, etc.)</li>
                  <li>Highlight any unique skills or certifications</li>
                </ul>
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <pre className="text-sm text-gray-700">
{`- Highly skilled professional with X+ years of hands-on experience...
- Extensive experience in [your specific skills]...
- Specialized in [your domain expertise]...`}
                  </pre>
                </div>
              </>
            }
          />

          <Section 
            title="3. Technical Skills"
            content={
              <>
                <p>Update this section with your technical proficiencies:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>List all ETL tools you're proficient with</li>
                  <li>Include databases you've worked with</li>
                  <li>Add any cloud platforms or other relevant tools</li>
                </ul>
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <pre className="text-sm text-gray-700">
{`**ETL Tools**        Informatica PowerCenter, IICS, [others]  
**Databases**       Oracle, SQL Server, [others]  
**Cloud Platforms** AWS, GCP, Azure  
**Other Tools**     [List any other relevant tools]`}
                  </pre>
                </div>
              </>
            }
          />

          <Section 
            title="4. Work Experience"
            content={
              <>
                <p>Customize with your employment history:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Update company names and employment periods</li>
                  <li>Modify project details to reflect your experience</li>
                  <li>Include specific achievements and responsibilities</li>
                </ul>
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <pre className="text-sm text-gray-700">
{`**Company**        Your Company Name  
**Period**         Month Year - Present  
**Position**       Your Job Title  

**Project Title**  Project Name  
**Client**         Client Name  
**Role**           Your Role  

- Describe your responsibilities and achievements
- Quantify results where possible
- Highlight technical implementations`}
                  </pre>
                </div>
              </>
            }
          />

          <Section 
            title="5. Education"
            content={
              <>
                <p>Update with your educational background:</p>
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <pre className="text-sm text-gray-700">
{`- Degree Name from University Name (Year)  
- Any additional certifications or training`}
                  </pre>
                </div>
              </>
            }
          />

          <div className="p-4 bg-blue-50 rounded-md border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Pro Tips</h3>
            <ul className="list-disc pl-5 space-y-1 text-blue-700">
              <li>Keep your resume to 2-3 pages maximum</li>
              <li>Use action verbs (Developed, Designed, Implemented)</li>
              <li>Quantify achievements where possible (e.g., "Improved performance by 40%")</li>
              <li>Tailor your resume for each job application</li>
              <li>Proofread multiple times for errors</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function ResumeDownloadCard({ title, description, fileName }: { 
  title: string
  description: string
  fileName: string
}) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link 
        href={`/sample-resumes/${fileName}`}
        className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        download
      >
        <Download className="h-4 w-4 mr-2" />
        Download DOCX
      </Link>
    </div>
  )
}

function Section({ title, content }: { title: string; content: React.ReactNode }) {
  return (
    <div className="border-b pb-6 last:border-b-0">
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <div className="text-gray-700">
        {content}
      </div>
    </div>
  )
}