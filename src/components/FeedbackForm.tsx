import { useForm } from "@tanstack/react-form";

export function FeedbackForm() {
  const form = useForm({
    defaultValues: {
      people: [
        {
          key: "a",
          name: "ww",
          age: 10,
          members: [{ name: "sample" }],
        },
      ] as {
        key: string;
        name: string;
        age: number;
        members: { name: string }[];
      }[],
    },
    onSubmit({ value }) {
      alert(JSON.stringify(value));
    },
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="people"
          mode="array"
          key={"people"}
          children={(field) => (
            <div key={`test-${field.state.value}`}>
              {field.state.value.map((_, i) => (
                <>
                  <div
                    key={`child-test-${field.state.value}`}
                    style={{
                      display: "flex",
                      gap: "8px",
                      justifyContent: "center",
                      padding: "8px",
                    }}
                  >
                    <form.Field
                      key={`people[${i}].name`}
                      name={`people[${i}].name`}
                      children={(subField) => (
                        <div>
                          <label>
                            <div>Name for person {i}</div>
                            <input
                              value={subField.state.value}
                              onChange={(e) =>
                                subField.handleChange(e.target.value)
                              }
                            />
                          </label>
                        </div>
                      )}
                    />

                    <form.Field
                      key={`people[${i}].age`}
                      name={`people[${i}].age`}
                      children={(subField) => (
                        <div key={subField.state.value}>
                          <label>
                            <div>Name for person {i}</div>
                            <input
                              value={subField.state.value}
                              onChange={(e) =>
                                subField.handleChange(Number(e.target.value))
                              }
                            />
                          </label>
                        </div>
                      )}
                    />
                  </div>

                  <form.Field
                    key={`people[${i}].members`}
                    name={`people[${i}].members`}
                    mode="array"
                    children={(childrenField) => (
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          justifyContent: "center",
                          padding: "8px",
                        }}
                        key={`people[${i}].members`}
                      >
                        {childrenField.state.value.map((_, idx) => (
                          <form.Field
                            key={`member-name-${idx}-${i}`}
                            name={`people[${i}].members[${idx}].name`}
                          >
                            {(childField) => (
                              <label>
                                <div>Name for member {idx}</div>
                                <input
                                  value={childField.state.value}
                                  onChange={(e) =>
                                    childField.handleChange(e.target.value)
                                  }
                                />
                              </label>
                            )}
                          </form.Field>
                        ))}
                        <div>
                          <button
                            onClick={() =>
                              childrenField.pushValue({
                                name: "init",
                              })
                            }
                            type="button"
                          >
                            Add Member
                          </button>
                        </div>
                      </div>
                    )}
                  />
                </>
              ))}
              <button
                key={"button"}
                onClick={() =>
                  field.pushValue({
                    key: "1",
                    name: "init",
                    age: 10,
                    members: [{ name: "" }],
                  })
                }
                type="button"
              >
                Add
              </button>
            </div>
          )}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button type="submit" disabled={!canSubmit}>
              {isSubmitting ? "..." : "Submit"}
            </button>
          )}
        />
      </form>
    </div>
  );
}
