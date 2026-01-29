import { useEffect } from "react";
import { Autocomplete, AutocompleteItem } from "@heroui/react";

import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { getCity } from "@/stores/features/region/region-action";
import { setCityId } from "@/stores/features/region/region-slice";

interface Props {
  value: number | undefined;
  setValue: (val: any) => void;
  isRequired?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
}
export default function City({
  value,
  setValue,
  isRequired,
  isInvalid,
  errorMessage,
}: Props) {
  const { province_id, cities } = useAppSelector((state) => state.region);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (province_id) {
      dispatch(getCity(province_id!));
    }
  }, [province_id]);

  useEffect(() => {
    if (value) {
      dispatch(setCityId(value));
    }
  }, [value]);

  return (
    <Autocomplete
      defaultItems={cities}
      errorMessage={errorMessage}
      inputValue={(cities.find((e: any) => e.id == value) as any)?.name}
      isInvalid={isInvalid}
      isRequired={isRequired}
      label="Kota"
      labelPlacement="outside"
      placeholder="Pilih Kota"
      selectedKey={value}
      variant="bordered"
      onSelectionChange={setValue}
    >
      {(item: any) => (
        <AutocompleteItem key={item.id} className="capitalize">
          {item.name}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );

  // return (
  //   <Combobox
  //     items={cities.map((e) => ({ label: e.name, value: e.id }))}
  //     placeholder="Pilih Kota"
  //     value={value}
  //     onChange={(val) => {
  //       onChange(val);
  //       dispatch(setCityId(val));
  //     }}
  //   />
  // );
}
