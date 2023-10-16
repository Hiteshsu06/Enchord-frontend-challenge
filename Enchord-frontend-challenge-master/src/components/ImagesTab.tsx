import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import Table from "../common/Table";
import axios from "axios";

interface Prediction {
  title: string;
  description: string;
}

interface BoxDimension {
  x1: number,
  x2: number,
  y1: number,
  y2: number
}

interface PredictionList{
  bbox: BoxDimension,
  label: string,
  score: string
  description: string
  timeStamp: string
  image: string
}

interface ImageList{
  filename: string,
  size: number,
  timeOfUpload: string,
  imageUrl: string,
}

const ImagesTab: React.FC = () => {
  const [visibleDialogbox, setVisibleDialogbox] = useState<boolean>(false);
  const [predictionDetails, setPredictionDetails] = useState<Prediction>({
    title: "",
    description: "",
  });
  const [predictionList, setPredictionList] = useState<PredictionList[]>([]);
  const [predictionTableData, setPredictionTableData] = useState<PredictionList[]>([]);
  const [imageList, setImageList] = useState<ImageList[]>([]);
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    axios.get("http://localhost:3000/predict").then((res?: any) => {
      setPredictionList(res?.data?.predictions);
    });
  }, [predictionTableData]);

  const actionBodyTemplate = (rowData?: any) => (
    <Button
      label="Predict"
      className="border-radius-15px"
      onClick={() => {
        setVisibleDialogbox(true);
        setImageUrl(rowData?.imageUrl);
      }}
    />
  );

  const columns = [
    {
      field: "filename",
      header: "Filename",
    },
    {
      field: "size",
      header: "Size of Image",
      body: (item?: any) => (item?.size / 1000000)?.toFixed(2) + "mb",
    },
    {
      field: "timeOfUpload",
      header: "Time of upload",
    },
    {
      field: "action",
      header: "Action",
      body: actionBodyTemplate,
    },
  ];

  const predictionChangeHandler = (e?: any) => {
    try {
      if (e?.target?.name === "title") {
        setPredictionDetails({ ...predictionDetails, title: e?.target?.value });
      } else if (e?.target?.name === "description") {
        setPredictionDetails({
          ...predictionDetails,
          description: e?.target?.value,
        });
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const onUploadImage = async (e?: any) => {
   try{
    let imageObject = await e?.target?.files[0];
    setImageList([
      ...imageList,
      {
        filename: imageObject?.name,
        size: imageObject?.size,
        timeOfUpload:
          new Date().toLocaleDateString("en-US") +
          " " +
          new Date().toLocaleTimeString("en-US"),
        imageUrl: URL.createObjectURL(e?.target?.files[0]),
      },
    ]);
   }
   catch(err){
      console.log(err);
   }
  };

  const submitButtonHandler = async () => {
   try{
    await axios({
      method: "post",
      url: "http://localhost:3000/predict",
      data: {
        predictions: [
          ...predictionList,
          {
            bbox: {
              x1: 589,
              x2: 1443,
              y1: 92,
              y2: 927,
            },
            label: predictionDetails?.title,
            score: "0.97",
            description: predictionDetails?.description,
            timeStamp:
              new Date().toLocaleDateString("en-US") +
              " " +
              new Date().toLocaleTimeString("en-US"),
            image: imageUrl,
          },
        ],
      },
    })
      .then((res?: any) => {
        setPredictionTableData(res?.data?.predictions);
      })
      .finally(() => {
        setImageUrl("");
      });
    setVisibleDialogbox(false);
   }
   catch(err){
    console.log(err);
   }
  };

  return (
    <div>
      <div className="align-left mb-2">
        <input
          type="file"
          accept="image/png, image/jpeg"
          id="contained-button-file"
          onChange={(e: any) => onUploadImage(e)}
        />
        <label htmlFor="contained-button-file">
          <Button label="Upload" className="upload-button-custom-css" />
        </label>
      </div>
      <div className="mt-2">
        <Table data={imageList} columns={columns} />
      </div>
      <Dialog
        header="Prediction dialog box"
        visible={visibleDialogbox}
        style={{ width: "50vw" }}
        onHide={() => setVisibleDialogbox(false)}
      >
        <div className="display-block">
          <div>
            <label htmlFor="username">Title</label>
          </div>
          <InputText
            value={predictionDetails?.title}
            name="title"
            onChange={(e: any) => predictionChangeHandler(e)}
            placeholder="Enter title"
          />
        </div>
        <div className="display-block mt-2 mb-4">
          <div>
            <label htmlFor="username">Description</label>
          </div>
          <InputText
            value={predictionDetails?.description}
            name="description"
            onChange={(e: any) => predictionChangeHandler(e)}
            placeholder="Enter description"
          />
        </div>
        <div>
          <Button
            label="Cancel"
            className="me-2 border-radius-15px"
            onClick={() => {
              setVisibleDialogbox(false);
            }}
          />
          <Button
            label="Submit"
            className="border-radius-15px"
            onClick={submitButtonHandler}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default ImagesTab;
