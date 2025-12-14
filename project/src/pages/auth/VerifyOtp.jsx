import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const email = localStorage.getItem("pendingEmail"); // email saved after signup

  useEffect(()=>{
     if (otp.every(d => d !== "")) { 
    handleSubmit();
  }
  },[otp])
  // Handle OTP input
  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto focus next input
      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }

      // Auto submit when last digit entered
      // if (index === 3 && value && newOtp.join("").length === 4) {
      //   handleSubmit();
      // }
    }
  };

  // Submit OTP
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    const otpCode = otp.join("");
    console.log(otp)
    console.log(otpCode)
    if (otpCode.length !== 4) {
      setError("Please enter the full OTP.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8000/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpCode }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        console.log("OTP verified successfully:", data);
        localStorage.removeItem("pendingEmail"); // cleanup
        navigate("/login");
      } else {
        setError(data.message || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please check your network connection.");
      console.error("OTP verify error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="card p-8 shadow-lg rounded-2xl">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2 text-primary-600">
            OTP Verification
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Please enter the 4-digit OTP sent to your email <br />
            <span className="font-semibold">{email}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP boxes */}
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                className="w-12 h-12 text-center text-xl font-semibold border-2 rounded-lg 
                 focus:border-primary-600 focus:ring-2 focus:ring-primary-200 
                 outline-none text-black bg-white"
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* <button
            type="submit"
            className="btn btn-primary w-full py-2.5"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify"}
          </button> */}

          <button
            type="button"
            className="btn btn-outline w-full py-2.5"
            onClick={() => navigate("/signup")}
          >
            Cancel
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default VerifyOtp;
