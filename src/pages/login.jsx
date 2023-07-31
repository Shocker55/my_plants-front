import { auth, provider } from "@/lib/initFirebase";
import { axiosInstance } from "@/utils/axios";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;

    try {
      signInWithEmailAndPassword(auth, email.value, password.value).then(async (result) => {
        const user = result.user;
        const token = await user.getIdToken(true);
        const config = { headers: { authorization: `Bearer ${token}` } };
        await axiosInstance.post("/auth", null, config);

        router.push("/");
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider).then(async (result) => {
        const user = result.user;
        const token = await user.getIdToken(true);
        const config = { headers: { authorization: `Bearer ${token}` } };

        await axiosInstance.post("/auth", null, config);

        router.push("/");
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex h-[800px] w-full items-center justify-center">
      <div>
        <div>{error}</div>
        <h1>ログイン</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">メールアドレス</label>
            <input id="email" name="email" type="email" placeholder="email" className="border" />
          </div>
          <div>
            <label htmlFor="password">パスワード</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="*******"
              className="border"
            />
          </div>

          <div>
            <button className="rounded border bg-blue-300 px-3 hover:bg-blue-400">ログイン</button>
          </div>
          <div>
            ユーザー登録は
            <Link href="/signup" className="text-blue-400">
              こちら
            </Link>
            から
          </div>
        </form>
        <div>
          <p>ログインして始める</p>
          <button onClick={loginWithGoogle} className="m-4 rounded-md border bg-green-300">
            Googleでログイン
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
