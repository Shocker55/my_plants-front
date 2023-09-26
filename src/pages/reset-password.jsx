import { auth } from "@/lib/initFirebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";

const ResetPassword = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    try {
      const result = await sendPasswordResetEmail(auth, email);

      alert("メールを送信しました。リンクからパスワード再設定をお願い致します。");
      router.push("/login");
    } catch (error) {
      if (error.code === "auth/missing-email") {
        setError("メールアドレスを入力してください");
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div className="flex h-[800px] w-full items-center justify-center">
      <div>
        {error ? <div className="text-red-300">{error}</div> : null}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">メールアドレス</label>
            <input id="email" name="email" type="email" placeholder="email" className="border" />
          </div>
          <div>
            <button className="rounded border bg-blue-300 px-3 hover:bg-blue-400">送信</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
