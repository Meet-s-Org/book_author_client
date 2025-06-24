import LibraryTabView from "@/components/LibraryTabView";

export default function LibraryPage() {

  return (
    <main className="min-h-screen p-8 bg-base-200">
      <h1 className="text-3xl font-bold text-primary">📚 Library Management</h1>
      <hr/>
      <div className="max-w-6xl mx-auto">
        <LibraryTabView />
      </div>
    </main>
  );
}
