import { getStorage, ref, list } from "firebase/storage";
import { useState } from "react";

const Storage = () => {
  const [files, setFiles] = useState([]);

  async function pageTokenExample() {
    // Create a reference under which you want to list
    const storage = getStorage();
    const listRef = ref(storage, "videos/");
    const firstPage = await list(listRef, { maxResults: 100 });

    // Fetch the second page if there are more elements.
    if (firstPage.nextPageToken) {
      const secondPage = await list(listRef, {
        maxResults: 100,
        pageToken: firstPage.nextPageToken,
      });

      setFiles(...secondPage.items);
      console.log(files);
    }

    setFiles(...firstPage.items);
    console.log(files);
  }

  return (
    <div>
      <button onClick={pageTokenExample}>Storage</button>
    </div>
  );
};

export default Storage;
