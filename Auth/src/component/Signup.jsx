import { useState } from "react";
import 'animate.css';
import { httpInterceptor } from "./lib/httpInterceptor";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { Link } from "react-router-dom";
const notyf = new Notyf({
  position:{x:"center",x:top}
});
const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile:"",
    password: ""
  
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((form) => ({
      ...form,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data } = await httpInterceptor.post('/auth/signup', formData)
    console.log(data)
    notyf.success('Signup Success')
    
     setTimeout(()=>{
       
        location.replace('/login')
     },3000)
    

  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="grid lg:grid-cols-2">
          {/* Left Section */}
          <div className="hidden lg:flex flex-col justify-between bg-slate-900 p-12 text-white">
            <div>
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-white/10 backdrop-blur">
                ✨
              </div>

              <h1 className="mt-8 text-5xl font-bold leading-tight">
                Create Your Account
              </h1>

              <p className="mt-6 text-slate-300 text-lg">
                Join thousands of users and start managing everything from one
                beautiful dashboard.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-slate-300">
                Trusted by teams worldwide for productivity and collaboration.
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="p-6 sm:p-10 lg:p-14">
            <div className="mx-auto max-w-md">
              <div className="lg:hidden mb-8 text-center">
                <h1 className="text-3xl font-bold text-slate-900">
                  Create Account
                </h1>
                <p className="mt-2 text-slate-500">
                  Start your journey today
                </p>
              </div>

              <div className="hidden lg:block">
                <h2 className="text-3xl font-bold text-slate-900">
                  Sign Up
                </h2>
                <p className="mt-2 text-slate-500">
                  Fill in your details to get started.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-900"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="03XX‑XXXXXXX"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-900"
                  />
                </div>


                 <button
                  type="submit"
                  className="w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800"
                >
                  Create Account
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-500">
                Already have an account?{" "}
               <Link  to="/login" >
                <button className="font-semibold text-slate-900 hover:underline" >
                  Sign In
                </button>
               </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;