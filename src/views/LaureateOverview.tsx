import { Stack, TextField, Typography, Link, debounce } from "@mui/material";
import React, { useState } from "react";
import BaseTable from "@/components/BaseTable";
import { useLaureate } from "@/hooks/useLaureate";
import BaseModal from "@/components/BaseModal";

export default function LaureateOverview() {
  const [openModal, setOpenModal] = useState(false);

  const {
    laureates,
    pagination,
    selectedLaureate,
    handleSearchByName,
    handleSearchByResidence,
    setSelectedLaureateId,
    handlePagination,
  } = useLaureate();

  const displayDetails = (id: string) => {
    setSelectedLaureateId(id);
    setOpenModal(true);
  };

  const debouncedSearchNameInput = debounce(handleSearchByName, 500);
  const debouncedSearchResidenceInput = debounce(handleSearchByResidence, 500);

  return (
    <>
      <h1>Laureate Overview</h1>

      <Stack direction="row">
        <TextField
          id="search-name"
          label="Search by name"
          variant="standard"
          onChange={(e) => debouncedSearchNameInput(e.target.value)}
        />

        <TextField
          id="search-residence"
          label="Search by residence"
          sx={{
            ml: 2,
          }}
          variant="standard"
          onChange={(e) => debouncedSearchResidenceInput(e.target.value)}
        />
      </Stack>

      <BaseTable
        data={laureates}
        showDetails={displayDetails}
        pagination={pagination}
        onChange={handlePagination}
      />

      <BaseModal
        open={openModal}
        title={selectedLaureate?.fullName.en}
        onClose={() => setOpenModal(false)}
      >
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="column" minWidth={250}>
            <Typography component={"span"}>Info:</Typography>
            <Typography component={"span"}>
              Born: {selectedLaureate?.birth.date}
            </Typography>
            {selectedLaureate?.birth.place && (
              <Typography component={"span"}>
                Place:{" "}
                {`${selectedLaureate.birth.place.country.en}, ${selectedLaureate.birth.place.city.en}`}
              </Typography>
            )}

            {selectedLaureate?.death?.date && (
              <Typography component={"span"}>
                Death: {selectedLaureate?.death?.date}
              </Typography>
            )}
            <Typography component={"span"}>
              Gender: {selectedLaureate?.gender}
            </Typography>
            <Typography component={"span"}>
              Wiki Link:{" "}
              <Link target="_blank" href={selectedLaureate?.wikidata.url}>
                Link
              </Link>
            </Typography>
          </Stack>
          <Stack direction="column" minWidth={250}>
            <Typography component={"span"}> Awards: </Typography>
            {selectedLaureate?.nobelPrizes.map((prize, index) => (
              <React.Fragment key={index}>
                <Typography component={"span"}>
                  Category: {prize?.category.en}
                </Typography>

                <Typography component={"span"}>
                  Award Amount: {prize?.prizeAmount}
                </Typography>

                <Typography component={"span"}>
                  Award Date: {prize?.dateAwarded}
                </Typography>
              </React.Fragment>
            ))}
          </Stack>
        </Stack>
      </BaseModal>
    </>
  );
}
