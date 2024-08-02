const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-slate-500">
      {children}
    </div>
  );
}

export default AuthLayout;