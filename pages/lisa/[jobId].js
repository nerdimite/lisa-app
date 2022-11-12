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

export default function Results() {
  const [input, setInput] = useState("");

  return (
    <>
      <SeoHead title="Dashboard | LISA" />
      <DashHeader />
      <div className="max-w-screen-xl mt-24 px-8 xl:px-16 mx-auto pb-24">
        <Title>LISA Dashboard</Title>
        <Text>Upload your meeting video to get LISA's insights</Text>

        <ColGrid numColsLg={6} gapX="gap-x-6" gapY="gap-y-6" marginTop="mt-6">
          {/* Main section */}
          <Col numColSpanLg={4}>
            <Card
              maxWidth="max-w-none"
              hFull={false}
              shadow={true}
              decoration=""
              decorationColor="blue"
              marginTop="mt-0"
            >
              <Text>Sales</Text>
              <Metric>$ 34,743</Metric>
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
                      let video_uri = e.target.result.split(",")[1];
                      setInput(video_uri);
                    };
                  }
                }}
              />
              <Button
                size="xs"
                importance="secondary"
                text="Fetch Results"
                color="blue"
                handleClick={() => {
                  console.log("clicked");
                  fetch("http://127.0.0.1:8000/results/thankful-hand-950", {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    // body: JSON.stringify({ input: input }),
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      console.log("Success:", data);
                    })
                    .catch((error) => {
                      console.error("Error:", error);
                    });
                }}
              />
              <Button
                size="xs"
                importance="primary"
                text="Submit"
                color="blue"
                handleClick={() => {
                  console.log("clicked");
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
                    })
                    .catch((error) => {
                      console.error("Error:", error);
                    });
                }}
              />
              <Button
                size="xs"
                importance="primary"
                text="Search"
                color="blue"
                handleClick={() => {
                  console.log("clicked");
                  fetch("http://127.0.0.1:8000/search/", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ job_id: "intrigued-toy-517", query: "what is the issue with deep learning" }),
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      console.log("Success:", data);
                    })
                    .catch((error) => {
                      console.error("Error:", error);
                    });
                }}
              />
            </Card>
          </Col>

          {/* KPI sidebar */}
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
