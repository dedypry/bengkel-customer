import { useEffect } from "react";
import { Autocomplete, AutocompleteItem } from "@heroui/react";

import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { getDistrict } from "@/stores/features/region/region-action";

interface Props {
  value: number | undefined;
  setValue: (val: any) => void;
  isRequired?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
}

export default function District({
  value,
  setValue,
  isRequired,
  isInvalid,
  errorMessage,
}: Props) {
  const { city_id, district, province_id } = useAppSelector(
    (state) => state.region,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (city_id) {
      dispatch(getDistrict(city_id!));
    }
  }, [city_id, province_id]);

  return (
    <Autocomplete
      defaultItems={district}
      errorMessage={errorMessage}
      inputValue={(district.find((e: any) => e.id == value) as any)?.name}
      isInvalid={isInvalid}
      isRequired={isRequired}
      label="Kecamatan"
      labelPlacement="outside"
      placeholder="Pilih Kecamatan"
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
}
