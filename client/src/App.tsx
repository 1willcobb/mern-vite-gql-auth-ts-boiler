import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${localStorage.getItem("id_token")}`,
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        {/* This is so the entire header, main, and footer sections will show (without a scroll bar)
        so long as the content doesn't exceed the viewport height */}
        <div className="flex h-screen flex-col">
          <Header />
          {/* Main content area - this will grow to take up available space */}
          <main className="flex-grow bg-main_bg">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
              <Route path="/signout" element={<SignOut />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
