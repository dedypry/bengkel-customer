import { useEffect } from "react";
import { Autocomplete, AutocompleteItem } from "@heroui/react";

import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { getProvince } from "@/stores/features/region/region-action";
import { setProvinceId } from "@/stores/features/region/region-slice";

interface Props {
  value: string | undefined;
  setValue: (val: any) => void;
  isRequired?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
}
export default function Province({
  value,
  setValue,
  isRequired,
  isInvalid,
  errorMessage,
}: Props) {
  const { provinces } = useAppSelector((state) => state.region);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProvince());
  }, []);

  useEffect(() => {
    if (value) {
      dispatch(setProvinceId(value));
    }
  }, [value]);

  return (
    <Autocomplete
      defaultItems={provinces}
      errorMessage={errorMessage}
      inputValue={(provinces.find((e: any) => e.id == value) as any)?.name}
      isInvalid={isInvalid}
      isRequired={isRequired}
      label="Provinsi"
      labelPlacement="outside"
      placeholder="Pilih Provinsi"
      selectedKey={value}
      variant="bordered"
      onSelectionChange={setValue}
    >
      {(item) => (
        <AutocompleteItem key={item.id} textValue={item.name}>
          {item.name}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );

  // return (
  //   <Combobox
  //     items={provinces.map((e) => ({ label: e.name, value: e.id }))}
  //     placeholder="Pilih Provinsi"
  //     value={value}
  //     onChange={(val) => {
  //       onChange(val);
  //       dispatch(setProvinceId(val));
  //     }}
  //   />
  // );
}
