"use client";

import React, { Fragment, useState } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Stack,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import {
  ClipboardMinus,
  Delete,
  DeleteIcon,
  Edit,
  Package,
} from "lucide-react";
import DashedLine from "@/components/Shared/UI/DashedLine/DashedLine";
import {
  useGetAllSubStoreQuery,
  useSoftDeleteSubStoreMutation,
} from "@/redux/features/store/storeApi";
import { TSubStore } from "@/types/store";
import { toast } from "sonner";
import AddStoreModal from "./components/AddStoreModal";
import { useGetAllMainStoreQuery } from "@/redux/features/mainStore/mainStoreApi";
import Link from "next/link";
import { TMainStore } from "@/types/mainStore/intex";

const StorePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: subStoreData, isLoading, isError } = useGetAllSubStoreQuery({});
  const {
    data: mainStoreData,
    isFetching: isMainStoreLoading,
    isError: isMainStoreError,
  } = useGetAllMainStoreQuery({});
  const [deleteSubStore, {}] = useSoftDeleteSubStoreMutation();
  const stores = subStoreData?.stores;
  console.log(mainStoreData);
  const handleDeleteSubStore = async (id: string) => {
    try {
      const res: any = await deleteSubStore(id);
      console.log(res);
      if ("data" in res && res?.data?.id) {
        toast.success("Sub store deleted successfully!!!");
      } else {
        toast.error(res?.error?.message);
      }
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  return (
    <Box mt={2}>
      <Container maxWidth="lg">
        <AddStoreModal open={isModalOpen} setOpen={setIsModalOpen} />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h4">All Stores</Typography>
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="contained"
            color="primary"
            endIcon={<Package />}
          >
            Add Sub Store
          </Button>
        </Stack>
        <DashedLine />
        {isMainStoreLoading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : isMainStoreError ? (
          <Typography color="error" textAlign="center" my={4}>
            Failed to load stores. Please try again later.
          </Typography>
        ) : mainStoreData && mainStoreData.length > 0 ? (
          <Stack direction={{ xs: "column", md: "row" }} spacing={4} mt={4}>
            <Box flex={{ xs: 12, md: 4 }}>
              <Typography
                textAlign="center"
                variant="h5"
                fontWeight={300}
                textTransform="uppercase"
              >
                Main Store
              </Typography>
              <Grid container spacing={2} my={2}>
                {mainStoreData.map((store:TMainStore) => (
                  <Grid item xs={12} key={store.id}>
                    <Card
                      sx={{
                        width: "100%",
                        padding: 2,
                        borderRadius: 1,
                        border: "1px solid lightgray",
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={3}
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box>
                          <Typography variant="body2">
                            GL Code: {store.glCode}
                          </Typography>
                          <Typography variant="body2">
                            Store Name: {store.name}
                          </Typography>
                          <Typography variant="body2">
                            Location: {store.location}
                          </Typography>
                          <Typography variant="body2">
                            Location: {store.contactNumber}
                          </Typography>
                          <Typography variant="body2">
                            Created Date:{" "}
                            {new Date(store.createdAt).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Stack>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Box flex={{ xs: 12, md: 8 }}>
              <Typography
                textAlign="center"
                variant="h5"
                fontWeight={300}
                textTransform="uppercase"
              >
                Sub Store
              </Typography>
              <Grid container spacing={2} my={2}>
                {stores?.map((store) => (
                  <Grid item xs={12} key={store.id}>
                    <Card
                      sx={{
                        width: "100%",
                        padding: 2,
                        borderRadius: 1,
                        border: "1px solid lightgray",
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={3}
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box>
                          <Typography variant="body2">
                            GL Code: {store.glCode}
                          </Typography>
                          <Typography variant="body2">
                            Store Name: {store.name}
                          </Typography>
                          <Typography variant="body2">
                            Location: {store.location}
                          </Typography>
                          <Typography variant="body2">
                            Location: {store.contactNumber}
                          </Typography>
                          <Typography variant="body2">
                            Created Date:{" "}
                            {new Date(store.createdAt).toLocaleDateString()}
                          </Typography>
                        </Box>
                        <Box display="flex" gap={2}>
                          <Link
                            href={`/dashboard/super_admin/stores/edit/${store?.id}`}
                          >
                            <IconButton aria-label="edit">
                              <Edit />
                            </IconButton>
                          </Link>
                          <IconButton
                            onClick={() => handleDeleteSubStore(store.id)}
                            aria-label="delete"
                          >
                            <ClipboardMinus />
                          </IconButton>
                        </Box>
                      </Stack>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Stack>
        ) : (
          <Typography textAlign="center" my={4}>
            No Stores found
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default StorePage;
