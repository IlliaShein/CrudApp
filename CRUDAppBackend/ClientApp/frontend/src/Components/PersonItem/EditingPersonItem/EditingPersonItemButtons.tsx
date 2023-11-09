import { FC } from "react";
import MyButton from "../../UI/Button/MyButton";

interface EditingPersonItemButtonsProps {
  handleCancel: () => void;
}

const EditingPersonItemButtons: FC<EditingPersonItemButtonsProps> = ({ handleCancel }) => {
  return (
    <div className="person__btns">
      <MyButton type="submit">Save</MyButton>
      <MyButton type="button" onClick={handleCancel}>Cancel</MyButton>
    </div>
  );
};

export default EditingPersonItemButtons;
