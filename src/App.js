
import { useState } from "react";

function App() {
  const [searchType, setSearchType] = useState("name");
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!search.trim()) {
      setError("Please enter a GitHub username.");
      setUser(null);
      return;
    }

    setLoading(true);
    setUser(null);
    setError("");

    try {
      const response = await fetch(
        `https://api.github.com/users/${search.trim()}`
      );

      if (!response.ok) {
        throw new Error("User not found");
      }

      const data = await response.json();

      setUser(data);
    } catch (error) {
      console.log(error);
      setError("GitHub user not found.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 sm:px-6 sm:py-10">

      <div className="mx-auto w-full max-w-5xl">

        {/* Main Card */}
        <div className="w-full rounded-2xl border border-gray-300 bg-white p-4 shadow-md sm:p-6 md:p-8">

          {/* Heading */}
          <div className="mb-6 text-center sm:mb-8">

            <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl md:text-4xl">
              GitHub Profile Search
            </h1>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Search for a GitHub user by name or ID
            </p>

          </div>


          {/* ================= SEARCH BAR ================= */}

          <form
            onSubmit={handleSearch}
            className="mt-6 w-full"
          >

            <div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-0">

              {/* Dropdown */}
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="
                  w-full
                  rounded-lg
                  border border-gray-300
                  bg-white
                  px-4 py-3
                  text-sm
                  font-medium
                  text-gray-700
                  outline-none
                  focus:border-blue-500
                  sm:w-auto
                  sm:rounded-r-none
                  sm:border-r-0
                "
              >
                <option value="name">
                  Search by Name
                </option>

                <option value="id">
                  Search by ID
                </option>
              </select>


              {/* Search Input */}
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={
                  searchType === "name"
                    ? "Enter GitHub username..."
                    : "Enter GitHub user ID..."
                }
                className="
                  w-full
                  min-w-0
                  flex-1
                  rounded-lg
                  border border-gray-300
                  px-4 py-3
                  text-sm
                  text-gray-700
                  outline-none
                  placeholder:text-gray-400
                  focus:border-blue-500
                  sm:rounded-none
                "
              />


              {/* Search Button */}
              <button
                type="submit"
                className="
                  w-full
                  rounded-lg
                  bg-blue-600
                  px-6 py-3
                  text-sm
                  font-semibold
                  text-white
                  transition
                  duration-200
                  hover:bg-blue-700
                  sm:w-auto
                  sm:rounded-l-none
                "
              >
                Search
              </button>

            </div>

          </form>


          {/* Error */}
          {error && (
            <p className="mt-4 text-center text-sm font-medium text-red-500">
              {error}
            </p>
          )}


          {/* Loading */}
          {loading && (
            <div className="py-10 text-center text-gray-500">
              Searching...
            </div>
          )}


          {/* ================= GITHUB PROFILE ================= */}

          {user && !loading && (

            <div className="mt-6 w-full rounded-xl border border-gray-300 bg-white p-4 sm:mt-8 sm:p-6 md:p-8">

              {/* Profile Header */}
              <div className="flex flex-col items-center gap-5 border-b border-gray-200 pb-6 sm:flex-row sm:items-start">

                {/* Avatar */}
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="
                    h-24
                    w-24
                    shrink-0
                    rounded-full
                    border-4
                    border-gray-100
                    sm:h-28
                    sm:w-28
                  "
                />


                {/* User Info */}
                <div className="min-w-0 flex-1 text-center sm:text-left">

                  <h2 className="break-words text-xl font-bold text-gray-800 sm:text-2xl">
                    {user.name || user.login}
                  </h2>

                  <p className="mt-1 break-words text-sm text-gray-500 sm:text-base">
                    @{user.login}
                  </p>

                  {user.bio && (
                    <p className="mt-3 break-words text-sm leading-6 text-gray-600 sm:text-base">
                      {user.bio}
                    </p>
                  )}

                </div>

              </div>


              {/* ================= STATISTICS ================= */}

              <div className="grid grid-cols-1 gap-3 py-5 sm:grid-cols-3 sm:gap-4 sm:py-6">

                {/* Repositories */}
                <div className="rounded-lg border border-gray-200 p-4 text-center sm:text-left">

                  <p className="text-sm text-gray-500">
                    Repositories
                  </p>

                  <p className="mt-1 text-xl font-bold text-gray-800">
                    {user.public_repos}
                  </p>

                </div>


                {/* Followers */}
                <div className="rounded-lg border border-gray-200 p-4 text-center sm:text-left">

                  <p className="text-sm text-gray-500">
                    Followers
                  </p>

                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      mt-1
                      inline-block
                      text-xl
                      font-bold
                      text-blue-600
                      underline
                      transition
                      hover:text-blue-800
                    "
                  >
                    {user.followers}
                  </a>

                </div>


                {/* Following */}
                <div className="rounded-lg border border-gray-200 p-4 text-center sm:text-left">

                  <p className="text-sm text-gray-500">
                    Following
                  </p>

                  <p className="mt-1 text-xl font-bold text-gray-800">
                    {user.following}
                  </p>

                </div>

              </div>


              {/* ================= USER INFORMATION ================= */}

              <div className="space-y-3 border-t border-gray-200 pt-5 text-sm sm:pt-6 sm:text-base">

                {/* Location */}
                {user.location && (
                  <p className="break-words text-gray-600">
                    <span className="font-semibold text-gray-800">
                      Location:
                    </span>{" "}
                    {user.location}
                  </p>
                )}


                {/* Company */}
                {user.company && (
                  <p className="break-words text-gray-600">
                    <span className="font-semibold text-gray-800">
                      Company:
                    </span>{" "}
                    {user.company}
                  </p>
                )}


                {/* Website */}
                {user.blog && (
                  <p className="break-all text-gray-600">
                    <span className="font-semibold text-gray-800">
                      Website:
                    </span>{" "}

                    <a
                      href={
                        user.blog.startsWith("http")
                          ? user.blog
                          : `https://${user.blog}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      {user.blog}
                    </a>
                  </p>
                )}


                {/* GitHub */}
                <p className="break-all text-gray-600">

                  <span className="font-semibold text-gray-800">
                    GitHub:
                  </span>{" "}

                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    View Profile
                  </a>

                </p>

              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default App;

