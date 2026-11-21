"use client";

import TextInput from "@/components/forms/TextInput";
import Button from "@/components/forms/Button";
import {
    BookOpen,
    Brain,
    CheckCircle2,
    GraduationCap,
    Headphones,
    Languages,
    LockKeyhole,
    Mail,
    Mic2,
    Sparkles,
    Target,
    UserRound,
} from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { login, register } from "../actions/authAction";
import { useToast } from "../context/useToast";
import { useRouter } from "next/navigation";

export default function AuthClient() {
    const [isRegistered, setIsRegistered] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { showToast } = useToast();
    const router = useRouter();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (isSignUp && password !== confirmPassword) {
                setError("Mật khẩu xác nhận không khớp.");
                return;
            }
            const result = isSignUp
                ? await register({
                      firstName,
                      lastName,
                      email,
                      password,
                      confirmPassword,
                  })
                : await login({ email, password });

            if (!result.success) {
                setError(result.message);
                showToast(result.message, "error");
                return;
            }

            if (isSignUp) {
                setIsRegistered(true);
                showToast("Đăng ký thành công. Vui lòng đăng nhập.", "success");
                window.setTimeout(() => {
                    setIsSignUp(false);
                    setIsRegistered(false);
                    setPassword("");
                    setConfirmPassword("");
                }, 1800);
                return;
            }

            showToast("Đăng nhập thành công.", "success");
            router.push("/");
        } catch {
            const message = "Đã xảy ra lỗi. Vui lòng thử lại.";
            setError(message);
            showToast(message, "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-100">
            <div className="mx-auto grid min-h-screen overflow-hidden  border border-white bg-white shadow-sm lg:grid-cols-2">
                {/* Authentication */}
                <section className="flex min-h-[700px] flex-col bg-white px-6 py-6 sm:px-10 lg:px-12">
                    <header className="flex items-center justify-between gap-4">
                        <a href="/" className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
                                <BookOpen size={23} />
                            </div>
                            <div>
                                <p className="text-base font-bold tracking-tight text-slate-900">
                                    English Practice
                                </p>
                                <p className="text-[10px] font-semibold tracking-[0.16em] text-slate-500 uppercase">
                                    Learn every day
                                </p>
                            </div>
                        </a>

                        <div className="flex items-center gap-2 text-xs text-slate-500 sm:gap-3">
                            <span className="hidden sm:inline">
                                {isSignUp
                                    ? "Đã có tài khoản?"
                                    : "Chưa có tài khoản?"}
                            </span>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsSignUp((value) => !value);
                                    setError("");
                                }}
                                className="rounded-lg border border-slate-200 px-4 py-2 font-semibold text-slate-700 transition hover:border-emerald-500 hover:text-emerald-700"
                            >
                                {isSignUp ? "Đăng nhập" : "Đăng ký"}
                            </button>
                        </div>
                    </header>

                    <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-12">
                        <div className="mb-8 text-center">
                            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700">
                                {isSignUp ? (
                                    <GraduationCap size={30} />
                                ) : (
                                    <Languages size={29} />
                                )}
                            </div>
                            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                                {isSignUp
                                    ? "Tạo tài khoản"
                                    : "Chào mừng trở lại!"}
                            </h1>
                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                {isSignUp
                                    ? "Tạo tài khoản để bắt đầu hành trình chinh phục tiếng Anh."
                                    : "Đăng nhập để tiếp tục luyện tập và theo dõi tiến bộ của bạn."}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <p
                                    role="alert"
                                    className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
                                >
                                    {error}
                                </p>
                            )}

                            {isSignUp && (
                                <>
                                    <TextInput
                                        icon={UserRound}
                                        id="firstName"
                                        type="text"
                                        value={firstName}
                                        onChange={(event) =>
                                            setFirstName(event.target.value)
                                        }
                                        placeholder="Nhập tên"
                                        label="Tên"
                                        required
                                        autoComplete="given-name"
                                        className="h-12 rounded-xl"
                                    />
                                    <TextInput
                                        icon={UserRound}
                                        id="lastName"
                                        type="text"
                                        value={lastName}
                                        onChange={(event) =>
                                            setLastName(event.target.value)
                                        }
                                        placeholder="Nhập họ"
                                        label="Họ"
                                        required
                                        autoComplete="family-name"
                                        className="h-12 rounded-xl"
                                    />
                                </>
                            )}

                            <TextInput
                                id="email"
                                icon={Mail}
                                label="Địa chỉ email"
                                type="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                required
                                placeholder="name@example.com"
                                autoComplete="email"
                                className="h-12 rounded-xl"
                            />

                            <TextInput
                                icon={LockKeyhole}
                                label="Mật khẩu"
                                id="password"
                                type={showPassword ? "text" : "password"}
                                helperText="Mật khẩu phải có ít nhất 8 ký tự."
                                setShowPassword={setShowPassword}
                                showPassword={showPassword}
                                value={password}
                                isSignUp={isSignUp}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                placeholder="Nhập mật khẩu"
                                required
                                minLength={8}
                                autoComplete={
                                    isSignUp
                                        ? "new-password"
                                        : "current-password"
                                }
                                className="h-12 rounded-xl"
                            />

                            {isSignUp && (
                                <TextInput
                                    icon={LockKeyhole}
                                    label="Xác nhận mật khẩu"
                                    id="confirmPassword"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    helperText="Nhập lại mật khẩu để xác nhận."
                                    setShowConfirmPassword={
                                        setShowConfirmPassword
                                    }
                                    showConfirmPassword={showConfirmPassword}
                                    value={confirmPassword}
                                    isSignUp={isSignUp}
                                    onChange={(event) =>
                                        setConfirmPassword(event.target.value)
                                    }
                                    placeholder="Nhập lại mật khẩu"
                                    required
                                    minLength={8}
                                    autoComplete="new-password"
                                    className="h-12 rounded-xl"
                                />
                            )}

                            <Button
                                variant="primary"
                                size="lg"
                                className="w-full rounded-xl"
                                type="submit"
                                loading={loading}
                                disabled={isRegistered}
                            >
                                {isSignUp ? "Tạo tài khoản" : "Đăng nhập"}
                            </Button>
                        </form>

                        <p className="mt-6 text-center text-xs leading-5 text-slate-400">
                            {isSignUp
                                ? "Tham gia English Practice và xây dựng thói quen học tiếng Anh mỗi ngày."
                                : "Mỗi ngày một chút luyện tập, mỗi ngày một bước tiến bộ."}
                        </p>
                    </div>

                    <footer className="flex items-center justify-between gap-3 text-xs text-slate-400">
                        <span>© 2026 English Practice</span>
                        <span className="flex items-center gap-1.5">
                            <BookOpen size={14} />
                            Learn. Practice. Improve.
                        </span>
                    </footer>
                </section>

                {/* English learning introduction */}
                <section className="relative hidden min-h-[700px] overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 lg:block">
                    <div className="absolute -top-24 -right-20 h-80 w-80 rounded-full bg-emerald-200/50 blur-3xl" />
                    <div className="absolute -bottom-24 -left-20 h-96 w-96 rounded-full bg-cyan-200/50 blur-3xl" />

                    <div className="relative flex h-full flex-col justify-between p-10 xl:p-14">
                        <div className="max-w-lg">
                            <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-xl shadow-emerald-700/20">
                                <GraduationCap size={34} />
                            </div>
                            <p className="mb-3 text-xs font-bold tracking-[0.2em] text-emerald-700 uppercase">
                                Your English journey starts here
                            </p>
                            <h2 className="text-4xl leading-tight font-semibold tracking-tight text-slate-900 xl:text-5xl">
                                Học tiếng Anh mỗi ngày,
                                <br />
                                tự tin hơn mỗi bước.
                            </h2>
                            <p className="mt-5 max-w-md text-base leading-7 text-slate-600">
                                Luyện từ vựng, ngữ pháp, nghe và nói trong một
                                không gian học tập. Theo dõi quá trình rèn luyện
                                và từng bước nâng cao khả năng tiếng Anh.
                            </p>
                        </div>

                        {/* Learning preview */}
                        <div className="my-10 rounded-3xl border border-white/70 bg-white/75 p-5 shadow-xl shadow-emerald-900/5 backdrop-blur-xl xl:p-6">
                            <div className="mb-5 flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium text-slate-500">
                                        DAILY PRACTICE
                                    </p>
                                    <p className="mt-1 text-lg font-semibold text-slate-900">
                                        Một chút tiến bộ mỗi ngày
                                    </p>
                                </div>
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                                    <Sparkles size={23} />
                                </div>
                            </div>

                            <div className="rounded-2xl bg-slate-50 p-4">
                                <div className="flex items-center justify-between gap-3">
                                    <span className="text-xs font-semibold tracking-wide text-emerald-700 uppercase">
                                        Word of the day
                                    </span>
                                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                                        Vocabulary
                                    </span>
                                </div>
                                <p className="mt-3 text-2xl font-bold text-slate-900">
                                    Consistency
                                </p>
                                <p className="mt-1 text-sm text-slate-500">
                                    /kənˈsɪs.tən.si/ · sự kiên trì
                                </p>
                                <p className="mt-3 text-sm italic text-slate-600">
                                    "Consistency is the key to improvement."
                                </p>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-3">
                                <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                        <Headphones size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">
                                            Listening
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            Luyện nghe
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                                        <Mic2 size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">
                                            Speaking
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            Luyện nói
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            <div className="rounded-2xl border border-white/70 bg-white/55 p-4 backdrop-blur">
                                <BookOpen
                                    className="mb-3 text-emerald-700"
                                    size={21}
                                />
                                <p className="text-sm font-semibold text-slate-800">
                                    Vocabulary
                                </p>
                                <p className="mt-1 text-xs text-slate-500">
                                    Mở rộng từ vựng
                                </p>
                            </div>
                            <div className="rounded-2xl border border-white/70 bg-white/55 p-4 backdrop-blur">
                                <Brain
                                    className="mb-3 text-emerald-700"
                                    size={21}
                                />
                                <p className="text-sm font-semibold text-slate-800">
                                    Grammar
                                </p>
                                <p className="mt-1 text-xs text-slate-500">
                                    Nắm vững ngữ pháp
                                </p>
                            </div>
                            <div className="rounded-2xl border border-white/70 bg-white/55 p-4 backdrop-blur">
                                <Target
                                    className="mb-3 text-emerald-700"
                                    size={21}
                                />
                                <p className="text-sm font-semibold text-slate-800">
                                    Progress
                                </p>
                                <p className="mt-1 text-xs text-slate-500">
                                    Theo dõi tiến bộ
                                </p>
                            </div>
                        </div>

                        <div className="mt-5 flex items-center gap-2 text-xs font-medium text-emerald-800">
                            <CheckCircle2 size={16} />
                            Học theo tốc độ của bạn, tiến bộ theo cách của bạn.
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
