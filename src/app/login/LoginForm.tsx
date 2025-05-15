"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const AUTH_CALLBACK = "/my-jobs"; // comment

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<undefined | string>(undefined);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const els = event.currentTarget.elements;
    const email = (els.namedItem("email") as HTMLInputElement).value?.trim();
    setIsLoading(true);
    const res = await signIn("email", {
      redirect: false,
      callbackUrl: AUTH_CALLBACK,
      email,
    });
    // console.log("Res: ", res);
    setIsLoading(false);
    if (res?.error) {
      setError("Could not authorize: " + res.error);
    } else if (error) {
      setError(undefined);
    }
    if (res?.url) {
      router.push(res.url);
    }
  };
  const onGoogleClick = async () => {
    signIn("google", {
      // redirect: false,
      callbackUrl: AUTH_CALLBACK,
    });
    // console.log("Res: ", res);
  };
  return (
    <>
      <form className="mt-8 w-full" onSubmit={onSubmit}>
        <div className="mb-6">
          <label htmlFor="email" className="my-label">
            Work email
          </label>
          <input
            id="email"
            placeholder="name@company.com"
            className="my-input w-full"
            type="email"
            required
          />
          {!!error && (
            <span className="mt-1.5 block text-sm text-danger">{error}</span>
          )}
        </div>
        {/* <div className="mb-6">
            <div className="mb-1.5 flex items-center justify-between">
              <label htmlFor="password" className="my-label">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="my-btn-link text-sm font-normal text-gray-500"
              >
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              placeholder="Secure password, 8+ chars"
              className="my-input w-full"
              type="password"
              required
            />
          </div> */}
        <button type="submit" className="my-btn w-full" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send magic link"}
        </button>
      </form>
      <p className="my-4 text-center text-gray-500">or</p>
      <button
        className="my-btn-outline flex w-full items-center justify-center"
        onClick={onGoogleClick}
        disabled={isLoading}
      >
        <Image
          src="/images/google_icon.svg"
          width={20}
          height={20}
          alt="google icon"
          className="mr-3 inline-block"
        />
        Continue with Google
      </button>
      {/* <div className="my-8">
          <p className="text-center text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="my-btn-text">
              Sing up
            </Link>
          </p>
        </div> */}
    </>
  );
}
