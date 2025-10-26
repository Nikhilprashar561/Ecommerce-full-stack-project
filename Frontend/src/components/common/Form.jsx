import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const CommonForm = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
}) => {
  function renderInputsByComponentsTypes(getControlItems) {
    let element = null;
    const value = formData[getControlItems.name] || "";
    switch (getControlItems.componentsType) {
      case "input":
        element = (
          <Input
            name={getControlItems.name}
            placeholder={getControlItems.placeholder}
            type={getControlItems.type}
            id={getControlItems.name}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItems.name]: event.target.value,
              })
            }
          />
        );
        break;
      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItems.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItems.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {getControlItems.options && getControlItems.options.length > 0
                ? getControlItems.options.map((items) => (
                    <SelectItem key={items.id} value={items.id}>
                      {items.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        element = (
          <Textarea
            name={getControlItems.name}
            placeholder={getControlItems.placeholder}
            id={getControlItems.id}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItems.name]: event.target.value,
              })
            }
          />
        );
        break;
      default:
        element = (
          <Input
            name={getControlItems.name}
            placeholder={getControlItems.placeholder}
            type={getControlItems.type}
            id={getControlItems.name}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItems.name]: event.target.value,
              })
            }
          />
        );
        break;
    }
    return element;
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((items) => (
          <div className="grid w-full gap-1" key={items.name}>
            <Label className="mb-1">{items.label}</Label>
            {renderInputsByComponentsTypes(items)}
          </div>
        ))}
      </div>
      <Button type="submit" className="mt-2 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommonForm;
