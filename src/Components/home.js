import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CodiconCallIncoming,
  CodiconCallIncomingNR,
  CodiconCallOutgoing,
  TdesignCallOff,
} from "./Icons/call";

export default function Home() {
  const [data, setData] = useState([]);
  const [archivedAll, setArchivedAll] = useState(true);

  async function getData() {
    try {
      const response = await axios.get(
        "https://cerulean-marlin-wig.cyclic.app/activities"
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handleArchive = (index) => {
    const updatedData = [...data];
    if (updatedData[index].is_archived === "false") {
      updatedData[index].is_archived = "true";
    } else {
      updatedData[index].is_archived = "false";
    }
    setData(updatedData);
  };

  const handleArchiveAll = () => {
    const updatedData = data.map((callData) => ({
      ...callData,
      is_archived: callData.is_archived === "true" ? "false" : "true",
    }));
    setData(updatedData);
    setArchivedAll(!archivedAll);
  };

  console.log(data);

  return (
    <div className="flex flex-col">
      <div className="flex p-4">
        {archivedAll ? (
          <>
            <button
              className="bg-black text-white p-2 rounded-lg"
              onClick={handleArchiveAll}
            >
              Archive All{" "}
            </button>
          </>
        ) : (
          <>
            <button
              className="bg-black text-white p-2 rounded-lg"
              onClick={handleArchiveAll}
            >
              Unarchive All{" "}
            </button>
          </>
        )}
      </div>
      {data.map((data, index) => (
        <div key={index} className="flex p-8 itmes-center justify-between">
          <div className="flex itmes-center">
            <div className="p-1">{index}</div>
            <div className="p-1">
              {data.call_type === "missed" ? (
                <>
                  {data.direction === "inbound" && (
                    <div className="flex items-center ">
                      <CodiconCallIncomingNR />
                      <div className="p-2">
                        <span className="font-bold">From: {data.from}</span>
                      </div>
                    </div>
                  )}
                  {data.direction === "outbound" && (
                    <div className="flex items-center ">
                      <TdesignCallOff />
                      <div className="p-2">
                        <span className="font-bold">To: {data.to}</span>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {data.direction === "inbound" && (
                    <div className="flex items-center ">
                      <CodiconCallIncoming />
                      <div className="flex flex-col p-2">
                        <span className="font-bold">From: {data.from}</span>
                        <span>Duration: {data.duration}</span>
                      </div>
                    </div>
                  )}
                  {data.direction === "outbound" && (
                    <div className="flex items-center ">
                      <CodiconCallOutgoing />
                      <div className="p-2">
                        <span className="font-bold">To: {data.to}</span>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          {data.is_archived === "false" && (
            <>
              <button
                onClick={() => handleArchive(index)}
                className="bg-black text-white p-2 rounded-lg"
              >
                Archive
              </button>
            </>
          )}
          {data.is_archived === "true" && (
            <>
              <button
                onClick={() => handleArchive(index)}
                className="bg-black text-white p-2 rounded-lg"
              >
                Unarchive
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
