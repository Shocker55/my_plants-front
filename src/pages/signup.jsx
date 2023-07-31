import { auth } from "@/lib/initFirebase";
import { axiosInstance } from "@/utils/axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
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
      createUserWithEmailAndPassword(auth, email.value, password.value).then(async (result) => {
        const user = result.user;
        const token = await user.getIdToken(true);
        const config = { headers: { authorization: `Bearer ${token}` } };
        await axiosInstance.post("/auth", null, config);
        router.push("/create-profile");
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex h-[800px] w-full items-center justify-center">
      <div>
        <div className="text-red-300">{error}</div>
        <h1>ユーザー登録</h1>
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
            <label htmlFor="password_confirmation">パスワードを再入力</label>
            <input
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              placeholder="*******"
              className="border"
            />
          </div>
          <div>
            <button className="rounded border bg-gray-300 px-3 hover:bg-gray-400">登録</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
