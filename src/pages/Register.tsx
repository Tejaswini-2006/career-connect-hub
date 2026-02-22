import { useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

const roles = [
  { value: "applicant", label: "Job Seeker", desc: "Browse and apply for jobs" },
  { value: "recruiter", label: "Recruiter", desc: "Post jobs and find talent" },
];

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("applicant");

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-hero-gradient items-center justify-center p-12">
        <div className="max-w-md text-primary-foreground">
          <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center mb-6">
            <Briefcase className="w-6 h-6" />
          </div>
          <h2 className="font-display font-bold text-3xl mb-4">Join JobFlow Today</h2>
          <p className="text-primary-foreground/70 leading-relaxed">
            Create your free account and start connecting with top companies and talent worldwide.
          </p>
        </div>
      </div>

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

          <h1 className="font-display font-bold text-2xl text-foreground">Create Account</h1>
          <p className="text-sm text-muted-foreground mt-1 mb-6">Choose your role and get started</p>

          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {roles.map((role) => (
              <button
                key={role.value}
                type="button"
                onClick={() => setSelectedRole(role.value)}
                className={`rounded-lg border-2 p-3 text-left transition-all ${
                  selectedRole === role.value
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-muted-foreground/30"
                }`}
              >
                <p className="text-sm font-semibold text-foreground">{role.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{role.desc}</p>
              </button>
            ))}
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="name" placeholder="John Doe" className="pl-9" />
              </div>
            </div>
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
            <Button type="submit" className="w-full" size="lg">Create Account</Button>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">Sign In</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
