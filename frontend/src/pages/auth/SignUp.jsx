import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLoader from "@/components/shared/PageLoader";

export default function SignUp() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Set auth in localStorage
      localStorage.setItem("isAuth", "true");
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: formData.name,
          email: formData.email,
        })
      );

      // Navigate to home
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Registration failed:", error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="h-screen w-screen flex relative bg-[#010207] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-[20%] left-[15%] w-[25rem] h-[25rem] bg-purple-600/20 rounded-full blur-[6rem]" />
        <div className="absolute bottom-[20%] right-[15%] w-[25rem] h-[25rem] bg-blue-600/20 rounded-full blur-[6rem]" />
        <div className="absolute top-[40%] left-[45%] w-[20rem] h-[20rem] bg-pink-600/20 rounded-full blur-[6rem]" />
      </div>

      {/* Left Content Section */}
      <div className="w-[60%] h-full flex flex-col justify-center px-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 relative z-10"
        >
          {/* Brand Section */}
          <div className="space-y-4 mb-12">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-8"
            >
              <Sparkles className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold text-white">AuroraDocs</span>
            </motion.div>
            <h1 className="text-7xl font-bold text-white leading-tight">
              Join the future of{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                document
              </span>{" "}
              intelligence
            </h1>
            <p className="text-gray-400 text-lg max-w-md">
              Create an account and unlock the power of AI-driven document analysis
              and collaboration.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-2 gap-8">
            {[
              {
                title: "Instant Analysis",
                desc: "Get immediate insights from your documents",
              },
              {
                title: "Smart Organization",
                desc: "AI-powered document categorization",
              },
              {
                title: "Secure Storage",
                desc: "Your documents, safely encrypted",
              },
              {
                title: "Collaboration",
                desc: "Share insights with your team",
              },
            ].map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="space-y-2"
              >
                <h3 className="text-white font-semibold">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Auth Section */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-[40%] h-full flex items-center justify-center backdrop-blur-3xl relative"
      >
        <div className="absolute inset-0 bg-white/[0.02]" />
        <Card className="w-full max-w-md mx-8 border-0 bg-white/[0.03] backdrop-blur-xl">
          <CardContent className="p-8 space-y-6">
            <div className="space-y-2 mb-6 text-center">
              <h2 className="text-2xl font-bold text-white">Create Account</h2>
              <p className="text-gray-400">Start your journey with AuroraDocs</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Full Name</label>
                <Input
                  placeholder="Enter your name"
                  type="text"
                  className="bg-black/20 border-white/10 text-white h-12"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Email</label>
                <Input
                  placeholder="Enter your email"
                  type="email"
                  className="bg-black/20 border-white/10 text-white h-12"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Password</label>
                <Input
                  placeholder="Create a password"
                  type="password"
                  className="bg-black/20 border-white/10 text-white h-12"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>

              <Button className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90 mt-6">
                Create Account
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>

            <p className="text-sm text-center text-gray-400 mt-6">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-purple-400 hover:text-purple-300"
              >
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
