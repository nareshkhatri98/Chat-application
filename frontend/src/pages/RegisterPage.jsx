import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ShipWheelIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { signup } from "../lib/api";

const RegisterPage = () => {
  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const { mutate: signupMutation, isPending, error } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
     
    },
  });
  const handleRegister = (e) => {
    e.preventDefault();
    signupMutation(registerData);
  };
  return (
    <div
      className="flex items-center justify-center h-screen p-4 sm:p-6 md:p-8 "
      data-theme="forest"
    >
      <div className="flex flex-col w-full max-w-5xl mx-auto overflow-hidden border shadow-lg border-primary/25 lg:flex-row bg-base-100 rounded-xl">
        {/* SIGN UP FORM -  LEFT SIDE */}
        <div className="flex flex-col w-full p-4 lg:w-1/2 sm:p-8 ">
          {/* LOGO */}
          <div className="flex items-center justify-start gap-2 mb-4">
            <ShipWheelIcon className="size-9 text-primary" />
            <span className="font-mono text-3xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Chat-app
            </span>
          </div>
          {/* ERROR MESSAGE */}
          {error && (
            <div className="mb-4 alert alert-error">
              <span>{error.response.data.message}</span>
            </div>
          )}
          {/* form */}
          <div className="w-full">
            <form onSubmit={handleRegister}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Create an Account</h2>
                  <p className="text-sm opacity-70">
                    Join chat app and start your language learning adventure !
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="w-full form-control">
                    <label className="label">
                      <span className="label-text">Full Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Jhon Deo"
                      className="w-full input input-bordered"
                      value={registerData.fullName}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          fullName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  {/* email */}
                  <div className="w-full form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="text"
                      placeholder="jhon12@gmail.com"
                      className="w-full input input-bordered"
                      value={registerData.email}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  {/* password */}
                  <div className="w-full form-control">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="*******"
                      className="w-full input input-bordered"
                      value={registerData.password}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          password: e.target.value,
                        })
                      }
                      required
                    />
                    <p className="mt-1 text-xs opacity-70">
                      Password must be at least 6 character long{" "}
                    </p>
                  </div>

                  <div className="w-full form-control">
                    <label className="justify-start gap-2 cursor-pointer label">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm "
                        required
                      />
                      <span className="text-xs leading-tight">
                        I agree the{" "}
                        <span className="text-primary hover:underline">
                          terms of service
                        </span>{" "}
                        and{" "}
                        <span className="text-primary hover:underline">
                          privacy policy
                        </span>
                      </span>
                    </label>
                  </div>
                  <button className="w-full btn btn-primary " type="submit">{isPending ? (
                    <>
                      <span className="loading loading-spinner loading-xs">Loading...</span>
                    </>
                  ) : ("Create Account")}</button>
                  <div className="mt-4 text-center">
                    <p className="text-sm">Already have an account?  <Link to={'/login'} className="text-primary hover:underline">
                      Sign in
                    </Link></p>


                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* SIGNUP FORM - RIGHT SIDE */}
        <div className="flex-col items-center justify-center hidden w-1/2 p-4 lg:flex bg-primary/10">
          {/* for image */}
          <div className="relative max-w-sm mx-auto aspect-square">
            <img src="/login.png" alt="loginpng" className="w-full h-full" />
          </div>
          {/* for text or quot */}
          <div className="mt-6 space-y-3 text-center">
            <h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
            <p className="opacity-70">Practice conversations, make friends and improve your language skills together</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
