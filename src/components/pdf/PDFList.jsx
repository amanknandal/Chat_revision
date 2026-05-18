import PDFCard from "./PDFCard"

const pdfs = [
  {
    id: 1,
    name: "DBMS Complete Notes.pdf",
    size: "4.2 MB",
    date: "12 May 2026",
  },
  {
    id: 2,
    name: "Operating System Guide.pdf",
    size: "8.5 MB",
    date: "14 May 2026",
  },
  {
    id: 3,
    name: "Computer Networks.pdf",
    size: "6.7 MB",
    date: "15 May 2026",
  },
  {
    id: 4,
    name: "AI Research Paper.pdf",
    size: "11.2 MB",
    date: "16 May 2026",
  },
]

const PDFList = () => {
  return (
    <div>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Your PDFs
          </h1>

          <p className="text-gray-400 mt-2">
            Manage and chat with your uploaded documents
          </p>
        </div>

        <button
          className="
            px-6
            py-3
            rounded-2xl
            bg-gradient-to-r
            from-purple-500
            to-blue-500
            text-white
            font-semibold
            hover:scale-105
            transition-all
            duration-300
            shadow-lg
          "
        >
          Upload New
        </button>
      </div>

      {/* GRID */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-6
        "
      >
        {pdfs.map((pdf) => (
          <PDFCard key={pdf.id} pdf={pdf} />
        ))}
      </div>
    </div>
  )
}

export default PDFList