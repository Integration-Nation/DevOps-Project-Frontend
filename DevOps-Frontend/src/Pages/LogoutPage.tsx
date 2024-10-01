import { logout } from "../api/api";
export default function LogoutPage() {

//log ud funktionalitet

    const handleLogout = async () => {
        try {
            const response = await logout();
            alert(response.message);
        } catch (err: unknown) {
            if (err instanceof Error) {
                alert(err.message);
            } else {
                alert("An unknown error occurred");
            }
        }
    };



    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold text-center mb-6">Log Out</h2>
            <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Log Out</button>
        </div>
    );

}