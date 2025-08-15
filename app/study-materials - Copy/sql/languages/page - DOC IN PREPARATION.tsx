export const metadata = {
  title: "PowerCenter Study Materials - Rishab Informatica Group",
  description: "Access Informatica PowerCenter notes, mappings, and exercises.",
}

export default function PowerCenterMaterialsPage() {
  return (
    <main className="py-24 px-4 sm:px-6 lg:px-8 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          📘 SQL Study Material
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          This page will include:
        </p>
        <ul className="text-left text-base text-muted-foreground list-disc list-inside space-y-2 mb-12">
          <li>Session Notes (PDF / text)</li>
          <li>Mapping Documents</li>
          <li>Hands-on Exercises</li>
          <li>Scenario-Based Interview Q&A</li>
        </ul>
        <p className="text-primary text-base font-medium">
          📌 Under preparation. We’ll update these very soon.
        </p>
      </div>
    </main>
  )
}
