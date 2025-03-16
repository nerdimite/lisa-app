import SeoHead from "../../components/SeoHead";
import Footer from "../../components/Layout/Footer";
import DashHeader from "../../components/Layout/DashHeader";
import {
  Card,
  Title,
  Text,
  Metric,
  ColGrid,
  Col,
  Block,
  Button,
  ButtonInline,
} from "@tremor/react";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const ReactJson = dynamic(import("react-json-view"), { ssr: false });
import { useRouter } from "next/router";

const Label = (props) => {
  return (
    <div className="text-md md:text-lg mb-1 text-gray-600 font-semibold">
      {props.children}
    </div>
  );
};

const JSONView = (props) => {
  return (
    <div className="w-full overflow-hidden rounded-md mb-4">
      <ReactJson
        src={props.data}
        name={false}
        theme="harmonic"
        style={{ padding: "10px" }}
        displayArrayKey={false}
        collapseStringsAfterLength={40}
        displayObjectSize={true}
        displayDataTypes={false}
        quotesOnKeys={false}
      />
    </div>
  );
};

export default function Input() {
  const [input, setInput] = useState("");
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [jobId, setJobId] = useState(null);
  const [query, setQuery] = useState(null);
  const [seek, setSeek] = useState(0);
  const router = useRouter();

  return (
    <>
      <SeoHead title="Dashboard | LISA" />
      <DashHeader />
      <div className="max-w-screen-xl mt-24 px-8 xl:px-16 mx-auto pb-24">
        <ColGrid numColsLg={8} gapX="gap-x-6" gapY="gap-y-6" marginTop="mt-6">
          {/* Main section */}
          <Col numColSpanLg={5}>
            <Block spaceY="space-y-6">
              <Card
                maxWidth="max-w-none"
                hFull={false}
                shadow={true}
                decoration=""
                decorationColor="blue"
                marginTop="mt-0"
              >
                <Title>LISA Dashboard</Title>
                <Text>Upload your meeting video to get LISA's insights</Text>
                <div className="mt-3 flex items-center justify-between">
                  <input
                    id="video-input"
                    type="file"
                    // className="mb-3 border-solid focus:outline-none w-1/2"
                    className="
                    w-full
                    rounded-l-sm
                    rounded-r-lg
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    transition
                    ease-in-out
                    focus:text-gray-700 focus:bg-white focus:border-blue-300 focus:outline-none"
                    onChange={(event) => {
                      let files = event.target.files;
                      if (files.length > 0) {
                        let reader = new FileReader();
                        reader.readAsDataURL(files[0]);
                        reader.onload = (e) => {
                          let video_uri = e.target.result;
                          setInput(video_uri);
                        };
                      }
                    }}
                  />
                  <Button
                    size="sm"
                    importance="primary"
                    text="Submit"
                    color="blue"
                    handleClick={() => {
                      console.log("Submitting video");
                      setLoading(true);
                      fetch("http://127.0.0.1:8000/predict", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ video: input }),
                      })
                        .then((response) => response.json())
                        .then((data) => {
                          console.log("Success:", data);
                          setOutput(data);
                          setJobId(data.job_id);
                          setLoading(false);
                        })
                        .catch((error) => {
                          console.error("Error:", error);
                          setLoading(false);
                        });
                    }}
                  />
                </div>
                <div>
                  {loading && (
                    <div className="mt-3 flex justify-start gap-2">
                      <Text>⌛Performing Inference on the Servers...</Text>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </div>
                  )}
                </div>
              </Card>
              <Card>
                <div className="space-y-2">
                  <video id="video" controls src={input ? input : null}></video>
                  <div className="mb-2">
                    <Label>Search Query</Label>
                    <input
                      id="search-query"
                      type="text"
                      className="w-full p-2 rounded-md focus:border-blue-600"
                      placeholder="Enter a search query to find a section of the meeting"
                    />
                  </div>
                  <Button
                    size="sm"
                    importance="secondary"
                    text="Search"
                    color="blue"
                    handleClick={() => {
                      console.log("Making search query");
                      let video = document.getElementById("video");
                      let query = document.getElementById("search-query").value;
                      console.log(jobId, query);

                      fetch("http://127.0.0.1:8000/search", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          job_id: jobId,
                          query: query,
                        }),
                      })
                        .then((response) => response.json())
                        .then((data) => {
                          console.log("Success:", data);
                          video.currentTime = data[0][0];
                        })
                        .catch((error) => {
                          console.error("Error:", error);
                        });
                    }}
                  />
                </div>
              </Card>
              <Card>
                <Title>Transcription</Title>
                {output && output.transcription && (
                  <div className="max-h-96 overflow-y-auto">
                    {output.transcription.split("\n").map((line, index) => {
                      // Check if line contains timestamp pattern [00:00.000]:
                      const match = line.match(/^\[(\d+:\d+\.\d+)\]:(.*)/);
                      if (match) {
                        const timestamp = match[1];
                        const text = match[2];
                        return (
                          <div key={index} className="flex mb-2">
                            <div className="w-24 flex-shrink-0 font-mono mr-2">
                              [{timestamp}]
                            </div>
                            <div className="flex-grow">{text.trim()}</div>
                          </div>
                        );
                      }
                      return (
                        <div key={index} className="mb-2">
                          {line}
                        </div>
                      );
                    })}
                  </div>
                )}
              </Card>
            </Block>
          </Col>
          <Col numColSpanLg={3}>
            <Block spaceY="space-y-6">
              <Card>
                <Title>Minutes-of-Meeting</Title>{" "}
                {output && output.minutes && (
                  <div className="ml-4">
                    <ul className="list-disc">
                      {output.minutes.map((item, index) => (
                        <li key={index} className="mb-2">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card>
              <Card>
                <Title>Action Items</Title>{" "}
                {output &&
                output.action_items &&
                output.action_items.length > 0 ? (
                  <div className="ml-4">
                    <ul className="list-disc">
                      {output.action_items.map((item, index) => (
                        <li key={index} className="mb-2">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="ml-4 mt-2 text-gray-600">
                    No action items found
                  </div>
                )}
              </Card>
            </Block>
          </Col>
        </ColGrid>
      </div>
      <Footer />
    </>
  );
}
