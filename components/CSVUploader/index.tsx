import { ChangeEvent, SyntheticEvent, useRef, useState } from "react"
import Papa from 'papaparse';

interface CSVUploaderProps {
		onSubmitCSV: (d: any[]) => void;
}
const CSVUploader = ({onSubmitCSV}: CSVUploaderProps) => {
	const [isDragActive, setIsDragActive] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
	const [csvData, setCsvData] = useState<any[]>([]);
	const [error, setError] = useState<string | null>(null);
	const handleDragFile = (e: SyntheticEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === "dragenter" || e.type === "dragover") {
			setIsDragActive(true);
		} else if (e.type === "dragleave") {
			setIsDragActive(false);
		}
	};	
	const parseCsv = (file: File) => {
		Papa.parse(file, {
			header: true, 
			dynamicTyping: true,
			complete: (results) => {
				if (results.errors.length === 0) {
					setCsvData(results.data);
					setError(null);
				} else {
					setError('Error parsing CSV file.');
				}
			},
		});
	}
	const handleDropFile = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragActive(false);
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			const file = e.dataTransfer.files[0];
			parseCsv(file)
		}
	};
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			parseCsv(file)
		}
	};
	const onButtonClick = () => {
		if(inputRef?.current){
			inputRef.current.click();
		}
  };
	const onClickSubmit = () => {
		onSubmitCSV(csvData)
	}
	if (csvData.length > 0) {
		return (
			<div className="p-8 h-64 w-64 min-w-full border-2 rounded-lg border-dashed border-black-70 bg-black-80 flex flex-col items-center justify-center gap-8">
				<p>CSV file parsed successfully</p>
				<button
					onClick={onClickSubmit}
					className="outline-none bg-black-20 px-4 py-2 text-black font-semibold rounded-full"
				>
					Submit
				</button>
			</div>
		);
	} else if (error) {
		return (
			<div className="p-8 h-64 w-64 min-w-full border-2 rounded-lg border-dashed border-red-500 bg-red-100 text-red-500 flex flex-col items-center justify-center gap-8">
				<p>Error: {error}</p>
			</div>
		);
	}
	return (
		<form onDragEnter={handleDragFile} onSubmit={(e) => e.preventDefault()} className=" h-64 w-64 min-w-full text-center relative">
			<input
				ref={inputRef}
				type="file"
				className="hidden"
				multiple={false}
				onChange={handleChange}
				accept=".csv"
			/>
			<label
				className={`h-full flex items-center justify-center border-2 rounded-lg border-dashed border-black-70 bg-black-80 ${isDragActive && 'bg-black-20' }`}
			>
				<div>
					<p>Drag and drop your file here or</p>
					<button
						onClick={onButtonClick}
						className="cursor-pointer p-1 text-base bg-transparent hover:underline"
					>
						Upload a file
					</button>
				</div> 
			</label>
			{ isDragActive && 
				<div 
					className="absolute w-full h-full rounded-2xl top-0 bottom-0 left-0 right-0"
					onDragEnter={handleDragFile}
					onDragLeave={handleDragFile}
					onDragOver={handleDragFile}
					onDrop={handleDropFile}
				/> 
			}
		</form>
	)
}
export default CSVUploader