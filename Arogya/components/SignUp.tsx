"use client";
import React from "react";

export default function SignUp() {
  const [submitted, setSubmitted] = React.useState<any>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [step, setStep] = React.useState(1); // Step 1 or 2

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleBack = () => {
    setStep(1);
    setError(null);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch("http://localhost:80/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const json = await res.json();
      if (!res.ok) {
        setError(json.message || "Failed to register");
        return;
      }

      setSubmitted(json.user);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Server is not reachable");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-10 font-opensans font-semibold  justify-center">
      <div className="flex items-start justify-center  relative z-20">
        <div className="w-full max-w-4xl bg-green-500 border-0 rounded-3xl shadow-lg">
          <div className="text-center pt-12 pb-8">
            <h2 className="text-2xl font-specialGothic text-black" >
              Create an account
            </h2>
          </div>

          <form
            className="pt-5 px-8 pb-16 shadow-lg"
            style={{
              backgroundColor: "white",
              borderBottomRightRadius: "24px",
              borderTopLeftRadius: "24px",
            }}
            onSubmit={onSubmit}
          >
            {step === 1 && (
              <>
                <div className="mb-5 font-semibold w-80">
                  <input
                    required
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="font-normal w-full px-4 py-2 text-md border border-black rounded-lg focus:outline-none focus:ring-1 focus:ring-black placeholder:italic"
                  />
                </div>

                <div className="mb-5 font-semibold w-80">
                  <input
                    required
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="font-normal w-full px-4 py-2 text-md border border-black rounded-lg focus:outline-none focus:ring-1 focus:ring-black placeholder:italic"
                  />
                </div>

                <button
                  type="button"
                  className="mt-3 w-full py-2 text-md text-white bg-green-600 rounded-md hover:bg-green-700"
                  onClick={() => setStep(2)}
                >
                  Next
                </button>
                
                <div className="flex items-center my-4 w-full max-w-sm px-6">
                  <div className="flex-grow border-t border-black"></div>
                  <span className="mx-4 text-black italic font-medium text-sm">or</span>
                  <div className="flex-grow border-t border-black"></div>
                </div>

                <div className="px-6 pt-2 sm:px-0 max-w-sm w-full">
                  <button
                    type="button"
                    className="text-white w-full bg-black hover:bg-white hover:text-black border border-transparent hover:border-black focus:ring-4 focus:outline-none focus:ring-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between"
                  >
                    <svg
                      className="mr-2 -ml-1 w-4 h-4"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fab"
                      data-icon="google"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 488 512"
                    >
                      <path
                        fill="currentColor"
                        d="M488 261.8C488 403.3 391.1 504 248 504
                        110.8 504 0 393.2 0 256S110.8 8 248 8c66.8
                        0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6
                        94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7
                        156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3
                        12.7 3.9 24.9 3.9 41.4z"
                      ></path>
                    </svg>
                    Continue with Google
                    <div></div>
                  </button>
                </div>

                <div className="px-6 pt-2 sm:px-0 max-w-sm w-full">
                  <button
                    type="button"
                    className="text-white w-full bg-black hover:bg-white hover:text-black border border-transparent hover:border-black focus:ring-4 focus:outline-none focus:ring-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between"
                  >
                    <svg
                      className="mr-2 -ml-1 w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="-1.5 0 20 20"
                      version="1.1"
                    >
                      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g transform="translate(-102.000000, -7439.000000)" fill="currentColor">
                          <g transform="translate(56.000000, 160.000000)">
                            <path
                              d="M57.5708873,7282.19296 C58.2999598,7281.34797 58.7914012,7280.17098 58.6569121,7279 
                              C57.6062792,7279.04 56.3352055,7279.67099 55.5818643,7280.51498 
                              C54.905374,7281.26397 54.3148354,7282.46095 54.4735932,7283.60894 
                              C55.6455696,7283.69593 56.8418148,7283.03894 57.5708873,7282.19296 
                              M60.1989864,7289.62485 C60.2283111,7292.65181 62.9696641,7293.65879 63,7293.67179 
                              C62.9777537,7293.74279 62.562152,7295.10677 61.5560117,7296.51675 
                              C60.6853718,7297.73474 59.7823735,7298.94772 58.3596204,7298.97372 
                              C56.9621472,7298.99872 56.5121648,7298.17973 54.9134635,7298.17973 
                              C53.3157735,7298.17973 52.8162425,7298.94772 51.4935978,7298.99872 
                              C50.1203933,7299.04772 49.0738052,7297.68074 48.197098,7296.46676 
                              C46.4032359,7293.98379 45.0330649,7289.44985 46.8734421,7286.3899 
                              C47.7875635,7284.87092 49.4206455,7283.90793 51.1942837,7283.88393 
                              C52.5422083,7283.85893 53.8153044,7284.75292 54.6394294,7284.75292 
                              C55.4635543,7284.75292 57.0106846,7283.67793 58.6366882,7283.83593 
                              C59.3172232,7283.86293 61.2283842,7284.09893 62.4549652,7285.8199 
                              C62.355868,7285.8789 60.1747177,7287.09489 60.1989864,7289.62485"
                            />
                          </g>
                        </g>
                      </g>
                    </svg>
                    Continue with Apple
                    <div></div>
                  </button>
                </div>

                <div className="px-6 pt-2 sm:px-0 max-w-sm w-full">
                  <button
                    type="button"
                    className="text-white w-full bg-black hover:bg-white hover:text-black border border-transparent hover:border-black focus:ring-4 focus:outline-none focus:ring-[#4460A0]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between"
                  >
                    <svg
                      className="mr-2 -ml-1 w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                      role="img"
                    >
                      <path
                        fill="currentColor"
                        d="M225.638355,208 L202.649232,208 C201.185673,208 200,206.813592 200,205.350603 L200,162.649211 C200,161.18585 201.185859,160 202.649232,160 L245.350955,160 C246.813955,160 248,161.18585 248,162.649211 L248,205.350603 C248,206.813778 246.813769,208 245.350955,208 L233.119305,208 L233.119305,189.411755 L239.358521,189.411755 L240.292755,182.167586 L233.119305,182.167586 L233.119305,177.542641 C233.119305,175.445287 233.701712,174.01601 236.70929,174.01601 L240.545311,174.014333 L240.545311,167.535091 C239.881886,167.446808 237.604784,167.24957 234.955552,167.24957 C229.424834,167.24957 225.638355,170.625526 225.638355,176.825209 L225.638355,182.167586 L219.383122,182.167586 L219.383122,189.411755 L225.638355,189.411755 L225.638355,208 Z"
                        transform="translate(-200 -160)"
                      />
                    </svg>
                    Continue with Facebook
                    <div></div>
                  </button>
                </div>

                <div className="mt-4 text-center text-sm font-semibold text-black">
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="text-green-600 hover:underline"
                  >
                    Sign In
                  </button>
                </div>

              </>
            )}

            {step === 2 && (
              <> 
                <div className="mb-5 w-80">
                <input type="hidden" name="email" value={email} />
                <input type="hidden" name="password" value={password} />
                  <input
                    required
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Name"
                    className="font-normal w-full px-4 py-2 text-md border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black placeholder:italic"
                  />
                </div>

                <div className="mb-5 w-80">
                  <input
                    required
                    id="age"
                    name="age"
                    type="number"
                    placeholder="Age"
                    className="font-normal w-full px-4 py-2 text-md border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black placeholder:italic"
                  />
                </div>

                <div className="mb-5 w-80">
                  <select
                    id="gender"
                    name="gender"
                    required
                    defaultValue=""
                    className=" italic font-normal w-full px-4 py-2 text-md border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white text-gray-400 " 
                  >
                    <option value="" disabled>Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="w-full py-2 text-lg text-white bg-black rounded-lg border border-transparent hover:bg-white hover:text-black hover:border-black"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    className="w-full py-2 text-lg text-white bg-green-600 rounded-lg hover:bg-green-700"
                  >
                    Submit
                  </button>
                </div>
              </>
            )}

            {error && (
              <p className="mt-6 text-red-600 text-base text-center">{error}</p>
            )}

            {/* {submitted && (
              <div className="mt-6 text-green-700 text-base text-center">
                Registered successfully! <br />
                <code className="text-sm">{JSON.stringify(submitted)}</code>
              </div>
            )} */}
          </form>
        </div>
      </div>
    </div>
  );
}
