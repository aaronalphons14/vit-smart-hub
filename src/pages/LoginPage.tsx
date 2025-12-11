import { useState } from "react";
import { Header } from "@/components/Header";
import { Keypad } from "@/components/ui/keypad";
import { EVButton } from "@/components/ui/ev-button";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCharger } from "@/context/ChargerContext";
import { toast } from "sonner";

export default function LoginPage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { login } = useCharger();

  const handleSubmit = () => {
    const result = login(code);
    
    if (result.success) {
      toast.success(`Welcome, ${result.role === 'admin' ? 'Administrator' : 'User'}!`);
      if (result.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/charging');
      }
    } else {
      setError(true);
      setCode("");
      toast.error("Invalid code. Please try again.");
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-2">
            Enter Your Code
          </h2>
          <p className="text-muted-foreground text-sm">
            Enter your 4-digit access code
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-destructive mb-4 animate-scale-in">
            <AlertCircle className="w-5 h-5" />
            <span className="font-display text-sm">Invalid Code</span>
          </div>
        )}

        <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <Keypad
            value={code}
            onChange={setCode}
            onSubmit={handleSubmit}
            maxLength={4}
          />
        </div>

        <EVButton
          variant="ghost"
          size="lg"
          onClick={() => navigate('/')}
          className="mt-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </EVButton>
      </main>
    </div>
  );
}
