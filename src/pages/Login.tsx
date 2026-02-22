import { useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-hero-gradient items-center justify-center p-12">
        <div className="max-w-md text-primary-foreground">
          <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center mb-6">
            <Briefcase className="w-6 h-6" />
          </div>
          <h2 className="font-display font-bold text-3xl mb-4">Welcome back to JobFlow</h2>
          <p className="text-primary-foreground/70 leading-relaxed">
            Sign in to access your dashboard, manage applications, and discover new opportunities.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-sm"
        >
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl text-foreground mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-lg bg-hero-gradient flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-primary-foreground" />
            </div>
            JobFlow
          </Link>

          <h1 className="font-display font-bold text-2xl text-foreground">Sign In</h1>
          <p className="text-sm text-muted-foreground mt-1 mb-6">Enter your credentials to access your account</p>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@example.com" className="pl-9" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-9 pr-9"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full" size="lg">Sign In</Button>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-medium hover:underline">Sign Up</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
