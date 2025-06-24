import LibraryTabView from "@/components/LibraryTabView";

export default function LibraryPage() {

  return (
    <main className="min-h-screen p-8 bg-base-200">
      {/* <h1 className="text-3xl font-bold text-primary">📚 Library Management</h1> */}

      <div className="bg-gradient-to-br from-base-100 to-base-200 shadow-2xl rounded-2xl border border-base-300 p-8 sm:p-10 max-w-full transition-all duration-300">

        {/* Brand Header */}
        <div className="text-center mb-8 px-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            📚 BookByte
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mt-1">
            A smarter way to manage books and authors.
          </p>
        </div>

        <hr/>
        <div className="max-w-6xl mx-auto">
          <LibraryTabView />
        </div>
      </div>
    </main>
  );
}
