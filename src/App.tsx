import "./App.css";
import { FeedbackForm } from "./components/FeedbackForm";

import { GASClient } from "gas-client";

import * as server from "../server/main";

const { serverFunctions } = new GASClient<typeof server>();

function App() {
  const handleButtonClick = async () => {
    const sheetData = await serverFunctions.getSheetData();
    console.log(sheetData);

    serverFunctions.appendRowsToSheet("シート1", 1);
  };
  return (
    <>
      <div>
        <h1>Feedback Form</h1>
        <h2>Please share your feedback.</h2>
        <FeedbackForm />
        <button type='button' onClick={handleButtonClick}>
          ボタン
        </button>
      </div>
    </>
  );
}

export default App;
