import { useState } from "react";
import QRCode from "qrcode";
export default function QRCodeGenerator() {
  const [input, setInput] = useState("");
  const[qrUrl,setQrUrl] =useState("");
  const [error, setError] = useState("");
  const handleGenerate= async(e) => {
    e.preventDefault();
    
    if(input.trim()==="") {
   
    setError(" ⚠️ please enter a valid Url") 
     setQrUrl("");
     return;
    }
    try {
        const url= await QRCode.toDataURL(input);
        setQrUrl(url);
        setError("");
    } catch (err) {
        console.error(err);
        setError("❌ Failed to generate QR Code.")
        setQrUrl("");

    }
  }
    return (
        <div className="bg-black min-h-screen flex flex-col items-center justify-center">
         <h1 className="text-blue-600 font-bold text-3xl mb-6">QR Code Generator</h1>
         <form onSubmit={handleGenerate} className="w-full max-w-md" >
<input type="text" placeholder="enter URL" className="w-full p-2 rounded border bg-amber-300 text-white mb-4" value={input} onChange={(e) => setInput(e.target.value)}/>
<button type="submit" className="bg-blue-700 hover:bg-amber-600 text-white px-4 py-2 rounded w-full">Generate QR Code</button>
         </form>
         {error && (
            <p className="text-red-500 mt-4 font-medium">{error}</p>
         )}
         {qrUrl && (
            <img src={qrUrl} alt="QR Code" className="mt-6 w-[260px] h-[260px]" />
         )}
        </div>
    )
}