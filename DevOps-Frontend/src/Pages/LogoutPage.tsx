export default function LogoutPage() {
  const { logout } = useAuth();
  useEffect(() => {
    logout();
  }, [logout]);
  return <Redirect to="/" />;
}