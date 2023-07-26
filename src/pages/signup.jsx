import { auth } from "@/lib/initFirebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    createUserWithEmailAndPassword(auth, email.value, password.value);
  };

  return (
    <div className="flex h-[800px] w-full items-center justify-center">
      <div>
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
            <button className="rounded border bg-gray-300 px-3 hover:bg-gray-400">登録</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
