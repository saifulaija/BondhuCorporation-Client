import * as React from "react";
import { SxProps, styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@mui/material";
import Image from "next/image";

type TProps = {
  name: string;
  label?: string;
  sx?: SxProps;
};

export default function BCFileUploader({ name, label, sx }: TProps) {
  const { control } = useFormContext();
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          setImageUrl(e.target.result.toString());
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...field } }) => {
        return (
          <>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              sx={{ ...sx }}
            >
              {label || "Upload file"}
              <Input
                {...field}
                type="file"
                onChange={(e) => {
                  handleFileChange(e as any);
                  onChange((e?.target as HTMLInputElement).files?.[0]);
                }}
                style={{ display: "none" }}
              />
            </Button>
            {/* Display the uploaded image */}
            {imageUrl && (
              <Image width={70} height={50} src={imageUrl} alt="Uploaded" />
            )}
          </>
        );
      }}
    />
  );
}
