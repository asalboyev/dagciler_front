"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { loginSchema, type LoginFormData } from "../model/schemas";
import { useLogin } from "../model/useLogin";
import styles from "./login-form.module.scss";

export function LoginForm() {
  const [form, setForm] = useState<LoginFormData>({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const login = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = loginSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    login.mutate(result.data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        label="Email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        error={errors.email}
        fullWidth
      />
      <Input
        label="Password"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        error={errors.password}
        fullWidth
      />
      {login.isError && (
        <p className={styles.error}>Invalid credentials. Please try again.</p>
      )}
      <Button type="submit" loading={login.isPending} fullWidth>
        Login
      </Button>
    </form>
  );
}
