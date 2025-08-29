import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLoader from "@/components/shared/PageLoader";

export default function SignIn() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
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
          name: "Test User",
          email: formData.email,
        })
      );

      // Navigate to home
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Login failed:", error);
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
              Transform your <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                documents
              </span>{" "}
              into <br />
              knowledge
            </h1>
            <p className="text-gray-400 text-lg max-w-md">
              Experience the future of document interaction with AI-powered
              analysis and intelligent conversations.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-8">
            {[
              {
                title: "Smart Chat",
                desc: "Natural conversations with your documents",
              },
              {
                title: "Quick Notes",
                desc: "AI-powered note generation and summaries",
              },
              {
                title: "Visual Maps",
                desc: "Transform text into interactive mindmaps",
              },
              {
                title: "Multi-Doc Analysis",
                desc: "Connect information across documents",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="space-y-2"
              >
                <h3 className="text-white font-semibold">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
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
              <h2 className="text-2xl font-bold text-white">Welcome back</h2>
              <p className="text-gray-400">Sign in to continue your journey</p>
            </div>

            {/* Update the form section */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Email</label>
                <Input
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  placeholder="Enter your email"
                  type="email"
                  required
                  className="bg-black/20 border-white/10 text-white h-12"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Password</label>
                <Input
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  placeholder="Enter your password"
                  type="password"
                  required
                  className="bg-black/20 border-white/10 text-white h-12"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90 mt-6"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    Loading...{" "}
                    <ArrowRight className="w-4 h-4 ml-2 animate-pulse" />
                  </span>
                ) : (
                  <>
                    Sign In <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <p className="text-sm text-center text-gray-400 mt-6">
              New to AuroraDocs?{" "}
              <Link
                to="/signup"
                className="text-purple-400 hover:text-purple-300"
              >
                Create an account
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
