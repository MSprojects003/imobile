"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// Define types for our form data
interface SignInFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface SignUpFormData {
  email: string;
  phoneNumber: string;
  address: string;
  password: string;
  confirmPassword: string;
  termsAccepted?: boolean;
}

export default function Auth() {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");

  // Separate form instances for sign-in and sign-up
  const {
    register: registerSignIn,
    handleSubmit: handleSubmitSignIn,
    formState: { errors: errorsSignIn },
    reset: resetSignIn,
  } = useForm<SignInFormData>();

  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    formState: { errors: errorsSignUp },
    watch: watchSignUp,
    reset: resetSignUp,
    setValue: setValueSignUp,
  } = useForm<SignUpFormData>();

  // Watch password for confirmation validation
  const signUpPassword = watchSignUp("password");

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value as "signin" | "signup");
  };

  // Handle sign-in submission
  const onSignInSubmit = (data: SignInFormData) => {
    console.log("Signin data:", data);
  };

  // Handle sign-up submission
  const onSignUpSubmit = (data: SignUpFormData) => {
    console.log("Signup data:", data);
  };

  // Reset forms when switching tabs
  useEffect(() => {
    if (activeTab === "signin") {
      resetSignUp();
    } else {
      resetSignIn();
    }
  }, [activeTab, resetSignIn, resetSignUp]);

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="https://images.unsplash.com/photo-1543726969-6c0e2a17b2a7?q=80&w=2070&auto=format&fit=crop"
          alt="Space Exploration"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/50 flex items-center p-8 lg:p-12">
          <div className="text-white max-w-md">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Astro</h1>
            <p className="text-xl lg:text-2xl mb-2 leading-relaxed">Exploring new frontiers, one step at a time.</p>
            <p className="text-blue-200 text-sm lg:text-base">Beyond Earth's grasp</p>
          </div>
        </div>
      </div>

      {/* Right Side - Form (Full width on mobile, half on desktop) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-blue-900">
              {activeTab === "signup" ? "Create Account" : "Welcome Back"}
            </CardTitle>
            <p className="text-blue-600 text-sm mt-1">
              {activeTab === "signup" ? "Join us today" : "Sign in to your account"}
            </p>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <Tabs defaultValue="signin" onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-blue-100 p-1">
                <TabsTrigger
                  value="signin"
                  className="data-[state=active]:bg-blue-900 data-[state=active]:text-white text-blue-700"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-blue-900 data-[state=active]:text-white text-blue-700"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="mt-6">
                <form onSubmit={handleSubmitSignIn(onSignInSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email" className="text-blue-900 font-medium">
                      Email
                    </Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="Enter your email"
                      className="border-blue-200 focus:border-blue-900 focus:ring-blue-900"
                      {...registerSignIn("email", {
                        required: "Email is required",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Enter a valid email",
                        },
                      })}
                    />
                    {errorsSignIn.email && (
                      <p className="text-red-500 text-sm">{errorsSignIn.email.message as string}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signin-password" className="text-blue-900 font-medium">
                      Password
                    </Label>
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="Enter your password"
                      className="border-blue-200 focus:border-blue-900 focus:ring-blue-900"
                      {...registerSignIn("password", { required: "Password is required" })}
                    />
                    {errorsSignIn.password && (
                      <p className="text-red-500 text-sm">{errorsSignIn.password.message as string}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center space-x-2 text-blue-700">
                      <span>Remember me</span>
                    </label>
                    <a href="#" className="text-blue-900 hover:text-blue-700 font-medium">
                      Forgot password?
                    </a>
                  </div>

                  <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-800 text-white h-11 font-medium">
                    Sign In
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="mt-6">
                <div className="space-y-4">
                  <div className="text-center text-blue-600 text-sm">Create your account below</div>
                  <form onSubmit={handleSubmitSignUp(onSignUpSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-blue-900 font-medium">
                        Email or Phone No.
                      </Label>
                      <Input
                        id="signup-email"
                        type="text"
                        placeholder="Enter your email or phone number"
                        className="border-blue-200 focus:border-blue-900 focus:ring-blue-900"
                        {...registerSignUp("email", {
                          required: "Email or Phone is required",
                          pattern: {
                            value: /^(?:\S+@\S+\.\S+|\+?\d{10,15})$/,
                            message: "Enter a valid email or phone number",
                          },
                        })}
                      />
                      {errorsSignUp.email && (
                        <p className="text-red-500 text-sm">{errorsSignUp.email.message as string}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber" className="text-blue-900 font-medium">
                        Phone Number
                      </Label>
                      <PhoneInput
                        country="lk"
                        countryCodeEditable={false}
                        value={watchSignUp("phoneNumber") || ""}
                        onChange={(phone) => setValueSignUp("phoneNumber", phone)}
                        inputClass="border-blue-200 focus:border-blue-900 focus:ring-blue-900 w-full"
                        placeholder="Enter phone number"
                      />
                      {errorsSignUp.phoneNumber && (
                        <p className="text-red-500 text-sm">{errorsSignUp.phoneNumber.message as string}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-blue-900 font-medium">
                        Address
                      </Label>
                      <Input
                        id="address"
                        type="text"
                        placeholder="Enter your address"
                        className="border-blue-200 focus:border-blue-900 focus:ring-blue-900"
                        {...registerSignUp("address", { required: "Address is required" })}
                      />
                      {errorsSignUp.address && (
                        <p className="text-red-500 text-sm">{errorsSignUp.address.message as string}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-blue-900 font-medium">
                        Password
                      </Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Enter your password"
                        className="border-blue-200 focus:border-blue-900 focus:ring-blue-900"
                        {...registerSignUp("password", {
                          required: "Password is required",
                          minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                          },
                        })}
                      />
                      {errorsSignUp.password && (
                        <p className="text-red-500 text-sm">{errorsSignUp.password.message as string}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-blue-900 font-medium">
                        Confirm Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        className="border-blue-200 focus:border-blue-900 focus:ring-blue-900"
                        {...registerSignUp("confirmPassword", {
                          required: "Please confirm your password",
                          validate: (value) => value === signUpPassword || "Passwords do not match",
                        })}
                      />
                      {errorsSignUp.confirmPassword && (
                        <p className="text-red-500 text-sm">{errorsSignUp.confirmPassword.message as string}</p>
                      )}
                    </div>

                    <div className="flex items-start space-x-2 text-sm">
                      <span className="text-blue-700">
                        I agree to the{" "}
                        <a href="#" className="text-blue-900 hover:text-blue-700 font-medium">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-blue-900 hover:text-blue-700 font-medium">
                          Privacy Policy
                        </a>
                      </span>
                    </div>

                    <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-800 text-white h-11 font-medium">
                      Create Account
                    </Button>
                  </form>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-blue-600 text-sm">
                {activeTab === "signup" ? "Already have an account?" : "Don't have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => setActiveTab(activeTab === "signup" ? "signin" : "signup")}
                  className="text-blue-900 hover:text-blue-700 font-medium"
                >
                  {activeTab === "signup" ? "Sign in" : "Sign up"}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}