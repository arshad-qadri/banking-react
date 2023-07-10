import Navbar from "../components/Navbar";

const navigation = [
  { name: "Dashboard", href: "/", current: true },
  { name: "Table", href: "/table", current: false },
];

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-full">
      <Navbar navigation={navigation} />

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
