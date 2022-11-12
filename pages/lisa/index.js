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
import ButtonPrimary from "../../components/misc/ButtonPrimary";
import { useRouter } from "next/router";

export default function Input() {
  const [input, setInput] = useState("");
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <>
      <SeoHead title="Dashboard | LISA" />
      <DashHeader />
      <div className="max-w-screen-xl mt-24 px-8 xl:px-16 mx-auto pb-24">
        <ColGrid numColsLg={6} gapX="gap-x-6" gapY="gap-y-6" marginTop="mt-6">
          {/* Main section */}
          <Col numColSpanLg={4}>
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
                <video id="video" controls src={input ? input : null}></video>
              </Card>
            </Block>
          </Col>
          <Col numColSpanLg={2}>
            <Block spaceY="space-y-6">
              <Card>
                <div className="h-24" />
              </Card>
              <Card>
                <div className="h-24" />
              </Card>
              <Card>
                <div className="h-24" />
              </Card>
            </Block>
          </Col>
        </ColGrid>
      </div>
      <Footer />
    </>
  );
}
