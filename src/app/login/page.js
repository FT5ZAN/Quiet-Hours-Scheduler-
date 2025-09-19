"use client";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.push("/dashboard");
    });
  }, [router]);

  const handleGoogleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) console.error("Error logging in:", error.message);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Quiet Hours Scheduler</h1>
      <button onClick={handleGoogleLogin} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Sign in with Google
      </button>
    </div>
  );
}
