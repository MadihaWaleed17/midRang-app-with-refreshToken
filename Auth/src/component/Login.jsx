import { useEffect, useState } from "react";
import { httpInterceptor } from "./lib/httpInterceptor";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { useAuth } from "../context/Authprovider";

const Login = ({ fetchUser }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(()=>{
    userFetch()
  },[])
  const notyf = new Notyf();
  const { userFetch } = useAuth()
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((form) => ({
      ...form,
      [name]: value,
    }));

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await httpInterceptor.post('/auth/login', formData)
    console.log(data)
    notyf.success('Login success');
    await userFetch()
    setTimeout(() => {
      location.replace('/dashboard')
    }, 3000)
  };

  return (
    <section className="min-h-screen bg-slate-950 px-4 py-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center justify-center">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-800 bg-white shadow-2xl lg:grid-cols-2">
          {/* Left Side */}
          <div className="hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-12 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-xl font-bold backdrop-blur">
                L
              </div>

              <h1 className="mt-10 text-5xl font-bold leading-tight">
                Welcome Back
              </h1>

              <p className="mt-5 max-w-md text-slate-300">
                Access your account and continue managing your projects,
                workflow, and productivity from one place.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-slate-300">
                Secure authentication with a clean, modern experience built for
                professionals.
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center justify-center p-6 sm:p-10 lg:p-14">
            <div className="w-full max-w-md">
              <div className="text-center lg:text-left">
                <span className="inline-block rounded-full bg-slate-100 px-4 py-1 text-sm font-medium text-slate-700">
                  Sign In
                </span>

                <h2 className="mt-4 text-4xl font-bold text-slate-900">
                  Login to Account
                </h2>

                <p className="mt-2 text-slate-500">
                  Enter your credentials to continue.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition-all focus:border-slate-900"
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-700">
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-sm font-medium text-slate-600 hover:text-slate-900"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition-all focus:border-slate-900"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white transition-all hover:bg-slate-800"
                >
                  Sign In
                </button>
              </form>

              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>

                  <div className="relative flex justify-center">
                    <span className="bg-white px-4 text-sm text-slate-500">
                      OR CONTINUE WITH
                    </span>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className="rounded-xl border border-slate-200 px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    Google
                  </button>

                  <button
                    type="button"
                    className="rounded-xl border border-slate-200 px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    GitHub
                  </button>
                </div>
              </div>

              <p className="mt-8 text-center text-sm text-slate-500 lg:text-left">
                Don't have an account?{" "}
                <button
                  type="button"
                  className="font-semibold text-slate-900 hover:underline"
                >
                  Create Account
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;