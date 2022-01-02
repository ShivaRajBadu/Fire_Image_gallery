import { collection, addDoc, serverTimestamp } from "@firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import React, { useEffect, useState } from "react";
import { storage, fireStore, auth } from "../firebase/firebaseConfig";
import { ProgressBar } from "./ProgressBar";
import { Spinner } from "./Spinner";
import { signOut } from "firebase/auth";
import { motion } from "framer-motion";

export const Showcase = ({ data, loading, Click }) => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (file === null) {
      console.log("is empty at start ");
    } else {
      const storageRef = ref(storage, `images/${file.name}`);
      const CollectionRef = collection(fireStore, "images");
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(percentage);
        },
        (error) => {
          setError(error);
        },
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            addDoc(CollectionRef, {
              url,
              timestamp: serverTimestamp(),
            });
            setUrl(url);
          });
        }
      );
    }
  }, [file]);
  const types = ["image/png", "image/jpg", "image/jpeg"];
  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError(null);
    } else {
      setError("please select valid file(png,jpg,jpeg)");
      setUrl(null);
    }
  };

  return (
    <div className="showcase">
      <div className="showcase-title">
        <h2>Picture Collection</h2>
        <input
          className="input_button"
          onClick={() => signOut(auth)}
          type="button"
          value="logout"
        />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam,
          labore.
        </p>
      </div>
      <div>
        {error && <p>{error}</p>}
        <label className="button" htmlFor="button">
          +
        </label>
        <input type="file" name="+" id="button" onChange={handleChange} />
      </div>
      <div className="progress">
        {" "}
        {file && <ProgressBar progress={progress} url={url} />}
      </div>
      <div className="showcase-body">
        {loading ? (
          <Spinner />
        ) : (
          data.map((img) => (
            <motion.div layout key={img.id} className="showcase-grid">
              <img
                onClick={() => Click(img.url)}
                className="grid-img"
                style={{ maxWidth: "200px" }}
                src={img.url}
                alt=""
              />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};
