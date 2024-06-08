// import { FeedbackForm } from "./components/FeedbackForm";
import { GASClient } from "gas-client";

import * as server from "../server/main";
import { SignUp } from "./components/SignUp";
import Typography from "./components/ui/typography";

const { serverFunctions } = new GASClient<typeof server>();

function App() {
  const handleButtonClick = async () => {
    const sheetData = await serverFunctions.getSheetData();
    console.log(sheetData);

    serverFunctions.appendRowsToSheet("シート1", 1);
  };
  return (
    <div className="w-full h-full bg-background flex flex-col items-center">
      <Typography
        variant={"h1"}
        className="my-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600"
      >
        TanStack Form Tutorial
      </Typography>
      <SignUp />
      <button type="button" onClick={handleButtonClick}>
        ボタン
      </button>
    </div>
  );
}

export default App;
