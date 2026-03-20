import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Tv } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin } });
      if (error) toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
      else toast({ title: "Check your email", description: "We've sent a confirmation link." });
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) toast({ title: "Sign in failed", description: error.message, variant: "destructive" });
      else navigate("/");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Tv className="h-7 w-7 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Series Finder</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            {isSignUp ? "Create an account to save your watchlist" : "Sign in to access your watchlist"}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border bg-card p-6 shadow-sm">
          <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
          </Button>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button onClick={() => setIsSignUp(!isSignUp)} className="text-primary underline">
            {isSignUp ? "Sign in" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
