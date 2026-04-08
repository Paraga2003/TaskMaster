import { SignIn, SignUp } from "@clerk/clerk-react";

export const AuthPage = ({ mode }) => {
  return (
    <div className="min-h-screen bg-brand-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-white text-4xl font-bold mb-2">TaskMaster</h2>
          <p className="text-blue-100 text-sm">Organize your work efficiently</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl">
          {mode === 'signin' ? <SignIn /> : <SignUp />}
        </div>
      </div>
    </div>
  );
};