import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Spinner from "../../ui/Spinner";

import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  const { isUpdating, updateSetting } = useUpdateSetting();
  const handleUpdate = (e) => {
    console.log("🚀 ~ handleUpdate ~ e:", e);
    const { name, value } = e.target;
    if (!value) return;

    updateSetting({ [name]: Number(value) });
  };

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          disabled={isUpdating}
          name="minBookingLength"
          defaultValue={minBookingLength}
          type="number"
          id="min-nights"
          onBlur={handleUpdate}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          disabled={isUpdating}
          name="maxBookingLength"
          onBlur={handleUpdate}
          defaultValue={maxBookingLength}
          type="number"
          id="max-nights"
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          disabled={isUpdating}
          name="maxGuestsPerBooking"
          onBlur={handleUpdate}
          defaultValue={maxGuestsPerBooking}
          type="number"
          id="max-guests"
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          disabled={isUpdating}
          name="breakfastPrice"
          onBlur={handleUpdate}
          defaultValue={breakfastPrice}
          type="number"
          id="breakfast-price"
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
