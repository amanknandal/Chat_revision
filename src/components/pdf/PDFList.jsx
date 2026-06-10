import { useEffect, useState } from "react"
import PDFCard from "./PDFCard"
import axios from "axios"
const PDFList = () => {
  const [pdfs, setPdfs] = useState([])
  const [loading, setLoading] = useState(true)
  const fetchPDFs = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/pdf/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setPdfs(response.data.pdfs || [])
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchPDFs()
  }, [])
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Your PDFs
          </h1>
          <p className="text-gray-400 mt-2">
            Manage and chat with your uploaded documents
          </p>
        </div>
      </div>
      {loading ? (
        <div className="text-white text-lg">
          Loading PDFs...
        </div>
      ) : pdfs.length === 0 ? (
        <div className="text-gray-400 text-lg">
          No PDFs uploaded yet
        </div>
      ) : (
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
            <PDFCard
              key={pdf.id}
              pdf={pdf}
              refreshPDFs={fetchPDFs}
            />
          ))}
        </div>
      )}
    </div>
  )
}
export default PDFList