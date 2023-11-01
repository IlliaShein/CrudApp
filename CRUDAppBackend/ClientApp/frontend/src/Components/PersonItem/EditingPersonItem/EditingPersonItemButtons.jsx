import React from "react";
import MyButton from '../../UI/Button/MyButton';

const EditingPersonItemButtons = function({handleCancel}) {
    return (
        <div className="person__btns">
          <MyButton type="submit">Save</MyButton>
          <MyButton type="button" onClick={handleCancel}>Cancel</MyButton>
        </div>
    );
};

export default EditingPersonItemButtons;
