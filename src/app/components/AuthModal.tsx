import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Eye, EyeOff, Mail, Lock, User, MapPin, CheckCircle2 } from "lucide-react";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

interface StoredUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

interface Props {
  open: boolean;
  isDark: boolean;
  initialTab?: "login" | "register";
  onClose: () => void;
  onLogin: (user: AuthUser) => void;
}

// Simple obfuscation for demo – NOT for production use
const hashPassword = (pw: string) => btoa(unescape(encodeURIComponent(pw + "_jn_2024")));

const getStoredUsers = (): StoredUser[] => {
  try {
    return JSON.parse(localStorage.getItem("jn_users") || "[]");
  } catch {
    return [];
  }
};

function InputField({
  label,
  icon: Icon,
  type,
  value,
  onChange,
  placeholder,
  isDark,
  right,
}: {
  label: string;
  icon: React.ElementType;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  isDark: boolean;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className={`text-sm ${isDark ? "text-neutral-300" : "text-neutral-700"}`}
      >
        {label}
      </label>
      <div className="relative flex items-center">
        <Icon
          className={`absolute left-3 w-4 h-4 ${isDark ? "text-neutral-500" : "text-neutral-400"}`}
        />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required
          className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
            isDark
              ? "bg-neutral-800/70 border-neutral-700 text-neutral-100 placeholder:text-neutral-600 focus:border-green-500 focus:ring-green-900/50"
              : "bg-neutral-50 border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:border-green-500 focus:ring-green-100"
          }`}
        />
        {right && (
          <div className="absolute right-3">{right}</div>
        )}
      </div>
    </div>
  );
}

export function AuthModal({ open, isDark, initialTab = "login", onClose, onLogin }: Props) {
  const [tab, setTab] = useState<"login" | "register">(initialTab);
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Sync tab when modal opens with a different initialTab
  useEffect(() => {
    if (open) {
      setTab(initialTab);
      setError("");
    }
  }, [open, initialTab]);

  // Login fields
  const [lEmail, setLEmail] = useState("");
  const [lPassword, setLPassword] = useState("");

  // Register fields
  const [rName, setRName] = useState("");
  const [rEmail, setREmail] = useState("");
  const [rPassword, setRPassword] = useState("");
  const [rConfirm, setRConfirm] = useState("");

  const reset = () => {
    setError("");
    setLEmail(""); setLPassword("");
    setRName(""); setREmail(""); setRPassword(""); setRConfirm("");
    setShowPw(false); setShowConfirm(false);
  };

  const switchTab = (t: "login" | "register") => {
    setTab(t);
    setError("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));

    const users = getStoredUsers();
    const found = users.find(
      (u) =>
        u.email.toLowerCase() === lEmail.toLowerCase() &&
        u.passwordHash === hashPassword(lPassword)
    );

    if (!found) {
      setError("Email atau kata sandi tidak sesuai.");
      setLoading(false);
      return;
    }

    localStorage.setItem("jn_session", found.id);
    onLogin({ id: found.id, name: found.name, email: found.email });
    reset();
    setLoading(false);
    onClose();
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (rPassword.length < 6) {
      setError("Kata sandi minimal 6 karakter.");
      return;
    }
    if (rPassword !== rConfirm) {
      setError("Konfirmasi kata sandi tidak cocok.");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    const users = getStoredUsers();
    if (users.find((u) => u.email.toLowerCase() === rEmail.toLowerCase())) {
      setError("Email sudah terdaftar. Silakan masuk.");
      setLoading(false);
      return;
    }

    const newUser: StoredUser = {
      id: `usr_${Date.now()}`,
      name: rName.trim(),
      email: rEmail.toLowerCase().trim(),
      passwordHash: hashPassword(rPassword),
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("jn_users", JSON.stringify([...users, newUser]));
    localStorage.setItem("jn_session", newUser.id);
    onLogin({ id: newUser.id, name: newUser.name, email: newUser.email });
    reset();
    setLoading(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[900] flex items-center justify-center p-4"
        >
          {/* Backdrop — click to close */}
          <div
            className={`absolute inset-0 backdrop-blur-sm ${isDark ? "bg-black/60" : "bg-black/40"}`}
            onClick={() => { reset(); onClose(); }}
          />

          {/* Card */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 24 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
            className={`relative w-full max-w-md rounded-3xl shadow-2xl overflow-hidden ${
              isDark
                ? "bg-neutral-900 border border-neutral-800"
                : "bg-white border border-neutral-100"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Green glow top */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600" />

            {/* Header */}
            <div className={`px-6 pt-6 pb-4 border-b ${isDark ? "border-neutral-800" : "border-neutral-100"}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-400 to-emerald-700 flex items-center justify-center shadow-md shadow-green-500/30">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className={`text-sm leading-none ${isDark ? "text-neutral-100" : "text-neutral-900"}`}>
                      Jelajah Nusantara
                    </div>
                    <div className={`text-xs mt-0.5 ${isDark ? "text-neutral-500" : "text-neutral-400"}`}>
                      {tab === "login" ? "Masuk ke akunmu" : "Buat akun baru"}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => { reset(); onClose(); }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    isDark ? "hover:bg-neutral-800 text-neutral-400" : "hover:bg-neutral-100 text-neutral-500"
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Tab switcher */}
              <div className={`flex p-1 rounded-full gap-1 ${isDark ? "bg-neutral-800" : "bg-neutral-100"}`}>
                {(["login", "register"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => switchTab(t)}
                    className={`flex-1 py-2 rounded-full text-sm transition-all ${
                      tab === t
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md shadow-green-500/20"
                        : isDark
                          ? "text-neutral-400 hover:text-neutral-200"
                          : "text-neutral-500 hover:text-neutral-700"
                    }`}
                  >
                    {t === "login" ? "Masuk" : "Daftar"}
                  </button>
                ))}
              </div>
            </div>

            {/* Forms */}
            <div className="px-6 py-5">
              <AnimatePresence mode="wait">
                {tab === "login" ? (
                  <motion.form
                    key="login"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.18 }}
                    onSubmit={handleLogin}
                    className="flex flex-col gap-4"
                  >
                    <InputField
                      label="Email"
                      icon={Mail}
                      type="email"
                      value={lEmail}
                      onChange={setLEmail}
                      placeholder="email@kamu.com"
                      isDark={isDark}
                    />
                    <InputField
                      label="Kata Sandi"
                      icon={Lock}
                      type={showPw ? "text" : "password"}
                      value={lPassword}
                      onChange={setLPassword}
                      placeholder="••••••••"
                      isDark={isDark}
                      right={
                        <button
                          type="button"
                          onClick={() => setShowPw((v) => !v)}
                          className={`${isDark ? "text-neutral-500 hover:text-neutral-300" : "text-neutral-400 hover:text-neutral-600"} transition-colors`}
                        >
                          {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      }
                    />

                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-500 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 px-3 py-2 rounded-xl"
                      >
                        ⚠️ {error}
                      </motion.p>
                    )}

                    <button
                      type="submit"
                      disabled={loading || !lEmail || !lPassword}
                      className="mt-1 py-3 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white transition-all hover:shadow-lg hover:shadow-green-500/25 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Memproses…
                        </span>
                      ) : "Masuk"}
                    </button>

                    <p className={`text-center text-xs ${isDark ? "text-neutral-500" : "text-neutral-400"}`}>
                      Belum punya akun?{" "}
                      <button
                        type="button"
                        onClick={() => switchTab("register")}
                        className="text-green-500 hover:text-green-400 underline-offset-2 hover:underline"
                      >
                        Daftar sekarang
                      </button>
                    </p>
                  </motion.form>
                ) : (
                  <motion.form
                    key="register"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.18 }}
                    onSubmit={handleRegister}
                    className="flex flex-col gap-4"
                  >
                    <InputField
                      label="Nama Lengkap"
                      icon={User}
                      type="text"
                      value={rName}
                      onChange={setRName}
                      placeholder="Nama kamu"
                      isDark={isDark}
                    />
                    <InputField
                      label="Email"
                      icon={Mail}
                      type="email"
                      value={rEmail}
                      onChange={setREmail}
                      placeholder="email@kamu.com"
                      isDark={isDark}
                    />
                    <InputField
                      label="Kata Sandi"
                      icon={Lock}
                      type={showPw ? "text" : "password"}
                      value={rPassword}
                      onChange={setRPassword}
                      placeholder="Min. 6 karakter"
                      isDark={isDark}
                      right={
                        <button
                          type="button"
                          onClick={() => setShowPw((v) => !v)}
                          className={`${isDark ? "text-neutral-500 hover:text-neutral-300" : "text-neutral-400 hover:text-neutral-600"} transition-colors`}
                        >
                          {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      }
                    />
                    <InputField
                      label="Konfirmasi Kata Sandi"
                      icon={Lock}
                      type={showConfirm ? "text" : "password"}
                      value={rConfirm}
                      onChange={setRConfirm}
                      placeholder="Ulangi kata sandi"
                      isDark={isDark}
                      right={
                        <button
                          type="button"
                          onClick={() => setShowConfirm((v) => !v)}
                          className={`${isDark ? "text-neutral-500 hover:text-neutral-300" : "text-neutral-400 hover:text-neutral-600"} transition-colors`}
                        >
                          {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      }
                    />

                    {/* Password match indicator */}
                    {rPassword && rConfirm && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`text-xs flex items-center gap-1.5 ${
                          rPassword === rConfirm ? "text-green-500" : "text-red-400"
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {rPassword === rConfirm ? "Kata sandi cocok" : "Kata sandi tidak cocok"}
                      </motion.p>
                    )}

                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-500 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 px-3 py-2 rounded-xl"
                      >
                        ⚠️ {error}
                      </motion.p>
                    )}

                    <button
                      type="submit"
                      disabled={loading || !rName || !rEmail || !rPassword || !rConfirm}
                      className="mt-1 py-3 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white transition-all hover:shadow-lg hover:shadow-green-500/25 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Mendaftar…
                        </span>
                      ) : "Buat Akun"}
                    </button>

                    <p className={`text-center text-xs ${isDark ? "text-neutral-500" : "text-neutral-400"}`}>
                      Sudah punya akun?{" "}
                      <button
                        type="button"
                        onClick={() => switchTab("login")}
                        className="text-green-500 hover:text-green-400 underline-offset-2 hover:underline"
                      >
                        Masuk di sini
                      </button>
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className={`px-6 pb-5 text-center text-xs ${isDark ? "text-neutral-600" : "text-neutral-400"}`}>
              Data disimpan secara lokal di perangkat kamu 🔒
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}