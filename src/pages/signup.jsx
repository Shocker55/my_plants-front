import { auth } from "@/lib/initFirebase";
import { axiosInstance } from "@/utils/axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, password_confirmation } = e.target.elements;
    if (password.value !== password_confirmation.value) {
      return setError("パスワードが一致していません");
    }
    try {
      const result = await createUserWithEmailAndPassword(auth, email.value, password.value);
      const user = result.user;
      const token = await user.getIdToken(true);
      const config = { headers: { authorization: `Bearer ${token}` } };

      await axiosInstance.post("/auth", null, config);

      router.push("/profiles/create");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setError("メールアドレスが正しくありません");
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div className="flex h-screen w-full justify-center">
      <div className="flex max-w-xl flex-col items-center justify-center bg-slate-300 lg:min-w-[900px]">
        <Link href="/">
          <h1 className="logo-text-color mb-10 text-3xl font-semibold">My Plants</h1>
        </Link>
        <div className="hidden-scrollbar mx-2 mb-3 overflow-y-scroll rounded-lg bg-white py-5 lg:min-w-[450px] lg:px-8">
          <h1 className="mb-3 pl-3 font-semibold text-slate-600">ユーザー登録</h1>
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
              <div>
                <label htmlFor="password_confirmation">パスワードを再入力</label>
                <input
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  placeholder="*******"
                  className="mx-auto mt-3 block min-w-[280px] border px-1"
                />
              </div>

              <div className="flex justify-center">
                <button className="mb-3 mt-6 min-w-[150px] rounded border bg-gray-400 px-3 py-1 text-white hover:bg-gray-500">
                  登録
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
