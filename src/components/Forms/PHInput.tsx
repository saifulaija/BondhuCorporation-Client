import { SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  name: string;
  label?: string;
  type?: string;
  size?:"small" | "medium";
  fullWidth?: boolean;
  required?:boolean;
  sx?:SxProps,
  placeholder?:string
};
const PHInput = ({
  name,
  label,
  type = "text",
  size="small" ||"medium",
  fullWidth,
  sx,
  required
}: TInputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field,fieldState:{error} }) => (
        <TextField
          {...field}
          sx={{...sx}}
          label={label}
          type={type}
          variant="outlined"
          placeholder={label}
          size={size}
          required={required}
          fullWidth={fullWidth}
          error={!!error?.message}
          helperText={error?.message}
        />
      )}
    />
  );
};

export default PHInput;
