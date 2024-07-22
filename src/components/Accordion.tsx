import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { NobelPrizeI } from "@/types";
import { Stack } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface PropsI {
  data: NobelPrizeI[];
}

export default function BaseAccordion({ data }: PropsI) {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>
      {data.map((prize, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
        >
          <AccordionSummary
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography>
              {prize.category.en} ({prize.laureates.length})
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack direction="column" spacing={2}>
              <Typography>
                Adjusted award amount: {prize.prizeAmountAdjusted}
              </Typography>
              <Typography>Prize amount: {prize.prizeAmount}</Typography>
              {prize.laureates.map((laureate, index) => (
                <Stack key={index} pt={index > 0 ? 2 : 0}>
                  <Typography pb={1}>Name: {laureate.fullName?.en}</Typography>
                  <Typography>
                    {" "}
                    Motivation: {laureate.motivation?.en}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
