import { useAuth } from '@/core/contexts/AuthContext';
import { FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { signed, logIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (signed) navigate('/');
  });

  function onSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    logIn({ email: formData.get("email")?.toString() ?? "", password: formData.get("password")?.toString() ?? "" });
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <input type="email" name="email" />
        <input type="password" name="password" />
        <button type="submit">Entrar</button>
      </form>
      <div></div>
    </div>
  );
}
