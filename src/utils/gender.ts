interface IGender {
  value: string;
  label: string;
}

export const genderOpts: Array<IGender> = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];
