import { auth } from "@/lib/initFirebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    signInWithEmailAndPassword(auth, email.value, password.value);
    router.push("/");
  };

  return (
    <div className="flex h-[800px] w-full items-center justify-center">
      <div>
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
      </div>
    </div>
  );
};

export default Login;
