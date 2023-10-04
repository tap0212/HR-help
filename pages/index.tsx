import CSVUploader from '@/components/CSVUploader'
import Header from '@/components/Header'
import Table from '@/components/Table'
import { Inter } from 'next/font/google'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [csvData, setCsvData] = useState<any[]>([])
  const onSubmitCSV = (data: any[]) => {
    setCsvData(data)
  }
  console.log({csvData});
  
  return (
    <main
      className={`flex min-h-screen flex-col items-center bg-black-90 ${inter.className}`}
    >
      <Header />
      {/* container */}
      {!csvData.length ? (
        <div className='w-full h-full flex flex-col items-center justify-center p-24'>
          <CSVUploader onSubmitCSV={onSubmitCSV} />
        </div>
      ) : (
        <div className="w-full p-4">
          <Table data={csvData} />
        </div>
      )}
    </main>
  )
}
