import { Header } from "./components/Header";
import { Showcase } from "./components/Showcase";
import { useState } from "react";
import { useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { fireStore, useAuth } from "./firebase/firebaseConfig";
import "./App.css";
import { Modal } from "./components/Modal";
import { SignUp } from "./components/SignUp";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(null);
  const logged = useAuth();
  useEffect(() => {
    setLoading(true);
    const q = query(
      collection(fireStore, "images"),
      orderBy("timestamp", "desc")
    );
    const unsub = onSnapshot(q, (snapshot) => {
      setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    });
    return unsub;
  }, []);
  const handleClick = (url) => {
    setUrl(url);
  };
  return (
    <div className="container">
      <Header />

      {logged ? (
        <div>
          <Showcase Click={handleClick} data={data} loading={loading} />
          {url && <Modal url={url} setUrl={setUrl} />}
        </div>
      ) : (
        <SignUp />
      )}
    </div>
  );
}

export default App;
