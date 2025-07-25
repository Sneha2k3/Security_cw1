import { useLocation ,useNavigate} from "react-router-dom";
import { useState } from "react";

const Qr = () => {
    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate();
    const { mfaSecret, qrCodeUrl } = state || {};
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(mfaSecret);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    }
    return (
        <div className="w-[500px] mx-auto mt-10 p-5 bg-white rounded-lg shadow-md text-center">
            <div className="">
                <h1 className="text-2xl font-bold mb-4">Scan the QR Code</h1>
                <p className="mb-4">Use your mobile to scan the QR code below:</p>
                <div className="flex justify-center">
                    <img
                        src={qrCodeUrl}
                        alt="QR Code"
                        className="border border-gray-300 rounded-lg shadow-md"
                    />
                </div>
                <p className="mt-4">
                Or

                </p>

                <div className="mt-4">
                    <p> Manually Enter below code in authenticator app</p>
                    <div className="flex items-center gap-2 bg-gray-100 rounded-md p-2 mt-2">
                        <div className="overflow-x-auto whitespace-nowrap  text-sm select-text flex-1">
                            {mfaSecret}

                        </div>
                        <button
                            onClick={handleCopy}
                            className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            {copied ? "Copied!" : "Copy"}
                        </button>
                    </div>
                </div>

                <button
                    onClick={() => navigate("/login",{replace:true})} 
                className="mt-8 bg-blue-500 rounded-md py-3 px-5 text-white  hover:bg-blue-700 transition delay-100"> Continue </button>
            </div>
        </div>
    )
}

export default Qr;