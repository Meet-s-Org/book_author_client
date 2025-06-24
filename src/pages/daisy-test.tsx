// src/pages/daisy-test.tsx

import { FaBookOpen, FaUserAlt } from "react-icons/fa";

export default function DaisyTest() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-base-200 via-white to-base-100 text-base-content">
      {/* Header */}
      <section className="px-8 py-16 text-center">
        <h1 className="text-5xl font-bold text-primary mb-4 tracking-tight">
          📚 Welcome to Your Library
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          Manage your authors and books seamlessly with a sleek, responsive interface powered by GraphQL and DaisyUI.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <button className="btn btn-primary btn-wide">Get Started</button>
          <button className="btn btn-outline btn-accent btn-wide">Live Demo</button>
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 px-8 py-16 max-w-6xl mx-auto">
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
          <div className="card-body items-center text-center">
            <FaUserAlt size={36} className="text-accent mb-2" />
            <h2 className="card-title">Author Management</h2>
            <p className="text-gray-500">
              Easily add, update, and delete authors. View full biographies and manage birth dates with ease.
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
          <div className="card-body items-center text-center">
            <FaBookOpen size={36} className="text-primary mb-2" />
            <h2 className="card-title">Book Records</h2>
            <p className="text-gray-500">
              Track book details, descriptions, publish dates, and linked authors in a clean and organized way.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-base-300 text-base-content mt-10">
        <aside>
          <p className="font-semibold">📖 Library Management System © {new Date().getFullYear()}</p>
        </aside>
      </footer>
    </main>
  );
}
