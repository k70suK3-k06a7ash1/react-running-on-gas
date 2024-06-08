import { useForm } from "@tanstack/react-form";
type Member = {
  name: string;
};
type People = {
  name: string;
  age: number;
  members: Member[];
};
export function FeedbackForm() {
  const form = useForm<{ people: People[] }>({
    defaultValues: {
      people: [{ name: "ww", age: 10, members: [{ name: "sample" }] }],
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
        <form.Field name="people" mode="array">
          {(field) => (
            <div key={`test-${field.state.value}`}>
              {field.state.value.map((_, i) => (
                <>
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      justifyContent: "center",
                      padding: "8px",
                    }}
                  >
                    <form.Field
                      key={`people-name-${i}`}
                      name={`people[${i}].name`}
                    >
                      {(subField) => (
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
                    </form.Field>

                    <form.Field
                      key={`people-age-${i}`}
                      name={`people[${i}].age`}
                    >
                      {(subField) => (
                        <div>
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
                    </form.Field>
                  </div>

                  <form.Field
                    key={`people[${i}].members`}
                    name={`people[${i}].members`}
                    mode="array"
                  >
                    {(childrenField) => (
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
                                name: "",
                              })
                            }
                            type="button"
                          >
                            Add Member
                          </button>
                        </div>
                      </div>
                    )}
                  </form.Field>
                </>
              ))}
              <button
                onClick={() =>
                  field.pushValue({
                    name: "",
                    age: 0,
                    members: [{ name: "" }],
                  })
                }
                type="button"
              >
                Add
              </button>
            </div>
          )}
        </form.Field>
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
