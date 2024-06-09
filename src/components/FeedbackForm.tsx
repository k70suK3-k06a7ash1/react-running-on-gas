import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useForm } from "@tanstack/react-form";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import {
  AlertCircle,
  CircleX,
  ListPlus,
  SquarePlus,
  Trash2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const FeedbackForm = () => {
  const form = useForm({
    defaultValues: {
      feedbacks: [{ system: "sample", opinions: [{ context: "" }] }] as {
        system: string;
        opinions: { context: string }[];
      }[],
    },
    validators: {
      onSubmit: ({ value }) => {
        if (!value.feedbacks.length) {
          return "Please fill in all fields";
        }
      },
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });

  const options = ["sample", "test"];

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>FeedbackForm</CardTitle>
        <CardDescription>
          Creating a form with <span className="font-bold">@Kγ0suKε</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <div>
            <form.Field
              name="feedbacks"
              mode="array"
              children={(field) => (
                <>
                  <div className="flex gap-2 items-center">
                    <Label>Feedback</Label>

                    <ListPlus
                      className="cursor-pointer"
                      onClick={() =>
                        field.pushValue({
                          system: "",
                          opinions: [{ context: "" }],
                        })
                      }
                    />
                  </div>
                  {field.state.value.map((_, index) => (
                    <div key={index} className="py-4">
                      <div className="">
                        <div className="flex justify-between items-center py-2">
                          <Label className="mr-2">System</Label>
                          <Trash2
                            className="cursor-pointer"
                            onClick={() => field.removeValue(index)}
                          />
                        </div>
                        <form.Field
                          name={`feedbacks[${index}].system`}
                          children={(subField) => (
                            <Select
                              value={subField.state.value}
                              onValueChange={(value) =>
                                subField.handleChange(value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {options.map((value, index) => (
                                  <SelectItem
                                    key={index}
                                    value={value}
                                    disabled={form.state.values.feedbacks
                                      .map((v) => v.system)
                                      .includes(value)}
                                  >
                                    {value}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>
                      <div>
                        <div className="flex gap-2 items-center pt-4">
                          <Label>Opinions</Label>
                          <SquarePlus
                            onClick={() =>
                              field.form.pushFieldValue(
                                `feedbacks[${index}].opinions`,
                                {
                                  context: "",
                                }
                              )
                            }
                          />
                        </div>
                        <div>
                          <form.Field
                            name={`feedbacks[${index}].opinions`}
                            children={(subField) => (
                              <>
                                {subField.state.value.map((_, idx) => (
                                  <div
                                    key={index}
                                    className="flex gap-2 my-2 items-center"
                                  >
                                    <form.Field
                                      name={`feedbacks[${index}].opinions[${idx}].context`}
                                      children={(subField) => (
                                        <Input
                                          type="text"
                                          value={subField.state.value}
                                          onChange={(e) =>
                                            subField.handleChange(
                                              e.target.value
                                            )
                                          }
                                        />
                                      )}
                                    />
                                    <CircleX
                                      className="cursor-pointer"
                                      onClick={() =>
                                        subField.removeValue(index)
                                      }
                                    />
                                  </div>
                                ))}
                              </>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            />
          </div>
          <form.Subscribe
            selector={(state) => state.errors}
            children={(errors) =>
              errors.length > 0 && (
                <Alert variant={"destructive"}>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{errors}</AlertDescription>
                </Alert>
              )
            }
          />
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={form.reset}>
          Reset
        </Button>
        <Button
          variant={"ghost"}
          onClick={() => console.log(form.state.values)}
        >
          Debug
        </Button>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isValidating]}
          children={([canSubmit, isValidating]) => (
            <Button
              onClick={form.handleSubmit}
              disabled={!canSubmit || isValidating}
            >
              Submit
            </Button>
          )}
        />
      </CardFooter>
    </Card>
  );
};
