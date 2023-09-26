import { auth, provider } from "@/lib/initFirebase";
import { axiosInstance } from "@/utils/axios";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;

    try {
      const result = await signInWithEmailAndPassword(auth, email.value, password.value);
      const user = result.user;
      const token = await user.getIdToken(true);
      const config = { headers: { authorization: `Bearer ${token}` } };
      await axiosInstance.post("/auth", null, config);

      router.push("/");
    } catch (error) {
      if (error.code === "auth/user-not-found" || error.code === "auth/invalid-email") {
        setError("ログインに失敗しました");
      } else if (error.code === "auth/wrong-password") {
        setError("パスワードが違います");
      } else {
        setError(error.message);
      }
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken(true);
      const config = { headers: { authorization: `Bearer ${token}` } };

      await axiosInstance.post("/auth", null, config);

      router.push("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex h-screen w-full justify-center">
      <div className="flex max-w-xl flex-col items-center justify-center bg-slate-300 lg:min-w-[900px]">
        <Link href="/">
          <h1 className="logo-text-color mb-10 text-3xl font-semibold">My Plants</h1>
        </Link>
        <div className="hidden-scrollbar mx-2 mb-3 overflow-y-scroll rounded-lg bg-white py-5 lg:min-w-[450px] lg:px-8">
          <h1 className="mb-3 pl-3 font-semibold text-slate-600">ログイン</h1>
          <div className="w-full px-10">
            {error ? <div className="text-red-300">{error}</div> : null}
            <form onSubmit={handleSubmit}>
              <div className="">
                <label htmlFor="email" className="">
                  メールアドレス
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email"
                  className="mx-auto mt-3 block min-w-[280px] border px-1"
                />
              </div>
              <div>
                <label htmlFor="password">パスワード</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="*******"
                  className="mx-auto mt-3 block min-w-[280px] border px-1"
                />
              </div>

              <div className="flex justify-center">
                <button className="mb-3 mt-6 min-w-[150px] rounded border bg-gray-400 px-3 py-1 text-white hover:bg-gray-500">
                  ログイン
                </button>
              </div>
              <div className="flex justify-center space-x-4 py-3">
                <Link href="/signup" className="text-blue-400">
                  新規登録
                </Link>
                <Link href="/reset-password" className="text-blue-400">
                  パスワードを忘れた場合
                </Link>
              </div>
            </form>
            <div>
              <div className="mb-2 flex items-center justify-center">
                <div className="w-2/5 border border-b"></div>
                <div className="border border-slate-300 px-3 text-slate-500">or</div>
                <div className="w-2/5 border border-b"></div>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={loginWithGoogle}
                  className="h-[47px] w-[191px] bg-google-btn-normal hover:bg-google-btn-hover active:bg-google-btn-active"
                ></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
