import { useState } from "react";
import AuthorList from "@/components/authors/AuthorList";
import BookList from "@/components/books/BookList";

export default function LibraryTabView() {
  const [activeTab, setActiveTab] = useState<"authors" | "books">("authors");

  return (
    <div className="bg-gradient-to-br from-base-100 to-base-200 shadow-2xl rounded-2xl border border-base-300 p-8 sm:p-10 max-w-full transition-all duration-300">
      {/* Tab Navigation */}
      <div className="tabs tabs-boxed justify-center mb-10">
        <a
          className={`tab ${activeTab === "authors" ? "tab-active text-primary font-bold" : ""}`}
          onClick={() => setActiveTab("authors")}
        >
          👤 Authors
        </a>
        <a
          className={`tab ${activeTab === "books" ? "tab-active text-primary font-bold" : ""}`}
          onClick={() => setActiveTab("books")}
        >
          📖 Books
        </a>
      </div>

      {/* Tab Content */}
      {activeTab === "authors" ? <AuthorList /> : <BookList />}
    </div>
  );
}
