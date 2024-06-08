import { GASClient } from "gas-client";

import * as server from "../server/main";
import { FeedbackForm } from "./components/FeedbackForm";
import Typography from "./components/ui/typography";
import { Button } from "./components/ui/button";

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
        Voice of Customer
      </Typography>
      <FeedbackForm />
      <Button type="button" onClick={handleButtonClick}>
        Button
      </Button>
    </div>
  );
}

export default App;
