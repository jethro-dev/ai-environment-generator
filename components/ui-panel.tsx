import { TopBar } from "./top-bar";
import { InputForm } from "./input-form";
import { fetchStyles } from "@/lib/utils";

type Props = {};

export const UIPanel = async (props: Props) => {
  const styles = await fetchStyles();
  return (
    <div className={`absolute inset-0 p-6 flex flex-col justify-end gap-4`}>
      {/* <TopBar /> */}
      <InputForm styles={styles} />
    </div>
  );
};
