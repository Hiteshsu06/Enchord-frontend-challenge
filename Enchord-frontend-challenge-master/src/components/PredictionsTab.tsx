import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import Table from "../common/Table";
import { Dialog } from "primereact/dialog";
import axios from "axios";

interface PreductionTableData {
  label: string,
  description: string,
  timeStamp: Date
}

const Predictions: React.FC = () => {
  const [visibleDialogbox, setVisibleDialogbox] = useState<boolean>(false);
  const [predictionTableData, setPredictionTableData] = useState<PreductionTableData[]>([]);
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(()=>{
    axios.get('http://localhost:3000/predict').then((res: any)=>{
      setPredictionTableData(res?.data?.predictions)
   })
 },[]);

  const actionBodyTemplate = (rowData?: any) => (
    <Button
      label="View"
      className="border-radius-15px"
      onClick={()=>{
        setVisibleDialogbox(true);
        setImageUrl(rowData?.image)
      }}
    />
  );

  const columns = [
    {
      field: "label",
      header: "Title",
    },
    {
      field: "description",
      header: "Description",
    },
    {
      field: "timeStamp",
      header: "Timestamp of prediction",
    },
    {
      field: "action",
      header: "Action",
      body: actionBodyTemplate,
    },
  ];

  return (
    <div>
      <Table data={predictionTableData} columns={columns} />
      <Dialog
        header="Predicted Image"
        visible={visibleDialogbox}
        style={{ width: "50vw" }}
        onHide={() => {setVisibleDialogbox(false)}}
      >
        <img src={imageUrl ? imageUrl : ""} alt=""  width="300px" height="250px"/>
      </Dialog>
    </div>
  );
};

export default Predictions;
